<template>
    <b-container>
        
        <!-- Seção contendo o campo de pesquisa e o botão de cadastro de currículo
             (pesquisa direta não foi implementada ainda) -->
        <section class="pt-2 pb-3">
            <b-container>
                <b-card>
                    <b-row>
                        <b-col sm="1">
                            <icon name="search"></icon>                                    
                        </b-col>
                        <b-col>
                            <b-form-input type="search" @keyup.enter="search"
                                placeholder="Pesquise algo..."></b-form-input>
                        </b-col>
                    </b-row>
                </b-card>                                                                           
            </b-container>            
        </section>

        <!-- Seção de currículo -->
        <section>
            <div class="mt-3 mb-3">                                    
                <b-card>
                    <b-container slot="header">
                        <b-row align-h="start">
                            <b-col>
                                <h2 slot="header">Meu currículo</h2>
                            </b-col>

                            <!-- Botão para abrir o modal de cadastro de currículo -->
                            <b-button class="btn btn-sm bg-warning border-warning mr-3"                                     
                                @click="showModalCurriculum"
                                v-if="!alreadyAddCurriculum"> 
                                <icon name="plus"></icon>
                            </b-button>                                           
                        </b-row>
                    </b-container>                                                
                    
                    <!-- Se exisitir, o currículo é apresentado junto com o carregamento da página -->
                    <b-container class="align-items-center w-75" v-if="showCurriculum">
                        <b-card> 
                            <!-- Body Currículo -->
                            <!-- As manipulações dentro de cada 'li' são feitas para deixar a 1ª letra 
                                maiúscula em cada item-->
                            <ul class="list-group list-group-flush">
                                <!-- Nome -->
                                <li class="list-group-item header-gradient border-light">
                                    <Strong> {{ firstLetterUp(curriculum.name) }} </Strong>
                                </li>
                                <!-- Área -->
                                <li class="list-group-item border-light">
                                    <Strong>Área: </Strong> {{ firstLetterUp(curriculum.area) }}
                                </li>

                                <!-- Instituição -->
                                <li class="list-group-item border-light">
                                    <Strong>Instituição: </Strong> {{ firstLetterUp(curriculum.institute) }}
                                </li>

                                <!-- Curso -->
                                <li class="list-group-item border-light">
                                    <Strong>Curso: </Strong> {{ firstLetterUp(curriculum.course) }}
                                </li>

                                <!-- Ano de formação -->
                                <li class="list-group-item border-light">
                                    <Strong>Ano de formação: </Strong> {{ curriculum.graduate_year }}
                                </li>

                                <!-- Link para baixar currículo junto com a data da última atualização -->
                                <li class="list-group-item border-light">
                                    <Strong>
                                        Arquivo de currículo:                                                     
                                    </Strong> 
                                    <b-link :href="'http://localhost:3000/curriculos/' + curriculum.hash_file">
                                        Baixar
                                    </b-link>
                                    <br>
                                    <small class="text-muted mr-2">
                                        Última atualização: {{ curriculum.reg_up }}
                                    </small>  
                                    <small>
                                        <b-link @click="showModalUpdate">
                                            Atualizar arquivo
                                        </b-link>
                                    </small>

                                </li>

                                <!-- Habilidades -->
                                <li class="list-group-item border-light">
                                    <Strong>Habilidades: </Strong>
                                    <span class="tag-format pl-1 mr-2 text-dark"
                                        v-bind:key="hability.id"
                                        v-for="hability in curriculum.habilities">                                            
                                            {{ firstLetterUp(hability) }}
                                    </span>
                                </li>
                            </ul>
                            
                            <!-- Footer currículo -->
                            <div slot="footer" v-if="alreadyAddCurriculum">
                                <b-row align-h="end" class="mr-2">
                                    <!-- Botão para abrir o modal de confirmação de remoção do currículo -->
                                    <b-button class="btn btn-sm btn-danger text-light" @click="showModalRemove"> 
                                        Excluir currículo
                                    </b-button>
                                </b-row>                            
                            </div>
                        </b-card>                             
                    </b-container>                                                          
                </b-card>                                  
            </div> 
        </section>

        <!-- Seção de exibição de resultados da pesquisa 
             (pesquisa direta não foi implementada ainda) -->
        <section>
                <b-container>
                    <h1 v-if="ifResults">
                        Resultados
                    </h1>
                </b-container>
        </section>
        
        <!-- Modal de cadastro de currículo (Precisa de validação)-->
        <b-modal hide-footer
            :centered="true"
            title="Cadastro de Currículo"
            size="lg"
            ref="modalRegCurriculum">    
                    
            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de currículo, contém: área, curso, arquivo, instituto, ano de formação, id de usuário e habilidades -->
                <b-form id="curriculumForm" @submit.prevent="redirectAddCurriculum">
                    <!-- Área -->
                    <b-form-group
                        label="Àrea *"
                        label-for="curriculumArea">
                        <b-form-select id="curriculumArea" 
                            v-model="formCurriculum.area" 
                            :state="!$v.formCurriculum.area.$invalid" 
                            aria-describedby="inputCurriculumAreaFeedback" required>                            
                            <option value="null" disabled> Escolha a área de atuação...</option>
                            <option value="agricultura e veterinária"> Agricultura e veterinária </option>
                            <option value="ciências, matemática e computação"> Ciências, matemática e computação </option>
                            <option value="ciências sociais, negócios e direito"> Ciências sociais, negócios e direito </option>
                            <option value="educação"> Educação </option>
                            <option value="engenharia, produção e construção"> Engenharia, produção e construção </option>
                            <option value="humanidades e artes"> Humanidades e artes </option>
                            <option value="saúde e bem estar social"> Saúde e bem estar social </option>
                            <option value="serviços"> Serviços </option>
                        </b-form-select>
                        <b-form-invalid-feedback id="inputCurriculumAreaFeedback">
                            <p v-if="!$v.formCurriculum.area.required">
                                Selecione uma opção.
                            </p>                                      
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Curso -->
                    <b-form-group
                        label="Curso *"
                        label-for="curriculumCourse">
                        <b-form-input type="text"
                            id="curriculumCourse"        
                            v-model="formCurriculum.course"
                            :state="!$v.formCurriculum.course.$invalid"                            
                            aria-describedby="inputCurriculumCourseFeedback"
                            placeholder="Digite o curso de formação..." required></b-form-input>
                        <b-form-invalid-feedback id="inputCurriculumCourseFeedback">
                            <p v-if="!$v.formCurriculum.course.required">
                                Preencha este campo.
                            </p>                                      
                        </b-form-invalid-feedback>                        
                    </b-form-group>

                    <!-- Arquivo de currículo -->
                    <!-- O <b-form-file> não suporta o <b-form-invalid-feedback> -->
                    <b-form-group
                        label="Arquivo *"
                        label-for="fileAdd">
                        <b-form-file id="fileAdd"
                            v-model="formCurriculum.file" 
                            :state="!$v.formCurriculum.file.$invalid"
                            placeholder="Anexe um currículo..." required></b-form-file>
                        <div v-if="$v.formCurriculum.file.$invalid" class="mt-3">
                            <p class="font-weight-bold text-danger">
                                Arquivo selecionado: Nenhum arquivo selecionado
                            </p>
                        </div>
                        <div v-if="!$v.formCurriculum.file.$invalid" class="mt-3">
                            <p class="font-weight-bold text-success">
                                Arquivo selecionado: {{formCurriculum.file && formCurriculum.file.name}}
                            </p>
                        </div>
                    </b-form-group>

                    <!-- Instituição de ensino -->
                    <b-form-group
                        label="Instituição de ensino *"
                        label-for="curriculumInstitute">
                        <b-form-input type="text" 
                            id="curriculumInstitute"        
                            v-model="formCurriculum.institute"
                            :state="!$v.formCurriculum.institute.$invalid"
                            aria-describedby="inputCurriculumInstituteFeedback"
                            placeholder="Digite o instituto de formação..." required></b-form-input>
                        <b-form-invalid-feedback id="inputCurriculumInstituteFeedback">
                            <p v-if="!$v.formCurriculum.institute.required">
                                Preencha este campo.
                            </p>                                      
                        </b-form-invalid-feedback>   
                    </b-form-group>


                    <!-- Ano de formação -->
                    <b-form-group
                        label="Ano de formação *"
                        label-for="curriculumGradYear">
                        
                        <b-form-select
                            id="curriculumGradYear"
                            v-model="formCurriculum.graduateYear"
                            :options="yearList" 
                            :state="!$v.formCurriculum.graduateYear.$invalid" required
                            aria-describedby="inputCurriculumGradYearFeedback"></b-form-select>
                        <b-form-invalid-feedback id="inputCurriculumGradYearFeedback">
                            <p v-if="!$v.formCurriculum.graduateYear.required">
                                Preencha este campo.
                            </p>                                      
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Habilidades / Foi colocado um limite de 3 habilidades -->
                    <b-form-group 
                        label="Principais habilidades *"
                        label-for="habilitiesTags"
                        description="Digite no máximo 3 habilidades">
                        <!-- O placeholder foi linkado com uma variável computada para que quando o usuário
                        digitar o número limite de habilidades não apareça nada no placeholder -->
                        <tags-input 
                            input-class="form-control-tags-input"
                            element-id="habilitiesTags"
                            v-model="formCurriculum.habilities"
                            :limit = 3
                            :validate="validateHabilities"
                            :placeholder="placeHolderHabilities"></tags-input> 
                    </b-form-group>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <b-btn variant="outline-danger" @click="hideModalCurriculum">Fechar</b-btn>
                        <b-btn :disabled="$v.formCurriculum.$invalid" variant="outline-success" type="submit">Enviar</b-btn>
                    </div>  
                </b-form>
            </div>
        </b-modal>

        <!-- Modal de confirmação de remoção -->
        <b-modal hide-footer
            :centered="true"          
            size="md"
            ref="modalRemove">    
            <h5 slot="modal-title">
                <Strong> Confirmação </Strong>
            </h5>
            <div class="modal-body">
                Deseja realmente excluir o currículo?             
            </div>
            <div class="modal-footer mt-2">
                <b-row align-h="end">
                    <b-btn variant="outline-dark mr-1" @click="hideModalRemove">Não</b-btn>
                    <b-btn variant="outline-success mr-1" @click="removeCurriculum">Sim</b-btn>
                </b-row>  
            </div>
            
        </b-modal>

        <!-- Modal de atualização do currículo (Precisa de validação)-->
        <b-modal hide-footer
            :centered="true"        
            size="md"
            ref="modalUpdate">    
            <h5 slot="modal-title">
                <Strong> Atualização de currículo </Strong>
            </h5>
            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de atualização de currículo -->
                <b-form id="curriculumUpdateForm" @submit.prevent="redirectUpdate">
                    <!-- Arquivo de currículo -->
                    <!-- O <b-form-file> não suporta o <b-form-invalid-feedback> -->
                    <b-form-group
                        label="Arquivo *"
                        label-for="fileUpdate">
                        <b-form-file id="fileUpdate"
                            v-model="formUpdate.file"
                            :state="!$v.formUpdate.file.$invalid" 
                            placeholder="Anexe um currículo..." required></b-form-file>
                        <div v-if="$v.formUpdate.file.$invalid" class="mt-3">
                            <p class="font-weight-bold text-danger">
                                Arquivo selecionado: Nenhum arquivo selecionado
                            </p>
                        </div>
                        <div v-if="!$v.formUpdate.file.$invalid" class="mt-3">
                            <p class="font-weight-bold text-success">
                                Arquivo selecionado: {{formUpdate.file && formUpdate.file.name}}
                            </p>
                        </div>
                    </b-form-group>
                    
                    <!-- Habilidades / Foi colocado um limite de 3 habilidades -->
                    <b-form-group description="Digite no máximo 3 habilidades">
                        <b-form-text for="habilitiesTagsUpdate"> Principais habilidades </b-form-text>
                        <tags-input input-class="form-control"
                            element-id="habilitiesTagsUpdate"
                            v-model="formUpdate.habilities"
                            :limit = 3
                            :validate="validateHabilities"
                            :placeholder="placeHolderHabilitiesUpdate"></tags-input>
                    </b-form-group>

                    <!-- Modal footer -->
                    <div class="modal-footer mt-2">
                        <b-row align-h="end">
                            <b-btn variant="outline-danger mr-1" @click="hideModalUpdate">Cancelar</b-btn>
                            <b-btn :disabled="$v.formUpdate.$invalid" variant="outline-success" type="submit">Atualizar</b-btn>
                        </b-row>
                    </div>  
                </b-form>
            </div>
        </b-modal>
    </b-container>
</template>

<script>
    // O comentário na linha de baixo desabilita os warnings
/* eslint-disable */

// Imports necessários para fazer a requisição ao servidor
import API from '../../services/ApiService';

// Import das funções utilizadas do Vuelidate
import {    required, 
            minLength, 
            between, 
            maxLength, 
            email, 
            numeric } from 'vuelidate/lib/validators'

export default {
    name: "portalPessoa",
    data() {
        return {
            // Variável para controlar a exibição do modal
            modalRegCurriculum: false,

            // Todas as variáveis relacionadas à adição de currículo
            // ficam no objeto formCurriculum
            // para a validação adequada das informações do
            // currículo, e apenas com tudo certo é possível 
            // fazer o envio
            formCurriculum: {
                area: null,
                course: '',
                file: '',
                institute: '',
                graduateYear: this.currentYear(),
                habilities: [
                    'smart grid'
                ], 
            },
            
            // Todas as variáveis relacionadas à atualização de currículo
            // ficam no objeto formUpdate
            // para a validação adequada das informações do
            // currículo, e apenas com tudo certo é possível 
            // fazer o envio
            formUpdate: {
                file: '',
                habilities: [
                    'smart grid'
                ],
            },                        

            // Variável que recebe o erro do back caso
            // haja algum erro na adição do currículo
            error: null,

            // Variável que controla a exibição da 
            // div de resultados da busca
            ifResults: false,
            
            // Variável que recebe os resultados 
            // da pesquisa
            results: null,

            // Variável para exibir o botão de adição de currículo
            alreadyAddCurriculum: false,

            // Variável para exibir o currículo do usuário
            showCurriculum: false,

            // Variável para receber e exibir as informações do currículo
            curriculum: null,

            // Variável para controlar a exibição do modal de confirmação de remoção do currículo
            modalRemove: false,

            // Variável para controlar a exibição do modal de atualização do currículo
            modalUpdate: false,

            // Variável contendo todos os anos possíveis para o ano de formação
            yearList: this.listYears(),

            // Método para tornar a primeira letra maiúscula da palavra fornecida
            firstLetterUp (word) {
                return word[0].toUpperCase() + word.slice(1);
            },
        }
    },
    methods: {
        // Método para intermediar a adição de currículo
        redirectAddCurriculum($event) {        
            this.addCurriculum();

            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },

        // Método para intermediar a atualização de currículo
        redirectUpdate($event) { 
            this.updateCurriculum();

            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },

        // Método para validar as habilidades (Falta implementar)
        validateHabilities ($event) {
            return true;
        },

        // Método para adicionar um currículo
        addCurriculum() {
            // O token  do usuário é recuperado e adicionado ao header da 
            // requisição para enviá-lo ao back-end
            API.token = this.$store.getters.authToken;

            // O objeto formData é instaciado apenas dentro do trecho de código ao
            // qual ele pertence, através da instrução let
            let formData = new FormData();

            formData.append('area', this.formCurriculum.area);
            formData.append('course', this.formCurriculum.course);
            formData.append('file', this.formCurriculum.file);
            formData.append('institute', this.formCurriculum.institute);
            formData.append('graduate_year', this.formCurriculum.graduateYear);
            for (var i = 0; i < this.formCurriculum.habilities.length; i++) {
                formData.append('habilities[]', this.formCurriculum.habilities[i]);
            }
            
            // Requisição POST para adicionar as informações do currículo
            // e o arquivo de currículo
            API.postFile('/addCurriculum', formData).then(() => {                
                // Recarrega a página
                this.$router.go();
            });
        },

        // Método para remover currículo
        removeCurriculum () {
            // O token  do usuário é recuperado e adicionado ao header da 
            // requisição para enviá-lo ao back-end
            API.token = this.$store.getters.authToken;
            
            // Requisição DELETE para remover o currículo            
            API.delete('/removeCurriculum').then(() => {
                this.hideModalRemove();
                this.alreadyAddCurriculum = false;
                this.showCurriculum = false;                
            });
        },

        // Método para atualizar currículo
        updateCurriculum () {
            // O token  do usuário é recuperado e adicionado ao header da 
            // requisição para enviá-lo ao back-end
            API.token = this.$store.getters.authToken;

            // O objeto formData é instaciado apenas dentro do trecho de código ao
            // qual ele pertence, através da instrução let
            let formData = new FormData();
            
            formData.append('file', this.formUpdate.file);
            for (var i = 0; i < this.formUpdate.habilities.length; i++) {
                formData.append('habilities[]', thisthis.formUpdate.habilities[i]);
            }
            
            // Requisição POST para adicionar as informações do currículo
            // e o arquivo de currículo
            API.postFile('/updateCurriculum', formData).then(() => {                                
                // Recarrega a página
                this.$router.go();
            });
        },

        // Método que mostra o modal para adicionar currículos
        showModalCurriculum () {
            this.$refs.modalRegCurriculum.show()
        },

        // Método para esconder o modal de adicionar currículos
        hideModalCurriculum () {
            this.$refs.modalRegCurriculum.hide()
        },

        // Método que mostra o modal para confirmar a remoção do currículo
        showModalRemove () {
            this.$refs.modalRemove.show()
        },

        // Método para esconder o modal para confirmar a remoção do currículo
        hideModalRemove () {
            this.$refs.modalRemove.hide()
        },

        // Método que mostra o modal para atulizar currículo
        showModalUpdate () {
            this.$refs.modalUpdate.show()
        },

        // Método para esconder o modal de atualizar currículo
        hideModalUpdate () {
            this.$refs.modalUpdate.hide()
        },     
        
        // Função que retorna o ano atual
        currentYear() {
            return (new Date()).getFullYear();
        },

        // Função para preencher o vetor de anos com
        // os últimos 70 e próximos 15 valores, em 
        // relação ao ano atual
        listYears() {
            var y = this.currentYear();
            var yList = [];
            var i = y - 70;
            while (i++ < y + 15) {
                yList.push(i);
            }
            return yList;
        }
    },
    computed: {        
        // Função computada que altera o placeholder do input de habilities dependendo
        // da quantidade de habilidades existentes, se chegar no limite o placeholder
        // é alterado para vazio
        placeHolderHabilities() {
            if (this.formCurriculum.habilities.length < 3) {
                return 'Digite uma habilidade';
            } 
            return '';
        }, 

        // Função computada que altera o placeholder do input de habilities dependendo
        // da quantidade de habilidades existentes, se chegar no limite o placeholder
        // é alterado para vazio
        placeHolderHabilitiesUpdate() {
            if (this.formUpdate.habilities.length < 3) {
                return 'Digite uma habilidade';
            } 
            return '';
        }, 
    },

    // Função para recuperar as informações do currículo no back-end
    created: function () {
        // O token  do usuário é recuperado e adicionado ao header da 
        // requisição para enviá-lo ao back-end
        API.token = this.$store.getters.authToken;
        
        // Requisição POST para recuperar o currículo
        API.get('/getCurriculum')
        .then(response => {                        
            // É necessário verificar se o currículo não foi excluído para a sua exibição,
            // isso se dá analisando se o hash_file vindo do back é NULL,
            if(response.data.data["hash_file"]) {
                this.curriculum = response.data.data;
                this.alreadyAddCurriculum = true;
                this.showCurriculum = true;
            }
        }).catch(error => {
            this.error = error.message;
        });
    },

    // Validações, para os forms existentes, feitas com o auxílio do Vuelidate
    validations: {
        // Validação do formulário de adição de currículo 
        formCurriculum: {
            area: {
                required,
            },
            course: {
                required,
                minLength: minLength(4),
            },
            file: {
                required,
            },
            institute: {
                required,
                minLength: minLength(2),
            },
            graduateYear: {
                required,
            },
            habilities: {
                required,    
            },
        },
        formUpdate: {
            file: {
                required,
            },
            habilities: {
                required,
            },
        },
    },
};
</script>

<style>

.header-gradient {
    border-radius: 4px;
    background: linear-gradient(to right, #a3abb3 20%, #ffffff  80%);
}

.tag-format {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 500;
    line-height: 0.5;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    padding: .4rem .25rem;
    background: #fff;
    border: 1px solid transparent;
    background: #a3abb3;
    border-radius: .25rem;
    border-color: #dbdbdb;
}

.tags-input span {
    color: #ffffff;
    background-color: #ffc107;
}

.tags-input-remove:before, .tags-input-remove:after {
    content: '';
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    background: #000000;
    height: 2px;
    margin-top: -1px;
}

.form-control-tags-input {
    display: block;
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: calc(2.25rem + 5px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}
</style>

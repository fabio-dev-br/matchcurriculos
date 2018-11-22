<template>
    <b-container>
        <!-- Seção contendo o botão de cadastro de interesses
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

        <!-- Seção de exibição dos interesses existentes -->
        <section class="mb-3">
            <div v-if="divInterests">                
                <b-card>
                    <b-container slot="header">
                        <b-row align-h="start">
                            <b-col>
                                <h2 slot="header">Meus interesses</h2>
                            </b-col>                                                            
                            <template class="mt-2" v-if="!alterToRemoveInterests">
                                <!-- Botão para abrir o modal de cadastro de interesses -->
                                <b-button class="btn btn-sm bg-warning border-warning mr-3" @click="showModalInterests"> 
                                    <icon name="plus"></icon>
                                </b-button>           
                            
                                <!-- Botão para preparar para a remoção de interesses -->
                                <b-button class="btn btn-sm bg-warning border-warning" v-if="showRemove" @click="prepareRemove"> 
                                    <icon name="minus"></icon>
                                </b-button>
                            </template>                                      
                        </b-row>
                    </b-container>                                                
                    <ul id="interestsList">
                        <!-- Template que é mostrado inicialmente no carregamento da página
                        e redireciona para uma pesquisa dos currículos relacionados ao interesse 
                        em questão                             -->
                        <template v-if="showInterests">
                            <li v-for="interest in displayInterests" :key="interest.id">
                                <!-- A manipulação dentro do link é para deixar a primeira
                                letra do interesse maiúscula -->
                                <b-link @click.prevent="search(interest.value)">
                                    {{ interest.text[0].toUpperCase() + interest.text.slice(1) }}
                                </b-link>
                            </li>                                
                        </template>

                        <!-- Template que prepara a interface para a remoção de interesses, é acionado pelo botão com ícone minus -->
                        <template v-else>
                            <b-form-group >
                                <div><strong>Selecione os interesses que deseja deletar: </strong></div>                                    
                                
                                <!-- Checkbox-group pega o vetor já preparado (text e value), quando os interesses são recuperados
                                do back-end, e mostra -->
                                <b-form-checkbox-group id="interestsSelected" name="interests"
                                    v-model="selected" 
                                    :options="displayInterests" stacked>
                                </b-form-checkbox-group>                                    
                            </b-form-group>                                
                        </template>                            
                    </ul>
                    <div slot="footer" v-if="alterToRemoveInterests">
                        <b-row align-h="end" class="mr-2">
                            <!-- Botão para cancelar a remoção dos interesses -->
                            <b-btn variant="danger mr-1" @click="prepareRemove"> 
                                Cancelar
                            </b-btn>

                            <!-- Botão para confirmar a remoção dos interesses -->
                            <b-btn variant="warning" @click="removeInterests"> 
                                Confirmar
                            </b-btn>        
                        </b-row>                            
                    </div>
                </b-card>                
            </div>                
        </section>

        <!-- Modal do cadastro de interesses (Precisa de validação) -->
        <b-modal hide-footer
            :centered="true"
            title="Cadastro de Interesses"
            size="lg"
            ref="modalRegInterests">    
                    
            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de interesses, contém: interesses -->
                <b-form id="interestsForm" @submit="redirectInterests">

                    <!-- Habilidades / Não foi colocado um limite -->
                    <b-form-group 
                        label="Interesses *"
                        label-for="interestsTags">

                        <tags-input 
                            input-class="form-control-tags-input"
                            element-id="interestsTags"
                            v-model="formInterests.interests"
                            :validate="validateInterests"
                            placeholder="Digite um interesse"></tags-input> 
                    </b-form-group>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <b-btn variant="outline-danger" @click="hideModalInterests">Fechar</b-btn>
                        <b-btn :disabled="$v.formInterests.$invalid" variant="outline-success" type="submit">Enviar</b-btn>
                    </div>  
                </b-form>
            </div>
        </b-modal>        

        <!-- Seção de exibição do resultado da busca -->
        <section class="mb-3">
            <div v-if="divSearch">
                <b-card-group deck>
                    <b-card header-tag="header">
                        <b-row slot="header">
                            <b-col>
                                <h2 slot="header">Resultados - {{ firstLetterUp(headerSearch) }} </h2>
                            </b-col>
                            <b-row align-h="end" class="mr-2">
                                <!-- Botão para fechar a seção de busca -->
                                <b-button class="btn btn-sm btn-danger text-light" 
                                    @click="hideSearchSection"> 
                                    <icon name="window-close"></icon>
                                </b-button>       
                            </b-row> 
                        </b-row> 
                        <!-- Template contendo as possibilidades de resultados -->                                               
                        <template id="searchList">                            

                            <!-- Template para mostrar os currículos existentes -->
                            <template v-if="showCurricula">
                                <!-- Card para cada currículo contendo área, instituição, curso, ano de formação, link para download do
                                currículo e data da última atualização-->
                                <b-card                                
                                    v-for="curriculum in curricula"                                     
                                    :key="curriculum.id"
                                    class="mb-4">
                                    <h4 class="pl-2 header-gradient"> {{ firstLetterUp(curriculum.name) }} </h4>
                                    <ul>
                                        <!-- Área -->
                                        <li>
                                            <p class="card-text"><Strong>Área: </Strong> {{ firstLetterUp(curriculum.area) }}</p>
                                        </li>

                                        <!-- Instituição -->
                                        <li>
                                            <p class="card-text"><Strong>Instituição: </Strong> {{ firstLetterUp(curriculum.institute) }}</p>
                                        </li>

                                        <!-- Curso -->
                                        <li>
                                            <p class="card-text"><Strong>Curso: </Strong> {{ firstLetterUp(curriculum.course) }}</p>
                                        </li>

                                        <!-- Ano de formação -->
                                        <li>
                                            <p class="card-text"><Strong>Ano de formação: </Strong> {{ curriculum.graduate_year }}</p>
                                        </li>

                                        <!-- Link para baixar currículo junto com a data da última atualização -->
                                        <li>
                                            <p class="card-text">
                                                <Strong>
                                                    Arquivo de currículo:                                                     
                                                </Strong> 
                                                <b-link :href="'http://localhost:3000/curriculos/' + curriculum.hash_file">
                                                    Baixar
                                                </b-link>
                                                <small class="text-muted">
                                                    - Última atualização: {{ firstLetterUp(curriculum.reg_up) }}
                                                </small>                                                
                                            </p>
                                        </li>

                                        <!-- Habilidades -->
                                        <li>
                                            <Strong>Habilidades: </Strong>
                                            <span class="tag-format pl-1 mr-2 text-dark"
                                                v-bind:key="hability.id"
                                                v-for="hability in curriculum.habilities">
                                                {{ firstLetterUp(hability) }}
                                            </span>
                                        </li>
                                    </ul>                                    
                                </b-card>
                            </template>                            

                            <!-- Template para informar que não existem resultados -->                            
                            <template v-else>
                                <div><strong>Não existem currículos com a habilidade desejada</strong></div> 
                            </template>
                            
                        </template>
                        <div slot="footer" v-if="alterToRemoveInterests">
                                                       
                        </div>
                    </b-card>
                </b-card-group>                
            </div>                
        </section>
    </b-container>
</template>

<script>
    // O comentário na linha de baixo desabilita os warnings
/* eslint-disable */

// Imports necessários para fazer a requisição ao servidor
import API from '../../services/ApiService';
import axios from 'axios';

// Import das funções utilizadas do Vuelidate
import {    required, 
            minLength, 
            between, 
            maxLength, 
            email, 
            numeric } from 'vuelidate/lib/validators'

export default {
    name: "portalEmpresa",
    data() {
        return {
            // Variável para controlar a exibição do modal
            modalRegInterests: false,
            
            // Todas as variáveis relacionadas à adição de interesses
            // ficam no objeto formInterests
            // para a validação adequada das informações do
            // currículo, e apenas com tudo certo é possível 
            // fazer o envio
            formInterests: {
                interests: [
                    'smart grid'
                ],
            },

            // Variável que recebe o erro do back caso
            // haja algum erro na adição de interesses
            errorAddInterest: null,

            // Variável para controlar a exibição da div de 
            // interesses
            divInterests: false,

            // Variável que recebe os interesses existentes 
            // da empresa, para visualização
            displayInterests: null,

            // Variável para controlar a exibição do botão de 
            // remover existente no footer
            alterToRemoveInterests: false,

            // Variável para alternar a exibição da página entre
            // os interesses existentes e a interface de remoção deles
            showInterests: true,

            // Variável que recebe o erro do back caso
            // haja algum erro na remoção de interesses
            errorRemoveInterest: null,

            // Variável contendo os interesses selecionados
            selected: [],

            // Váriável para exibir a div de resultados da busca
            divSearch: false,

            // Variável para exibir os currículos encontrados
            showCurricula: false,

            // Cabeçalho dos resultados
            headerSearch: null,

            // Currículos encontrados
            curricula: null,

            // Variável que recebe o erro do back caso
            // haja algum erro na busca de interesses
            errorSearchInterest: null,

            // Variável para controlar a opção de remover
            showRemove: true,
        }
    },
    methods: {
        // Método para intermediar a validação a adição de interesses
        redirectInterests($event) {           
            this.addInterests();

            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },

        // Método para validar os interesses (Falta implementar)
        validateInterests ($event) {
            return true;
        },

        // Método para adicionar interesses
        addInterests() {
            // Requisição POST para adicionar interesses
            API.post('/addInterests', {
                interests: this.formInterests.interests
            }).then(() => {                
                // Recarrega a página
                this.$router.go();
            }).catch(error => {
                this.errorAddInterest = error.message;;
            });
        },

        // Método que mostra o modal para adicionar interesses
        showModalInterests () {
            this.$refs.modalRegInterests.show()
        },

        // Método que esconde o modal para adicionar interesses
        hideModalInterests () {
            this.$refs.modalRegInterests.hide()
        },

        // Método que prepara a página para a remoção de interesses
        prepareRemove () {
            this.showInterests = !this.showInterests;
            this.alterToRemoveInterests = !this.alterToRemoveInterests;            
        },

        // Método que remove os interesses selecionados
        removeInterests () {
            // Requisição POST para adicionar um currículo            
            API.post('/deleteInterests', {
                interests: this.selected
            }).then(() => {                
                // Recarrega a página
                this.$router.go();
            }).catch(error => {
                this.errorRemoveInterest = error.message;
            });
        },

        // Método que busca os currículos relacionados com 
        // o interesse selecionado através do link
        search (value) {
            // Muda o valor de headerSearch para o interesse procurado
            this.headerSearch = value;
            
            // Requisição GET para buscar currículos relacionados ao interesse dado
            // (O APIService.js não é utilizado por problemas com o GET 
            // presente lá, quando se passa parâmetros)
            axios.get('http://localhost:2999/searchCurByInt', {
                params: {
                    interests: value
                }                
            },
            {'Content-Type': 'application/x-www-form-urlencoded'},)
            .then(response => {
                this.curricula = response.data.data[value];
                
                // Verifica se existe algum currículo relacionado à habilidade passada,
                // se existe algum, no elemento searchList será mostrado todos os resultados, caso 
                // contrário, é mostrado uma mensagem de que não há resultados
                if(!this.curricula) {
                    this.showCurricula = false;
                } else {
                    this.showCurricula = true;                    
                }

            }); 

            // API.get('/searchCurByInt', {
            //     params: {
            //         interests: value
            //     }
            // }).then(response => {
            //     // Esse log de console é utilizado para utilizar o response declarado
            //     // e, assim, o warning, referente à não utilização, não ocorrer na compilação 
            //     console.log(response.data.code);
                
            //     // Variável currícula recebe os resultados da pesquisa no back-end
            //     console.log(response.data.data);
            //     // this.curricula = response.data.data.curricula;   
                            
            // }).catch(error => {
            //     this.errorSearchInterest = error.response.data.message;
            // });
            
            this.divSearch = true; 
        },

        // Método para esconder a seção de resultados da busca
        hideSearchSection () {
            this.divSearch = !this.divSearch;
        },

        // Método para tornar a primeira letra maiúscula da palavra fornecida
        firstLetterUp (word) {
            return word[0].toUpperCase() + word.slice(1);
        },
    },

    // Função para recuperar os interesses da empresa presentes no back-end
    created: function () {        
        // Requisição POST para fazer o login
        API.get('/searchInt')
        .then(response => {
            // auxInterests é um vetor que auxilia na organização dos dados
            // , provenientes do back-end, de maneira que na parte de remoção 
            // o check-box-group é montado automaticamente (text e value)
            var auxInterests = [];   
            // Verifica se há algum resultado para mostrar
            if(response.data.data.length != 0) {
                response.data.data.forEach(element => { 
                    // A manipulação dentro de text serve para deixar a primeira letra
                    // maiúscula               
                    auxInterests = auxInterests.concat(
                        {text: this.firstLetterUp(element), value: element}
                    );
                    this.displayInterests = auxInterests;
                });            
            } else {
                this.showRemove = false;
            }

            this.divInterests = true;
        }).catch(error => {
            this.error = error.response.message;
        });
    },

    // Validações, para os forms existentes, feitas com o auxílio do Vuelidate
    validations: {
        // Validação do formulário de adição de interesses
        formInterests: {
            interests: {
                required,
            },
        },              
    },
};
</script>

<style>

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

.header-gradient{
    border-radius: 4px;
    background: linear-gradient(to right, #a3abb3 20%, #ffffff  80%);
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

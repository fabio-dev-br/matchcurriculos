<template>
    <b-container>
        
        <!-- Seção contendo o campo de pesquisa e o botão de cadastro de noticia
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

        <!-- Seção de noticia -->
        <section>
            <div class="mt-3 mb-3">                                    
                <b-card>
                    <b-container slot="header">
                        <b-row align-h="start">
                            <b-col>
                                <h2 slot="header">Minhas notícias</h2>
                            </b-col>

                            <!-- Botão para abrir o modal de cadastro de noticia -->
                            <b-button class="btn btn-sm bg-warning border-warning mr-3"                                     
                                @click="showModalNotice"
                                v-if="!alreadyAddNotice"> 
                                <icon name="plus"></icon>
                            </b-button>                                           
                        </b-row>
                    </b-container>                                                
                    
                    <!-- Se exisitir, o noticia é apresentado junto com o carregamento da página -->
                    <b-container class="align-items-center w-75" v-if="showNotice">
                        <b-card> 
                            <!-- Body noticia -->
                            <!-- As manipulações dentro de cada 'li' são feitas para deixar a 1ª letra 
                                maiúscula em cada item-->
                            <ul class="list-group list-group-flush">                                

                                <!-- Instituição -->
                                <li class="list-group-item border-light">
                                    <Strong>Instituição: </Strong> {{ firstLetterUp(Notice.description) }}
                                </li>

                                <!-- Curso -->
                                <li class="list-group-item border-light">
                                    <Strong>Curso: </Strong> {{ firstLetterUp(Notice.title) }}
                                </li>                              
                                
                            </ul>
                            
                            <!-- Footer noticia -->
                            <div slot="footer" v-if="alreadyAddNotice">
                                <b-row align-h="end" class="mr-2">
                                    <!-- Botão para abrir o modal de confirmação de remoção do noticia -->
                                    <b-button class="btn btn-sm btn-danger text-light" @click="showModalRemove"> 
                                        Excluir notícia
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
        
        <!-- Modal de cadastro de noticia (Precisa de validação)-->
        <b-modal hide-footer
            :centered="true"
            title="Cadastro de notícia"
            size="lg"
            ref="modalRegNotice">    
                    
            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de noticia, contém: área, curso, arquivo, instituto, ano de formação, id de usuário e habilidades -->
                <b-form id="NoticeForm" @submit.prevent="redirectAddNotice">

                    <!-- Título -->
                    <b-form-group
                        label="Título"
                        label-for="NoticeTitle">
                        <b-form-input type="text"
                            id="NoticeTitle"        
                            v-model="formNotice.title"
                            :state="!$v.formNotice.title.$invalid"                            
                            aria-describedby="inputNoticeTitleFeedback"
                            placeholder="Digite título da notícia..." required></b-form-input>
                        <b-form-invalid-feedback id="inputNoticeTitleFeedback">
                            <p v-if="!$v.formNotice.title.required">
                                Preencha este campo.
                            </p>                                      
                        </b-form-invalid-feedback>                        
                    </b-form-group>


                    <!-- Descrição -->
                    <b-form-group
                        label="Descrição"
                        label-for="NoticeDescription">
                        <b-form-input type="text" 
                            id="NoticeDescription"        
                            v-model="formNotice.description"
                            :state="!$v.formNotice.description.$invalid"
                            aria-describedby="inputNoticeDescriptionFeedback"
                            placeholder="Digite a notícia" required></b-form-input>
                        <b-form-invalid-feedback id="inputNoticeDescriptionFeedback">
                            <p v-if="!$v.formNotice.description.required">
                                Preencha este campo.
                            </p>                                      
                        </b-form-invalid-feedback>   
                    </b-form-group>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <b-btn variant="outline-danger" @click="hideModalNotice">Fechar</b-btn>
                        <b-btn :disabled="$v.formNotice.$invalid" variant="outline-success" type="submit">Enviar</b-btn>
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
                Deseja realmente excluir o noticia?             
            </div>
            <div class="modal-footer mt-2">
                <b-row align-h="end">
                    <b-btn variant="outline-dark mr-1" @click="hideModalRemove">Não</b-btn>
                    <b-btn variant="outline-success mr-1" @click="removeNotice">Sim</b-btn>
                </b-row>  
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
    name: "portalNoticiaE",
    data() {
        return {
            // Variável para controlar a exibição do modal
            modalRegNotice: false,

            // Todas as variáveis relacionadas à adição de noticia
            // ficam no objeto formNotice
            // para a validação adequada das informações do
            // noticia, e apenas com tudo certo é possível 
            // fazer o envio
            formNotice: {
                title: '',
                description: ''
            },                    

            // Variável que recebe o erro do back caso
            // haja algum erro na adição do noticia
            error: null,

            // Variável que controla a exibição da 
            // div de resultados da busca
            ifResults: false,
            
            // Variável que recebe os resultados 
            // da pesquisa
            results: null,

            // Variável para exibir o botão de adição de noticia
            alreadyAddNotice: false,

            // Variável para exibir o noticia do usuário
            showNotice: false,

            // Variável para receber e exibir as informações do noticia
            Notice: null,

            // Variável para controlar a exibição do modal de confirmação de remoção do noticia
            modalRemove: false,

            // Método para tornar a primeira letra maiúscula da palavra fornecida
            firstLetterUp (word) {
                return word[0].toUpperCase() + word.slice(1);
            },
        }
    },
    methods: {
        // Método para intermediar a adição de noticia
        redirectAddNotice($event) {        
            this.addNotice();

            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },

        // Método para adicionar um noticia
        addNotice() {
            // O token  do usuário é recuperado e adicionado ao header da 
            // requisição para enviá-lo ao back-end
            API.token = this.$store.getters.authToken;

            // O objeto formData é instaciado apenas dentro do trecho de código ao
            // qual ele pertence, através da instrução let
            let formData = new FormData();
           
            formData.append('title', this.formNotice.title);            
            formData.append('description', this.formNotice.description);
                        
            // Requisição POST para adicionar as informações do noticia
            // e o arquivo de noticia
            API.postFile('/addNotice', formData).then(() => {                
                // Recarrega a página
                this.$router.go();
            });
        },

        // Método para remover noticia
        removeNotice () {
            // O token  do usuário é recuperado e adicionado ao header da 
            // requisição para enviá-lo ao back-end
            API.token = this.$store.getters.authToken;
            
            // Requisição DELETE para remover o noticia            
            API.delete('/removeNotice').then(() => {
                this.hideModalRemove();
                this.alreadyAddNotice = false;
                this.showNotice = false;                
            });
        },

        // Método que mostra o modal para adicionar noticias
        showModalNotice () {
            this.$refs.modalRegNotice.show()
        },

        // Método para esconder o modal de adicionar noticias
        hideModalNotice () {
            this.$refs.modalRegNotice.hide()
        },

        // Método que mostra o modal para confirmar a remoção do noticia
        showModalRemove () {
            this.$refs.modalRemove.show()
        },

        // Método para esconder o modal para confirmar a remoção do noticia
        hideModalRemove () {
            this.$refs.modalRemove.hide()
        },

        
    },

    // Função para recuperar as informações do noticia no back-end
    created: function () {
        // O token  do usuário é recuperado e adicionado ao header da 
        // requisição para enviá-lo ao back-end
        API.token = this.$store.getters.authToken;
        
        // Requisição POST para recuperar o noticia
        API.get('/getNotice')
        .then(response => {                        
            // É necessário verificar se o noticia não foi excluído para a sua exibição,
            // isso se dá analisando se o hash_file vindo do back é NULL,
            if(response.data.data["hash_file"]) {
                this.Notice = response.data.data;
                this.alreadyAddNotice = true;
                this.showNotice = true;
            }
        }).catch(error => {
            this.error = error.message;
        });
    },

    // Validações, para os forms existentes, feitas com o auxílio do Vuelidate
    validations: {
        // Validação do formulário de adição de noticia 
        formNotice: {
            title: {
                required,
                minLength: minLength(4),
            },
            description: {
                required,
                minLength: minLength(2),
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

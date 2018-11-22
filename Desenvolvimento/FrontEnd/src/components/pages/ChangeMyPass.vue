<template>
    <b-container>
        <!-- Seção para a alteração de senha -->
        <section class="pt-2 pb-3">            
            <b-card>
                <!-- Formulário para alteração de senha -->
                <b-form id="changePasswordForm" @submit="redirectPassword">
                    <b-container slot="header">
                        <h4 class="mb-3" slot="header"> Redefinição de senha </h4>
                        
                        <!-- Senha -->
                        <b-form-group 
                            label="Senha"
                            label-for="userPassword"
                            :invalid-feedback="invalidPassword"
                            :state="statePassword">
                            <b-form-input type="password"
                                id="userPassword"
                                v-model="password" required></b-form-input> 
                        </b-form-group>

                        <!-- Confirmação de senha -->
                        <b-form-group 
                            label="Confirmação de senha"
                            label-for="confirmPassword"
                            :invalid-feedback="invalidConfirmPassword"
                            :state="stateConfirmPassword">
                            <b-form-input type="password"
                                id="confirmPassword"
                                v-model="confirmPassword" required></b-form-input> 
                        </b-form-group>                                                
                    </b-container>   
                    <b-row class="mr-3" align-h="end">
                        <b-btn :disabled="disabledSendNewPass" variant="outline-success" type="submit">Enviar</b-btn>
                    </b-row>
                    
                </b-form>                
            </b-card>
        </section>

        <!-- Modal expirou tempo do hash -->
        <b-modal hide-footer
            hide-header-close
            :hide-header="true"
            :centered="true"
            :no-close-on-backdrop="true"
            :no-close-on-esc="true"            
            size="md"
            ref="modalExpiration">  

            <!-- Título do modal -->
            <div class="modal-title">
                <b-row  align-h="center">
                    <h4><strong>Ocorreu um erro...</strong></h4>
                </b-row>                
            </div>

            <!-- Separação título e body -->
            <hr/>

            <!-- Modal body -->
            <b-row align-h="center">
                <b-col>
                    O tempo para a alteração da senha expirou, 
                    faça uma outra requisição para alterar a senha.
                </b-col>                
            </b-row>

            <b-row class="mt-2" align-h="center">
                <b-button size="md" variant="outline-primary" @click="redirectLogin">
                    Voltar
                </b-button>
            </b-row>
        </b-modal>          

        <!-- Modal de sucesso -->
        <b-modal hide-footer
            hide-header-close
            :hide-header="true"
            :centered="true"
            :no-close-on-backdrop="true"
            :no-close-on-esc="true"            
            size="sm"
            ref="modalSuccess"> 
            
            <!-- Título do modal -->   
            <div class="modal-title">
                <b-row  align-h="center">
                    <h4><strong>Sucesso</strong></h4>
                </b-row>                
            </div>
            
            <!-- Separação título e body -->
            <hr/>

            <!-- Modal body -->
            <b-row align-h="center">
                A troca de senha ocorreu com sucesso.
            </b-row>                            
            <b-row class="mt-2" align-h="center">
                <b-button size="md" variant="outline-primary" @click="redirectSuccess">
                    Login
                </b-button>
            </b-row>
        </b-modal>               
        
        <!-- Modal de erro -->
        <b-modal hide-footer
            hide-header-close
            :hide-header="true"
            :centered="true"
            :no-close-on-backdrop="true"
            :no-close-on-esc="true"            
            size="sm"
            ref="modalError">  

            <!-- Título do modal -->
            <div class="modal-title">
                <b-row align-h="center">
                    <h4><strong>Algo deu errado...</strong></h4>
                </b-row>                
            </div>

            <!-- Separação título e body -->
            <hr/>

            <!-- Modal body -->
            <b-row align-h="center">
                <b-col>
                    {{ errorChangePass }}
                </b-col>                
            </b-row>                            
            <b-row class="mt-2" align-h="center">
                <b-button size="md" variant="outline-primary" @click="redirectError">
                    Tentar outra vez
                </b-button>
            </b-row>            
        </b-modal> 
    </b-container>
</template>

<script>
    // O comentário na linha de baixo desbilita os warnings
/* eslint-disable */

// Imports necessários para fazer a requisição ao servidor
import API from '../../services/ApiService';
import axios from 'axios';

export default {
    name: "changeMyPass",
    data() {
        return {
            // Variável para controlar a exibição do modal de sucesso na troca da senha
            modalSuccess: false,

            // Variável para controlar a exibição do modal se algum erro aconteceu na troca da senha
            modalError: false,

            // Variável para controlar a exibição do modal informando
            // se o hash ainda é válido
            modalExpiration: false,

            // Variável senha
            password: '',

            // Variável confirmação de senha
            confirmPassword: '',

            // Variável que recebe o erro do back caso
            // haja algum erro na adição de interesses
            errorChangePass: null,

            // Variável para alterar o estado do botão de enviar
            // se o conteúdo do formulário é válido
            disabledSendNewPass: true,
        }
    },
    methods: {
        // Método para intermediar a mudança de senha
        redirectPassword($event) {
            this.changePassword();

            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },

        // Método para adicionar interesses
        changePassword() {
            // Pegar o parâmetro key da URL
            let uri = this.$route.query.key;

            // Requisição POST para adicionar interesses           
            API.post('/changeMyPass', {
                newPass: this.password, 
                key: uri
            }).then(() => {                
                this.showModalSuccess();                                
            }).catch(error => {
                this.errorChangePass = error.response.data.message;
                this.showModalError();
            });
        },

        // Método que mostra o modal de sucesso na troca da senha
        showModalSuccess () {
            this.$refs.modalSuccess.show()
        },

        // Método para esconder o modal de sucesso na troca da senha
        hideModalSuccess () {
            this.$refs.modalSuccess.hide()
        },

        // Método que mostra o modal de sucesso na troca da senha
        showModalError () {
            this.$refs.modalError.show()
        },

        // Método para esconder o modal de sucesso na troca da senha
        hideModalError () {
            this.$refs.modalError.hide()
        },

        // Método que mostra o modal informando se o hash ainda é válido
        showModalExpiration () {
            this.$refs.modalExpiration.show()
        },

        // Método para esconder o modal informando se o hash ainda é válido
        hideModalExpiration () {
            this.$refs.modalExpiration.hide()
        },

        // Verifica se a senha é válida
        validPassword (password) {
            var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
            return re.test(password);
        },

        // Verifica se a senha de confirmação é a mesma
        validConfirmPassword (confirmPassword, password) {
            if(confirmPassword == password) {
                return true;
            } else {
                return false;
            }
        },

        // Redirecionamento para a página de login
        // quando o hash já expirou
        redirectLogin () {
            this.$router.push('/login');
        },


        // Redirecionamento para a mesma página
        // quando ocorre algum erro na troca da senha
        redirectError () {
            this.$router.go();
        },

        // Redirecionamento para a página de login
        // quando não ocorre erro na troca da senha
        redirectSuccess () {
            this.$router.push('/login');
        },
    },
    
    computed: {
        // Função para determinar o estado do input da senha
        statePassword() {
            return this.validPassword(this.password) ? true : false;
        },

        // Função para determinar o estado do input da confirmação
        // da senha
        stateConfirmPassword() {
            return this.validConfirmPassword(this.confirmPassword, this.password) ? true : false;
        },

        // Função responsável por mostrar a mensagem
        // se o input de senha não é válido
        invalidPassword() {            
            // A senha deve possuir no mínimo tamanho 5, uma letra maiúscula, uma letra minúscula e um número
            // enquanto não for digitado nada, nenhuma mensagem de erro é mostrada
            if(this.password.length == 0){
                return '';
            }else if (this.password.length < 5) {
                return 'O tamanho mínimo da senha é 5'
            } else if(!this.validPassword()) {
                return 'A senha deve possuir no mínimo uma letra maiúscula, uma letra minúscula e um número';
            }     
        },

        // Função responsável por mostrar a mensagem
        // se o input de confirmação de senha não é válido
        invalidConfirmPassword() {
            // Enquanto o usuário não digitar o mínimo de caracteres,
            // não é feita a verificação
            if(this.confirmPassword.length >= 5){
                if (this.validConfirmPassword(this.confirmPassword, this.password)) {
                    // Se chegou nesse ponto da execução, está tudo certo e o
                    // botão de enviar pode ser habilitado
                    this.disabledSendNewPass = false;
                    return '';
                } else {
                    return "Digite a mesma senha";
                }
            }
            return '';
        },
    },
    
    // Função para verificar se o hash vindo não expirou
    created: function () {                
        // Pegar o parâmetro key da URL
        let uri = this.$route.query.key;

        // Requisição GET para verificar o hash 
        // (O APIService.js não é utilizado por problemas com o GET 
        // presente lá, quando se passa parâmetros)
        axios.get('http://localhost:3000/verifyHashChangePass', {
            params: {
                key: uri
            }                
        },
        {'Content-Type': 'application/x-www-form-urlencoded'},)
        .catch(error => {
            this.showModalExpiration();
            this.errorChangePass = error.response.data.message;
        });     
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
</style>

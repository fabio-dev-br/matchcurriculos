<template>
    <section class="pt-1 pb-5">
        <!-- Divisão do login -->
        <div id="login">
            <h3 class="text-center font-weight-bold pt-5 py-3">Login</h3>
            <p class="text-center text-danger" v-if="error">{{ error }}</p>
            <div class="container" id="login-container">
                <div class="row justify-content-center align-items-center" id="login-row">
                    <div class="card">
                        <div class="card-body">
                            <b-form @submit="validate">
                                <!-- E-mail -->
                                <b-form-group>                                    
                                    <b-form-text class="mb-2" for="userEmail"><icon name="envelope"></icon> Seu e-mail</b-form-text>
                                    <b-form-input type="email"
                                        id="userEmail"  
                                        v-model="email"
                                        placeholder="E-mail" required></b-form-input>                         
                                </b-form-group>
                                
                                <!-- Senha -->
                                <b-form-group>
                                    <b-form-text class="mb-2" for="userPassword"><icon name="lock"></icon> Sua senha</b-form-text>
                                    <b-form-input type="password"
                                        id="userPassword" 
                                        v-model="password"
                                        placeholder="Senha" required></b-form-input> 
                                </b-form-group>
    
                                <!-- Lembrar-me (Lembrete: o input checkbox deve vir antes do label, caso contrário, não funciona)-->
                                <!-- <div class="align-items-start d-flex flex-column">
                                    <b-form-checkbox id="loginFormRemember" v-model="remember"
                                        value="remember"
                                        unchecked-value="not_remember">
                                        Lembrar-me
                                    </b-form-checkbox>
                                </div>                         -->
    
                                <!-- Esqueceu a senha -->
                                <div class="d-flex flex-column align-items-center pt-2">                                                                                            
                                    <b-link @click="showModalForgotPass">
                                        Esqueceu a senha?
                                    </b-link>
                                </div>                                                       
    
                                <!-- Botão de login  -->
                                <div class="d-flex flex-column align-items-center mt-2 my-2">
                                    <b-btn class="btn btn-outline-dark my-2" type="submit">
                                        Fazer login
                                    </b-btn>                            
                                </div>
                            </b-form>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para a função esqueci a senha -->
        <b-modal hide-footer
            centered          
            size="lg"
            ref="modalForgotPass">    
            <h5 slot="modal-title">
                <Strong> Recuperação de senha </Strong>
            </h5>

            <b-form @submit="validateForgot">
                <div class="modal-body">
                    <h6>Informe seu e-mail e enviaremos instruções para você redefinir sua senha.</h6>
                    <hr class="separator">
                                        
                    <!-- E-mail -->
                    <b-form-group 
                        id="groupEmailForgot"
                        label="E-mail"
                        label-for="userEmail"
                        :invalid-feedback="invalidForgot"
                        :state="stateForgot">
                        <b-form-input id="emailForgot" 
                            v-model.trim="emailForgot" 
                            :state="stateForgot"
                            required></b-form-input>                         
                    </b-form-group>
                    
                </div>
                <div class="modal-footer mt-2">
                    <b-row align-h="end">
                        <b-btn variant="outline-dark mr-1" @click="hideModalForgotPass">Cancelar</b-btn>
                        <b-btn variant="outline-success mr-1" type="submit">Enviar</b-btn>
                    </b-row>  
                </div>
            </b-form>            
        </b-modal>

        <!-- Modal para informar o usuário da submissão do e-mail na função de esqueci a senha -->
        <b-modal hide-footer
            :centered="true"          
            size="md"
            ref="modalInfoForgot">    
            <h5 slot="modal-title">
                <Strong> Requisição enviada </Strong>
            </h5>
            <div class="modal-body">
                <p>
                    Se o e-mail informado existe na plataforma, você receberá as instruções para a alteração da senha.
                </p>
            </div>            
        </b-modal>
    </section>
</template>

<script>
    // O comentário na linha de baixo desabilita os warnings
/* eslint-disable */

// Imports necessários para fazer a requisição ao servidor
import API from '../../services/ApiService';

export default {
    name: "login",
    data() {
        return {
            // Variável para o e-mail do login
            email: '',

            // Variável para a senha do login
            password: '',

            // Variável para permitir a função de lembrar-me
            remember: false,

            // Variável que recebe o erro do back caso
            // haja algum erro na adição do currículo
            error: null,

            // Variável para controlar a exibição do modal de entrada de
            // informações que levam a recuperação de senha
            modalForgotPass: false,

            // Variável e-mail para a recuperação de senha
            emailForgot: '',

            // Variável para controlar a exibição do modal que
            // é mostrado logo após submeter o e-mail ao back-end
            modalInfoForgot: false
        }
    },
    methods: {
        // Método para intermediar a validação do formulário de login
        validate($event) {
            if(this.isValid) {
                this.login();
            }
            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },

        // Método para intermediar a validação do formulário de esqueci a senha
        validateForgot($event) {
            if(this.stateForgot) {
                this.forgotPass();
            }
            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },

        // Método para fazer o login
        login() {
            // Requisição POST para fazer o login
            API.post('/login2', {
                email: this.email,
                password: this.password
            }).then(response => {
                // Armazena o token recebido do back-end, este que é usado
                // para recuperar as informações presentes no back-end
                this.$store.commit('setAuthToken', response.data.data.token);
                this.$store.commit('setName', response.data.data.nome);
                this.$store.commit('setuserType', response.data.data.user_type);
                // this.$store.commit('setuserType', response.data.data.user_type);

                // Se o usuário é uma empresa (user_type = 0) redireciona para o portal da empresa
                if(response.data.data.user_type == 0) {
                    this.$router.push('/portal-empresa');
                } else {
                    this.$router.push('/portal-pessoa');
                }
            }).catch(error => {
                this.error = error.message;
            });
        },

        forgotPass () {
            // Requisição POST para recuperar a senha
            API.post('/forgotMyPass', {
                email: this.emailForgot
            }).then(response => {                
                // Esconde o modal de esqueci a senha                
                this.hideModalForgotPass();
                
                // Exibe o modal para informar o usuário
                this.showModalInfoForgot();
                
                // Limpa o campo e-mail do formulário do esqueci a senha
                this.emailForgot = '';
            }).catch(error => {
                // Exibe o modal para informar o usuário
                this.hideModalForgotPass();
                this.error = error.response.data.message;
            });
        },

        // Método para exibir o modal de esqueci a senha
        showModalForgotPass () {
            this.$refs.modalForgotPass.show()
        },

        // Método para esconder o modal de esqueci a senha
        hideModalForgotPass () {
            this.$refs.modalForgotPass.hide()
        },

        // Método para exibir o modal de alerta após submeter
        // o e-mail em esqueci a senha
        showModalInfoForgot () {
            this.$refs.modalInfoForgot.show()
        },

        // Método para esconder o modal de alerta após submeter
        // o e-mail em esqueci a senha
        hideModalInfoForgot () {
            this.$refs.modalInfoForgot.hide()
        },

        // Verifica se o e-mail é válido
        validEmail: function (email) {
            var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
            return re.test(email);
        }
    },
    computed: {
        isValid() {
            return this.email && this.password.length > 4;
        },

        // Estado do input e-mail, verifica se é válido
        // o input com uma expressão regular
        stateForgot () {
            return this.validEmail(this.emailForgot) ? true : false;
        },
        
        // Função responsável por mostrar a mensagem
        // se o input do e-mail não é válido
        invalidForgot () {
            if (this.validEmail(this.emailForgot)) {
                return '';
            } else {
                return "Digite um e-mail válido";
            }
        },
    }
};
</script>
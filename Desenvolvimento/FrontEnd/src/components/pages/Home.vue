<template>
    <!-- Seção de boa-vindas na página home -->    
    <section>
        <section class="welcome-section d-flex align-items-center">
            <b-container class="text-center text-dark">
                <h1 class="inicio">Bem-vindo ao Currículo Incit!</h1>  
            </b-container>
        </section>
        <b-container class="p-3">                        
            <!-- Para lembrar: user_type = 0 para empresa e user_type = 1 para pessoa -->
            <!-- Seção contendo os botões de cadastro -->
            <section class="p-3">                        
                <b-row class="text-center">
                    <b-col class="mt-3">
                        <!-- Botão para abrir o modal de cadastro de empresas -->
                        <b-btn variant="outline-dark" size="lg" @click="showModalCompany"> 
                            Cadastrar empresa 
                        </b-btn>
                    </b-col>
                    <b-col class="mt-3">
                        <!-- Botão para abrir o modal de cadastro de pessoas -->
                        <b-btn variant="outline-dark" size="lg" @click="showModalPerson">
                            Cadastrar pessoa
                        </b-btn>
                    </b-col>
                </b-row>                        
            </section>            
        </b-container>

        <!-- Modal do cadastro de empresas -->
        <b-modal class="text-dark w-50 float-left"
            hide-footer
            :centered="true"
            title="Cadastro de Empresas"
            size="lg"
            ref="modalRegCompany">                  
        
            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de empresa, contém: nome, email, cnpj, senha e tipo de usuário(empresa = 0) -->
                <b-form id="companyForm" @submit="redirectRegCompany">
                    <!-- Nome -->
                    <b-form-group 
                        label="Nome *"
                        label-for="companyName">                        
                        <b-form-input id="companyName"                            
                            type="text"                             
                            v-model.trim="formCompany.name"
                            :state="!$v.formCompany.name.$invalid"
                            aria-describedby="inputCompanyNameFeedback"
                            placeholder="Digite o nome da empresa..." required></b-form-input>

                        <b-form-invalid-feedback id="inputCompanyNameFeedback">
                            <p v-if="!$v.formCompany.name.required">
                                Preencha este campo.
                            </p> 
                            <p v-else-if="!$v.formCompany.name.maxLength">
                                O nome pode ter no máximo tamanho 50.
                            </p>                            
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- E-mail -->
                    <b-form-group
                        label="E-mail *"
                        label-for="companyEmail">
                        <b-form-input type="email" 
                            :value="formCompany.email"
                            @change.native="formCompany.email = $event.target.value"
                            :state="!$v.formCompany.email.$invalid"
                            aria-describedby="inputCompanyEmailFeedback"
                            placeholder="nome@dominio.com" required></b-form-input>
                        <b-form-invalid-feedback id="inputCompanyEmailFeedback">
                            <p v-if="!$v.formCompany.email.required">
                                Preencha este campo.
                            </p> 
                            <p v-else-if="!$v.formCompany.email.email">
                                Digite um e-mail válido.
                            </p>
                            <p v-else-if="!$v.formCompany.email.maxLength">
                                O e-mail pode ter no máximo tamanho 50.
                            </p> 
                            <p v-else-if="!$v.formCompany.email.isUnique">
                                Esse e-mail já é utilizado.
                            </p> 
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- CNPJ -->
                    <b-form-group
                        label="CNPJ *"
                        label-for="companyIdentity">
                        <b-form-input type="text"
                            id="companyIdentity"
                            v-model.trim="formCompany.identity"
                            :state="!$v.formCompany.identity.$invalid"
                            aria-describedby="inputCompanyIdentityFeedback"
                            placeholder="XX.XXX.XXX/XXXX-XX"></b-form-input>

                        <b-form-invalid-feedback id="inputCompanyIdentityFeedback">
                            <p v-if="!$v.formCompany.identity.required">
                                Preencha este campo.
                            </p>
                            <p v-else-if="!$v.formCompany.identity.isValid">
                                O CNPJ informado não é válido.
                            </p> 
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Senha -->
                    <b-form-group
                        label="Senha *"
                        label-for="companyPassword">
                        <b-form-input type="password"
                            id="companyPassword"
                            v-model.trim="formCompany.password"
                            :state="!$v.formCompany.password.$invalid"
                            aria-describedby="inputCompanyPasswordFeedback" required></b-form-input>
                        
                        <b-form-invalid-feedback id="inputCompanyPasswordFeedback">
                            <p v-if="!$v.formCompany.password.required">
                                Preencha este campo.
                            </p>
                            <p v-else-if="!$v.formCompany.password.minLength">
                                A senha deve possuir no mínimo tamanho 5.
                            </p> 
                            <p v-else-if="!$v.formCompany.password.isValid">
                                A senha deve possuir no mínimo uma letra maiúscula, uma letra minúscula e um número.
                            </p> 
                        </b-form-invalid-feedback>    
                    </b-form-group>

                    <!-- Modal footer (Quando há o clique no botão enviar 
                         a variável user_type recebe 0 na função de validate) -->
                    <div class="modal-footer">              
                        <b-btn variant="outline-danger" @click="hideModalCompany">Fechar</b-btn>
                        <b-btn :disabled="$v.formCompany.$invalid" variant="outline-success" type="submit">Enviar</b-btn>
                    </div>
                </b-form>
            </div>
        </b-modal>

        <!-- Modal do cadastro de pessoas -->
        <b-modal class="text-dark w-50 float-left"
            hide-footer
            :centered="true"
            title="Cadastro de Pessoas"
            size="lg"
            ref="modalRegPerson">   

            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de pessoa, contém: nome, email, cpf, senha e tipo de usuário(pessoa = 1) -->
                <b-form id="personForm" @submit="redirectRegPerson">                    
                    <!-- Nome -->
                    <b-form-group
                        label="Nome *"
                        label-for="personName">                
                        <b-form-input id="personName"                        
                            type="text"                             
                            v-model.trim="formPerson.name"
                            :state="!$v.formPerson.name.$invalid"
                            aria-describedby="inputPersonNameFeedback"
                            placeholder="Digite o seu nome..." required></b-form-input>
                        <b-form-invalid-feedback id="inputCompanyNameFeedback">
                            <p v-if="!$v.formCompany.name.required">
                                Preencha este campo.
                            </p> 
                            <p v-else-if="!$v.formCompany.name.maxLength">
                                O nome pode ter no máximo tamanho 50.
                            </p>                            
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- E-mail -->
                    <b-form-group
                        label="E-mail *"
                        label-for="personEmail">
                        <b-form-input type="email" 
                            :value="formPerson.email"
                            @change.native="formPerson.email = $event.target.value"
                            ref="personEmail"
                            :state="!$v.formPerson.email.$invalid"
                            aria-describedby="inputPersonEmailFeedback"
                            placeholder="nome@dominio.com" required></b-form-input>
                        <b-form-invalid-feedback id="inputPersonEmailFeedback">
                            <p v-if="!$v.formPerson.email.required">
                                Preencha este campo.
                            </p> 
                            <p v-else-if="!$v.formPerson.email.email">
                                Digite um e-mail válido.
                            </p>
                            <p v-else-if="!$v.formPerson.email.maxLength">
                                O e-mail pode ter no máximo tamanho 50.
                            </p> 
                            <p v-else-if="!$v.formPerson.email.isUnique">
                                Esse e-mail já é utilizado.
                            </p> 
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- CPF -->
                    <b-form-group
                        label="CPF *"
                        label-for="personIdentity">
                        <b-form-input type="text"
                            id="personIdentity"
                            v-model.trim="formPerson.identity"
                            :state="!$v.formPerson.identity.$invalid"
                            aria-describedby="inputPersonIdentityFeedback"
                            placeholder="XXX.XXX.XXX-XX"></b-form-input>

                        <b-form-invalid-feedback id="inputPersonIdentityFeedback">
                            <p v-if="!$v.formPerson.identity.required">
                                Preencha este campo.
                            </p>
                            <p v-else-if="!$v.formPerson.identity.isValid">
                                O CPF informado não é válido.
                            </p> 
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Senha -->
                    <b-form-group
                        label="Senha *"
                        label-for="personPassword">
                        <b-form-input type="password"
                            id="personPassword"
                            v-model.trim="formPerson.password"
                            :state="!$v.formPerson.password.$invalid"
                            aria-describedby="inputPersonPasswordFeedback" required></b-form-input>
                        
                        <b-form-invalid-feedback id="inputPersonPasswordFeedback">
                            <p v-if="!$v.formPerson.password.required">
                                Preencha este campo.
                            </p>
                            <p v-else-if="!$v.formPerson.password.minLength">
                                A senha deve possuir no mínimo tamanho 5.
                            </p> 
                            <p v-else-if="!$v.formPerson.password.isValid">
                                A senha deve possuir no mínimo uma letra maiúscula, uma letra minúscula e um número.
                            </p> 
                        </b-form-invalid-feedback>    
                    </b-form-group>

                    <!-- Modal footer (Quando há o clique no botão enviar 
                         a variável user_type recebe 1 na função de validate) -->
                    <div class="modal-footer">              
                        <b-btn variant="outline-danger" @click="hideModalPerson">Fechar</b-btn>
                        <b-btn :disabled="$v.formPerson.$invalid" variant="outline-success" type="submit">Enviar</b-btn>
                    </div>
                </b-form>
            </div>    
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
                    <h4><strong>Conta cadastrada</strong></h4>
                </b-row>                
            </div>
            
            <!-- Separação título e body -->
            <hr/>

            <!-- Modal body -->
            <b-row align-h="center">
                O cadastro ocorreu com sucesso.
            </b-row>                            
            <b-row class="mt-2" align-h="center">
                <b-button v-if="redirectTo == 'company'" size="md" variant="outline-primary" @click="redirectCompany">
                    Acessar
                </b-button>
                <b-button v-else size="md" variant="outline-primary" @click="redirectPerson">
                    Acessar
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
                <b-col cols="8">{{ error }}</b-col>
            </b-row>                            
            <b-row class="mt-2" align-h="center">
                <b-button size="md" variant="outline-primary" @click="redirectError">
                    Tentar outra vez
                </b-button>
            </b-row>            
        </b-modal>
    </section>
</template>

<script>
    // O comentário na linha de baixo desbilita os warnings
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
    name:"home",
    data () {
        return {
            // Variável para controlar a exibição do modal de sucesso no cadastro
            modalSuccess: false,

            // Variável para controlar a exibição do modal se algum erro aconteceu 
            // no cadastro
            modalError: false,

            // Variável para controlar a exibição do modal de cadastro de empresa
            modalRegCompShow: false,

            // Variável para controlar a exibição do modal de cadastro de pessoa
            modalRegPerShow: false,

            // Todas as variáveis ficam no objeto formCompany 
            // para a validação adequada das informações da
            // empresa, e apenas com tudo certo é possível 
            // fazer o envio
            formCompany: {
                name: '',
                email: '',
                identity: '',
                user_type: '',
                password: '',                
            },
            
            // Todas as variáveis ficam no objeto formPerson 
            // para a validação adequada das informações da 
            // pessoa, e apenas com tudo certo é possível 
            // fazer o envio
            formPerson: {
                name: '',
                email: '',
                identity: '',
                user_type: '',
                password: '',
            },
            
            // Variável para exibir o erro proveniente das requisições
            // ao back-end
            error: null,
            
            // Variável que ajuda no redirecionamento para o modal que estava sendo
            // preenchido quando algum erro ocorre nas requisições (pode assumir valor 'person' ou 'company')
            whereIsError: null,

            // Variável que auxilia no redirecionamento do usuário que acabou 
            // de ser cadastrado, para o portal correto
            redirectTo: null,
        }
    },
    methods: {
        // Método para intermediar o cadastro de empresa
        redirectRegCompany($event) {            
            this.formCompany.user_type = 0;
            this.sendInfoCompany();

            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },

        // Método para intermediar o cadastro de pessoa
        redirectRegPerson($event) {
            this.formPerson.user_type = 1;
            this.sendInfoPerson();

            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },

        // Método para enviar as informações para o cadastro de empresa
        sendInfoCompany() {      
            // Tratamento do CNPJ
            let cnpj = this.formCompany.identity;
            cnpj = cnpj.replace(/[^\d]/g,"");

            // Requisição POST para cadastrar na plataforma              
            API.post('/newAccount', {
                name: this.formCompany.name,
                email: this.formCompany.email,
                identity: cnpj,
                user_type: this.formCompany.user_type,
                password: this.formCompany.password
            }).then(() => {
                // Redireciona para o portal da empresa em caso de sucesso
                this.redirectTo = 'company';
                this.showModalSuccess();                
            }).catch(error => {
                this.error = error.response.data.message;
                this.whereIsError = 'company';
                this.showModalError();
            }); 
        },

        // Método para enviar as informações para o cadastro de pessoa
        sendInfoPerson() {      
            // Tratamento do CPF
            let cpf = this.formPerson.identity;
            cpf = cpf.replace(/[^\d]/g,"");
            
            // Requisição POST para cadastrar na plataforma              
            API.post('/newAccount', {
                name: this.formPerson.name,
                email: this.formPerson.email,
                identity: cpf,
                user_type: this.formPerson.user_type,
                password: this.formPerson.password
            }).then(() => {
                // Redireciona para o login em caso de sucesso
                this.redirectTo = 'person';
                this.showModalSuccess();
            }).catch(error => {
                this.error = error.response.data.message;
                this.whereIsError = 'person';
                this.showModalError();
            }); 
        },

        // Método que mostra o modal de cadastro de empresa
        showModalCompany () {
            this.$refs.modalRegCompany.show();
        },

        // Método que esconde o modal de cadastro de empresa
        hideModalCompany () {
            this.$refs.modalRegCompany.hide();
        },

        // Método que mostra o modal de cadastro de pessoa
        showModalPerson () {
            this.$refs.modalRegPerson.show();
        },
        
        // Método que esconde o modal de cadastro de pessoa
        hideModalPerson () {
            this.$refs.modalRegPerson.hide();
        },
        
        // Método que mostra o modal de sucesso no cadastro
        showModalSuccess () {
            this.$refs.modalSuccess.show();
        },

        // Método que esconde o modal de sucesso no cadastro
        hideModalSuccess () {
            this.$refs.modalSuccess.hide();
        },

        // Método que mostra o modal de erro no cadastro
        showModalError () {
            this.$refs.modalError.show();
        },

        // Método que esconde o modal de erro no cadastro
        hideModalError () {
            this.$refs.modalError.hide();
        },

        // Redirecionamento para a mesma página
        // quando ocorre algum erro no cadastro de empresa ou pessoa
        redirectError() {
            if(this.whereIsError == 'person') {
                this.showModalPerson();
            } else {
                this.showModalCompany();
            }

            // Limpa a variável por precaução
            this.whereIsError = null;
        },
        

        // Redirecionamento para portal de empresa
        // quando ocorre o cadastro corretamente
        redirectCompany () {
            // Requisição POST para fazer o login
            API.post('/login2', {
                email: this.formCompany.email,
                password: this.formCompany.password
            }).then(response => {
                // Armazena o token recebido do back-end, este que é usado
                // para recuperar as informações presentes no back-end
                this.$store.commit('setAuthToken', response.data.data.token);
                // Redireciona para o portal de empresa
                this.$router.push('/portal-empresa');
            }).catch(error => {
                this.error = error.response.data.message;
            });
        },

        // Redirecionamento para portal de pessoa
        // quando ocorre o cadastro corretamente
        redirectPerson () {
            // Requisição POST para fazer o login
            API.post('/login2', {
                email: this.formPerson.email,
                password: this.formPerson.password
            }).then(response => {
                // Armazena o token recebido do back-end, este que é usado
                // para recuperar as informações presentes no back-end
                this.$store.commit('setAuthToken', response.data.data.token);                
                // Redireciona para o portal de pessoa
                this.$router.push('/portal-pessoa');
            }).catch(error => {
                this.error = error.response.data.message;
            });
        },

    },

    // Validações, para os forms existentes, feitas com o auxílio do Vuelidate
    validations: {
        // Validação do formulário de registro de empresa
        formCompany: {
            name: {                
                required,
                maxLength: maxLength(50)
            },
            email: {
                required,
                email,
                maxLength: maxLength(50),

                // Função de validação para verificar se o e-mail
                // já está cadastrado em alguma conta
                isUnique(value) {
                    // Em funções próprias é bom, para quando não tiver
                    // nada no input retornar true
                    if(value === '') return true;

                    return  API.post('/isEmailUnique',{
                                email: value
                            }).then(response => {
                                console.log(response);
                                return true;
                            }).catch(() => {
                                return false
                            });                    
                },
            },
            identity: {
                required,

                // Função que verifica se o CNPJ informado é válido
                isValid(value) {
                    // Em funções próprias é bom, para quando não tiver
                    // nada no input retornar true
                    if(value === '') return true;
                    
                    var cnpj = value;
                    
                    // Vetor contendo os multiplicadores para o 
                    // cálculo dos dígitos verificadores
                    var multi = [6,5,4,3,2,9,8,7,6,5,4,3,2];
                    
                    // Retira qualquer caracter especial do valor proveniente
                    if((cnpj = cnpj.replace(/[^\d]/g,"")).length != 14)
                        return false;

                    // Verifica se só existem 0 nos 14 dígitos
                    if(/0{14}/.test(cnpj))                        
                        return false;

                    // Cálcula 1º dígito verificador
                    for (var i = 0, n = 0; i < 12; n += cnpj[i] * multi[++i]);
                    if(cnpj[12] != (((n %= 11) < 2) ? 0 : 11 - n))
                        return false;
                    
                    // Cálcula 2º dígito verificador
                    for (var i = 0, n = 0; i <= 12; n += cnpj[i] * multi[i++]);
                    if(cnpj[13] != (((n %= 11) < 2) ? 0 : 11 - n))
                        return false;

                    return true;
                }
                
            },
            password: {
                required,
                minLength: minLength (5),
                isValid(value) {
                    // Em funções próprias é bom, para quando não tiver
                    // nada no input retornar true
                    if(value === '') return true;
                    
                    // Verifica se a senha possui pelo menos uma letra maiúscula, uma letra minúscula e um número.
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/.test(value);
                }
            }
        },

        // Validação do formulário de registro de pessoa
        formPerson: {
            name: {                
                required,
                maxLength: maxLength(50)
            },
            email: {
                required,
                email,
                maxLength: maxLength(50),

                // Função de validação para verificar se o e-mail
                // já está cadastrado em alguma conta
                isUnique(value) {
                    // Em funções próprias é bom, para quando não tiver
                    // nada no input retornar true
                    if(value === '') return true;

                    return  API.post('/isEmailUnique',{
                                email: value
                            }).then(response => {
                                console.log(response);
                                return true;
                            }).catch(() => {
                                return false
                            });                    
                },
            },
            identity: {
                required,

                // Função que verifica se o CPF informado é válido
                isValid(value) {  
                    // Em funções próprias é bom, para quando não tiver
                    // nada no input retornar true
                    if(value === '') return true;
                    
                    var cpf = value;
                    
                    // Retira qualquer caracter especial do valor proveniente
                    // e verifica se o tamanho é 11
                    if((cpf = cpf.replace(/[^\d]/g,"")).length != 11)
                        return false;
                    
                    // Verifica se só existem 0 nos 11 dígitos
                    if(/0{11}/.test(cpf))                        
                        return false;
                        
                    var r;
                    var s = 0;   
                    
                    // Cálcula 1º dígito verificador
                    for (var i = 1, s = 0; i <= 9; s += parseInt(cpf[i-1]) * (11 - i++));

                    r = (s * 10) % 11;
                    if ((r == 10) || (r == 11)) 
                        r = 0;

                    if (r != parseInt(cpf[9]))
                        return false;

                    // Cálcula 2º dígito verificador                   
                    for (var i = 1, s = 0; i <= 10; s += parseInt(cpf[i-1]) * (12 - i++));

                    r = (s * 10) % 11;
                    if ((r == 10) || (r == 11)) 
                        r = 0;

                    if (r != parseInt(cpf[10]))
                        return false;

                    return true;   
                }          
            },
            password: {
                required,
                minLength: minLength (5),
                isValid(value) {
                    // Em funções próprias é bom, para quando não tiver
                    // nada no input retornar true
                    if(value === '') return true;
                    
                    // Verifica se a senha possui pelo menos uma letra maiúscula, uma letra minúscula e um número.
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/.test(value);
                }
            }
        },
    },
}

</script>

<style>

.welcome-section {
    /* background-color: rgba(17, 0, 255, 0.336); */
    /* background-image:url("curriculo-incit/public/imagens/inicial.jpg"); */
    background-image: url("/imagens/fundo.jpg");
    background-repeat: repeat-x;
    opacity: 0.7;
    filter: alpha(opacity=70); /* For IE8 and earlier */
}
.inicio {
    
    color: rgb(255, 255, 255);
    text-shadow: 3px 2px rgb(0, 0, 0);
    text-align: center;
    font-size: 400%;
    
}
  
.welcome-section {
    min-height: 100px;
}
  
@media (min-width: 576px) {
    .welcome-section {
        min-height: 400px;
    }
}
  
@media (min-width: 768px) {
    .welcome-section {
        min-height: 550px;
    }
}

form :invalid {
    background: rgba(255, 0, 0, 0.171);
}
</style>

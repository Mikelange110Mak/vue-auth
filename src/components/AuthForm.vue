<template>
  <div class="forms carousel slide" id="carouselExampleSlidesOnly">
           <div class="carousel-inner">
              <div class="forms__auth carousel-item active"
              v-bind:class="{'active': activeTab === 'register'}">

                 <div class="authForm form"
                 v-bind:class="{'backlight':addBacklight&&activeTab==='auth'}">
                    <div class="authForm__container form__container">
                       <div class="authForm__title form__title">Welcome</div>
                       <div class="authForm__inputGroup form__inputGroup">
                          <div class="authForm__inputCnt form__inputCnt">
                             <input v-model="authUsernameInput" type="text" class="authForm__input form__input inputLogin" id="authLoginInput"
                                placeholder="Login">
                          </div>
                          <div class="authForm__inputCnt form__inputCnt">
                             <input v-model="authPasswordInput" type="password" class="authForm__input form__input inputPassword"
                                id="authPasswordInput" placeholder="Password">
                          </div>
                       </div>
                       <div class="authForm__GoBtn form__GoBtn d-grid gap-2">
                          <button class="authForm__GoBtn-item form__GoBtn-item btn btn-primary" type="button"
                          v-on:click="submitFormAuth">Go</button>
                       </div>
                       <div class="authForm__toReg form__toReg d-grid gap-2 col-6 mx-auto">
                          <span class="authForm__toReg-title form__toReg-title">Don't have an account?</span>
                          <button class="authForm__toReg-btn form__toReg-btn btn btn-outline-secondary" type="button"
                             v-on:click="switchToRegister">Register</button>
                       </div>
                    </div>
                 </div>

              </div>
              <div class="forms__register carousel-item"
              v-bind:class="{'active': activeTab === 'register'}">

                 <div class="registerForm form"
                 v-bind:class="{'backlight':addBacklight&&activeTab==='register'}">
                    <div class="registerForm__container form__container">
                       <div class="registerForm__title form__title">Registration</div>
                       <div class="registerForm__inputGroup form__inputGroup">
                          <div class="registerForm__inputCnt form__inputCnt">
                             <input v-model="registerUsernameInput" type="text" class="registerForm__input form__input inputLogin" id="registerLoginInput"
                                placeholder="Login">
                          </div>
                          <div class="registerForm__inputCnt form__inputCnt">
                             <input v-model="registerPasswordInput" type="password" class="registerForm__input form__input inputPassword"
                                id="registerPasswordInput" placeholder="Password">
                          </div>
                       </div>
                       <div class="registerForm__GoBtn form__GoBtn d-grid gap-2">
                          <button class="registerForm__GoBtn-item form__GoBtn-item btn btn-primary" type="button"
                          v-on:click="submitFormRegister">Register</button>
                       </div>
                       <div class="registerForm__toReg form__toReg d-grid gap-2 col-6 mx-auto">
                          <span class="registerForm__toReg-title form__toReg-title">Already have an account</span>
                          <button class="registerForm__toReg-btn form__toReg-btn btn btn-outline-secondary" type="button"
                          v-on:click="switchToAuth"
                             >Login</button>
                       </div>
                    </div>
                 </div>

              </div>

           </div>
        </div>
  </template>

<script>
export default {
/* eslint-disable */
 data () {
   return {
     activeTab: 'auth',
     addBacklight: false,
     authUsernameInput: '',
     authPasswordInput: '',
     registerUsernameInput: '',
     registerPasswordInput: ''
   }
 },
 methods: {
   switchToRegister () {
     this.activeTab = 'register'
     this.addBacklight = true
     setTimeout(() => {
       this.addBacklight = false
     }, 400)
   },
   switchToAuth () {
     this.activeTab = 'auth'
     this.addBacklight = true
     setTimeout(() => {
       this.addBacklight = false
     }, 400)
   },

   submitFormAuth () {
     const data = this.fieldsData()
     console.log(data)
     this.login(data)
   },
   submitFormRegister(){
      const data = this.fieldsData()
     console.log(data)
     this.registration(data)
   },

   fieldsData () {
     let data
     if (this.activeTab === 'auth') {
       data = {
         username: this.authUsernameInput,
         password: this.authPasswordInput
       }
     } else if (this.activeTab === 'register') {
       data = {
         username: this.registerUsernameInput,
         password: this.registerPasswordInput
       }
     }
     return data
   },
   async login(data){
      try {
         const response = await this.$axios.post('login', data);
         const token = response?.data?.token
         localStorage.setItem('token', token) 
         if(response) console.log(response);
         else console.log('((()))');
         if(response)this.$router.push('/account') 
         
      } catch (error) {
         console.log(error.response.data.message||error.response.data[0]);
         this.$emit('errorOccurred', error.response.data.message||error.response.data[0])
      }
     
   },
   async registration(data){
      try {
         const response = await this.$axios.post('registration', data);      
         console.log(response.data);
      } catch (error) {
         console.log(error.response.data.message||error.response.data[0]);
      }
     
   }
 }

}
</script>

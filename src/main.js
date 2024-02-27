import { createApp } from 'vue'
import App from './App.vue'
import AuthForm from './components/AuthForm.vue'
import TheHeader from './components/TheHeader.vue'
import AccountPage from './components/AccountPage.vue'
import axios from 'axios'
import './main.css'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:5000/auth/'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})


app.config.globalProperties.$axios = axios
app.use(router)
app.component('the-header', TheHeader)
app.component('auth-form', AuthForm)
app.component('account-page', AccountPage)

app.mount('#app')

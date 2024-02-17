import { createRouter, createWebHistory } from "vue-router";
import AccountPage from './components/AccountPage'
import AuthForm from './components/AuthForm.vue'

export default createRouter({
   history: createWebHistory('/'),
   routes: [
      { path: '/login', component: AuthForm, alias: '/' },
      { path: '/account', component: AccountPage }
   ]
})
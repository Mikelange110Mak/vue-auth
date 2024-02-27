import { createRouter, createWebHistory } from "vue-router";
import AccountPage from './components/AccountPage'
import AuthForm from './components/AuthForm.vue'
import AdminPage from './components/AdminPage'

export default createRouter({
   history: createWebHistory('/'),
   routes: [
      { path: '/login', component: AuthForm, alias: '/' },
      { path: '/account', component: AccountPage },
      { path: '/admin', component: AdminPage }
   ]
})
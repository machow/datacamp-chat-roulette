import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from './firebase'

var app
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})

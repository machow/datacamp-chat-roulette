import Vue from 'vue'
import firebase from 'firebase'
import VueFire from 'vuefire'

Vue.use(VueFire)

var config = {
  apiKey: "AIzaSyDgP8OlA1GH_6mf60tDR9F9PtnH4aJ0O4Y",
  authDomain: "datacamp-chat-roulette.firebaseapp.com",
  databaseURL: "https://datacamp-chat-roulette.firebaseio.com",
  projectId: "datacamp-chat-roulette",
  storageBucket: "datacamp-chat-roulette.appspot.com",
  messagingSenderId: "740622074330"
};

firebase.initializeApp(config)

export default firebase

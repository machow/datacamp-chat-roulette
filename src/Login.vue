<template>
  <div class="hello">
    <h3 v-if="user">Welcome, {{user.email}}</h3>
    <h3 v-else>Sign In</h3>
    <button @click="signInWithGoogle">Sign in with Google</button>
    <button v-if="user" @click="signOut">logout</button>
    <br><br>
    (Note: requires a datacamp.com email)
  </div>
</template>

<script>
import firebase from './firebase'

export default {
  name: 'Login',
  data () {
    return {
      user: firebase.auth().currentUser
    }
  },
  methods: {
    signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.user = result.user
        const usersdb = firebase.database().ref(`users/${this.user.uid}`)
        usersdb.once("value", snapshot => {
          const data = snapshot.val()
          if (!data) {
            usersdb.set({name: this.user.displayName, active: true, image: this.user.photoURL})
          }
        })
      }).catch(err => console.log(err))
    },
    signOut () {
      firebase.auth().signOut().then(() => {
        this.user = null
      }).catch(err => console.log(err))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login {
  margin-top: 40px;
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}

p {
  margin-top: 20px;
  font-size: 13px;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}

</style>


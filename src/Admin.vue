<template>
  <div class="admin">
    <table>
      <tr v-for="user in users">
        <td>{{user['.key']}}</td>
        <td>{{user.name}}</td>
        <td>{{user.isActive}}</td>
        <td><button @click="makeCzar(user)">make czar</button></td>
        <td><button @click="updateUser(user, 'active', false)">deactivate</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebase from './firebase'

export default {
  name: 'Admin',
  firebase: {
    users: firebase.database().ref(`users`)
  },
  methods: {
    updateUser (user, attr, evt) {
      this.$firebaseRefs.users.child(`${user['.key']}/${attr}`).set(evt)
    },
    makeCzar (user) {
      firebase.database().ref('board/czar').set(user['.key'])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>




<template>
  <div class="profile">
    <input type="text" @input="updateUser('name', $event)" :value="user.name" placeholder="your name">
    active: <input type="checkbox" @input="updateUser('active', {target: {value: $event.target.checked}})" :checked="user.active">

    <br><br>
    <h3>Upload Image</h3>
    <ImageUpload :dstPath="user['.key']" v-on:url="(url) => onUrlUpdate(url)"></ImageUpload>
  </div>
</template>

<script>
import firebase from './firebase'
import ImageUpload from './ImageUpload.vue'

export default {
  name: 'Profile',
  components: {ImageUpload},
  props: ['handle'],
  computed: {
    userImages () {
      return `images/${this.user['.key']}`
    }
  },
  created () {
      console.log(firebase.auth().currentUser)
    const {uid} = firebase.auth().currentUser
    this.$bindAsObject('user', firebase.database().ref(`users/${uid}`))
  },
  methods: {
    updateUser (attr, evt) {
      console.log(firebase.auth().currentUser)
      this.$firebaseRefs.user.child(attr).set(evt.target.value)
    },
    onUrlUpdate (url) {
      this.updateUser('image', {target: {value: url}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>



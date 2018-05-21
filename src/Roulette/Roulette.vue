<template>
  <div id="app">
    <h1>{{youAreCzar ? "You Are DataCzar" : "Chat Time Y'all"}}</h1>
    <svg class="container-wheel" ref="svgCanvas">
      <RouletteWheel v-for="wheel in wheels"
              :angle="wheel.angle"
              :radius="wheel.radius" 
              :center="wheel.center" 
              :people="usersForWheel(wheel)"
              :getCanvas="() => $refs.svgCanvas"
              :disabled="!youAreCzar"
              :onUpdateAngle="angleSetter(wheel['.key'])"></RouletteWheel>
    </svg>
    <br>
    <button @click="shuffleUsers" :disabled="!youAreCzar">shuffle</button>
    <button @click="abdicateCzarship" :disabled="!youAreCzar">abdicate</button><br><br>
    <span v-if="wildcardUser">wildcard: {{wildcardUser.name}}</span>
  </div>
</template>

<script>
import RouletteWheel from './RouletteWheel.vue';
import firebase from '../firebase';
import _ from 'lodash';

export default {
  name: 'app',
  components: {RouletteWheel},
  computed: {
    youAreCzar () {
      return this.board.czar == firebase.auth().currentUser.uid
    },
    wildcardUser () {
      return this.activeUsers[this.board.wildcard]
    }
  },
  firebase: {
    wheels: firebase.database().ref('wheels'),
    activeUsers: {
      source: firebase.database().ref('users').orderByChild('active').equalTo(true),
      asObject: true
    },
    board: {
      source: firebase.database().ref('board'),
      asObject: true
    },
  },
  methods: {
    angleSetter (key) {
      return (angle) => {
        this.$firebaseRefs.wheels.child(`${key}/angle`).set(angle)
      }
    },
    getElOffset () {
      this.$refs.svgCanvas
    },
    usersForWheel (wheel) {
      return _.values(wheel.users)
                  .map(v => Object.assign(
                    {}, this.activeUsers[v], {isCzar: v == this.board.czar}
                    ))
                  .filter(v => v)
    },
    shuffleUsers () {
      const noKey = _.keys(this.activeUsers).filter(v => v != '.key')
      const shuffled = _.shuffle(noKey)    

      const n = _.size(shuffled)
      const wildcard = (n % 2) ? shuffled.splice(-1)[0] : null

      const updates = {
        '/wheels/0/users': shuffled.slice(0, n / 2),
        '/wheels/1/users': shuffled.slice(n / 2),
        '/board/wildcard': wildcard
      }
      
      firebase.database().ref().update(updates)
    },
    abdicateCzarship () {
      const newCzar = _.sample(_.keys(this.activeUsers).filter(v => v != '.key'))

      this.$firebaseRefs.board.child('czar').set(newCzar)
    }
  }
}
</script>

<style>
</style>

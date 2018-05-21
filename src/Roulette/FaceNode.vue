<template>
  <g>
    <circle :cx="coords.x" :cy="coords.y" :r="r" :fill="person.isCzar ? 'red': 'black'"></circle>
    <image v-if="person.image" :xlink:href="person.image" 
           :x="coords.x" :y="coords.y" height="50px" :transform="`translate(${-r/2}, ${-r/2 - 10})`"/>
    <text :x="coords.x" :y="coords.y + r + 12" style="fill: black; text-anchor: middle;">{{person.name}}</text>
  </g>
</template>

<script>
import {polarToCart} from '../utils';
export default {
  name: 'FaceNode',
  props: {'r': Number, 'radius': Number, 'angle': Number, 'person': { type: Object, default: () => ({})}},
  computed: {
    coords () {
      return polarToCart(this.angle, this.radius)
    },
    textY () {
      return this.coords.y + this.r + 10
    }
  }
}
</script>

<style>
</style>

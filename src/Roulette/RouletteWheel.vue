<template>
    <g :transform="`translate(${center.x}, ${center.y})`">
      <face-node  v-for="(person, index) in people" :key="person.name"
                  :r="40" :radius="radius" :angle="angle + angleOffsets[index]"
                  :person="person"
                  @mousedown.native="mouseDownNode"></face-node>
      <face-node :r="10" :radius="0" :angle="0" @click.native="clickNode"></face-node>
    </g>
</template>

<script>
import _ from 'lodash';
import {physics, pointer} from 'popmotion';
import {getOffset, cartToAngle} from '../utils';

import FaceNode from './FaceNode.vue';

export default {
  name: 'Wheel',
  components: {FaceNode},
  props: ['angle', 'radius', 'center', 'locked', 'disabled', 'onUpdateAngle', 'getCanvas', 'people'],
  data () {
    return {
    }
  },
  computed: {
    angleOffsets () {
      const tau = 2*Math.PI
      const ttl = this.people.length
      return this.people.map((v, ii) => tau*ii / ttl)
    }
  },
  methods: {
    mouseDownNode ({target}) {
      if (this.disabled) return null;

      const el = this.getCanvas()
      const action = physics({
            velocity: 0,
            friction: 0.02,
            springStrength: 1,
            from: this.angle,
            restSpeed: false
          })
	  if (this.crntAction) this.crntAction.stop()
      this.crntAction = action.start(this.onUpdateAngle)
      
      // move wheel toward pointer
      const crntPointer = pointer().start((xy) => {
        const cx = parseFloat(target.getAttribute('cx') || target.getAttribute('x'))
        const cy = parseFloat(target.getAttribute('cy') || target.getAttribute('y'))
		const nodeAngle = cartToAngle(cx, cy)

        const offset = getOffset(el, this.center)
        const delta = this.getAngleDelta(xy, offset, nodeAngle)
		this.crntAction.setSpringTarget(this.angle + delta)
      })
      
      // remove events on mouseup
      document.addEventListener('mouseup', (evt) => {
        	this.crntAction.setSpringStrength(0)
	        crntPointer.stop()
      	}, 
        {once: true}
      )
    },
    getAngleDelta ({x,y}, offset, nodeAngle) {
  	    const relXY = {x: x - offset.x, y: y - offset.y}
  
        const angleDelta = (cartToAngle(relXY.x, relXY.y) - nodeAngle) % (2*Math.PI)

        return Math.abs(angleDelta) > Math.PI ? 
         	     -Math.sign(angleDelta)*Math.abs(Math.abs(angleDelta) - 2*Math.PI)
                 : angleDelta
    }
  }
}
</script>

<style>
.container-wheel {
  border: 1px solid black;
  width: 800px;
  height: 800px;
}
</style>

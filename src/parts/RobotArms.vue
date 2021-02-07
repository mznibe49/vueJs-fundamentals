<template>
  <div>
    <h2>Arms</h2>
    The arms are how your robot will interact with the world.
    They come in a variety of shapes and functions.
    <div v-for="(arm, idx) in parts.arms" :key="idx">
      <h4>{{arm.title}}</h4>
      <div>{{arm.description}}</div>
    </div>
  </div>
</template>

<script>
//import parts from '../data/parts';
import getPartsMixin from './get-parts-mixin';

export default {
  name: 'RobotArms',
  // when we use the mixins syntax it means that we are adding all the element in getPartsMixin that we imported
  // that way we can share a component element between other components :)
  // in this exemple all the component RobotX.vue will share the same mixin
  mixins: [getPartsMixin],
  
  // sice we are providing data from the store using axion librairie to activate GET http methode we don t need date()
  /*data() {
    return { arms: parts.arms };
  },*/
};
</script>
<template>
  <div>
    <h1>{{part.title}}</h1>
    <div>{{part.description}}</div>
  </div>
</template>

<script>
//import getPartsMixin from './get-parts-mixin';

//import parts from '../data/parts';
import getPartsMixin from './get-parts-mixin';

export default {
  name: 'PartInfo',
  mixins: [getPartsMixin],

  // we add props: to send data as properties from component to another instead of passing data from a link
  // props: ['partType', 'id'],

  // to add validation to these properties we will use the object syntax
  props: {
      partType: {type: String},
      id: {
          type: [Number, String],
          validator(value){
              return Number.isInteger(Number(value));
          }
      }
  },
  computed: {
      part(){
        //const partType = this.$route.params.partType;
        //const id = this.$route.params.id;
        //const { partType, id } = this.$route.params;
         
        // to send data as param and not by link we change our variable to this =>
        const { partType, id } = this;
        console.log(this.parts);

        // "+" before id is used to convert from a String into a Number
        return this.parts[partType].find(part => part.id === +id);
      }
      
  },
  /*data() {
      return {
          part: {
              title: 'Part Title',
              description: 'Part Description'
          }
      }
  }*/
  //mixins: [getPartsMixin],
  /*props: {
    partType: { type: String },
    id: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },
  computed: {
    part() {
      const { partType, id } = this;
      return this.parts[partType].find(part => part.id === +id);
    },
  },*/
};
</script>

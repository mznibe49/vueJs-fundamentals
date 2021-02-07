<template>
  <div class="part" :class="position">
    <!-- in this image we will inject a router (link to another page) -->
    <img @click="showPartInfo()" :src="selectedPart.src" title="arm" />
    <button @click="selectPreviousPart()" class="prev-selector"></button>
    <button @click="selectNextPart()" class="next-selector"></button>
    <span class="sale" v-show="selectedPart.onSale">Sale!</span>
  </div>
</template>

<script>
//import availableParts from '../data/parts';

//const parts = availableParts.heads;

function getPreviousValidIndex(index, length) {
  const deprecatedIndex = index - 1;
  return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
}

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

export default {

  // variable that will be injected from the parents
  // parents will inject it that way <PartSelector :parts="availablePars.xxx"> or parts="blabla" if it s hard coded

  // props: ['parts','position'],
  // to verify the type of the sent element we use the syntax below instead of the one before
  props: {
    parts: {type: Array , required: true},
    position: {type: String, required: true},
    // validator helps us to make sure that the sent value wich represent position is one of these values
    validator: function(value) {
        return ['left','right','top','bottom','center'].includes(value);
    }
  },
  // this function is similar to Init() function in angular, launched when the component is created
  // first life cycle hook function 
  created(){
      // we call this function also here so the variable on the selected part are updated in the creation of the component to
    this.emitSelectedPart();
  },
  // since updating every varible call the "updated method" in the life cycle hook, we can simply
  // call "this.emitSelectedPart()" in "updated" instead of calling it tree times in different places (created, selectNextPart, selectPrevPart)
  updated(){
    this.emitSelectedPart();
  },
  data() {
      // default selected part Index is 0
    return { selectedPartIndex: 0 };
  },
  computed: {
    selectedPart() {
      return this.parts[this.selectedPartIndex];
    },
  },
  methods: {
    emitSelectedPart(){
      this.$emit('partSelected', this.selectedPart);
    },
    selectNextPart() {
      this.selectedPartIndex = getNextValidIndex(
        this.selectedPartIndex,
        this.parts.length,
      );
      //this.emitSelectedPart();
    },
    selectPreviousPart() {
      this.selectedPartIndex = getPreviousValidIndex(
        this.selectedPartIndex,
        this.parts.length,
      );
      //this.emitSelectedPart();
    },
    // here we will be injecting a router
    showPartInfo(){
      // if no arguments are needed we use the string syntax
      this.$router.push('/parts');
      // if arguments are needed we use the object syntax
      this.$router.push({ 
        name: 'Parts', 
        params: {
          id: this.selectedPart.id,
          partType: this.selectedPart.type
        }
      });
    }
  },
};

</script>

<style scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.sale {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  background-color: red;
  padding: 3px;
}
.part-title {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: red;
  padding-top: 5px;
  top: -25px;
}
.part img {
  width:165px;
  cursor: pointer; /* to change to cursos when ever we over hover the image */
}
.top {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.bottom {
  border-top: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.left .prev-selector:after,  .right .prev-selector:after{
  content: '\25B2'
}
.left .next-selector:after, .right .next-selector:after {
  content: '\25BC'
}
.top .prev-selector:after, .bottom .prev-selector:after, .center .prev-selector:after{
  content: '\25C4'
}
.top .next-selector:after, .bottom .next-selector:after, .center .next-selector:after{
  content: '\25BA'
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.highlight {
  border: 1px solid red;
}
</style>
<template>
  <div v-if="availableParts" class="content"> 

    <div class="preview">

      <CollapsibleSection>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src"/>
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left"/>
            <img :src="selectedRobot.torso.src"/>
            <img :src="selectedRobot.rightArm.src" class="rotate-right"/>
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.src"/>
          </div>
        </div>
      </CollapsibleSection>

      <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    </div>

    <div class="top-row">

      <!-- here we are adding a conditional styling using computed method ! -->
      <!-- <div class="top part" :style="headBorderStyle"> -->

      <!-- here we are adding a conditional styling using css style condition ! -->
      
      <!-- <div class="top part" :class="{'sale-border': selectedRobot.head.onSale}"> 


        <div class="robot-name"> -->
          <!-- interpolation -->
          <!-- add v-once // if you want to make the changement only one time -->
          <!--  exemple : <div v-once class="robot-name"> -->

          <!-- {{selectedRobot.head.title}}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
        </div> -->

        <!-- short syntax of "v-bind:"  is ":" // short syntax of "v-click" is "@" -->
        <!-- @partSelected="part => selectedRobot.head = part"
            this means that the parent will receive data from child with variable name *partSelected*
            on each click this event is activated 
            "part => selectedRobot.head = part"  ==> means that, we creat a function that will fill selectedRobot.head
            we could have done this by creating a new func, but since it is a single line, we rather doing it this way -->

          <PartSelector :parts="availableParts.heads" position="top" @partSelected="part => selectedRobot.head = part"/>

      <!-- </div> -->
    </div>
    <div class="middle-row">
      <!-- the biding of position is without ":" cuz we are sending a hard coded string and not a variable -->
      <PartSelector :parts="availableParts.arms" position="left" @partSelected="part => selectedRobot.leftArm = part"/>
      <PartSelector :parts="availableParts.torsos" position="center" @partSelected="part => selectedRobot.torso = part"/>
      <PartSelector :parts="availableParts.arms" position="right" @partSelected="part => selectedRobot.rightArm = part"/>
    </div>
    <div class="bottom-row">
      <PartSelector :parts="availableParts.bases" position="bottom" @partSelected="part => selectedRobot.base = part"/>
    </div>
    <!-- <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class ="cost">Cost</th>
          </tr>
        </thead>
        <tbody> -->
          <!-- here we are doing a v-binding of the key to the index -->
          <!-- never use v-if and v-for in the same balise -->
          <!-- <tr v-for="(robot, index) in cart" :key="index">
            <td>{{robot.head.title}}</td>
            <td class="cost">{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>


<script>
//import availableParts from '../data/parts.js';
// this is a child component
import PartSelector from './PartSelector.vue'
import CollapsibleSection from '../shared/CollapsibleSection.vue'



export default {
    name: 'RobotBuilder',
    // WE NEED TO DISPATCH THE ACTION OF GETTING INFO FROM THE OTHER SERVER IN THE CREATION OF THE COMPONENT
    created() {
      this.$store.dispatch('getParts'); // asyncronous operation
    },

    // in the component the routing guards functions name is (beforeRouteLeave, beforeRouteEnter)
    // if we want to implement them in the routing side (index.js) their name would be (BeforeLeave, BeforeEnter)
    beforeRouteLeave(to, from, next){
      if(this.addedToCart){
        next(true);

      } else {
          // put dialog to confirm
          /* eslint no-alert: 0 */
          /* eslint no-restricted-globals: 0 */
          const response = confirm('You have not added yout robot to you cart, are you sure you to leave ?');
          next(response);
      }
    },
    // all child component has to be declared in this array
    components: {PartSelector, CollapsibleSection},
    data(){
        return {
            addedToCart: false,
            //availableParts,
            cart: [],
            selectedRobot: {
                head:     {}, //availableParts.heads[this.selectHeadIndex],
                leftArm:  {}, //availableParts.arms[this.selectLeftArmIndex],
                rightArm: {}, //availableParts.arms[this.selectRightArmIndex],
                torso:    {}, //availableParts.torsos[this.selectTorsosIndex],
                base:     {}, //availableParts.bases[this.selectBaseIndex]
            }
        }
    }
    ,
    computed: {
        availableParts(){
          return this.$store.state.robots.parts;
        },
        // Conditional styling !
        headBorderStyle(){
          return {
            border: this.selectedRobot.head.onSale ?
              '3px solid red' :
              '3px solid gray',
          };
        },
    },
    methods: {
        addToCart(){
          const robot = this.selectedRobot;
          const cost = robot.head.cost + 
                       robot.leftArm.cost + 
                       robot.rightArm.cost + 
                       robot.torso.cost + 
                       robot.base.cost;
          
          //this.cart.push(Object.assign({}, robot, {cost}));
          // instead of pushing a robot into a local variable as we did before.. we will add it into the store (vuex)
          // the commit function has 2 params, the name of the function in the mutation and the data
          //this.$store.commit('addRobotToCart', Object.assign({}, robot, {cost}));

          //since at this step we wanna use actions to dipatch information into the server we will use dispatch func instead of commit
          this.$store.dispatch('addRobotToCart', Object.assign({}, robot, {cost}))
          .then( () => this.$router.push('/cart'));

          
          this.addedToCart = true;
        }
    }
}
</script>


<style>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
} 
.part img {
  width:165px;
}
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
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
.right .next-selector {
  right: -3px;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: red;
}

.content {
  position: relative;
}
.add-to-cart {
  position: absolute;
  width: 210px;
  padding: 3px;
  font-size: 16px;
}

/*td, th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}

.cost {
  text-align: right;
}*/

.sale-border {
  border: 3px solid red;
}

.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
<template>
  <div class="home">
    <div>
      <img class="robot" src="../assets/robot-home.png" aria-hidden="true"/>
    </div>

    <div class="get-started">
      <!-- to use link with router we need to change the syntax below to the one under -->
      <!-- <a href="">Get started</a> building your first robot! -->
      <!-- a second exemple using the name of the component exists in App.vue -->
      <router-link to="/build">Get started</router-link> building your first robot!
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}

.robot {
  height: 300px;
}
</style>

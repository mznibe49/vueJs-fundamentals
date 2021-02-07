<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <!-- another way to use router links while using the component name + binding instead of the url -->
          <!-- the first way exists in HomePage.vue -->
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'Home'}" exact>
                <img class="logo" src="./assets/build-a-bot-logo.png"/>Build-a-Bot
              </router-link>
            </li>
            <!-- the exact attribut allow vue to match only the correct component,
            the problem is "/build" includes also "/", so to correct it we use "exact" -->
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'Build'}" exact>
                Build
              </router-link>
            </li>
            <li class="nav-item cart">
              <router-link class="nav-link" :to="{name: 'Cart'}" exact>
                Cart
              </router-link>
              <div class="cart-items">
                {{cart.length}}
              </div>
            </li>

        </ul>
      </nav>
    </header>
    <div class="container">
      <aside class="aside">
        <router-view name="sidebar"></router-view>
      </aside>
      <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
      <main>
        <!-- to display a component from a router we use router-view insteam of the name of the component -->
        <router-view/>
        <!-- <RobotBuilder/> -->
      </main>
    </div>
  </div>
</template>

<script>
//import HomePage from './home/HomePage.vue'
//import RobotBuilder from './build/RobotBuilder.vue'


export default {
  name: 'App',
  computed: {
    cart(){
      return this.$store.state.robots.cart;
    }
    //HomePage
    //RobotBuilder
  }
}
</script>

<style>
body {
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
</style>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
main {
  /*margin: 0 auto;*/
  padding: 30px;
  background-color: white;
  width: 964px;
  min-height: 300px;
}


header {
  background-color: #999;
  width: 1184px;
  margin: 0 auto;
}
ul {
  padding: 3px;
  display: flex;
}
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
.logo {
  vertical-align: middle;
  height: 30px;
}

.nav-link {
  text-decoration: none;
  color: inherit; /* to avoid the changing color of the link */
}

/* router-link is a vue thing, so whenever when are on an active page, its route link will active this CSS */
/* if we want to give another name to this class for example "foo" 
      we should add in the router active-class="foo" then in the Style part we can use .foo */
.router-link-active {
  color:white;
}
.container {
  display: flex;
  margin: 10 px auto 0 auto;
  justify-content: center;
}
.aside {
  padding: 30px;
  background-color: gray;
  width: 100px;
  min-height: 300px;
}
.nav-item.cart {
  position: relative;
  margin-left: auto;
  border-right: none;
}
.cart-items {
  position: absolute;
  top: -5px;
  right: -9px;
  font-size: 18px;
  width: 20px;
  text-align: center;
  display: inline-block;
  border-radius: 100px;
  background-color: mediumseagreen;
}
</style>


import axios from 'axios';

export default {
    state: {
        // we shld always give a default value to every thing we add in the store
        // if we don t give a default propreties vue won't notice the changes in these properties
        cart: [],
        parts: null,

    },
    mutations: {
        // all the changement in the store must happen in the mutation !
        addRobotToCart(state, robot){
            // this line is all we need to add data into the store
            state.cart.push(robot);
        },
        updateParts(state, parts){
            // in best practice programmation in JS, it s kinda forbidden to reassign somethng to a function parametres
            // why ? in the exemple of having an object, we could modify it and maybe it s somethng that we don t wanna do
            // wich can be a huge source of bugs, however in the mutations WE WANT TO CHANGE THE PARAMETRE state
            state.parts = parts;
        }
    },
    actions: {
        // a function in action can have other args like state data etc.. (check api)
        // actions are asyncronous operation meanwile mutations are syncronous operations
        getParts({commit}){
            // for http calls we will install axions, librairie that helps us execute asyncronous call to servers (like promese, but promise are object)
            
            // with this call there is a couple of problems, we are accessing a different port from where the app is running
            // that why we need a proxy that vue provide us so we can call the get methode only with the argument '/api/parts'
            // another problem is that localhost will not work in production
            
            //axios.get('http://localhost:8081/api/parts');

            // to use this syntax we need to configure a vue proxy by creating a file in the route of our project
            axios.get('/api/parts')
                .then(result => commit('updateParts', result.data))
                .catch(console.error);

        },
        // save data in the store using actions
        addRobotToCart({commit, state}, robot){
            // this variable contient all the items from the old cart + our new robot
            //const cart = [...state.cart, robot];
            const cart = [...state.cart, robot];
            //cart.push(robot);
            return axios.post('/api/cart', cart)
                // axios here return a promise
                // now we need to call the mutation the add the robot to the cart
                // after we have a 200 ok response from a server we need to store our new robot in the  client side
                .then(() => commit('addRobotToCart',robot));
        }
    },
    getters: {
        cartSaleItems(state){
            return state.cart.filter(item => item.head.onSale);
        }
    }
}
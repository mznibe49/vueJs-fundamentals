import Vue from 'vue';
import Router from 'vue-router'; // that we installeed

import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartInfo.vue';
import BrowseParts from '../parts/BrowseParts.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotBases from '../parts/RobotBases.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import SidebarStandard from '../sidebars/SidebarStandard.vue';
import SidebarBuild from '../sidebars/SidebarBuild.vue';
import ShoppingCart from '../cart/ShoppingCart.vue';



Vue.use(Router); // now vue is aware that he has to use router

export default new Router(
    {
        mode: 'history',
        routes: [{
            path: '/',
            name: 'Home',
            components: {
                default: HomePage,
                sidebar: SidebarStandard
            }
        },
        {
            path: '/build',
            name: 'Build',
            components: {
                default: RobotBuilder,
                sidebar: SidebarBuild
            } 
        }, 
        // here the order is importante, when vue pick a route, it has no idea wich one to pick
        // if our url is /parts/blabla the first one that vu will check is /parts/browse etc..  
        {
            path: '/parts/browse',
            name: 'BrowseParts',
            component: BrowseParts,
            
            // if we want to use nested routing we add the line below
            children: [
                {
                    // here the full path is '/parts/browse/heads'. same goes for other children
                    name: 'BrowseHeads',
                    path: 'heads',
                    component: RobotHeads
                },
                {
                    name: 'BrowseArms',
                    path: 'arms',
                    component: RobotArms
                },{
                    name: 'BrowseTorsos',
                    path: 'torsos',
                    component: RobotTorsos
                },{
                    name: 'BrowseBases',
                    path: 'bases',
                    component: RobotBases
                },
            ]
        },
        {
            path: '/parts/:partType/:id', // now this route admit a type and id in its parametre (localho..80/head/3)
            name: 'Parts',
            component: PartInfo,
            props: true, // we add props: to send data as properties from component to another instead of passing data from a link
            // 1st Arg : the route is being navigated to
            // 2nd Arg : the route is being navigated from
            // 3rd Arg : function, if we want the navigation to proceed, we call the "next" function with a value "true"
            beforeEnter(to, from, next){
                // this function is used to validate the url of the routing
                // to get the Id from the route
                const isValideId = Number.isInteger(Number(to.params.id));
                next(isValideId);
            },
            // there is also function beforeLeave(... ) that we can use to prevent the user from leaving in the case of him composing somethng like he shops etc..
            // let implemente this one in the component side
            
        },
        {
            path: '/cart',
            name: 'Cart',
            component: ShoppingCart
        }]
    }
);
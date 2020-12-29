import Vue from 'vue'
import Vuex from 'vuex'
import signin from './signin';
import home from './home';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        signin,
        home
    }
})

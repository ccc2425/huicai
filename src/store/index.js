import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
      score:'',
      all_score:'',
      a_sub_num:'',
      all_sub_num:'',
      rusername:'',
      url:'',
      backs:'',
    }
})

export default store


import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        addressId:0,    //用户选定的地址
        orderId:0,
        total:0
    },
    mutations:{
        setAddressId:function(state,id){
            state.addressId = id;
        },
        setOrder:function(state,arr){
            state.orderId = arr[0];
            state.total = arr[1];
        }
    }
})
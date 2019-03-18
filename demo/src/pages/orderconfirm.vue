<template>
    <div>
        <nav-header></nav-header>
        <nav-bar>
            <span :class="'cur'?'red':''">Order confirm</span>
        </nav-bar>
        <my-progress :curindex='1'></my-progress>
        <order-list></order-list>
        <page-footing></page-footing>
    </div>
</template>




<script>
import navHeader from '../components/navHeader.vue'
import navBar from '../components/navBar.vue'
import pageFooting from '../components/pageFooting.vue'
import myProgress from '../components/myProgress.vue'
import orderList from '../components/orderList.vue'
    export default {
        name:'orderconfirm',
        components:{
            navHeader,navBar,pageFooting,myProgress,orderList
        },
        data:function(){
            return {
                cur:false
            }
        }
    }
</script>



<style scoped>
    .red{
        color: #d1434a;
    }
</style>

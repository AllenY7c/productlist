<template>
    <div>
        <nav-header></nav-header>
        <nav-bar>
            <span :class="cur?'':'red'">My address</span>
        </nav-bar>
        <my-progress :curindex="0"></my-progress>
        <my-site></my-site>
        <page-footing></page-footing>
    </div>
</template>


<script>
import navHeader from '../components/navHeader.vue'
import navBar from '../components/navBar.vue'
import myProgress from '../components/myProgress.vue'
import mySite from '../components/mySite.vue'
import pageFooting from '../components/pageFooting.vue'
    export default {
         name:'address2',
         components:{
             navHeader,navBar,pageFooting,myProgress,mySite,
         },
         data:function(){
             return{
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

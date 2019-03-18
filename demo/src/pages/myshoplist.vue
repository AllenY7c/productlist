<template>
    <div>
        <nav-header></nav-header>
        <nav-bar>
            <span :class="'cur'?'red':''">My shoplist</span>
        </nav-bar>
        <myshop-ping></myshop-ping>
        <page-footing></page-footing>
    </div>
</template>



<script>
import navHeader from '../components/navHeader.vue'
import navBar from '../components//navBar.vue'
import myshopPing from '../components/myshopPing.vue'
import pageFooting from '../components/pageFooting.vue'
    export default {
        name:'myshoplist',
        components:{
            navHeader,navBar,myshopPing,pageFooting
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

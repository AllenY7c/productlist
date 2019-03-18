<template>
    <div>
        <nav-header></nav-header>
        <nav-bar></nav-bar>
        <my-progress :curindex="3"></my-progress>
        <order-complete></order-complete>
        <page-footing></page-footing>
    </div>
</template>


<script>
import navHeader from '../components/navHeader.vue'
import navBar from '../components/navBar.vue'
import myProgress from '../components/myProgress.vue'
import pageFooting from '../components/pageFooting.vue'
import orderComplete from '../components/orderComplete.vue'
        export default {    
            name:'ordersucess',
            components:{
                navHeader,navBar,myProgress,pageFooting,orderComplete
            }
        }
</script>


<style scoped>

</style>

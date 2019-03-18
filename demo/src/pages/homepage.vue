<template>
    <div>
        <nav-header></nav-header>
        <nav-bar>
            <router-link to="/goods">
				<span :class="'cur'?'red':''">Goods</span>
		    </router-link>
        </nav-bar>
        <selection-list></selection-list>
        <page-footing></page-footing>
    </div>
</template>



<script>
import navHeader from '../components/navHeader.vue'
import navBar from '../components//navBar.vue'
import selectionList from '../components/selectionList.vue'
import pageFooting from '../components/pageFooting.vue'
    export default {
        name:'homepage',
        components:{
            navHeader,navBar,selectionList,pageFooting,
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

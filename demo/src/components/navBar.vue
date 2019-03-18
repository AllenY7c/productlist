<template>
    <div class="nbar">
        <div class="bar_core">
            <router-link to="/"><span>Home</span></router-link> /
            <slot></slot>
        </div>
    </div>
</template>



<script>
    export default {
        name:'navBar'
    }
</script>



<style scoped>
    .nbar{
        height: 45px;
        line-height: 45px;
        background: #f0f0f0;
    }
    .bar_core{
        width: 1260px;
        height: 45px;
        margin: 0 auto;
    }
    .bar_core span{
        padding-right: 5px;
       
    }
    .bar_core span:hover{
        color: #d1434a;
        cursor: pointer;
    }
</style>
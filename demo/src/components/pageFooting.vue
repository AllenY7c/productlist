<template>
        <div>
            <footer>
                <div class="yj">
                   <div class="yj_l">
                       Regin:
                       <select name="" id="">
                           <option value="">USA</option>
                       </select>
                   </div>
                   <div class="yj_r">
                       Copyright @ 2017 IMooc All Rights Reserved. About Us  Terms & Conditions Privacy Policy
                   </div>
                </div>
            </footer>
        </div>
</template>



<script>
    export default {
        name:'pageFooting'
    }
</script>



<style scoped>
    footer{
        padding: 15px 0;
        margin-top: 107px;
    }
    .yj{
        width: 1260px;
        height: 97px;
        margin: 0 auto;
        line-height:90px;
        border-top: 1px solid rgb(207, 202, 202);
        color: #ccc;
    }
    .yj_l{
        float: left;
    }
    .yj_r{
        float: right;
    }
</style>
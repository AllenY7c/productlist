<template>
    <div>
        <div class="content">
            <img class="smile" src="/static/ok-2.png" alt="">
            <p class="p1">
                Congratulations!<br/>
                Your order is under processing!
            </p>
            <p class="p2">
               Order ID:{{this.$store.state.orderId}}  Order Total:{{this.$store.state.total|mycurrency('$')}}
            </p>
            <div class="btns">
                <router-link to="/myshoplist">
                    <button>My SHOPLIST</button>
                </router-link>
                <router-link to="/">
                    <button>Good LIST</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'orderComplete'
    }
</script>



<style scoped>
    .content{
        width: 1260px;
        margin: 0 auto;
        padding: 60px 0;
        text-align: center;
    }
    img.smile{
        display: block;
        width: 120px;
        height: 150px;
        margin: 0 auto;
    }
    .content .p1{
        line-height: 35px;
        font-size: 17px;
        color: #693333;
    }
     .content .p2{
        line-height: 35px;
        font-size: 17px;
        color: #999;
    }
    .content .btns{
        margin-top: 30px;
    }
    .btns a button{
        display: inline-block;
        width: 200px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-weight: bold;
        box-sizing: border-box;
        border: 1px solid #d1434a;
        color: #d1434a;
        background: #ffffff;
    }
    .content .btns button:hover{
        background: #ffe5e6;
    }
</style>

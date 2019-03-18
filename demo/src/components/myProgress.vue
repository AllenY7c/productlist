<template>
    <div>
        <ul>
            <li :class="curindex>=0?'cur':''">
                <p class="p1">Confirm Address</p>
                <p class="p2"><span></span></p>
            </li>
            <li :class="curindex>=1?'cur':''">
                <p class="p1">View Your Order</p>
                <p class="p2"><span></span></p>
            </li>
            <li :class="curindex>=2?'cur':''">
                <p class="p1">Make Payment</p>
                <p class="p2"><span></span></p>
            </li>
            <li :class="curindex>=3?'cur':''">
                <p class="p1">Order Confirmation</p>
                <p class="p2"><span></span></p>
            </li>
        </ul>
    </div>
</template>


<script>
    export default {
            name:'myProgress',
            props:['curindex']
        }
</script>



<style scoped>
    ul{
        width: 1260px;
        height: 120px;
        margin: 0 auto;
        overflow: hidden;
    }
    ul li{
        width: 25%;
        height: 120px;
        float: left;
    }
    ul li .p1{
        margin-top: 25px;
        line-height: 48px;
        text-align: center;
        font-weight: bold;
        color: #999;
    }
    ul li.cur .p1{
        color: #d1434a;
    }
    ul li .p2{
        border-bottom: 2px solid #ccc;
        position: relative;
    }
    ul li.cur .p2{
        border-bottom: 2px solid #d1434a;
    }
    ul li .p2 span{
        position: absolute;
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius:50%;
        background: #ccc;
        top: -8px;
        left: 150px;
    }
    ul li.cur .p2 span{
        background: #d1434a;
    }


</style>

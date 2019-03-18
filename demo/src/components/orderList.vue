<template>
    <div class="shop_outer">
        <div class="shop_in">
            <h3>Order  Confirm</h3>
            <div class="table">
                <div class="tab_head">
                    <span>ITEMS</span>
                    <span>PRICE</span>
                    <span>QUANTITY</span>
                    <span>SUBTOTAL</span>
                </div>
                <ul>
                    <li v-for="(item,index) of cartlist" :key="item.productId">
                        <span>
                            <img :src="'/static/'+item.productImage" alt="">
                        </span>
                        <span>{{item.productName}}</span>
                        <span>{{item.salePrice|mycurrency('$')}}</span>

                        <span class="qun">
                            <i class="numi">  
                                <i>{{item.productNum}}</i>     
                            </i>
                        </span>
                        <span class="price" ref="pricetotal">{{item.productNum*item.salePrice | mycurrency('$')}}</span>
                    </li>
                </ul>
                <div class="total">
                        <div class="t_right">
                            items Total: <span>{{alltotal|mycurrency('$')}}</span>
                            <button @click="topay">PROCEED TO PAYMENT</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
    export default {
        name:'orderList',
        data:function(){
            return{
                cartlist:[],
            }
        },
        methods:{
            getCartlist:function(){
                axios.get('/users/cartList').then((res)=>{
                    res=res.data;
                    var orderdata=[];
                    for(var i =0;i<res.result.length;i++){
                        if(res.result[i].checked=='1'){
                            orderdata.push(res.result[i]);
                        }
                    }
                    this.cartlist = orderdata;
                });
            },
            topay:function(){
                //点击去付款
                axios.post('/users/payMent',{
                    addressId:this.$store.state.addressId,
                    orderTotal:this.alltotal,

                }).then((res)=>{
                    res=res.data;
                    if(res.status=='0'){
                        //储存订单信息
                        this.$store.commit('setOrder',[res.result.orderId,res.result.orderTotal])


                        //跳转页面
                        this.$router.push({path:'/ordersucess'});
                    }
                });
            }
        },
        computed:{
            //计算商品总价
            alltotal:function(){
                //计算选择商品的总价
                var total = 0;
                this.cartlist.forEach((item)=>{
                    if(item.checked=='1'){
                        total+=parseInt(item.productNum)*parseInt(item.salePrice);
                    }
                });
                return total;
            }
        },
        mounted:function(){
            this.getCartlist();
        }
    }
</script>


<style scoped>
    .iconfont{
        font-size: 27px;
        cursor: pointer;
    }
    .shop_outer{
        width: 1260px;
        margin: 0 auto;
    }
    .shop_in{
        padding-top: 23px;
    }
    .shop_in h3{
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        font-weight: bold;
    }
    .tab_head{
        height: 40px;
        line-height: 40px;
        background: #605f5f;
        color: #fff;
        font-size: 12px;
        text-align: center;
        display: flex;
    }
    .tab_head span:nth-child(1){
        flex:2;
    }
    .tab_head span{
        display: inline-block;
        flex: 1;
    }
    .table li{
        background: #fff;
        display: flex;
        height: 145px;
        box-sizing: border-box;
        border: 1px solid #e9e9e9;
        border-top: 0px;
        line-height: 145px;
        text-align: center;
    }
    .table li span{
        flex: 1;
    }
    .table li span:nth-child(3){
        flex: 1.7;
    }
    .table li span:nth-child(4){
        flex:1;
    }

    /*按钮样式美化*/
    span.radio{
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #ccc;
        cursor: pointer;
        vertical-align: middle;
        font-size: 17px;
        cursor: pointer;
        color:#f5f7fc;
        font-family:'黑体';
    }
    #radio{
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #ccc;
        cursor: pointer;
        vertical-align: middle;
        font-size: 17px;
        cursor: pointer;
        color:#f5f7fc;
        font-family:'黑体';
    }
    span.checked{
        background-color: #ee7a23;
        color: #fff;
        border: 1px solid #ee7a23;
    }
    ul span img{
        width: 80px;
        height: 80px;
        border: 1px solid #e9e9e9;
        vertical-align: middle;
    }
    .numi{
        display: inline-block;
        width: 40px;
        height: 30px;
        border: 1px solid #f0f0f0;
        line-height: 30px;
        display: flex;
        vertical-align: middle;
        margin-top: 57px;
        font-size: 14px;
        text-align: center;
        border-radius: 3px;
        margin-left:40px;
    }
    .numi a{
        display: inline-block;
        flex: 1;
        height: 30px;
        background-color: #f0f0f0;
    }
    .numi i{
        display: inline-block;
        width: 44px;
    }
    .total{
        height: 58px;
        line-height: 58px;
        border: 1px solid #e9e9e9;
        margin-top: 20px;
        background-color: #fff;
    }
    .total .radio{
        margin: 0px 25px;
    }
    .total .t_right{
        float: right;
    }
    .total .t_right button{
        background-color: #d1434a;
        color: #fff;
        padding: 0px 7px;
        font-weight: bold;
        margin-left: 10px;
        outline: none;
        border: none;
        cursor: pointer;
    }
    .total .t_right span{
        color: #d9434a;
        font-size: 16px;
        font-weight: bold;
        padding-left: 12px;
    }
    .shop_n{
        text-align: center;
        line-height: 100px;
    }
    .shop_n button{
        width: 114px;
        height: 28px;
        border: 1px solid #d1434a;
        color: #d1434a;
        text-align: center;
        line-height: 28px;
        margin-bottom: 10px;
        background: #fff;
    }
    .shop_n button:hover{
        background-color: #ffe5e6;
    }
</style>

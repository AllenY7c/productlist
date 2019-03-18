<template>
    <div class="shop_outer">
        <div class="shop_n" v-if="shoplist.length==0">
            购物车里 空空如也!<br>
            <router-link to="/">
                <button>去购物</button>
            </router-link>
        </div>
        <div class="shop_in" v-if="shoplist.length>0">
            <h3>My Shop</h3>
            <div class="table">
                <div class="tab_head">
                    <span>ITEMS</span>
                    <span>PRICE</span>
                    <span>QUANTITY</span>
                    <span>SUBTOTAL</span>
                    <span>EDIT</span>
                </div>
                <ul>
                    <li v-for="(item,index) of shoplist" :key="item.productId">
                        <span class="first">
                            <span id="radio" :class="item.checked=='1'?'checked':''"
                            @click="radioclickHandler($event,item.checked,index,item.productId,item.productNum)">√</span>
                        </span>
                        <span>
                            <img :src="'/static/'+item.productImage" alt="">
                        </span>
                        <span>{{item.productName}}</span>
                        <span>{{item.salePrice|mycurrency('$')}}</span>
                        <span class="qun">
                            <i class="numi">
                                <a href="javascript:void(0);" 
                                @click="radioclickHandler($event,item.checked,index,item.productId,item.productNum)">-</a>
                                <i>{{item.productNum}}</i>
                                <a href="javascript:void(0);"  
                                @click="radioclickHandler($event,item.checked,index,item.productId,item.productNum)">+</a>
                            </i>
                        </span>
                        <span class="price" ref="pricetotal">{{item.productNum*item.salePrice | mycurrency('$')}}</span>
                        <span>
                            <p class="del iconfont" @click="productDel(item.productId)">&#xe617;</p>
                        </span>
                    </li>
                </ul>
                <div class="total">
                    <span class="radio" :class="{'checked':checkall}" @click="clickallbtn">√</span>Select all
                        <div class="t_right">
                            items Total: <span>{{alltotal|mycurrency('$')}}</span>
                            <button @click="checkoutHandler">CHECKOUT</button>
                        </div>
                </div>
            </div>
        </div>

            <!-- 模态弹出框 -->
        <model v-if="model1" @close="model1=false">
			<template slot="slot1">商品数量最小为1！</template>
			<template slot="slot2">
				<button @click="model1=false">确定</button>
			</template>
		</model>
		<model v-if="model2" @close="model2=false">
			<template slot="slot1">真的要删除心爱的商品吗？</template>
			<template slot="slot2">
				<button @click="model2=false">取消</button>
				<button @click="decDel()">删除</button>
			</template>
		</model>
		<model v-if="model3" @close="model3=false">
			<template slot="slot1">购物车没有选中的商品！</template>
			<template slot="slot2">
				<button @click="model3=false">确定</button>
			</template>
		</model>
    </div>
</template>



<script>
import axios from 'axios'
import Model from './Model.vue'
    export default {
        name:'myshopPing',
        components:{Model},
        data:function(){
            return{
                shoplist:[],
                delmodel:false,//删除提示默认隐藏
                model1:false,  //模态框1 
                model2:false,  //模态框2 
                model3:false,  //模态框3 
                delpid:0,      //删除商品的id
            }
        },
        methods:{
            getShoplist:function(){
                axios.get('/users/cartList').then((res)=>{
                    res=res.data;
                    this.shoplist = res.result;
                });
            },
            //用户确定删除商品
            decDel:function(){
                axios.post('/users/cartDel',{
                    productId:this.delpid
                }).then((res)=>{
                    res=res.data;
                    if(res.result=='suc'){
                        //删除当前id的商品
                        for(var i = 0;i<this.shoplist.length;i++){
                            if(this.shoplist[i].productId==this.delpid){
                                this.shoplist.splice(i,1);
                                //通知头部组件删除成功
                                this.bus.$emit('addcartsucess');
                                //隐藏弹出层
                                this.model2=false;
                            }
                        }
                    }
                });
            },
            //用户点击了删除按钮
            productDel:function(pid){
                this.delpid=pid;    //保存要删除商品的id
                this.model2 = true; //隐藏弹出框
            },
            //点击全选按钮
            clickallbtn:function(evt){
                var newcheck = true;
                if(evt.target.className.indexOf('checked')!=-1){
                    newcheck = false;
                }
                //同步数据库数据
                axios.post('/users/editCheckAll',{
                    checkAll:newcheck
                }).then((res)=>{
                    res=res.data;
                    if(res.result=='suc'){
                        //同步显示效果
                        for(var i = 0; i<this.shoplist.length;i++){
                            this.shoplist[i].checked = newcheck?'1':'0';
                        }
                    }
                });

            },
            //用户点击数量增加 或 减少
            radioclickHandler:function(evt,flag,index,pid,num){
                var setflag = flag;
                if(evt.target.innerHTML=='-'){
                    if(num<=1){
                        //提示用户数量最少为1
                        this.model1=true;
                        return;
                    }
                    num--;
                }else if(evt.target.innerHTML=='+'){
                    num++;
                }else{
                    setflag = flag=='1'?'0':'1';
                };

                axios.post('/users/cartEdit',{
                    checked:setflag,
                    productId:pid,  
                    productNum:num
                }).then((res)=>{
                    //视图的显示
                    res=res.data;
                    if(res.status=='0'){
                        this.shoplist[index].checked = setflag;
                        this.shoplist[index].productNum = num;
                    }
                    //通知头部组件 购物车数量变动
                    this.bus.$emit('addcartsucess');
                });
            },
            //用户提交购物车商品
            checkoutHandler:function(){
                var count = 0;
                for(var i = 0;i<this.shoplist.length;i++){
                    if(this.shoplist[i].checked == '1'){
                        count+=parseInt(this.shoplist[i].productNum);
                    }
                }
                if(count == 0){
                    //提示用户 没有商品被选中
                    this.model3 = true;
                    return;
                }else{
                    this.$router.push({path:'/address'});
                }
            }
        },
        computed:{
            //计算商品的总价
            alltotal:function(){
                //计算选择商品的总价
                var total = 0;
                this.shoplist.forEach((item)=>{
                    if(item.checked == '1'){
                        total+=parseInt(item.productNum)*parseInt(item.salePrice)
                    }
                });
                return total;
            },
            checkall:function(){
                //检测购物车物品是否全选
                var flag = true; //默认为全选状态
                this.shoplist.forEach((item)=>{
                    if(item.checked == '0'){
                        flag = false;
                    }
                });
                return flag;
            }
        },
        mounted:function(){
            this.getShoplist();
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
    .table li span:nth-child(2){
        flex: 0.7;
    }
    .table li .first{
        flex: 0;
        padding: 0 25px;
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
        width: 125px;
        height: 30px;
        border: 1px solid #f0f0f0;
        line-height: 30px;
        display: flex;
        vertical-align: middle;
        margin-top: 57px;
        font-size: 14px;
        border-radius: 3px;
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
        padding: 0 10px;
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
    .qun{
       margin-left:50px;
    }
</style>

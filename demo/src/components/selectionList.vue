<template>
        <div class="product_list">
            <div class="product_in">
                <div class="product_top">
                    Sort by:
                    <span>Default</span>
                    <span @click="clickpriceHandler" class="pricebtn">
                        price
                        <span class="iconfont" :class="sort==rotate?'':'xz'">&#xe79d;</span>
                    </span>
                </div>
                <div class="procontent clearfix">
                    <div class="contleft">
                        <h3>PRICE:</h3>
                        <ul>
                            <li @click="priceLevelHandler('all')" :class="priceLevel=='all'?'cur':''">All</li>
                            <li @click="priceLevelHandler(0)" :class="priceLevel==0?'cur':''">0-100.00</li>
                            <li @click="priceLevelHandler(1)" :class="priceLevel==1?'cur':''">100.00-500.00</li>
                            <li @click="priceLevelHandler(2)" :class="priceLevel==2?'cur':''">500.00-1000.00</li>
                            <li @click="priceLevelHandler(3)" :class="priceLevel==3?'cur':''">1000.00-5000.00</li>
                        </ul>
                    </div>
                    <div class="contright">
                        <div class="list clearfix">
                            <dl v-for="(item,key) in datalist" :key="item.productId">
                                <dt><img :src="'/static/'+item.productImage" alt=""></dt>
                                <dd>
                                    <p class="p1">{{item.productName}}</p>
                                    <p class="p2">{{item.salePrice|mycurrency('$')}}</p>
                                    <button @click="addcart(item.productId)">加入购物车</button>
                                </dd>
                            </dl>
                        </div>
                        <!-- loadmore方法 -->
                        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                            <p>{{msgstr}}</p>
                        </div>
                    </div>
                </div>
            </div>
                        <!--模态弹出框  -->
                <model v-if="model1" @close="model1=false">
                    <template slot="slot1">添加购物车失败 请先登录！</template>
                    <template slot="slot2">
                        <button @click="model1=false">确定</button>
                    </template>
                </model>

                <model v-if="model2" @close="model2=fasle">
                    <template slot="slot1">添加购物车成功！</template>
                    <template slot="slot2">
                        <button @click="model2=false">继续购物</button>
                        <router-link to="/myshoplist">
                            <button class="btns-solt">去结算</button>
                        </router-link>
                    </template>     
                </model>
        </div>
</template>



<script>
import Model from './Model.vue'
import axios from 'axios'
    export default {
        name:'selectionList',
        components:{Model},
        data:function(){
            return{
                 datalist:[], //商品列表数据
                 page:1,      //当前页码
                 busy:false,  //是否正在加载中
                 msgstr:'加载中...', //提示用户
                 priceLevel:'all',  //默认显示的价格区间
                 sort:-1,   //默认排序
                 model1:false,//模态框1隐藏
                 model2:false,//模态框2隐藏
                 rotate:false
            }
        },
        methods:{
            getData:function(str){
                axios.get('/goods/list?page='+this.page+'&pageSize=8&sort='+this.sort+'&priceLevel='+this.priceLevel).then((res)=>{
                    res=res.data;
                    console.log(res)
                    if(res.status&&res.status=='0'){
                        if(str=='loadMore'){
                            this.datalist = this.datalist.concat(res.result.list);
                            //没有数据返回
                            if(res.result.list.length==0){
                                // 不在触发加载方法
                                this.busy=true;
                                this.msgstr='加载完毕..';
                                setTimeout(() => {
                                    this.msgstr='';
                                }, 1000);
                            }else{
                                //触发加载方法
                                this.busy=false;
                            }
                        }else{
                            // 正常的数据展示赋值
                            this.datalist = res.result.list;
                        }
                    }
                })
            },
            loadMore:function(){
                //加载更多数据
                this.busy=true; //正在加载中
                setTimeout(()=>{
                    //加载新的数据
                    this.page++;
                    this.getData('loadMore');
                },1000)
            },
            priceLevelHandler:function(lev){
                //切换价格区间
                this.page=1;
                this.priceLevel=lev;
                this.getData();
                //初始化分页
                this.msgstr='加载中..';
                this.busy = false;
            },
            //排序方法
            clickpriceHandler:function(evt){
                 evt.target.className="pricebtn cur"
                 this.rotate=!this.rotate;
			 	//点击价格排序
			 	if(this.sort==1){
			 		this.page=1;
			 		this.sort=-1;
			 	}else{
			 		this.page=1;
			 		this.sort=1;
			 	}
			 	this.getData();
			 },
            addcart:function(pid){
                axios.post('/goods/addCart',{
                    productId:pid
                }).then((res)=>{
                    res=res.data;
                    if(res.result=='suc'){
                        this.model2 = true;
                        //通知头部组件添加购物车成功
                        this.bus.$emit('addcartsucess');
                    }else{
                        //添加购物车失败的弹框提示
                        this.model1 = true;
                    }
                });
            }
        },
        mounted:function(){
            this.getData();
        }
    }
</script>


<style scoped>
    .product_list{
        background: #f5f7fc;
        padding-top: 60px;
    }
    .product_in{
        width: 1260px;
        margin: 0 auto;
    }
    .product_top{
        line-height: 54px;
        text-align: right;
        background: #fff;
        padding: 0 15px;
        font-size: 12px;
        color: #605f5f;
        margin-bottom: 30px;
    }
    .product_top span{
        cursor: pointer;
    }
    .product_top span.cur{
        color: #ee7a23;
    }
    .procontent{
        width: 1260px;
    }
    .pricebtn span{
        display: inline-block;
        transition: 0.5s all;
    }
   
    .xz{
        transform:rotate(-180deg);
        transition: all 2s;
    }
    .list{
        min-height: 700px;
    }
    .procontent .contleft{
        width: 210px;
        float: left;
    }
    .procontent .contleft h3{
        line-height: 25px;
        font-size: 12px;
        color: #605f5f;
        font-weight: bold;
        margin-bottom: 20px;
    } 
    .procontent .contleft li{
        line-height: 26px;
        border-left: 2px solid #f5f7fc;
        margin-bottom: 16px;
        padding-left: 12px;
        cursor: pointer;
    }
    .procontent .contleft li.cur{
        color: #ee7a23;
        border-left: 2px solid #ee7a23;
    }
     .procontent .contleft li:hover{
        color: #ee7a23;
        border-left: 2px solid #ee7a23;
    }
    .procontent .contright{
        width: 1010px;
        float: right;
    }
    .procontent .contright dl{
        width: 230px;
        margin-right: 27px;
        float: left;
        border: 1px solid #e9e9e9;
        background: #fff;
        margin-bottom: 16px;    
    }
    .procontent .contright dl:hover{
        border: 1px solid #d9434a;
    }
    .procontent .contright dl dt{
        width: 100%;
    }
    .procontent .contright dl:nth-child(4n){
	    margin-right: 0px;
    }
    .procontent .contright dl dt img{
        width: 100%;
        height: 248px;
    }
    .procontent .contright dl dd .p1{
        line-height: 33px;
        font-size: 12px;
        color: #605f5f;
        font-weight: bold;
        padding: 0px 10px;
        margin-bottom: 22px;
    }
    .procontent .contright dl dd .p2{
        line-height: 30px;
        font-size: 13px;
        color: #d9434a;
        padding: 0px 10px;
        margin-bottom: 10px;
    }
    .procontent .contright dl dd button{
        display: block;
        width: 214px;
        height: 38px;
        border: 1px solid #d1434a;
        color: #d1434a;
        text-align: center;
        line-height: 38px;
        margin: 0px auto;
        margin-bottom: 10px;
        background: #fff;
    }
    .procontent .contright dl dd button:hover{
        background-color: #ffe5e6;
    }
    .btns-solt{
       display: inline-block;
        width: 198px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        border: 1px solid #eaa9ac;
        color: #d1434a;
        font-weight: bold;
        background: #ffffff;
    }
    .btns-solt:hover{
        background: #d1434a;
        color: #ffffff;
    }
</style>
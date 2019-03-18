<template>
        <div id="header_">
            <header class="h_outer">
                <div class="head_l">E动国际</div>
                <div class="head_r">
                    <div v-show="!isLogin">
                       <span class="login" @click="loginHandler">logIn</span>
                    </div>
                    <div v-show="isLogin">
                        <span>{{username}}  欢迎您! </span>
                        <span @click="logoutHandler">logout</span>
                        <router-link to="/myshoplist">
                            <span class="cart iconfont">&#xe600;<i>{{cartCount}}</i></span>
                        </router-link>
                    </div>
                </div>
            </header>
            <!-- 模态框 -->
            <login-model 
             v-if="loginModal"
             @close="closeHandler"
             @loginsucess="loginsucessHandler"></login-model>
        </div>
</template>




<script scoped>
import loginModel from './loginModel.vue'
import axios from 'axios'
    export default {
            name:'navHeader',
            components:{
                loginModel,
            },
            data:function(){
                return{
                    isLogin:false,//用户是否登录
                    loginModal:false, //登录框的显示和隐藏
                    username:'',//用户名
                    cartCount:0 //用户的购物车商品数量 
                }  
            },
            methods: {
                closeHandler:function(){
                    //隐藏登录框
                    this.loginModal=false;
                },
                loginHandler:function(){
                    //显示登录框
                    this.loginModal=true;
                },
                loginsucessHandler:function(username){
                    //登录成功处理逻辑
                    this.loginModal=false;
                    this.username=username;
                    this.isLogin=true;//请求购物车数据
                    this.getcartCount();
                },
                logoutHandler:function(){
                    //请求退出登录接口
                    axios.post('/users/logout').then((res) => {
                    //推出登录的处理逻辑
                        this.isLogin=false;
                    });
                },
                    //取得当前用户的购物车商品数量
                getcartCount:function(){
                    axios.get('/users/getCartCount').then((res)=>{
                        res=res.data;
                        if(res.status&&res.status=='0'){
                            this.cartCount=res.result;
                        }
                    });
                },
                checklogin:function(){
                    //验证用户是否登录
                    axios.get('/users/checkLogin').then((res)=>{
                        res=res.data;
                        if(res.status=='0'){
                            //用户登录显示用户名
                            this.username=res.result;
                            this.isLogin=true;
                            // 请求用户购物车数据
                            this.getcartCount();
                        }else if(res.status=='10001'){
                            this.isLogin=false;
                        }
                    })
                }
            },
            mounted:function(){
                //验证用户是否登录 登录显示用户名 未登录显示登录按钮
                this.checklogin();
                //监听事件添加购物车成功事件
                this.bus.$on('addcartsucess',()=>{
                    this.getcartCount();
                })
            }
    }
</script>


<style scoped>
    .header_{
        height: 70px;
        line-height: 70px;
        background: #ffffff;
    }
    .h_outer{
        width:1260px;
        height: 71px;
        margin:0 auto;
    }
    .head_l{
        float: left;
        line-height: 70px;
        color: #666666;
        font-size: 17px;
    }
    .head_r{
        float: right;
        line-height: 70px;
        font-size: 16px;
    }
    .login  .iconfont{
        font-size: 20px;
        cursor: pointer;
    }
    .login{
        cursor: pointer;
    }
    .head_r span{
        cursor: pointer;
        margin:4px;
    }
    .head_r .cart{
        position: relative;
    }
    .head_r .cart i{
        position: absolute;
        line-height: 17px;
        top:-10px;
        right: -12px;
        padding: 0px 2px;
        background: skyblue;
        color: #fff;
        border-radius: 20px;
    }
    .iconfont{
        font-size: 17px;
    }
    .login{
       padding-right: 10px;
    }
</style>

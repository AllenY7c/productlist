<template>
       <div>
           <div class="outerspace">
               <div class="loginModel">
                   <div class="modal_core">
                       <span class="close" @click="colseHandler">×</span>
                       <h3>Login in</h3>
                       <p><input type="text" name="" v-model="username"><span class="iconfont">&#xe609;</span></p>
                       <p><input type="password" name="" v-model="password"> <span class="iconfont">&#xe6a8;</span></p>
                       <button class="btn_login" @click="btnClick" >登录</button>
                       <p class="red">{{errormsg}}</p>
                   </div>
               </div>
           </div>
       </div> 

</template>



<script scoped>
import axios from 'axios'
    export default {
        name:'demo',
        data:function(){
            return{
                username:'',//用户名数据
                password:'',//用户密码数据
                errormsg:''//错误提示信息
            }
        },
        methods:{
            colseHandler:function(){
                // 提示父级关闭登录框
                this.$emit('close');

            },
            btnClick:function(){
                // 用户点击了登录按钮
                if(this.username==''||this.password==''){
                    this.errormsg='用户名或密码错误';
                    return;
                }else{
                    this.errormsg='';
					axios.post('/users/login',{userName:this.username,userPwd:this.password}).then((res)=>{
						res=res.data;
						if(res.result.userName&&res.status=="0"){
							//登录成功 告诉父组件登录成功
							this.$emit('loginsucess',res.result.userName);
						}else{
							this.errormsg="登录失败 请核实用户名密码"
						}
					}).catch(()=>{
						console.log('登录错误');
					});
                }
            }
        }
    }
</script>



<style scoped>
    .outerspace{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }
    .outerspace .loginModel{
        width: 550px;
        height: 300px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .outerspace .close{
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 22px;
        cursor: pointer;
    }
    .modal_core{
        padding: 20px 50px;
    }
    .modal_core h3{
        line-height: 36px;
        font-size: 15px;
    }
    .modal_core p{
        position: relative;
        margin-bottom: 15px;
    }
    .modal_core p span{
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        top: 5px;
        left: 5px;
        text-align: center;
        font-size: 22px;
    }
    .modal_core input{
        display: block;
        width: 100%;
        padding: 0px 10%;
        padding-left: 12%;
        line-height: 40px;
        margin: 0;
        outline: none;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
    }
    .btn_login{
        display: block;
        margin-top: 30px;
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        background: #009de6;
        cursor: pointer;
        outline:none;  
        border: none;
    }
    .red{
        color: red;
        margin-top: 5px;
    }
</style>

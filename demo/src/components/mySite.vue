<template>
    <div>
        <h3>SHIPPING ADDRESS</h3>
        <div class="list clearfix">
            <dl
            :class="item.isDefault?'cur':''"
            v-for="(item,index) in addressData"
            @click="setAddress($event,item.addressId)"
            ref="dllist"
            >
                <dt>
                    <p>{{item.userName}}</p>
                    <p>{{item.streetName}}</p>
                </dt>
                <dd>
                    <p>{{item.tel}}</p>
                    <p class="p2">
                        <template v-if="item.isDefault">
                        Default address    
                        </template>
                        <template v-else>
                            <span class="setdef" @click="setDefault(item.addressId)">Set default</span>
                        </template>
                        <p class="iconfont" @click="delAddress(item.addressId)">&#xe617;</p>
                </dd>
            </dl>
        </div>
        <h3>SHIPPING METHOD</h3>
        <div class="list clearfix">
            <dl class="cur">
                <dt>
                    <p>Standard shipping</p>
                    <p>Free</p>
                </dt>
                <dd>
                    <p class="p3">
                        One shipped,Order should arrive in the  desination in 1-7 business days
                    </p>
                </dd>
            </dl>
        </div>
        <!-- 下一步按钮 -->
        <div class="btn2 clearfix">
            <router-link to="/orderconfirm">
                <button class="next">NEXT</button>
            </router-link>
        </div>
        <!-- 弹出层 -->
        <model v-if="model1" @close="model1=false">
            <template  slot="slot1">
                确定要删除地址吗?
            </template>
            <template  slot="slot2">
                <button @click="model1=false">取消</button>
                <button @click="decDel()">删除</button>
            </template>
        </model>

    </div>
</template>


<script>
import axios from 'axios'
import Model from './Model.vue'
    export default {
        name:'mySite',
        components:{
            Model,
        },
        data:function(){
            return {
                addressData:[],
                delid:0,        //要删除地址id
                model1:false    //弹出框默认隐藏
            }
        },
        methods:{
            //获取地址列表
            getData:function(){
                axios.get('/users/addressList').then((res)=>{
                    res=res.data;
                    if(res.status=='0'){
                        this.addressData = res.result;
                        //存储默认地址 用户不选择则使用默认地址
                        var defaultId = 0;
                        for(var i =0;i<res.result.length;i++){
                            if(res.result[i].isDefault){
                                defaultId = res.result[i].addressId;
                            }
                        }
                        this.$store.commit('setAddressId',defaultId);
                    }
                });
            },
            //设置默认地址
            setDefault:function(id){
                axios.post('/users/setDefault',{
                    addressId:id
                }).then((res)=>{
                    res=res.data;
                    if(res.status=='0'){
                        this.getData();
                    }
                });
            },
            //设置收货地址
            setAddress:function(evt,id){
                this.$store.commit('setAddressId',id);
                //切换样式
                this.$refs.dllist.forEach(function(item){
                    item.className = '';
                });
                evt.currentTarget.className='cur';
            },
            //删除
            delAddress:function(id){
                this.delid=id;
                this.model1=true;
            },
            //用户确定要删除
            decDel:function(){
                axios.post('/users/delAddress',{
                    addressId:this.delid
                }).then((res)=>{
                    res=res.data;
                    if(res.status=='0'){
                        this.model1=false;
                        this.getData();
                    }
                });
            }
        },
        mounted:function(){
            //获取地址列表数据
            this.getData();
        }
    }
</script>


<style scoped>
body{
    background: #605F5F;
}
    h3{
        width: 1260px;
        margin: 0 auto;
        height: 52px;
        line-height: 52px;
        padding: 0 10px;
        font-size: 15px;
        font-weight: bold;
    }
    .list{
        width: 1260px;
        margin: 0 auto;
        background: #f5f7fc;
    }
    .list dl{
        padding: 15px 20px;
        width: 298px;
        height: 165px;
        box-sizing: border-box;
        border: 2px solid #e9e9e9;
        background: #fff;
        margin-right: 20px;
        float: left;
        margin-bottom: 20px;
        cursor: pointer;
        position: relative;
    }
    .list dl.cur{
        border: 2px solid #ee7a23;
    }
    .list dl:nth-child(4n){
        margin-right: 0px;
    }
    .list dl dt{
        height: 74px;
        line-height: 28px;
        color: #333;
    }
    .list dl .p3{
        color: #999;
    }
    .list dl dd{
        line-height: 28px;
    }
    .list dl.cur dd .p2{
        color: #ee7a23;
    }
    .iconfont{
        position: absolute;
        right:7px;
        bottom: 7px;
        font-size: 27px;
    }
    .next{
        display: block;
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        float: right;
        font-size: 12px;
        font-weight: bold;
        color: #fff;
        background: #d1434a;
        outline: none;
        border: none;
        cursor: pointer;
    }
    .next:hover{
        background: #f16f75;
    }
    div.btn2{
        width: 1260px;
        margin: 0 auto;
        border: 0px;
        margin-top: 30px;
    }
    .setdef{
        cursor: pointer;
    }
</style>

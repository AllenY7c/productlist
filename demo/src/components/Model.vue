<template>
	<div class="big_bg">
		<div class="model">
			<span class="close" @click="clickclose">×</span>
			<p>
				<slot name="slot1"></slot>
			</p>
			<div class="bts">
				<slot name="slot2"></slot>
			</div>
		</div>	
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'Model',
		methods:{
			clickclose:function(){
				this.$emit('close');
			}
		}	
	}
</script>

<style type="text/css" scoped>
.big_bg{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	background-color: rgba(0,0,0,0.5);
	z-index: 5000;
}
.model{
	width: 540px;
	height: 260px;
	position: absolute;
	background-color: #fff;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	position: relative;
}
.model .close{
	display: inline-block;
	width: 50px;
	height: 50px;
	position: absolute;
	line-height: 50px;
	text-align: center;
	top: 0px;
	right: 0px;
	cursor: pointer;
	color: #666;
	font-size:20px;
}	
.model p{
	padding: 25px;
	padding-bottom: 10px;
	line-height: 125px;
	font-size: 18px;
	text-align: center;
	color: #605f5f;
	min-height: 120px;
}
.bts{
	text-align: center;
}
.bts button{
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

.bts button:nth-child(2){
	margin-left: 15px;
}
.bts button:hover{
	background-color: #d1434a;
	color: #fff;
}
.bts a:hover{
	background-color: #d1434a;
	color: #fff;
}
</style>
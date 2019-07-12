<template>
	<view class="content">
		<view class="login-box">
			<view class="logo">
				<img src="/static/logo.png" alt="">
			</view>
			<view class="login-input">
				<view class="form-item">
					<label class="form-item-label" for=""><i class="iconfont icon-account"></i></label>
					 <input type="text" class="form-item-input uni-input" @input="onKeyUser" placeholder="请输入账号" />
					 <div style="clear: both;"></div>
				</view>
				<view class="form-item">
					<label class="form-item-label" for=""><i class="iconfont icon-password"></i></label>
					 <input type="password" class="form-item-input uni-input" @input="onKeyPwd" placeholder="请输入密码" />
					 <div style="clear: both;"></div>
				</view>
				<view class="form-item">
					<button type="warn" @click="login()">登录</button>
				</view>
			</view>
			
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
import Vue from 'vue'
import HMmessages from "@/components/HM-messages/HM-messages.vue"
export default {
	components: {HMmessages},
	data() {
		return {
			user:'',
			pwd:'',
			key:'',
			message:'',
			middle:false
		}
	},
	created(){
		
	},
	onLoad() {
		this.$socket.emit('key', '');
		this.sockets.subscribe('key', (data) => {
			this.key = data
		});
		this.sockets.subscribe('message', (data) => {
			this.msg(data)
		});
		this.sockets.subscribe('msg', (data) => {
			console.log(data)
			data = JSON.parse(data)
			this.msg(data.msg,data.type)
		});
	},
	methods: {
		onKeyUser(e){
			this.user = e.detail.value
		},
		onKeyPwd(e){
			this.pwd = e.detail.value
		},
		login(){
			if(this.user == '' || this.pwd == ''){
				return this.msg('账号密码不能为空','error')
			}
			let that = this
			let encryptor = new JSEncrypt() // 新建JSEncrypt对象
			let publicKey = this.key
			
			encryptor.setPublicKey(publicKey) // 设置公钥
			var rsaPwd = encryptor.encrypt(that.pwd) // 对需要加密的数据进行加密
			// var rsaPwd = this.$rsaCrypto(publicKey,that.pwd)
			this.$socket.emit('login', {pwd:rsaPwd,user:this.user})
		},
		msg(data,type){
			switch(type){
				case 'remind':
					this.HMmessages.show(data,{data:{test:'test'}});
					break;
				case 'error':
					this.HMmessages.show(data,{icon:type});
					break;
				case 'danger': 
					this.HMmessages.show(data,{icon:type});
					break;
				case 'success':
					this.HMmessages.show(data,{icon:type});
					break;
				case 'disable':
					this.HMmessages.show(data,{icon:type});
					break;
				case 'help':
					this.HMmessages.show(data,{icon:type});
					break;
				case 'fontColor':
					this.HMmessages.show(data,{icon:'success',fontColor:"#ff0000"});
					break;
				case 'iconColor':
					this.HMmessages.show(data,{icon:'success',iconColor:"#7c2491"});
					break;
				case 'background':
					this.HMmessages.show(data,{icon:'success',background:"rgba(255,255,225,.8)"});
					break;
				case 'closeButtonColor':
					this.HMmessages.show(data,{icon:'success',closeButton:true,closeButtonColor:"#3388ff",duration:0});
					break;  
				case 'noIcon':
					this.HMmessages.show(data,{icon:'none'});
					break;  
				case 'closeButton':
					this.HMmessages.show(data,{icon:'success',closeButton:true,duration:0});
					break;
				case 'forever':
					this.HMmessages.show(data,{icon:'success',duration:0});
					break;
				case 'close':
					this.HMmessages.close();
					break;
				case 'center':
					this.HMmessages.show(data,{icon:'none',textAlign:'center'});
					break;
			}
		},
		clickMessage(){
			this.HMmessages.close() 
		}
	}
}
</script>

<style>
.login-box{
	padding-top: 100px;
	width: 100%;
}
.login-box .logo{
	text-align: center;
}
.login-input{
	width: 70%;
	margin: 0 auto;
}
.login-input::after{
	content: "";
	clear: both;
}
.form-item{
	margin: 25px 0;
}
.form-item::after{
	content: "";
	clear: both;
}
.form-item .form-item-label{
	width: 25px;
	float: left;
	text-align: right;
	padding-right: 15px;
}
.form-item .form-item-input{
	width: calc(100% - 40px) !important;
	float: left;
	border-bottom: 1px solid #eee;
}
.form-item uni-input input{
	width: 100% !important;
}
.form-item .form-item-input{
	width: 100%;
	font-size: 16px;
}
</style>

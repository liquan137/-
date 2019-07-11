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
	</view>
</template>

<script>
import Vue from 'vue'
var vm = new Vue({
  sockets:{ //将（socket.on）绑定事件放在sockets中
    connect: function(){
      console.log('socket connected')
    },
    message: function(val){
      console.log('this method was fired by the socket server. '+val)
    }
  },
  methods: {
    clickButton: function(val){
        // $socket is socket.io-client instance
        this.$socket.emit('emit_method', val);
    }
  }
})
export default {
	data() {
		return {
			user:'',
			pwd:'',
		}
	},
	sockets:{
		connect: function(){
		  console.log('socket connected')
		},
		message: function(val){
		  console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
		}
	},
	onLoad() {
		this.$socket.emit('message', '123456')
		this.$socket.on('message',()=>{
			console.log(data)
		})
	},
	methods: {
		onKeyUser(e){
			this.user = e.detail.value
		},
		onKeyPwd(e){
			this.pwd = e.detail.value
		},
		login(){
			this.$socket.emit('message', this.pwd)
			if(this.user == '' || this.pwd == ''){
				return console.log('账号密码不能为空')
			}
			let that = this
			let encryptor = new JSEncrypt() // 新建JSEncrypt对象
			
			let publicKey = `-----BEGIN PUBLIC KEY-----
			MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwIVXBEJQa+rSulYub+DhCijvN
			SbzZltSG7T7q2uQrKEzxJ17QZ5cphLN0uwke11kkXxgAPV0kGEwLvRUocJ8c2Mjz
			bq912K7FiKxKZwVCbgsFqtNk9dzRxBFlQ2yU1vEOufWQpl8p1oC6Yr7opzDaqM6E
			SCmgaRk+VWdofD++dwIDAQAB
			-----END PUBLIC KEY-----`  //把之前生成的贴进来，实际开发过程中，可以是后台传过来的
			
			encryptor.setPublicKey(publicKey) // 设置公钥
			
			let rsaPassWord = encryptor.encrypt(that.pwd) // 对需要加密的数据进行加密
			// console.log(rsaPassWord)
		}
	},
	sockets:{
		 CONNECT(){
			 this.$socket.emit('emit_method', '123456')
		 },
		 MESSAGE(data){
			 console.log(data)
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

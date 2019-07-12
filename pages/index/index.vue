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
			key:'',
		}
	},
	created(){
		
	},
	onLoad() {
		this.$socket.emit('key', '');
		this.sockets.subscribe('key', (data) => {
			console.log(data)
			this.key = data
		});
		this.sockets.subscribe('message', (data) => {
			console.log(data)
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
			console.log(RSAUtils)
			if(this.user == '' || this.pwd == ''){
				return console.log('账号密码不能为空')
			}
			let that = this
			let encryptor = new JSEncrypt() // 新建JSEncrypt对象
			
			let publicKey = this.key
			
			encryptor.setPublicKey(publicKey) // 设置公钥
			var rsaPwd = encryptor.encrypt(that.pwd) // 对需要加密的数据进行加密
			this.$socket.emit('login', {pwd:rsaPwd,user:this.user})
		},
		
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

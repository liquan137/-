<template>
  <div>
    <div class="login-box">
      <div class="logo">
        <img src="../../../static/logo.png" alt="">
      </div>
      <div class="login-input">
        <div class="form-item">
          <label class="form-item-label" for=""><i class="iconfont icon-account"></i></label>
          <div class="form-item-input">
            <van-field border v-model="user" placeholder="请输入用户名"/>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div class="form-item">
          <label class="form-item-label" for=""><i class="iconfont icon-password"></i></label>
          <div class="form-item-input">
            <van-field type="password" border v-model="pwd" placeholder="请输入密码"/>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div class="form-item">
          <van-button type="danger" @click="login()" class="login-btn">登录or注册</van-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: '',
      pwd: '',
      key: '',
      message: '',
      middle: false
    }
  },
  created () {
    this.$socket.emit('key', '')
    this.sockets.subscribe('key', (data) => {
      this.key = data
    })
    this.sockets.subscribe('message', (data) => {
      this.$toast(data)
    })
    this.sockets.subscribe('msg', (data) => {
      console.log(data)
      data = JSON.parse(data)
      this.$toast(data.msg)
    })
  },
  methods: {
    login () {
      if (this.user === '' || this.pwd === '') {
        return this.$toast('账号密码不能为空')
      }

      let that = this
      let encryptor = new JSEncrypt() // 新建JSEncrypt对象
      let publicKey = this.key
      console.log(this.key)
      console.log(that.$crypto.MD5(that.pwd).toString())
      encryptor.setPublicKey(publicKey) // 设置公钥
      var rsaPwd = encryptor.encrypt(that.$crypto.MD5(that.pwd).toString()) // 对需要加密的数据进行加密
      this.$socket.emit('login', {pwd: rsaPwd, user: this.user})
    }
  }
}
</script>

<style scoped>
  .logo {
    text-align: center;
  }

  .login-box {
    padding-top: 100px;
    width: 100%;
    text-align: center;
  }

  .login-box .logo {
    text-align: center;
  }

  .login-input {
    width: 70%;
    margin: 0 auto;
  }

  .login-input::after {
    content: "";
    clear: both;
  }

  .form-item {
    margin: 25px 0;
  }

  .form-item::after {
    content: "";
    clear: both;
  }

  .form-item-input {
    float: left;
    width: calc(100% - 50px);
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
  }

  .form-item-label {
    float: left;
    line-height: 44px;
    width: 50px;
  }

  .login-btn {
    width: 100%;
  }
</style>

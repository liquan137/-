# yu-toast
仿 [HTML5+](http://www.html5plus.org/doc/zh_cn/nativeui.html#plus.nativeUI.toast)/[MUI](http://dev.dcloud.net.cn/mui/ui/#toast) 实现的自定义 toast 组件。
## 简介
uni-app 规范提供的 toast 都是居中显示的，没有类似 H5+/MUI 的那种底部 toast 模式。yu-toast 实现了多种模式的 toast 用于满足此类需求。
### 特性

* 支持底部、顶部、居中多模式的 toast
* 支持多个平台，App、H5、小程序。
* 多平台下，UI 风格保持一致。

### 缺点
页面发生切换时，toast 会跟随页面被覆盖，这一点的体验相对 uni 的 toast 要差一些，因为 uni 在多平台下调用的是系统的能力（H5 除外）。

### 其它选择
如果只是为了在 5+App 平台下使用底部的 toast，可以选择调用 5+API，比如这样：
```javascript
// #ifdef APP-PLUS
plus.nativeUI.toast('提示消息');
// #endif
```

## props
|参数|说明|类型|默认值|
|:-|:-|:-|:-|
|message|文本信息|String|''|
|duration|持续时间，单位为 ms。|Number|2000|
|verticalAlign|提示框在垂直方向的位置，详见下方说明。|String|bottom|
|backgroundColor|背景颜色|String|#000000|
|color|文本颜色|String|#FFFFFF|

组件的 Prop 一定要按照约定的类型传参，如果有的同学对 Vue 组件的 Prop 不熟悉的，可以看下相关文档：[Prop](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E7%B1%BB%E5%9E%8B)

### 传参示例
```html
<!-- 正确的写法 -->
<yu-toast :duration="3000"></yu-toast>
<!-- 错误的写法 -->
<yu-toast duration="3000"></yu-toast>
```
### verticalAlign
提示框在水平方向始终是居中的，verticalAlign 用于配置在垂直方向上的位置。

|值|说明|
|:-|:-|
|bottom|距离底部 50px|
|top|距离顶部 44px|
|center|距离底部的值为通过 uni.getSystemInfoSync() 获取到的 screenHeight 的一半|

## methods
|方法名|说明|
|:-|:-|
|show|显示 toast，持续 duration 的时长后自动消失。|

## 使用示例
下载完成后，将解压后的文件复制到 uni-app 项目目录中，如果是 cli 创建的项目则复制到 src 目录下。
```html
<template>
  <view>
    <yu-toast
      :message="message"
      verticalAlign="center"
      ref="toast"
    ></yu-toast>
    <button
      type="primary"
      @click="showToast"
    >showToast</button>
  </view>
</template>
<script>
import yuToast from '@/components/yu-toast/yu-toast'
export default {
  data() {
    return {
      message: '提示信息'
    }
  },
  components: {
    yuToast
  },
  methods: {
    showToast() {
      this.$refs.toast.show()
    }
  }
}
</script>
<style></style>
```
## Change Log
### v1.1.0

* perf: 组件的尺寸修改为 upx 单位，解决在部分设备上界面较小的问题。

### v1.0.0

* 发布 yu-toast

## 结束
如果在使用 yu-toast 组件的过程中遇到问题，或有其它建议，欢迎各位同学交流讨论。
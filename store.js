import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    SOCKET_CONNECT(state, status) {
      state.connect = true;
	  console.log("链接状态")
    },
	SOCKET_MESSAGE(state,message){
		state.message = message;
		console.log("收到消息")
	}
  },
  actions: {}
});
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({ //创建store对象
    state:{
        orderShow:false,  //订单详情
      //  shown:false,   //子级的提示信息
        dialogVisible:false  //提示弹窗的显示隐藏
    },
    mutations:{
        switch_dialog(state){   // 控制显示隐藏
            state.dialogVisible =state.dialogVisible?false:true;
        }
    },
    actions:{
        switch_dialog(context){   //异步提交事件
            context.commit('switch_dialog')
        }
    }
})
export default store
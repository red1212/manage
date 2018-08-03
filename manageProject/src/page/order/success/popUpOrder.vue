<template>
        <div class="popUp" style="left:0;top:190px;" v-loading="loadingOrder" @click="stopClose">
            <div class="userDetail">
                <h1 class="title">订单信息</h1>
                <p>所属区域 ： <span>{{order.areaCode}}</span></p>
                <p>ProjectID ： <span>{{order.projectId}}</span></p>
                <p>AD域 ： <span>{{order.adId}}</span></p>
                <p>桌面ID ： <span>{{order.desktopId}}</span></p>
                <p>服务器地址 ： <span>{{order.destinationIp}}</span></p>
                <span class="line"></span>
                <div class="extendInf">
                    <h1 class="title">计算机信息</h1>
                    <p>计算机名称 ： <span>{{order.computerName}}</span></p>
                    <p>配置信息 ： <span>{{order.hostConfigName}}</span></p>
                    <p>内外IP ： <span>{{order.hostIp}}</span></p>
                    <p>运行状态 ： <span>{{order.desktopStatus=="ACTIVE"?'开机': order.desktopStatus=="SHUTOFF" ?'关机': order.desktopStatus=="REBOOT"?'重启' :''}}</span>
                    </p>
                </div>
            </div>
            <div class="order_footer">
                <ul class="footer_ul" :class="{active:order.desktopStatus=='ACTIVE'}">
                  <li @click="setItem">
                      <i class="icon iconfont icon-chongqi" :class="{closeIcon:order.desktopStatus!='ACTIVE'}"></i>
                     <i v-if="order.desktopStatus=='ACTIVE'">关机</i>                 
                    <i v-else>开机</i>
                  </li>
                  <li @click="setItem"><i class="icon iconfont icon-denglu"></i>登录</li>
                  <li @click="setItem"><i class="icon iconfont icon-lvzhou_zhongqi"></i>重启</li>
                </ul>  
            </div>
            <!-- 开机关机      -->
        </div> 
</template>
<script>
import {stopPropagation} from '@/mixins/stopPropagation.js'
export default {
    mixins:[stopPropagation], //阻止冒泡事件
    data(){
        return{
            loadingOrder:false
        }
    },
    props:{
        order:{
            type:Object
        }
    },
    // computed:{   父组件数据的变化可以在这里监听到
    //     cc:function(){
    //        return this.order.desktopStatus;           
    //     }
    // },
    mounted(){
        this.loadingOrder=true;
    },
     //监听数据是否加载完成哈哈
    watch:{
        order(newValue,oldValue){         
            if(newValue.hostIp){
                this.loadingOrder=false;
            }
        }
    }, 
    methods:{
        setItem(e){
            let data = e.target.innerText;
            this.$emit('setItem',data) //给orderItem传递过去点击了哪一个按钮
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
@import '@/assets/style/popUp.scss';
.footer_ul{
    display: flex;
   @include he(50px,50px);
    text-align: center;
    @include active(#fff,#646980);
    li{
        flex: 1;
        cursor: pointer;
    }
    .icon{margin-right: 10px;}
    .iconfont{font-size:20px;}
    .closeIcon{color:$color_9bff45}
}
.active{
    @include active(#fff,$color_7D8EDA);
}
</style>

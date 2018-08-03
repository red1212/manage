<template>
    <div>
        <div class="popUp" id="pop1" @click="stopClose" v-loading="loadPop">
            <div class="userDetail">
                <div class="extendInf">
                    <p>姓名 ： <span>{{formInline.userIdentificationName}}</span></p>
                    <p>公司 ： <span>{{formInline.userOrganization}}</span></p>
                    <p>账号 ： <span>{{formInline.userName}}</span></p>
                    <p>订单状态 ： <span>{{status}}</span></p>
                    <p>订单操作 ： 
                                <input type="number" v-model="formInline.delayTime" style="width: 50px;text-align: center;margin-right: 5px;color: #7D8EDA;">天
                    </p>
                    <p>购买时间 ： <span>{{formInline.buyTime}}</span></p>
                    <p>产品类型 ： <span>{{formInline.productName}}</span></p>
                    <p>产品名称 ： <span>{{formInline.componentNames}}</span></p>
                    <p>购买时长 ： <span>{{formInline.presetTime}}</span></p>
                    <p>剩余时长 ： <span>{{formInline.remainTime}}</span></p>
                    <p>开通使用时间 ： <span>{{formInline.beginTime}}</span></p>
                     <p>结束时间 ： <span>{{formInline.expireTime}}</span></p>
                </div>
            </div>
            <div class="btngroup">
                <el-button type="primary el-button--primary-OK" @click="$store.state.dialogVisible= true">确定</el-button>
                <el-button type="info el-button--primary-NO"  @click="close">取消</el-button>
            </div>                    
        </div>
        <div class="btn" v-show="$store.state.dialogVisible">
            <div class="btnConten fix">
               <div class="el-dialog__header">
                   <span class="el-dialog__icon"><img src="@/assets/images/icon/tip.png"></span>
                </div>
                <div class="el-dialog__body"><div data-v-3d8734d2="">是否保存修改</div> </div>
                <div class="btngroup">            
                    <el-button type="primary el-button--primary-OK" @click="dialogOK">确 定</el-button>
                    <el-button type="info el-button--primary-NO" @click="dialogNo">取 消</el-button>
                </div>
            </div>        
        </div>
            
    </div>
</template>
<script>
import {mapActions} from 'vuex'  
import {stopPropagation} from '@/mixins/stopPropagation.js'
export default {
    mixins:[stopPropagation], //阻止冒泡事件
    data(){
        return{
            status:'',
            loadPop:false
        }
    },
    props:{
        formInline:{
            type:Object
        }
    },
    mounted(){
        this.loadPop=true;
    },
    watch:{
        formInline(newValue,oldValue){
            if(newValue){
                switch(newValue.status){
                    case 'VALID':
                    this.status = '成功';
                    break;
                    case 'Failed':
                    this.status = '失败';
                    break;
                    case 'Invalid':
                    this.status = '创建中';
                    break;
                }
                 this.loadPop=false;
            }         
        }
    },
    methods:{ 
        dialogOK(){
            this.$store.dispatch('switch_dialog').then(() =>{
                console.log('我是确定按钮'); 
            })
            this.$emit('dialogOK',this.formInline)
        },
        dialogNo(){
             this.$store.dispatch('switch_dialog').then(() =>{
                console.log('我是取消按钮');
            })
            this.$emit('close','')
        }
        // closeDialogVisible(){
        //     $store.state.dialogVisible = false;
        //    // this.dialogVisible = !this.dialogVisible;
        //    this.$emit('closeDialogVisible','')
        // }
        ,
        close(){
            this.$emit('close','')
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
@import '@/assets/style/popUp.scss';
@import '@/assets/style/button.scss';
</style>

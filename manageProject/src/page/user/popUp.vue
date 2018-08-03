<template>
    <div>
        <div class="popUp" v-loading="loadPop" @click="stopClose">
            <div class="userDetail">
                <h1 class="title">基本信息</h1>
                <p>姓名 ： <span>{{itemList.userNickName}}</span></p>
                <p>账号 ： <span>{{itemList.userName}}</span></p>
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="公司 ：">
                        <el-input v-model="itemList.userOrganization"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号 ：">
                        <el-input v-model="itemList.userMobileNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱 ：">
                        <el-input v-model="itemList.userEmail"></el-input>
                    </el-form-item>
                     <!-- <p>状态 ： <span v-if="itemList.operateStatus == 'NORMAL'">正常</span>
                                <span v-if="itemList.operateStatus == 'FORBID'">禁用</span>
                                <span v-if="itemList.operateStatus == 'DEFRIEND'">黑名单</span>
                     </p> -->
                    <p>订单操作 ： 
                        <el-form class="demo-form-inline" style="display: inline-block;line-height: 20px;height: 20px;">
                            <el-form-item>
                                <el-select v-model="itemList.operateStatus" placeholder="订单时间">
                                    <el-option label="正常" value="NORMAL"></el-option>
                                    <el-option label="禁用" value="DISABLE"></el-option>
                                    <el-option label="黑名单" value="BLOCK"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </p>                    
                </el-form>
                <span class="line"></span>
                <div class="extendInf">
                    <h1 class="title">扩展信息</h1>
                    <p>密码 ： <span>{{itemList.userLoginPassword}}</span></p>
                    <p>身份证号 ： <span>{{itemList.userIdentificationName}}</span></p>
                    <p>登录次数 ： <span>{{itemList.loginCount}}</span></p>
                    <p>注册时间 ： <span>{{itemList.strUserCreateTime}}</span></p>
                    <p>最后IP ： <span>{{itemList.terminalIp}}</span></p>
                    <p>最后登录时间 ： <span>{{itemList.lastLoginTime}}</span></p>
                    <!-- <p>是否禁用 ：<el-radio v-model="radio1" label="1">是</el-radio><el-radio v-model="radio1" label="2">否</el-radio></p>
                    <p>是否黑名单 ：<el-radio v-model="radio2" label="1">是</el-radio><el-radio v-model="radio2" label="2">否</el-radio></p> -->
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
                    <el-button type="primary el-button--primary-OK" @click.stop="dialogOK">确 定</el-button>
                    <el-button type="info el-button--primary-NO" @click="dialogNo">取 消</el-button>
                </div>
            </div>        
        </div>
            
    </div>
</template>
<script>
import {stopPropagation} from '@/mixins/stopPropagation.js'
export default {
    mixins:[stopPropagation],  //阻止冒泡事件
    data(){
        return{
            radio1:'',
            radio2:'',
            loadPop:false
        }
    },
    props:{   
        itemList:{    //父组件传递过来的用户详情信息
            type:Object,
            required:true
        }
    }, 
    mounted(){
        //this.loadPop=true;
    },
    watch:{  //监听父组件传递过来的信息
        // itemList(newValue,oldValue){
        //     if(newValue){
        //         switch(newValue.operateStatus){
        //             case 'NORMAL':
        //             this.radio1 = '2';
        //             this.radio2 = '2';
        //             break;
        //             case 'FORBID':
        //             this.radio1 = '1';
        //             this.radio2 = '2';
        //             break;
        //             case 'DEFRIEND':
        //             this.radio1 = '2';
        //             this.radio2 = '1';
        //             break;
        //         }
        //         this.loadPop=false;
        //     }
            
        // }
    },
    methods:{ 
        dialogOK(){
            this.$store.dispatch('switch_dialog').then(() =>{
                console.log('我是确定按钮');
            })
            this.$emit('dialogOK',this.itemList)
        },
        dialogNo(){
             this.$store.dispatch('switch_dialog').then(() =>{
                console.log('我是取消按钮');
            })
            this.$emit('close','')
        },
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

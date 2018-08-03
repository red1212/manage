<template>
    <div>
        <div class="popUp" style="" @click="stopClose">
                     <div v-if="tabindexs==0">
                        <div class="userDetail">
                            <div class="extendInf">
                                <div class="commonTitle">USB授权</div>
                                <div class="checkBox">
                                    <el-checkbox-group v-model="USBList">
                                        <div class="checkRow">
                                            <el-checkbox label="usb_image_enable">图像设备</el-checkbox>
                                            <el-checkbox label="usb_storage_enable">存储设备</el-checkbox>
                                        </div>
                                    <div class="checkRow">
                                            <el-checkbox label="usb_video_enable">视频设备</el-checkbox>
                                            <el-checkbox label="usb_smart_card_enable">智能卡设备</el-checkbox>
                                    </div>
                                    <div class="checkRow">
                                            <el-checkbox label="usb_printer_enable">打印设备</el-checkbox>
                                    </div>
                                        
                                    </el-checkbox-group>
                                </div> 
                            </div>
                        </div>
                    </div>
                   
                    <div v-if="tabindexs==1">
                        <div class="userDetail">
                            <div class="extendInf">
                                <div class="commonTitle">打印机</div>
                                <div class="tagSwitch" style="padding-left: 55px;margin:50px 0px;">
                                    <el-switch
                                        style="display: block"
                                        v-model="printerList"
                                        active-color="#7D8EDA"
                                        inactive-color="#ccc"
                                        active-text="开"
                                        inactive-text="关">
                                    </el-switch>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="tabindexs==2">
                       <div class="userDetail">
                            <div class="extendInf">
                                <div class="commonTitle">文件传输授权</div>
                                  <el-radio-group v-model="fileList" style="margin:50px 0px;">
                                    <el-radio label="READ_ONLY">只读</el-radio>
                                    <el-radio label="READ_AND_WRITE">读写</el-radio>
                                    <el-radio label="DISABLED">禁用</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div v-if="tabindexs==3">
                        <div class="userDetail">
                            <div class="extendInf">
                                <div class="commonTitle">剪切板授权</div>
                                  <el-radio-group v-model="cutList">
                                        <p><el-radio label="SERVER_TO_CLIENT_ENABLED">开启服务端到客户端</el-radio></p>
                                        <p><el-radio label="CLIENT_TO_SERVER_ENABLED">开启客户端到服务端</el-radio></p>
                                        <p><el-radio label="TWO_WAY_ENABLED">开启双向</el-radio></p>
                                        <p><el-radio label="DISABLED">禁用</el-radio></p>
                                  </el-radio-group>
                            </div>
                        </div>
                    </div> 
                    <div class="btngroup">
                        <el-button type="primary el-button--primary-OK" @click="Submit()">确定</el-button>
                        <el-button type="info el-button--primary-NO" @click="close">取消</el-button>
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
            USBList:[],
            printerList:'',
            fileList:'',
            cutList:''
        }
    },
    props:{
        tabindexs:{type:Number},
        USB:{type:Array},
        PrinTer:{type:Boolean},
        FILE:{type:String},
        clipboardRedirection:{type:String},
        tabIndex1:{type:Number}
    },
     watch: {
        USB: function (newUSB) {
           this.USBList=newUSB;
           console.log(this.USBList)
        },
        PrinTer :function(newPrinter){
            this.printerList= newPrinter;
        },
        FILE:function(newFile){
            this.fileList=newFile
        },
        //剪切板
        clipboardRedirection:function(newCut){
            this.cutList=newCut
        }
    },
    methods:{
        Submit(){
            let arrlist = {
                tabindexs:this.tabindexs,
                USBList:this.USBList,
                PrinTer:this.printerList,
                fileList:this.fileList,
                clipboardRedirection:this.cutList,
                tabIndex1:this.tabIndex1
            }
            this.$emit('Submit',arrlist)
        },
        close(){
            this.$emit('close','')
        }
    }
}
</script>
<style>
.popUp{
    left:0;
    top:190px;
}
</style>



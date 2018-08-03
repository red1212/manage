<template>
    <div class="checkBox">
        <el-checkbox-group v-model="UsbItem" @change="change()">
            <div class="checkRow">
                <!-- {{usb}}                 -->
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
</template>
<script>
export default {
    data(){
        return{
            UsbItem:[]
        }
    },
     props:{
        ListItem:{type:Object},
        CommonIndex:{type:Number}
    },
     mounted(){
        if(this.ListItem !=null){
            let usb_port=this.ListItem.usb_port_redirection.options;
            if(usb_port.usb_image_enable){  //usb
                this.UsbItem.push("usb_image_enable");
            }
            if(usb_port.usb_printer_enable){      //打印机
                this.UsbItem.push("usb_printer_enable");
            }               
            if(usb_port.usb_smart_card_enable){      //智能卡
                this.UsbItem.push("usb_smart_card_enable");
            } 
            if(usb_port.usb_storage_enable){      //存储
                this.UsbItem.push("usb_storage_enable");
            } 
            if(usb_port.usb_video_enable){      //视频
                this.UsbItem.push("usb_video_enable");
            }
        }
    },
        //监听数据然后可以修改父组件传递过来的数据
    watch: {
        ListItem:function(newval){
            this.UsbItem= newval;  
            console.log(this.UsbItem)         
        },
        // usb: function (newTypeId) {
        //     console.log(newTypeId)
        //     this.USBList=newTypeId
        // }
    },
    methods:{
        change(){
            let obj = {
                index:this.CommonIndex,
                UsbItem:this.UsbItem,
                tabIndex:0
            }
            this.$emit('change',obj)
        }
    }
}
</script>
<style lang="scss" scoped>
.checkRow{
    margin-bottom:16px;
}
</style>


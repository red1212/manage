<template>
    <div class="userItem">
        <searchBox @searchItem="searchItem"></searchBox>       
            <ul class="itemList" v-loading="showPage.loading">
                <li v-if="searchList" style="padding-left:0;padding-bottom:0;padding-right:0;" v-for="(item,i) in lists" :key="i" >
                    <div class="userDetail">
                        <dl style="margin-left:20px;">
                            <dt><em class="userImage"><img src="@/assets/images/icon/Group.png"></em></dt>
                            <dd>                           
                                <p @click="goPage(i)"><span>账号 : </span><span class="code">{{item.userName}}</span><span v-if="item.desktopCount>1" class="circle">{{item.desktopCount}}</span></p>                                    
                                <p style="margin-bottom:14px;"><span>公司 : </span>{{item.userOrganization}}</p>
                                <p><span>姓名 : </span>{{item.userIdentificationName}}</p>
                            </dd>
                        </dl>
                        <common-footer>
                            <dl class="strategy-dl" slot="firstPage" v-if="postTitle=='all'">
                                <dd v-for="(tab,index) in iconList" :key="index" @click.stop="tagPop(index,i)">
                                    <i :class="[tabIndex == index && tabIndex1 == i ? 'iconColor' : '',tab.name]" class="icon iconfont" ></i>
                                </dd>
                            </dl>
                           
                            <!-- USB授权 -->
                            <USB slot="USB" v-if="postTitle=='USB'" :ListItem="item.desktopInfoList[0].policies" :CommonIndex="i"  @change="change" class="pdTop"></USB>
                            <!-- 打印机 -->
                            <printer slot="Printer" v-if="postTitle=='Printer'" :ListItem="item.desktopInfoList[0].policies" :CommonIndex="i"  @change="change" class="pdTop"></printer>
                               
                            <!-- 文件传输 -->
                            <File slot="File" v-if="postTitle=='File'" :ListItem="item.desktopInfoList[0].policies" :CommonIndex="i" @change="change" class="pdTop"></File>
                            <!-- 剪切板 -->
                            <Cut slot="Cut" v-if="postTitle=='Cut'" :ListItem="item.desktopInfoList[0].policies" :CommonIndex="i" @change="change" class="pdTop Cut"></Cut>                           
                        </common-footer>
                            
                    </div>
                    <!-- 弹窗 -->
                    <popUp :lists="lists" v-if="item.flag && tabIndex1 == i" @Submit="Submit" @close="close" 
                    :tabIndex1="tabIndex1" 
                    :tabindexs="tabIndex" 
                    :USB="usb" 
                    :PrinTer="printer_redirection" 
                    :FILE="fileRedirection" 
                    :clipboardRedirection="clipboardRedirection">
                    </popUp>
                </li>
                <!-- 点击搜索后出现的 -->
                <li v-if="searchLists">
                    <div class="userDetail">
                        <dl style="margin-left:20px;">
                            <dt><em class="userImage"><img src="@/assets/images/icon/Group.png"></em></dt>
                            <dd>                           
                                <p><span>计算机名 : </span><span class="code">哈哈</span></p>                                    
                                <p style="margin-bottom:14px;"><span>账号 : </span>123456</p>
                                <p style="margin-bottom:14px;"><span>开通时间 : </span>1234</p>
                                <p style="margin-bottom:14px;"><span>结束时间 : </span>1234</p>
                            </dd>
                        </dl>
                        <div class="extendInf">
                             <common-footer>
                                <dl class="strategy-dl" slot="firstPage" v-if="postTitle=='all'">
                                    <dd v-for="(tab,index) in iconList" :key="index" @click.stop="tagPop(index,i)">
                                        <i :class="[tabIndex == index && tabIndex1 == i ? 'iconColor' : '',tab.name]" class="icon iconfont" ></i>
                                    </dd>
                                </dl>
                                <!-- USB授权 -->
                                <USB slot="USB" v-if="postTitle=='USB'" :usb="usb" :CommonIndex="i"  @change="change" class="pdTop"></USB>
                                <!-- 打印机 -->
                                <printer slot="Printer" v-if="postTitle=='Printer'" :printer_redirection="printer_redirection" :CommonIndex="i"  @change="change" class="pdTop"></printer>
                               
                                <!-- 文件传输 -->
                                <File slot="File" v-if="postTitle=='File'" :fileRedirection="fileRedirection" :CommonIndex="i" @change="change" class="pdTop"></File>
                                <!-- 剪切板 -->
                                <Cut slot="Cut" v-if="postTitle=='Cut'" :clipboardRedirection="clipboardRedirection" :CommonIndex="i" @change="change" class="pdTop Cut"></Cut>                           
                            </common-footer>
                        </div>                          
                    </div>
                </li>
            </ul>
        
    </div>
</template>

<script>
import {
    getUserList,
    SearchUserList,
    getStrategyByDesktopId,
    updateUsbStrategy,
    updatePrinterStrategy,
    updateFileStrategy,
    updateClipboardStrategy
} from "@/api/api.js";
import {stopPropagation} from '@/mixins/stopPropagation.js'
import {changeInfo} from '@/utils/strategyCommon.js';
import searchBox from "./search.vue";
import '@/script/jquery-3.0.0.min';
import commonFooter from './itemList.vue';
//import ALL from './all/allList.vue';
import USB from './USB/USBList.vue';
import Printer from './Printer/PrinterList.vue';
import File from './file/FileList.vue';
import Cut from './cut/CutList.vue';
import popUp from './popUp.vue';
import dowLoad from '@/utils/loadMore.js';
let itemIndex ='';  //全局变量控制弹窗的显示隐藏
export default {
  mixins:[stopPropagation],  //阻止冒泡事件
  name: "",
  data() {
    return {
        searchList:true,
        searchLists:false,
        showPage:{
            showMore:false,
            currentPage: '1',
            pageSize:'20',
            loading:false,
            isFinished:false
        },
        usb:[],  //usb
        printer_redirection:'',  //打印机
        fileRedirection:'', //文件传输
        clipboardRedirection:'', //剪切板
        lists:[],
        tabIndex:-1,
        tabIndex1:-1,
        iconList:[
            {index:0,name:'icon-USB'},
            {index:1,name:'icon-dayinji'},
            {index:2,name:'icon-wenjianchuanshu'},
            {index:3,name:'icon-jianqieban'},
            {index:4,name:'icon-yu'}
        ]
    };
  },
  props:{
        postTitle:{type:String}
  },
  components: {
    popUp,
    searchBox,
    //ALL,
    USB,
    Printer,
    File,
    Cut,
    commonFooter
  },
  mounted(){
    this.lists=[];
    this.getLIst();  //加载列表信息
    $(window).scroll(this.dowLoadMore);//监听滚动事件 
  },
  methods:{
    //获取列表信息
    async getLIst(){
         try{
             this.showPage.loading = true;
            let params={
                userStatus:0,
                policy:true,
                page: this.showPage.currentPage,
                size: this.showPage.pageSize
            }
            
            let res = await getUserList(params);
            let {code,message,data} = res.data;
            if(code == 200){
                let list = data.map((item) =>{   //map映射需要有return 返回值，不然都会被映射成undefined
                    return Object.assign({},item,{
                        flag:false, //控制弹窗
                    })
                });
                this.lists = this.lists.concat(list);  //加载更多数据的拼接                   
                if(list.length < this.showPage.pageSize){
                    this.showPage.isFinished = true;
                }
                this.showPage.showMore = true
                this.showPage.loading = false;
            }
            else{
                this.$message({
                    message: message,
                    type: 'warning'
                });
            }
         }catch(err){
            console.log('获取数据失败',err)
         }
          
    },

      //点击图标出现的弹窗--------------------------------------
      tagPop(index,i){
        //置空
        this.usb =[]; //USB
        this.printer_redirection=''; //打印机
        this.fileRedirection=''; //文件传输
        this.clipboardRedirection=''; //剪切板 
        this.tabIndex = index ; //当前点击的图标的索引值
        this.tabIndex1 = i;   //指定点击当前父级的索引值  
        itemIndex = i ;
        this.lists[itemIndex].flag=true;    
        if(this.lists[i].desktopCount<2 && this.lists[i].desktopInfoList.length){         
            let params={
                "desktopId":this.lists[i].desktopInfoList[0].desktopId,
                "projectId":this.lists[i].desktopInfoList[0].projectId
            }
            getStrategyByDesktopId(params).then(res =>{
                let {code,message,data} = res;          
                if(code == 200){

                    //文件传输
                    this.fileRedirection = data.file_redirection.redirection_mode;

                    //剪切板
                    this.clipboardRedirection =data.clipboard_redirection;

                    //打印机
                    this.printer_redirection = data.printer_redirection.enable;

                    //USB
                    let usb_port = data.usb_port_redirection.options;
                    if(usb_port.usb_image_enable){  //usb
                        this.usb.push("usb_image_enable");
                    }
                    if(usb_port.usb_printer_enable){      //打印机
                        this.usb.push("usb_printer_enable");
                    }               
                    if(usb_port.usb_smart_card_enable){      //智能卡
                        this.usb.push("usb_smart_card_enable");
                    } 
                    if(usb_port.usb_storage_enable){      //存储
                        this.usb.push("usb_storage_enable");
                    } 
                    if(usb_port.usb_video_enable){      //视频
                        this.usb.push("usb_video_enable");
                    } 
                }else{
                    this.$message({
                        message: message,
                        type: 'warning'
                    });
                }
            })
        }   
        this.bodyClick();
      },
       //查询-----------------------------------------------------
        async searchItem(v){
            //如果都为空不请求数据
            if(!v.code && !v.companyName && !v.computer){
                return false
            }
            this.showPage.currentPage = 1;
            let params = {
                "userStatus":0,
                policy:true,
                "userName":v.code,                   //账号
                "userOrganization": v.companyName, //公司
                "page":this.showPage.currentPage,        //页码
                "size": this.showPage.pageSize           //显示的数量
            }
            this.showPage.loading = true;
            let res = await SearchUserList(params);
            let {code,message,data} = res.data;
            if(code == 200){
                let list = data.map((item) =>{
                    return Object.assign({},item,{
                        flag:false, //控制点击设置按钮的弹窗
                    })
                })
                //后台添加计算机名的搜索
                // if(v.computer){
                //    console.log('请输入')
                //    this.searchList = false
                //    this.searchLists = true
                // }else{
                //     this.searchLists = false
                // }
                this.lists = []; //清空加载的数据  渲染的是一开始进来显示的
                this.lists = this.lists.concat(list);  //加载更多数据的拼接                   
                if(list.length < this.pageSize){
                    this.showPage.isFinished = true;
                }
                this.showPage.showMore = true
                this.showPage.loading = false;
            }else{
                this.$message({
                    message: message,
                    type: 'warning'
                });
            }
        },

    //监听子组件修改后的数据----------------------------------
    change(v){
        let i = v.index,
            USBList=v.UsbItem,//USB
            printerList = v.printerRedirection,//打印机
            file = v.childFileRedirection,  //文件传输
            cut = v.clipboard_Redirection; //剪切板
        //USB
        if(v.tabIndex == 0){
        this.UsbFun(i,USBList); //usb的修改信息
        };
        //打印机
        if(v.tabIndex == 1){
            this.PrinterFun(i,printerList) //修改打印机的函数 
        };
        //文件传输
        if(v.tabIndex == 2){
            this.fileFun(i,file) //修改文件传输的函数   
        };
        //剪切板
        if(v.tabIndex == 3){
            this.cutFun(i,cut)          
        };
           
    },

    //修改弹窗的信息-------------------------------------------
    Submit(item){
        let i = item.tabIndex1,
            USBList=item.USBList,//USB
            printerList = item.PrinTer,//打印机
            file = item.fileList,  //文件传输
            cut = item.clipboardRedirection; //剪切板
        //USB
        if(item.tabindexs == 0 && this.lists[i].desktopInfoList.length){
            this.UsbFun(i,USBList); //usb的修改信息
        }
        //打印机
        if(item.tabindexs == 1){
            this.PrinterFun(i,printerList) //修改打印机的函数 
        }
        //文件传输
        if(item.tabindexs == 2){
            this.fileFun(i,file) //修改文件传输的函数
        }
        //剪切板授权
        if(item.tabindexs == 3){
            this.cutFun(i,cut)
        }
    },
    //USB-------------------------------------------------------
    UsbFun(i,USBList){
        let usb_image_enable = false,
            usb_video_enable=false,
            usb_storage_enable=false,
            usb_smart_card_enable=false,
            usb_printer_enable=false,
            params="";

        USBList.forEach(item =>{
            if(item.indexOf("usb_image_enable") >-1){
                usb_image_enable = true;
            }
            if(item.indexOf("usb_printer_enable") >-1){
                usb_printer_enable = true;
            }
            if(item.indexOf("usb_smart_card_enable") >-1){
                usb_smart_card_enable = true;
            }
            if(item.indexOf("usb_storage_enable") >-1){
                usb_storage_enable = true;
            }
            if(item.indexOf("usb_video_enable") >-1){
                usb_video_enable = true;
            }
        })
        let params1 = {
            "desktopId":this.lists[i].desktopInfoList[0].desktopId,
            "projectId": this.lists[i].desktopInfoList[0].projectId,
            "usbImageEnable":usb_image_enable,
            "usbPrinterEnable":usb_printer_enable,
            "usbSmartCardEnable":usb_smart_card_enable,
            "usbStorageEnable":usb_storage_enable,
            "usbVideoEnable":usb_video_enable
        },
        params2 = {
            "usbImageEnable":usb_image_enable,
            "usbPrinterEnable":usb_printer_enable,
            "usbSmartCardEnable":usb_smart_card_enable,
            "usbStorageEnable":usb_storage_enable,
            "usbVideoEnable":usb_video_enable,
            "userId":this.lists[i].userId,
        };
        changeInfo(params1,params2,this.lists[i].desktopCount,updateUsbStrategy,this.close()) //修改信息的函数    
    },
    //打印机--------------------------------------------------
    PrinterFun(i,printerList){
        let params1 = {
            "desktopId":this.lists[i].desktopInfoList[0].desktopId,
            "projectId": this.lists[i].desktopInfoList[0].projectId,
            "enable":printerList
        },
        params2 = {
            "userId":this.lists[i].userId,
            "enable":printerList
        };
         //params1,params2,当前的计算机数量，请求的接口
        changeInfo(params1,params2,this.lists[i].desktopCount,updatePrinterStrategy,this.close()) //修改信息的函数
    },
    //文件传输-----------------------------------------------------
    fileFun(i,file){
        let params1 = {
            "desktopId":this.lists[i].desktopInfoList[0].desktopId,
            "projectId": this.lists[i].desktopInfoList[0].projectId,
            "redirectionMode":file
        },
        params2 = {
            "userId":this.lists[i].userId,
            "redirectionMode":file
        };
                                    //params1,params2,当前的计算机数量，请求的接口
        changeInfo(params1,params2,this.lists[i].desktopCount,updateFileStrategy,this.close()) //修改信息的函数
    },
    //剪切板---------------------------------------------------------
    cutFun(i,cut){
        let params1 = {
            "desktopId":this.lists[i].desktopInfoList[0].desktopId,
            "projectId": this.lists[i].desktopInfoList[0].projectId,
            "clipboardRedirection":cut
        },
        params2 = {
            "userId":this.lists[i].userId,
            "clipboardRedirection":cut
        };
        //params1,params2,当前的计算机数量，请求的接口
        changeInfo(params1,params2,this.lists[i].desktopCount,updateClipboardStrategy,this.close()) //修改信息的函数
    },
      //点击取消按钮----------------------------------------------------------
    close(){
        if(this.lists[itemIndex]){
            this.lists[itemIndex].flag=false   //点击取消按钮  
            this.tabIndex=-1;      //重置当前的选着按钮
            this.tabIndex1=-1;  
        }          
    },
    //点击body以外的区域弹窗消失-----------------------------------------
    bodyClick(){    
        let body = document.querySelector('body')
        body.addEventListener('click',(e)=>{
            if(this.lists[itemIndex].flag){
                this.lists[itemIndex].flag=false;
                //重置当前的选着按钮
                this.tabIndex=-1; 
                this.tabIndex1=-1;    
            }
        })
    },
    //点击账号页面的跳转如果计算机数量超过一台------------------------------------
    goPage(i){    
        if(this.lists[i].desktopCount>=2){
           this.$router.push({
                path: '/itemChild',
                query:{
                    postTitle:this.postTitle,
                    userName:this.lists[i].userName
                }
            })
        }
    },
    //加载更多--------------------------------------------------------------------
    dowLoadMore(){
        //根据是否全部加载完成，判断是否继续监听页面的滚动事件
        if(!this.showPage.isFinished){
            if (($(window).height() + $(window).scrollTop() + 430) > $(document).height()) {
                if (this.showPage.showMore) {
                this.showPage.showMore = false;
                this.showPage.currentPage++;
                //获取列表
                this.getLIst();
                }
            }
        }
    },
  }
};
</script>


<style lang="scss">
@import '@/assets/style/mixin.scss';
@import "@/assets/style/item.scss";
@import '@/assets/style/popUp.scss';
@import '@/assets/style/button.scss';
.commonTitle{
    @include sc(16px,#333);
    margin-bottom:20px;
}

.pdTop{
    padding:30px;
}
.checkRow{
    margin-bottom: 16px;
}
.circle{
    width: 16px;
    height: 16px;
    color:#fff;
    background: #7D8EDA;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
    border-radius: 50%;
    margin-left: 10px;
}
</style>

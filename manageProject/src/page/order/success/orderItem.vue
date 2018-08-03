<template>
    <div class="userItem">
        <orderSearch :formInlines="formInlines" @searchItem="searchItem"></orderSearch>
        <ul class="itemList" v-loading="loading">
            <li v-for="(item,index) in lists" :key="index" >
                <div class="userDetail">
                    <dl>
                        <dt><em class="userImage"><img src="@/assets/images/icon/Group.png"></em></dt>
                        <dd>
                            <p>订单号 : <span style="color: #7D8EDA;font-weight:700" @click.stop="orderShow(index)">{{item.subsId}}</span>
                                <span class="state" v-if="postTitle=='valid' && item.status=='VALID'" style="background:#85ce61;">成功</span>
                                <span class="state" v-if="item.status=='INVALID'" style="background:#3FB1E5;">创建中</span>
                                <span class="state" v-if="item.status=='FAILED'" style="background:#F65A5A;">失败</span>
                                <span class="state" v-if="postTitle=='EXPIRED'" style="background:#F29A1A;">过期</span>
                                <span class="state" v-if="item.status=='DELETE'" style="background:#888888;">删除</span>
                            </p>
                            <p><span>账号 : </span><span class="code">{{item.userName}}</span></p>
                            <p style="padding-bottom:14px;">{{item.userIdentificationName}}</p>
                            <p>{{item.userOrganization}} <i class="iconfont icon-shezhi" @click.stop="closeDialogVisible(index)"></i></p>
                        </dd>
                    </dl>
                </div>
                <!-- 点击设置显示的弹窗            -->
                <popUp :formInline="formInline" v-if="item.flag" @close="close" @dialogOK="dialogOK"></popUp>
                <!-- 点击订单号显示的弹窗 -->
                <orderUp :order='order' v-if="item.show" @setItem="setItemON"></orderUp>   
            </li>
        </ul>
    </div>
</template>
<script>
import {getOrderList,SearchOrderList,OrderDetail,OrderDetailDo,operateDesktop,OrderDetailDos,updateSubDetailInfo} from '@/api/api'
import popUp from './popUp';
import '@/script/jquery-3.0.0.min'
import '@/script/protocolcheck.js'
import orderUp from './popUpOrder';
import orderSearch from './orderSearch'
import Qs from 'qs'
let itemIndex=''; //全局的index
import setPop from '@/utils/closePop.js'  //点击弹窗以外的区域弹窗消失
export default {
    props:{
        postTitle:{type:String},
        formInlines:{
            type:Object
        }
    },
    data(){
        return{
            formInline:{},
            order:{},     //订单详情
            lists:[],    //订单展示列表
            panelShow: false,
            showMore:false,
            currentPage: '1',
            pageSize:'20',
            loading:false,
            isFinished:false,
            status:''   //控制开机关机的状态
        }
    },  
    created(){
        this.lists = []; //清空加载的数据
        //获取订单列表
        this.getOrderItem();
        $(window).scroll(this.dowLoadMore);//监听滚动事件       
    },
    computed:{
        cc:function(){
            this.lists.forEach(item =>{
                
            })


        }
    },
    components:{
        popUp,
        orderUp,
        orderSearch
    },
    methods:{
        //获取订单列表使用异步加载
      async getOrderItem(){
           let params={
               "status":this.postTitle,
               "page": this.currentPage,
               "size": this.pageSize
           }
           this.loading = true;
           let res = await getOrderList(params);
              let{code,message,data} = res.data;
              if(code == 200){
                   let list = data.map((item) =>{
                        return Object.assign({},item,{
                            flag:false, //控制点击设置按钮的弹窗
                            show:false //控制点击订单号的弹窗
                        })
                    })
                    this.lists = this.lists.concat(list);  //加载更多数据的拼接
                    if(list.length < this.pageSize){
                       this.isFinished = true;
                    }
                    this.showMore = true
                    this.loading = false;
              }else{
                this.$message({
                    message: message,
                    type: 'warning'
                });
              }
       },

        //订单查询
       async searchItem(v){
           try{
                //如果都为空不请求数据
            if(!v.order && !v.code && !v.user && !v.companyName){
                return false
            }
                this.currentPage = 1;
                let params = {
                    "status":this.postTitle,
                    "subsId" : v.order,  //订单号
                    "userName" : v.code,  //账号
                    "userIdentificatueionName" : v.user,  //用户名
                    "userOrganization": v.companyName,     //公司名
                    "page": this.currentPage,
                    "size": this.pageSize
                }
                this.loading = true;
                let res = await SearchOrderList(params);
                let {code,message,data} = res.data;
                if(code == 200){
                    let list = data.map((item) =>{
                        return Object.assign({},item,{
                            flag:false, //控制点击设置按钮的弹窗
                            show:false //控制点击订单号的弹窗
                        })
                    })
                    this.lists = []; //清空加载的数据
                    this.lists = this.lists.concat(list);  //加载更多数据的拼接                   
                    if(list.length < this.pageSize){
                        this.isFinished = true;
                    }
                    this.showMore = true
                    this.loading = false;
                }else{
                    this.$message({
                        message: message,
                        type: 'warning'
                    });
                }
           }catch(err){
               console.log('获取数据失败',err)
           }
        },

        //加载更多
        dowLoadMore(){
            //根据是否全部加载完成，判断是否继续监听页面的滚动事件
            if(!this.isFinished){
            if (($(window).height() + $(window).scrollTop() + 430) > $(document).height()) {
                if (this.showMore) {
                this.showMore = false;
                this.currentPage++;
                //获取订单列表
                this.getOrderItem();
                }
            }
            }
       },

        //orderUp弹窗 点击订单号响应
        async orderShow(index){
            try{
                //设置flag和show
                this.setListsFlag();
                //this.order={};//清空列表
                this.lists[index].show = !this.lists[index].show;
                this.lists[index].flag=false;
                itemIndex = index;
                //this.closePop();
                //控制弹窗,点击弹窗以外的地方，弹窗消失
                setPop.closePop(this.lists[itemIndex],'',this.order);
                let res = await OrderDetail({'subsId':this.lists[index].subsId})
                let {code,message,data} = res.data;
                if(code == 200){
                    this.order = data;
                    let params = {
                        projectId: this.order.projectId,
                        desktopId: this.order.desktopId,
                        areaCode: this.order.areaCode
                    };
                let item = await OrderDetailDo(params);
                let ItemDate = item.data;
                    if(code == 200){
                        this.order =  Object.assign({},this.order,ItemDate.data)
                    }     
                }else{
                    this.$message({
                        message: message,
                        type: 'warning'
                    });
                }
            }catch(err){
                console.log('获取数据失败',err)
            }                
        },

        //popUp弹窗  点击设置按钮响应
        closeDialogVisible(index){
             this.formInline={};//清空列表 
             //设置flag和show
            this.setListsFlag();        
            this.lists[index].flag = !this.lists[index].flag;
            if(this.lists[index].show){   //点击订单号的弹窗
                this.lists[index].show=false
            }       
            itemIndex = index ; 
            //this.closePop();
            //控制弹窗,点击弹窗以外的地方，弹窗消失
            setPop.closePop(this.lists[itemIndex],'',this.order);
            OrderDetailDos({subsId:this.lists[index].subsId}).then(res=>{
                let {code,message,data}=res.data;
                if(code == 200){
                    this.formInline=data;
                }else{
                    this.$message({
                        message: message,
                        type: 'warning'
                    });
                }
            })
        },

        //点击确定按钮
        dialogOK(e){
            let params = {
               delayTime:e.delayTime,
               subsId:e.subsId
            }
            updateSubDetailInfo(params).then(res =>{
               if(res.code == 200){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
               }else{
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
               }
            })
        },
        //点击取消按钮
        close(){
            // this.lists[itemIndex].flag=false   //点击取消按钮
            // this.formInline={};//清空列表
            this.publicClose();
        },
          //确定取消按钮清除数据
        publicClose(){
            this.lists[itemIndex].flag=false   //点击取消按钮
            this.formInline = {};
        },
        setItemON(data){
            switch(data){
                case '关机':
                this.status="CLOSE";
                break;
                case '开机':
                this.status="BOOT";
                break;
                case '重启':
                this.status="REBOOT";
                break;
            }          
            let desktopsParam= this.status + ',' + this.order.desktopId; //开关机的状态和桌面Id的拼接
             //this.lists[itemIndex].show=false;   //点击重启，关机等按钮
             let params={
                 "userId":this.lists[itemIndex].userId,
                 "userName": this.lists[itemIndex].userName, //用户名
                 "subsId": this.lists[itemIndex].subsId,  //订单号
                 "projectId": this.order.projectId, //项目Id
                 "adId": this.order.adId, //ADid
                 "desktopsParam": desktopsParam
             };
             operateDesktop(Qs.stringify(params)).then(res =>{
                 if(res.code == 200){
                    if(data=='开机' || data =='关机'){
                        console.log(123)
                          //当前是开机状态，要关机。否则就是开机            
                        if(this.order.desktopStatus=='ACTIVE'){
                            this.$set(this.order,'desktopStatus','SHUTOFF')                  
                        }else{
                            this.$set(this.order,'desktopStatus','ACTIVE')                                            
                        }   
                    }                                  
                 }else{                  
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                 }
                //   this.order ={};
             })

             //登录虚拟机
            if(data =='登录'){
                $(this).attr('href','glcloud://');
				window.protocolCheck($(this).attr("href"),
				function () {
					alert("检测到您电脑Access Client本地客户端未安装 请下载");
					var url = "http://49.4.8.123:8083/document/downloads";
					var filename = "AccessClient_Win.msi";
					var form = $("<form></form>").attr("action", url).attr("method", "get");
					form.append($("<input></input>").attr("type", "hidden").attr("name", "filename").attr("value", filename));
					form.appendTo('body').submit().remove();
				});
            }
        },
        //设置flag和show
        setListsFlag(){
            //设置所有的flag为false
            this.lists = this.lists.map((item) =>{           //使用map重构数组  map是映射的意思，把原数组映射为新数组  必须有return
                return Object.assign({},item,{
                    flag:false, //控制点击设置按钮的弹窗
                    show:false
                })
            })
        },
        
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/item.scss';
</style>

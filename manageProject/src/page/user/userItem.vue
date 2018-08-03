<template>
    <div class="userItem">
        <userSearch :formInlines="formInlines" @searchItem="searchItem"></userSearch>
        <ul class="itemList" v-loading="loading">
            <li  v-for="(item,index) in lists" :key="index" >
                <div class="userDetail">
                    <dl>
                        <dt><em class="userImage"><img src="@/assets/images/icon/Group.png"></em></dt>
                        <dd>
                            <p>{{item.userIdentificationName}} 
                                <span class="state" v-if="item.userStatus=='0'" style="background:#85ce61;">正常</span>
                                <span class="state" v-if="item.userStatus=='1'" style="background:#888888;">删除</span>
                            </p>                               
                            <p>{{item.userOrganization}}</p>
                            <p><span>账号 : </span><span class="code">{{item.userName}}</span></p>
                            <p><i class="iconfont icon-shezhi" @click.stop="closeDialogVisible(index)"></i></p>
                        </dd>
                    </dl>
                </div>           
                <popUp :itemList.sync="itemList" v-if="item.flag" @close="close" @dialogOK="dialogOK"></popUp>
            </li>
        </ul>
    </div>
</template>
<script>
import setPop from '@/utils/closePop.js'  //点击弹窗以外的区域弹窗消失
import popUp from './popUp'
import userSearch from './userSearch'
import '@/script/jquery-3.0.0.min';
import {getUserList,SearchUserList,getUserDetail,UpdateUserInfo,deleteDesktopByUser} from '@/api/api'
let itemIndex=''; //全局的index
export default {
    data(){
        return{
            showMore:false,
            currentPage: '1',
            pageSize:'20',
            loading:false,
            isFinished:false,
            itemList:{},    //需要给子组件传递过去的用户详情信息
            lists:[],    //一开始从后台获取的
            afterChangedItem:{}
        }
    },
    props:{
        postTitle:{type:String},
        formInlines:{
            type:Object
        }
    },
    created(){
        this.lists=[];
        //用户列表请求
         this.getUserItem();
         $(window).scroll(this.dowLoadMore);//监听滚动事件  
    },
    components:{
        popUp,
        userSearch
    },
    methods:{
        //获取用户列表使用异步加载
       async getUserItem(){
           try {
                let params = {
                    "userStatus": this.postTitle,
                    "page":this.currentPage,
                    "size": this.pageSize
                } 
                this.loading = true;   
                let res = await getUserList(params);
                let{code,message,data} = res.data;
                if(code == 200){
                    let list = data.map((item) =>{           //使用map重构数组  map是映射的意思，把原数组映射为新数组  必须有return
                        return Object.assign({},item,{
                            flag:false //控制点击设置按钮的弹窗
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
           }catch(err){
               console.log('获取数据失败',err)
           }
        },

        //popUp弹窗
        closeDialogVisible(index){
            //设置所有的flag为false
            this.lists = this.lists.map((item) =>{           //使用map重构数组  map是映射的意思，把原数组映射为新数组  必须有return
                return Object.assign({},item,{
                    flag:false //控制点击设置按钮的弹窗
                })
            })
            this.itemList={}; //清空列表   
            this.lists[index].flag=!this.lists[index].flag;
            itemIndex = index ; 

            //this.closePop();//控制弹窗,点击弹窗以外的地方，弹窗消失
            setPop.closePop(this.lists[itemIndex],this.itemList);
            getUserDetail({"userID":this.lists[index].userId}).then(res =>{
                let{code,message,data} = res.data;
                if(code == 200){
                    this.itemList = data;                  
                }else{
                    this.$message({
                        message: message,
                        type: 'warning'
                    });  
                }
            });        
        },

        close(e){
            this.publicClose();
            
        },
        async dialogOK(e){
            try {
               let regExp = /^1[3|5|8|7][0-9]{9}$/;
               let reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if(!regExp.test(e.userMobileNumber)){
                    this.$message({
                        message: '请输入正确的手机号',
                        type: 'warning'
                    });
                    this.lists[itemIndex].flag=true   //点击取消按钮 
                    this.itemList=this.itemList
                    return false
                }
                if(!reg.test(e.userEmail)){
                  this.$message({
                        message: '请输入正确的邮箱',
                        type: 'warning'
                    });
                    this.lists[itemIndex].flag=true   //点击取消按钮 
                    this.itemList=this.itemList
                    return false
                }
                let params ={
                    userId:e.userId,
                    userMobileNumber:e.userMobileNumber,
                    userEmail:e.userEmail,
                    operateStatus:e.operateStatus,
                    userOrganization:e.userOrganization
                }                 
                let res = await UpdateUserInfo(params);
                let{code,message,data} = res;
                if(code == 200){
                    this.$message({
                        message: message,
                        type: 'success'
                    });
                    this.publicClose();  //点击弹窗以外的区域弹窗消失
                    if(e.operateStatus=="BLOCK"){
                        console.log(e.userId)
                        let deleteItem =await deleteDesktopByUser({userId:e.userId})
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
        //确定取消按钮清除数据
        publicClose(){
            this.lists[itemIndex].flag=false   //点击取消按钮
            this.itemList = {};
        },
        
        //查询
        async searchItem(v){
            //如果都为空不请求数据
            if(!v.mobile && !v.code && !v.user && !v.companyName && !v.startTime && !v.endTime){
                return false
            }
            //开始时间和结束时间的判断
            if(v.endTime < v.startTime){
                this.$message({
                    message: '结束时间必须大于开始时间',
                    type: 'warning'
                });
                return false
            }
            this.currentPage = 1;
            let params = {
                "userStatus":this.postTitle,
                "userName":v.code,                   //账号
                "userIdentificationName":v.user,    //姓名
                "userMobileNumber":v.mobile,       //手机号
                "userOrganization": v.companyName, //公司
                "queryStartFrom": v.startTime,     //查询起始时间
                "queryEndAt": v.endTime,         //查询截止时间
                "page":this.currentPage,        //页码
                "size": this.pageSize           //显示的数量
            }
            this.loading = true;
            let res = await SearchUserList(params);
            let {code,message,data} = res.data;
            if(code == 200){
                let list = data.map((item) =>{
                    return Object.assign({},item,{
                        flag:false, //控制点击设置按钮的弹窗
                    })
                })
                this.lists = []; //清空一开始加载的数据
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
           //加载更多
       dowLoadMore(){         
            //根据是否全部加载完成，判断是否继续监听页面的滚动事件
            if(!this.isFinished){
            if (($(window).height() + $(window).scrollTop() + 430) > $(document).height()) {
                if (this.showMore) {
                this.showMore = false;
                this.currentPage++;
                //获取用户列表
                this.getUserItem();
                }
            }
            }
       },
       //点击弹窗以外的区域弹窗消失
    //    closePop(){
    //         //对弹窗的控制
    //         let body = document.querySelector('body')
    //         body.addEventListener('click',(e)=>{
    //             if(this.lists[itemIndex].flag=true){
    //                 this.lists[itemIndex].flag=false;
    //                 this.itemList = {}; 
    //             }
    //         })
    //    }
        
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/item.scss';
</style>

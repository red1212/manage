<template>
    <div class="my-tabs">
       <div class="tabs-bar">
           <div class="tabs-bar-nav">
               <router-link class="tabs-tab" tag="div" to="/company"><i class="iconfont icon-jiantou33"></i>返回上一级 </router-link>
            </div>
        </div>
       <div class="tabs-content" v-loading="loading">
         <el-form label-position="right" label-width="180px" v-model="companyList" >
            <el-form-item label="上传LOGO :">
                <el-upload
                style="float:left"
                ref='upload'
                accept="image/jpeg,image/png"
                :before-remove="beforeRremove"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-progress="uploadOnProgress"
                :data='logo'
                :limit=1
                action="http://49.4.8.123:8083/company/uploadLogo"
                list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <!-- 进度条 -->
                    <div class="circleProgress" v-show="uploadParam.totalShow">
                        <div class="progressPart" v-show="uploadParam.browerShow">
                            <span class="percent">准备中，请稍等...<img src="../../assets/images/icon/loading.gif"/></span>
                        </div>
                        <el-progress type="circle" :percentage="uploadParam.percent" :width="120" style="margin-left:20px;" v-show="uploadParam.serverShow"></el-progress>                
                    </div>
                <el-dialog :visible.sync="dialogVisible" style="width:160px;height:120px;">
                <img width="100%" :src="dialogImageUrl+'/company/viewLogo?id='+companyList.logoId"  alt="" class="avatar">
                </el-dialog>
                <img :src="dialogImageUrl" v-if="companyList.logoId !=null" class="uploadImg" style="width:160px;height:120px;overflow:hidden;margin-left:10px">
            </el-form-item>
            <el-form-item label="公司名称 :">
                <el-input placeholder="请输入公司名称" v-model="companyList.companyName"></el-input>
            </el-form-item>
     
            <el-form-item label="公司注册号 :">
                <div class="inputList">
                    <el-input placeholder="请输入4位" maxlength="4" type="text"  v-model="companyList.ip1"></el-input>
                    <el-input placeholder="请输入4位" maxlength="4" type="text"  v-model="companyList.ip2"></el-input>
                    <el-input placeholder="请输入4位" maxlength="4" type="text"  v-model="companyList.ip3"></el-input>
                    <el-input placeholder="请输入3位" maxlength="3" type="text"  v-model="companyList.ip4"></el-input>
                </div>         
            </el-form-item>
              <el-form-item label="联系方式 :">
                <el-input v-model="companyList.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="公司网址 :">
                <el-input placeholder="http://" v-model="companyList.IP"></el-input>
            </el-form-item>
             <el-form-item label="公司简介 :" class="detailText">
                <el-input type="textarea" v-model="companyList.companyDesc" placeholder="请输入公司简介，最多500字" maxlength="500"></el-input>
            </el-form-item>
            <el-button type="primary" style="margin-left: 181px;width: 120px;background-color:#7D8EDA;" @click="saveInfo">提交</el-button>
        </el-form>
       </div>
    </div>
</template>
<script>
import "@/script/jquery-3.0.0.min";
import {getCompanyInfo,imgpath,saveCompanyInfo,getMD5,getProcess} from "@/api/api.js";
import Qs from "qs";
export default {
  data() {
    name: "companyAdd";
    return {
      uploadParam:{
        //进度条整体部分
        totalShow: false,
        //本地传到浏览器的显示
        browerShow: true,
        //浏览器传到后台的显示
        serverShow: false,
        //存储formdata的参数
        param: "",
        //获取的MD5值
        md5: "",
        //上传的百分比
        percent: 0,
      },
      dialogImageUrl: "",
      logo: {
        logo: ""
      },
      logoId: "", //提价时上传图片的logoid
      loading: false,
      maxNum: true, //控制是否可以上传图片
      dialogVisible: false,
      companyList: {
        companyName: "",
        mobile: "",
        IP: "",
        companyDesc: "",
        ip1: "",
        ip2: "",
        ip3: "",
        ip4: "",
        logoId: ""
      }
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.setCode(); //公司注册号
      this.getCompanyIn(); //获取公司信息
    }
  },
  methods: {
    getMd5Value(file){
      //获取md5值
      this.param = new FormData();
      this.param.append("logo", file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      getMD5(this.param, config).then(res => {
        if (res.code == 200) {
          this.uploadParam.md5 = res.data;
        }
      });
    },
    //开始上传
    uploadOnProgress(e, file) {
      this.uploadParam.totalShow = true;
      if (e.percent == 100) {
        // 根据md5获得上传的进度
        let md5Param = {
          md5: this.uploadParam.md5
        };
        this.uploadParam.browerShow = false;
        this.uploadParam.serverShow = true;
        var flag = true;
        var timer = setInterval(() => {
          if (flag) {
            flag = false;
            getProcess(md5Param).then(res => {
              if (res.data.code == 200) {
                this.uploadParam.percent = parseInt(res.data.data);
                console.log(res.data.data);
                if (res.data.data == 100) {
                  this.uploadParam.percent = 100;
                  clearInterval(timer);
                }
                flag = true;
              } else {
                console.log("出错了");
              }
            });
          }
        }, 500);
      }
    },
    //上传成功
    handleAvatarSuccess(res, file) {
      this.uploadParam.percent = 100;
      this.logoId = res.data;
      this.uploadParam.browerShow = true;
      this.uploadParam.serverShow = false;
      this.uploadParam.totalShow = false;
      $(".tabs-content .el-upload-list__item").css("visibility", "visible");

      document.getElementsByClassName(
        "el-upload el-upload--picture-card"
      )[0].style.opacity = 0;
      document.getElementsByClassName("uploadImg")[0].style.marginLeft =
        -150 + "px";
    },
    //位置的修改
    beforeRremove(file) {
      document.getElementsByClassName(
        "el-upload el-upload--picture-card"
      )[0].style.opacity = 1;
      document.getElementsByClassName("uploadImg")[0].style.marginLeft =
        10 + "px";
    },
    //上传之前
    beforeAvatarUpload(file) {
      this.logo.logo = file; //给后台的参数
      //图片大小和格式的限制
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG && !isPNG) {
        this.common.errorTip("上传图片必须是JPG/PNG格式!");
      }
      if (!isLt10M) {
        this.common.errorTip("上传图片大小不能超过 10MB!");
      }
      this.getMd5Value(file);
      return (isJPG || isPNG) && isLt10M;
    },

    //获取公司详情
    async getCompanyIn() {
      try {
        //获取公司信息
        let primary = { id: this.$route.query.id };
        this.loading = true;
        let res = await getCompanyInfo(primary);
        let { code, message, data } = res.data;
        if (code == 200) {
          this.companyList.companyName = data.name; //公司名字
          this.companyList.mobile = data.contactPhone; //联系方式
          this.companyList.companyDesc = data.companyDesc; //描述
          this.companyList.IP = data.website; //网址
          this.companyList.logoId = data.logo;
          var registrationNumber = data.registrationNumber.split("-"); //公司注册号的切割
          this.dialogImageUrl = imgpath + "/company/viewLogo?id=" + data.logo; //通过公司的logoid来上传公司的logo

          //公司注册号的赋值
          for (var i = 0; i < registrationNumber.length; i++) {
            this.companyList.ip1 = registrationNumber[0];
            this.companyList.ip2 = registrationNumber[1];
            this.companyList.ip3 = registrationNumber[2];
            this.companyList.ip4 = registrationNumber[3];
          }

          this.loading = false;
        } else {
          this.$message({
            message: message,
            type: "warning"
          });
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    //公司注册号
    setCode() {
      var inputList = $(".inputList input");
      for (var i = 0; i < inputList.length; i++) {
        var item = inputList[i];
        item.index = i;
        item.setAttribute("readonly", true);
        item.onkeyup = function() {
          //this.value = this.value.replace(/^(.).*$/, '$1');
          if (this.value.length >= 4) {
            var next = this.index + 1;
            if (next > inputList.length - 1) {
              return;
            }
            inputList[next].removeAttribute("readonly");
            inputList[next].focus();
          }
        };
      }
      inputList[0].removeAttribute("readonly"); //默认设置第一个是可以写入的
    },
    saveInfo() {
      let params = {
        companyDesc: this.companyList.companyDesc,
        contactPhone: this.companyList.mobile,
        id: this.$route.query.id,
        logo: this.logoId,
        name: this.companyList.companyName,
        registrationNumber:
          this.companyList.ip1 +
          "-" +
          this.companyList.ip2 +
          "-" +
          this.companyList.ip3 +
          "-" +
          this.companyList.ip4,
        website: this.companyList.IP
      };
      console.log(params);
      saveCompanyInfo(params).then(res => {
        console.log(res);
        let { code, message } = res;
        if (code == 200) {
          this.$router.push({ path: "/company" });
        } else {
          this.$message({
            message: message,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/tab.scss";
.icon-jiantou33 {
  color: #7d8eda;
  font-size: 20px;
  margin-right: 18px;
  vertical-align: middle;
}
.tabs-content /deep/ .el-upload--picture-card,
.tabs-content /deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 160px;
  height: 120px;
}
.tabs-content /deep/ .el-upload--picture-card {
  line-height: 120px;
}
.el-upload--picture-card i {
  font-size: 34px;
  color: #7d8eda;
}
.inputList {
  display: flex;
  width: 500px;
}
.inputList /deep/ .el-input__inner {
  flex: 1;
}
.inputList /deep/ .el-input__inner:focus {
  border-color: #42a5f5;
}

.inputList /deep/ .el-input {
  margin-right: 14px;
}
//公司简介
.detailText /deep/ .el-textarea__inner {
  width: 420px;
  padding: 13px;
  height: 120px;
  border: none;
}
// 进度条
.circleProgress {
  width: 160px;
  height: 120px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
}
.progressPart {
  text-align: center;
  line-height: 120px;
}
</style>
<style>
.tabs-content .el-upload-list__item {
  visibility: hidden;
}
</style>


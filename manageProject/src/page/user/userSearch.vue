<template>
    <div class="userSearch">
        <el-form :inline="true" v-model="formInlines" class="demo-form-inline" label-width="80px" >
            <div class="input-group">
                <el-form-item label="用户姓名 :">
                    <el-input v-model="formInlines.user" placeholder="请输入人员姓名"></el-input>
                </el-form-item>
                <el-form-item label="账号 :">
                    <el-input v-model="formInlines.code" placeholder="请输入账号"></el-input>
                </el-form-item>
            </div>
            <div class="input-group">
                <el-form-item label="手机号 :">
                    <el-input  v-model="formInlines.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="公司 :">
                    <el-input  v-model="formInlines.companyName" placeholder="请输入公司名称"></el-input>
                </el-form-item>
              
            </div>
            <div class="input-group">
                <el-form-item label="注册时间 :">
                     <el-date-picker
                        v-model="formInlines.startTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="到">
                    <el-date-picker
                         v-model="formInlines.endTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </div>
            <el-form-item class="btn-search">
                    <el-button type="primary" @click="searchItem">搜索</el-button>
            </el-form-item>                 
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            formInlines:{
                user:null,
                code:null,
                mobile:null,
                companyName:null,
                startTime:null,
                endTime:null
            }
        }
    },
    methods:{
        searchItem(){
            this.$emit('searchItem',this.formInlines);
            this.formInlines=[];         
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/search.scss'
</style>


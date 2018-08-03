<template>
    <div class="userSearch">
        <el-form :inline="true" v-model="formInlines" class="demo-form-inline" label-width="80px" >
            <div class="input-group">
                <el-form-item label="订单号 :">
                    <el-input v-model="formInlines.order" placeholder="请输入订单号"></el-input>
                </el-form-item>
                <el-form-item label="账号 :">
                    <el-input v-model="formInlines.code" placeholder="请输入账号"></el-input>
                </el-form-item>
            </div>
            <div class="input-group">
                <el-form-item label="姓名 :">
                    <el-input  v-model="formInlines.user" placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                <el-form-item label="公司 :">
                    <el-input  v-model="formInlines.companyName" placeholder="请输入公司名称"></el-input>
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
                order:null,
                companyName:null
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
@import '../../../assets/style/search.scss';
</style>


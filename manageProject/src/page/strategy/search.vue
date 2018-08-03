<template>
    <div class="userSearch">
        <el-form :inline="true" v-model="formInlines" class="demo-form-inline" label-width="100px" >
            <div class="input-group">
                <el-form-item label="公司名称 :">
                    <el-input v-model="formInlines.companyName" placeholder="公司名称"></el-input>
                </el-form-item>
                <el-form-item label="账号 :">
                    <el-input v-model="formInlines.code" placeholder="请输入账号"></el-input>
                </el-form-item>
                <!-- <el-form-item label="计算机名 :">
                    <el-input v-model="formInlines.computer" placeholder="请输入计算机名"></el-input>
                </el-form-item> -->
            </div>           
            <el-form-item class="btn-search" style="left: 720px;">
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
                companyName:null,
                code:null
               // computer:null
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


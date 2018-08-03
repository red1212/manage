<template>
    <div>
        <el-radio-group v-model="childFileRedirection" style="margin:50px 0px;" @change="change">
            <el-radio label="READ_ONLY">只读</el-radio>
            <el-radio label="READ_AND_WRITE">读写</el-radio>
            <el-radio label="DISABLED">禁用</el-radio>           
        </el-radio-group>
    </div>
</template>
<script>
export default {
    data(){
        return{
            childFileRedirection:'',
        }
    },
    props:{
        ListItem:{type:Object},
        CommonIndex:{type:Number}
    },
    mounted(){
        if(this.ListItem !=null){
            this.childFileRedirection=this.ListItem.file_redirection.redirection_mode;
        }
    },
    //监听数据然后可以修改父组件传递过来的数据
    watch: {
        fileRedirection: function (newTypeId) {
            this.childFileRedirection=newTypeId
        }
    },
    methods:{
        change(){
             let obj = {
                index:this.CommonIndex,
                childFileRedirection:this.childFileRedirection,
                tabIndex:2
            }
            this.$emit('change',obj)
        }
    }
  
}
</script>

<template>                              
    <div>                             
        <el-radio-group v-model="clipboard_Redirection" @change="change">
            <p><el-radio label="SERVER_TO_CLIENT_ENABLED">开启服务端到客户端</el-radio></p>
            <p><el-radio label="CLIENT_TO_SERVER_ENABLED">开启客户端到服务端</el-radio></p>
            <p><el-radio label="TWO_WAY_ENABLED">开启双向</el-radio></p>
            <p><el-radio label="DISABLED">禁用</el-radio></p>
        </el-radio-group>
    </div>
</template>
<script>
export default {
    data(){
        return{
            clipboard_Redirection:'',
        }
    },
    props:{
        ListItem:{type:Object},
        CommonIndex:{type:Number}
    },
    mounted(){
        if(this.ListItem !=null){
            this.clipboard_Redirection=this.ListItem.clipboard_redirection;
        }
    },
    methods:{
        change(){
             let obj = {
                index:this.CommonIndex,
                clipboard_Redirection:this.clipboard_Redirection,
                tabIndex:3
            }
            console.log(obj)
            this.$emit('change',obj)
        }
    }
}
</script>
<style lang="scss" scoped>
.Cut p{
   margin-bottom: 16px;
   padding-left: 40px;
}
</style>

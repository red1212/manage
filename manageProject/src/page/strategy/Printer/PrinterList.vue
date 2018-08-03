<template>
    <div>
        <div class="tagSwitch" style="padding-left: 55px;">
            <el-switch
                style="display: block"
                v-model="printerRedirection"
                active-color="#7D8EDA"
                inactive-color="#ccc"
                active-text="开"
                @change="change"
                inactive-text="关">
            </el-switch>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            printerRedirection:''
        }
    },
    props:{
        ListItem:{type:Object},
        CommonIndex:{type:Number}
    },
    mounted(){
        if(this.ListItem !=null){
            this.printerRedirection=this.ListItem.printer_redirection.enable;
        }
    },
    watch:{
         printer_redirection: function (newTypeId) {
            this.printerRedirection=newTypeId
        }
    }, 
    methods:{
        change(){
             let obj = {
                index:this.CommonIndex,
                printerRedirection:this.printerRedirection,
                tabIndex:1
            }
            this.$emit('change',obj)
        }
    }
}
</script>


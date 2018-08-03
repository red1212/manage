<template>
<div>
<dd v-for="(tab,index) in iconList" :key="index" @click="tagPop(tab)">
        <i :class="[tabIndex == tab.index ? 'iconColor' : '',tab.name]" class="icon iconfont" ></i>
    </dd>
</div>
    
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props: { iconList: Array, tabIndex: Number },
    methods:{
        tagPop: function (tab) { this.$emit('tagPop', tab) } 
    }
}
</script>

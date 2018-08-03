<template>
    <div id="button">
        <div class="btngroup" style="">
                <el-button type="primary el-button--primary-OK" @click="$store.state.dialogVisible= true">确定</el-button>
                <el-button type="info el-button--primary-NO"  @click="$store.state.shown = false">取消</el-button>
        </div>   
    </div>
</template>
<style lang="scss" scoped>
@import '../assets/style/button.scss';
</style>
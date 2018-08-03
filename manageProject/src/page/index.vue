<template>
    <div id="index">
        <Header></Header>
        <div class="container">
            <router-view></router-view>
        </div>       
    </div>
</template>

<script>
import Header from '@/components/header.vue'
export default {
    name: 'index',
    components:{
        Header
    }
}
</script>

<style lang="scss">
    .container{
        padding: 40px;
    }
</style>


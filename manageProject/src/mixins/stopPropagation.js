//定义一个混入的对象
export const stopPropagation = {
    methods:{
        stopClose:function(e){
            e.stopPropagation()
        }
    }
}

export function closePop(list,itemList,order){
    //对弹窗的控制
    let body = document.querySelector('body')
    body.addEventListener('click',(e)=>{
        if(list.flag){
            list.flag=false;
            itemList = {};
        }
        if(list.show){
            list.show = false;
            order = {}
        }
    })
    
}
export default {
    closePop
}

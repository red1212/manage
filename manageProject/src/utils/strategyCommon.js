
import { Message } from 'element-ui';
//策略的修改信息
let changeInfo=(params1,params2,desktopCount,Interface,fn)=>{
    //对弹窗的控制
    let params = "";
    if(desktopCount>=2){
        params=params2
        
    }else{
        params = params1;
    }
    Interface(params).then(res =>{
        if(res.code == 200){
            Message({
                message: res.data,
                type: 'success'
            });
            fn;
            //this.close();//如果成功弹窗就关闭
        }else{
            Message({
                message: res.message,
                type: 'warning'
            });
            this.lists[itemIndex].flag=true; //如果修改失败则弹窗不会消失
        }
    })
}
export {
    changeInfo
}

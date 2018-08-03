//import '@/script/jquery-3.0.0.min';
export function dowLoadMore(isFinished,showMore,currentPage,fn){
    console.log(123)
      //根据是否全部加载完成，判断是否继续监听页面的滚动事件
    if(!isFinished){
        if ((window.screen.height + document.body.scrollTop + 430) > (document.body.clientHeight)) {
            if (showMore) {
                console.log(222)
                showMore = false;
                currentPage++;
                //获取列表
               // this.getUserItem();
               fn
            }
        }
    }
    
}
export default {
    dowLoadMore
}

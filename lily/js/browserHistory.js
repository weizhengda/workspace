
/**
 * 用户浏览数据记录组件
 * @author weizhengda
 * @date: 2017.8.18
 * 示例 new browserHistory();
 */

window.browserHistory = function(){

  //设置服务器时间
  // this.serverTime = new Date($.ajax({async: false}).getResponseHeader("Date")); //传入一个原始格式时间
}

browserHistory.prototype = {

    constructor : browserHistory,

    setInfo:function(param){
        //设置全局userId,serverTime
        window._userId = param.userId;
        window._serverTime = param.serverTime; //传入一个原始格式的时间

        //将服务器时间转为时间戳（毫秒数）
        window._oldTime = (new Date(_serverTime)).getTime();
  
       //时间戳累加记录时间
      setInterval(function(){
         _oldTime = _oldTime+1000;
         //将时间戳转化为原始格式时间
         window._currentTime = new Date(_oldTime);
         _currentTime = _currentTime.format("yyyy-MM-dd hh:mm:ss");
        // console.log(currentTime); 
      },1000);   

    //时间格式化
    Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
   }    
  },

   //保存用户点击页面的记录 
   store:function(param){

   	     this.key = param.key;
   	     this.url = param.url;
   	     this.title = param.title;

   	     //console.log(_currentTime);

        if(localStorage.getItem(_userId)){
              //用户已有浏览记录
              var value = JSON.parse(localStorage.getItem(_userId));
              //添加到记录的头部
              value.history.unshift({"serverTime":_currentTime,"key":this.key,"url":this.url,"title":this.title,});
              localStorage.setItem(_userId,JSON.stringify(value));
         }else{
             //用户暂浏览记录
             var value = {"userId":_userId,"history":[{"serverTime":_currentTime,"key":this.key,"url":this.url,"title":this.title}]};
             var valueStr = JSON.stringify(value);
             localStorage.setItem(_userId,valueStr);     
        }
    },
 
  //提交用户浏览记录到服务器，并删除本地浏览记录
  commit:function(param){

  	 this.url = param.url; //上传到服务器的地址
  	 this.time = param.time?param.time:1000*60*5; //间隔上传的时间 默认值为5分钟
     setInterval(function(){
     	$.ajax({
            url:this.url,
            data:localStorage.getItem(_userId), //用户浏览数据
            type:'get',
            datatype:'json',
            cache:'false',
            success:function(result){
            	//清除该用户本地浏览记录
                localStorage.removeItem(_userId)
            },
            // error:function(){
            //     console.log("上传失败!");
            // }
          })
     },this.time) 
  }

 }

  



  //获取id封装成一个函数$()方便调用
    function $(id){
    //如果传入的参数类型为字符串则获取当前ID元素，否则返回id
        return typeof id==="string"?document.getElementById(id):id;
    }
     //window.onload表示当文档加载完毕时执行函数
     window.onload=function(){
         //获取#tab-tit下面的全部li元素
         var titles=$('tab-tit').getElementsByTagName('li');
        //获取#tab-con下面的全部div元素
        var divs=$('tab-con').getElementsByTagName('div');
        //遍历所有li标签，给每个li加上id和值，并且绑定事件
         var timer=null;
        for(var i=0;i<titles.length;i++){
            //给每个li加上id和值
           titles[i].id=i;
             //给每个li绑定事件
          titles[i].onmouseover=function(){
             //this指向当前悬浮的对象并存进变量that中,用that做一个this的引用
            var that=this;
             //当存在定时器的时候我们需要把它清除,如果悬浮的时间少于500毫秒，
             //则不会执行后面的函数，一般定时器前面都需要有个清除的步骤。
             if(timer){
                //清除定时器
               clearTimeout(timer);
                //初始化变量的值
                timer=null;
            }
            //设置定时器，执行函数的时间延迟了500毫秒
            timer=setTimeout(function(){
            //悬浮后首先应该初始化每个li和div上的类和display
                for(var j=0;j<titles.length;j++){
                     titles[j].className="";
                   divs[j].style.display="none";
               }
           //给当前悬浮元素添加属性
            //这个地方不能用this.id了，因为this指向了window这个对象了,
                titles[that.id].className="select";
                divs[that.id].style.display="block";},500);
            }
         }
     }
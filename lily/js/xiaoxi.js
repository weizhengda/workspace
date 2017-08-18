
    //系统消息
    var dataList = []; //系统消息队列
    var xt_click = true; //点击开关

    function messageList(listNum,listTime,data){

        /*
         @parma listNum:"点击弹出消息的条数(应小于json数组数据的条数，否则参数无效)"
         @parma listTime:"点击弹出消息的时间"
         @param data:"需要的加载的json数组数据"
         */

        if(xt_click){

            //点击弹出消息
            $(".xt").click(function(){


                if(xt_click){
                    // 删除多于listNum条的data
                    for (var i = data.length;i>listNum; i--) {
                        data.shift();
                    }

                    var width1=$(".xiaoxi").width();
                    var width2=$(".xt").width();
                    var flg = false;
                    if(width1==50&&width2==50){
                        $(".xiaoxi").css({"width":"450px"});
                        $(".xt").css("width","450px");
                        
                        //清除之前的数据,避免重复渲染数据
                        $(".xt-li").remove();
                        //加载数据
                        if(data.length>0){
                            for(var i=0;i<=data.length-1;i++){
                                $(".xt-ul").prepend("<li class='xt-li'><a class='xt-a' href='javascript:void(0)'>"+data[i]+"</a></li>");
                            }
                        }else{
                            $(".xt-ul").prepend("<li class='xt-li'><a class='xt-a' href='javascript:void(0)'>暂无新消息</a></li>");
                        }

                        $(".xt-more").css("display","block");
                        $(".xt-ul").slideToggle(listTime);
                        setTimeout(function(){
                            $(".xt a i").removeClass("down").addClass("up");
                        },listTime);
                        flg = true;
                    }else{
                        setTimeout(function(){
                            $(".xiaoxi").css({"width":"50px"});
                            $(".xt").css("width","50px");
                            $(".xt a i").removeClass("up").addClass("down");
                        },listTime)  //500
                        $(".xt-ul").slideToggle(listTime);
                        flg = false;
                    }

                }

            }),
                    //点击更多关闭消息
                    $(".xt-more").click(function(){
                        $(".xt-ul").slideUp(listTime);  //500
                        $(".xt-more").fadeIn(1000);
                        setTimeout(function(){
                            $(".xiaoxi").css("width","50px");
                            $(".xt").css("width","50px");
                            $(".xt a i").removeClass("up").addClass("down");
                        },listTime) //500

                    })
        }


    }
      //如果有消息推送，弹出消息提示
    /*
     @param autoTime:"自动弹出显示消息的时间"
     @param data:"需要的加载的json数组数据"

     */
      function addMessage(data,autoTime){
          if (!autoTime)
              autoTime = 10000;
        dataList.push(data);

        xt_click = false;
   
        $(".xiaoxi").css("width","450px");
        $(".xt").css("width","450px").fadeOut(500);
        $(".xt-more").css("display","none");

        //如果ul是打开的那就收起来
        $(".xt-ul").slideUp(1000);
        
        setTimeout(function(){
            console.log(data);
              //清除数据
              $(".xt-li").remove();
              $(".xt-ul").prepend("<li class='xt-li'><a class='xt-a' href='javascript:void(0)'>"+data+"</a></li>");
             $(".xt-ul").slideToggle(1000);
        },1000)


        setTimeout(function(){
            $(".xt-ul").fadeOut(1000);
        },autoTime);
        setTimeout(function(){
            $(".xiaoxi").css({"width":"50px"});
            $(".xt").css("width","50px").fadeIn(500);
        },autoTime+1000); 

        setTimeout(function(){
           xt_click = true;
        },autoTime+2000);
           
      }
    
    //系统列表消息
    messageList(5,1000,dataList);

    //系统消息模拟
    var addNum = 0;
    setTimeout("addMsg()",7000);
   
    function addMsg(){
        if (addNum==7)
            return;
       addMessage(["系统正在处理订单"+addNum],5000);

        setTimeout("addMsg()",7000);
        addNum++;
    }

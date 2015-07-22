// JavaScript Document
//页面切换整屏滚动代码参考 TGA七宝 作品 UP+  向原作者致敬！！！
	//从UP+网站学习到了非常好的CSS3动画思路  传送门：http://up.qq.com/2014/invitation/main.html?from=singlemessage&isappinstalled=0
	var startX = 0,
	    startY = 0;
	    margin = 0;
	var pages = null;
	var curPage = 0;
	var pageWidth = 0,
	    pageHeight = 0;
	var lineHeight = 0, secHeight = 0;
	var targetElement = null;
	var scrollPrevent = false, movePrevent = false, touchDown = false;

	$(document).ready(function(){
		initPage();
	});

	function initPage(){
		pageWidth = $(window).width();	//获取屏幕宽度
		pageHeight = $(".wrapper").height();	//获取屏幕高度

		$(".page,.wrapper").css({		//设置容器的宽度和高度
			"width":pageWidth+"px",
			"height":pageHeight+"px"
		});

		pages = $(".page");	//获取所有页面的集合

	    secHeight = pageHeight * $(".page").length;	//整个长页面的高度

	    $(".pages").addClass("drag");			//添加样式
	    animatePage(curPage);		//添加动画
	}

	document.body.addEventListener('touchstart', function (e) {			//给文档添加touchstart事件
	    e = e.changedTouches[0];
	    onStart(e);
	});

	document.body.addEventListener('touchmove', function (e) {			//给文档添加touchmove事件
	    onMove(e.changedTouches[0], e);
	});

	document.body.addEventListener('touchend', function (e) {			////给文档添加touchend事件
	    onEnd(e.changedTouches[0]);
	});

	window.addEventListener('deviceorientation',function (e){			//设备方向
		var x = parseInt(e.beta); 
		var y = parseInt(e.gamma); 
		var r = parseInt(e.alpha);
		/*
		$('.eye').css({
			"-webkit-transform":"matrix(1, 0, 0, 1, "+4*Math.cos(x*Math.PI/180)+", "+4*Math.sin(y*Math.PI/180)+")"
		})
		*/
	})

	function onStart (e) {
	    if(movePrevent == true){		//滑动被阻止
	        event.preventDefault();
	        return false;
	    }
	    if($(e.target).parents("#container").length==1){
	        scrollPrevent = true;
	    }else{
	        scrollPrevent = false;
	    }

	    touchDown = true;

	    startX = e.pageX;
	    startY = e.pageY;
	    $(".pages").addClass("drag");

	    margin = $(".pages").css("-webkit-transform");
	    margin = margin.replace("matrix(", "");
	    margin = margin.replace(")", "");
	    margin = margin.split(",");
	    margin = parseInt(margin[5]);
	}

	function onMove (e, oe) {
	    if(movePrevent == true || touchDown != true){		//已经出发move 或者 还未出发touchstart
	        event.preventDefault();
	        return false;
	    }
	    event.preventDefault();
	    if( scrollPrevent==false && e.pageY!=startY){			//元素不处于滚动状态 并且 垂直方向已经移动了距离
	        var temp = margin + e.pageY - startY;
	        $(".pages").css("-webkit-transform", "matrix(1, 0, 0, 1, 0, "+temp+")");
	    }
	}

	function onEnd (e) {
	    if(movePrevent == true){ //还在移动
	        event.preventDefault();
	        return false;
	    }

	    touchDown = false;			//结束touch

	    if( scrollPrevent==false ){
	        endX = e.pageX;
	        endY = e.pageY;
	        if( Math.abs(endY-startY)<=50) {
	            animatePage(curPage);
	        }else{
	        	if(endY>startY){
	        		prevPage();
	        	}else{
	        		nextPage();
	        	}
	        }
	    }

	    $(".pages").removeClass("drag");
	}

	function prevPage(){
	    var newPage = curPage - 1;
	    animatePage(newPage);
	    
	}
	function nextPage(){
	    var newPage = curPage + 1;
	    animatePage(newPage);
	}

	function animatePage( newPage ){
	    if(newPage<0){
	        newPage = 0;
	    }
	    if(newPage>$(".page").length-1){
	        newPage = $(".page").length-1;
	    }

	    curPage = newPage;
	    var newMarginTop = newPage * (-pageHeight);
	    $(".pages").css({
	        "-webkit-transform" : "matrix(1, 0, 0, 1, 0, "+newMarginTop+")"
	    });


	    movePrevent = true;
	    setTimeout(function(){ movePrevent=false; }, 300 );

	    
	    if( !$(pages[curPage]).hasClass("show") ){
	        $(pages[curPage]).addClass("show");
	    }
	    $(pages[curPage-1]).removeClass("show");
	    $(pages[curPage+1]).removeClass("show");
	    
	}
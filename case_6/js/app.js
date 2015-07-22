window.onload = function(){
	document.getElementById('btn_start').onclick = function(){
		start_game();
	}
}


function start_game(){
	var elm_start = document.getElementById('start'),
		elm_game  = document.getElementById('game'),
		elm_gameover = document.getElementById('gameover');
	elm_start.style.display = 'none';
	elm_game.style.display = 'block';
	elm_gameover.style.display = 'none';
	
	var n=2;
	var score	= 0; //分值
	var grade   = 1; //游戏的难度系数
	var timer	= 60;//计时器
	
	document.getElementById('score').innerHTML = score;
	
	var stage = new createjs.Stage('gameView');
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener('tick',stage);
	var gameView = new createjs.Container();
	stage.addChild(gameView);

	myTimer(timer);
	addRect();

	function addRect(){
		var colors = getColors(grade);		//获取颜色RGB数组
		var color = colors[0];			//默认颜色
		var RectColor = colors[1];		//不同的颜色
		
		console.log(color+'\n');
		console.log(RectColor);
		var x = parseInt(Math.random()*n);
		var y = parseInt(Math.random()*n);
		for(var indexX =0; indexX < n; indexX ++){
			for(var indexY =0; indexY < n; indexY ++){
				var r = new Rect(n, color, RectColor);
				gameView.addChild(r);
				r.x = indexX;
				r.y = indexY;
				if(r.x == x && r.y == y){
					r.setRectType(2);
				}
				r.x = indexX * (300/n);
				r.y = indexY * (300/n);
				if(r.getRectType() == 2){
					r.addEventListener('click',function(){
						if(n<7){
							++n;
						}
						++score;
						console.log('分数：'+score);
						document.getElementById('score').innerHTML=score;
						gameView.removeAllChildren();
						addRect();
					})
				}
			}
		}
	}

	//随机生成RGB颜色
	function getColors(grade){
		var color_arr = new Array(), max = 255, min = 0, step = 10;
		var r = Math.floor(min + Math.random()*(max-min)),
			g = Math.floor(min + Math.random()*(max-min)),
			b = Math.floor(min + Math.random()*(max-min));
		switch(grade){
			case 1:
				step = 50;
				break;
			case 2:
				step = 40;
				break;
			case 3:
				step = 30;
				break;
			case 4:
				step = 20;
				break;
			case 5:
				step = 15;
				break;
			case 6:
				step = 10;
				break;
		}
		var str = r + "," + g + "," + b;
			str_2 = ((r-step) < 0 ? 0 : (r-step)) + "," + ((g-step) < 0 ? 0 : (g-step)) + "," + ((b-step) < 0 ? 0 : (b-step));
		color_arr[0] = "rgb(" + str + ")";
		color_arr[1] = "rgb(" + str_2 + ")";
		return color_arr;
	}

	function myTimer(count){
		if(count > 0){
			setTimeout(function(){
				count -= 1;
				console.log('计时器：'+count);
				myTimer(count);
			},1000);
			if(count % 10 == 0){
				grade += 1;
				console.log('难度系数：'+grade);
			}
		}else{
			//时间到游戏结束
			elm_start.style.display = 'none';
			elm_game.style.display = 'none';
			elm_gameover.style.display = 'block';
			document.getElementById('myscore').innerHTML = score;
			document.getElementById('replay').onclick = function(){
				start_game();
				return false;
			}
		}
		document.getElementById('times').innerHTML = count;
	}
}


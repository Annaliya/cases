/*
 * 实现功能：
 * 让一个块元素在其父级自由移动
 * By Gao Yueping
 */
$.fn.moving = function(){
	var _this		= $(this),
		container 	= _this.parent(),
		width   	= container.width(),
		height 		= container.height(),
		radius 		= _this.width(),
		top 		= Math.floor(Math.random()*(height-radius)),
		left 		= Math.floor(Math.random()*(width-radius)),
		dir_x   	= 1,
		dir_y		= 1;
	if(top<0 || left<0){ return; }
	_this.css({'top':top+'px','left':left+'px'});

	 var intervalMove = setInterval(function(){
		if(dir_x){
			if(left < width-radius-2){
				left 	= left+1;
			}else{
				left 	= left -1;
				dir_x 	= 0;
			} 
		}else{
			if(left>0){
				left 	= left-1;
			}else{
				left 	= left+1;
				dir_x 	= 1;
			}
		}

		if(dir_y){
			if(top < height-radius-2){
				top 	= top+1;
			}else{
				top 	= top -1;
				dir_y 	= 0;
			}
		}else{
			if(top>0){
				top 	= top-1;
			}else{
				top 	= top+1;
				dir_y 	= 1;
			}
		}
		_this.css({'top':top+'px','left':left+'px'});
	},100);
	return intervalMove;
};
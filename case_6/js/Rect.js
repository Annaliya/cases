function Rect(n,color,RectColor){	
	//n: 创建方块的个数，color:默认的方块的颜色， RectColor:单击方块的颜色
	createjs.Shape.call(this);
	this.setRectType = function(t){
		this._RectType = t;
		switch (t){
			case 1:
				this.setColor(color);
				break;
			case 2:
				this.setColor(RectColor);
				break;
		}
	}
	
	this.setColor = function(colorString){
		this.graphics.beginFill(colorString);
		this.graphics.drawRect(0,0,300/n-5,300/n-5);
		this.graphics.endFill();
	}
	
	this.getRectType = function(){
		return this._RectType;
	}
	
	this.setRectType(1);
}

Rect.prototype = new createjs.Shape();
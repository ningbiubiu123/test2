
 //  自调用函数————小蛇
 (function(){
    var elements=[];//存放蛇的身体部分的数组
    function Snake(width,height,direction){
        this.width=width||20;
        this.height=height||20;
        //小蛇身体的组成
        this.body=[
            {x:3,y:2,color:"red"},//头
            {x:2,y:2,color:"orange"},//身体
            {x:1,y:2,color:"orange"},
            ];
        this.direction=direction||"right";
    };
    
    //为原型添加方法————小蛇初始化
    Snake.prototype.init=function(map){
        // 小蛇显示在地图上方法：先删除小蛇再初始化
        remove();
        // 循环创建div
        for(var i=0;i<this.body.length;i++){
            //数组中每个元素都是一个对象
            var obj=this.body[i];
            // 创建div
            var div=document.createElement("div");
            // 把div放进map中
            map.appendChild(div);
            // 设置div样式
            div.style.position="absolute";
            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            // 横纵坐标
            div.style.left=obj.x*this.width+"px";
            div.style.top=obj.y*this.height+"px";
            // 背景颜色
            div.style.borderColor=obj.color;

            //方向暂时不定

            // 把div放入到数组中————只为删除
            elements.push(div);
        }
    };
    
    // 小蛇动移动
    Snake.prototype.move=function(food,map){
        // 改变小蛇的身体坐标位置，即把第二个小方块的位置给第一块
        var i=this.body.length-1;
        for(;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }

        // 判断小蛇的头部位置
        switch(this.direction){
            case "right":
                this.body[0].x+=1;
                break;
            case "left":
                this.body[0].x-=1;
                break;
            case "top":
                this.body[0].y-=1;
                break;
            case "bottom":
                this.body[0].y+=1;
                break;
        }
    
        // 判断是否吃掉食物，小蛇的头部坐标与小蛇一致
        var headX=this.body[0].x+this.width;
        var headY=this.body[0].y+this.height;
        // 食物横纵坐标
        // 判断小蛇的坐标与食物的坐标是否一致
       if(headX==food.x&&headY==food.y){
        // 获取小蛇最后的尾巴
        var last=this.body[this.body.length-1];
        this.body.push({
            x:last.x,
            y:last.y,
            color:last.color
        });
        food.init(map);
       }
    };
    
    //删除小蛇的私有函数
    function remove(){
        // 获取数组
        var i=elements.length-1;
        for(;i>=0;i--){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    };
    // 把Snake暴露给window
    window.Snake=Snake;
}());

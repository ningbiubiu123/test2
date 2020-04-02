 // 自调用函数————游戏对象
 (function(){
    var that=null;
    // 游戏的构造函数
    function Game(map){
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
          that=this;//保存当前实例对象到that变量中，that就是this
    };
    // 初试游戏
    Game.prototype.init=function(){
        // 初始化构造函数
        // 食物初始化
        this.food.init(this.map);
        // 小蛇初始化
        this.snake.init(this.map);
        // 调用自动移动小蛇的方法
        this.runSnake(this.food,this.map);
        // 调用按键方法
        this.bindkey();
    };
    
    // 设置小蛇可以自动跳起来
    Game.prototype.runSnake=function(food,map){
        // 自动移动（加一个定时器）
    var timeId=setInterval(function(){
            // 移动小蛇(wimndow)
            this.snake.move(food,map);
            // 初始化小蛇
            this.snake.init(map);
            // 判断小蛇是否横坐标撞墙
            var maxX=map.offsetWidth/this.snake.width;
            // 判断小蛇是否纵坐标撞墙
            var maxY=map.offsetHeight/this.snake.height;
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            // 横坐标
            if(headX<0||headX>=maxX){
                clearInterval(timeId);
                alert("游戏结束");
            } 
            // 纵坐标
            if(headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("游戏结束");
            } 
        }.bind(that),150);
    };

    // 设置用户按键，改变小蛇移动方法
    Game.prototype.bindkey=function(e){
        // 这里的this是触发keydown事件，即为document
        // e为事件对象
        document.addEventListener("keydown",function(e){
            // 获取按键的按键值
            switch(e.keyCode){
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }
        }.bind(that),false);
    };
    // 把Game暴露，供外部使用
    window.Game=Game;
} ());

// 自调用函数————食物
        (function (){
            //先有食物的构造函数Food
            var elements=[];
            function Food(x,y,width,height,color){
                //食物的宽高横纵坐标
                this.x=x||0;
                this.y=y||0;
                this.width=width||20;
                this.height=height||20;
                this.color=color||"green";
            }
            //为原型添加初始化方法（作用：在页面显示食物）
            //食物在地图上显示，所以用map方法
            Food.prototype.init=function(map){
                //一调用就删除小食物,外部无法访问的函数remove
                 remove();
                // 创建div
                var div=document.createElement("div");
                // 把div放进map中
                map.appendChild(div);
                // 设置div样式
                div.style.width=this.width+"px";
                div.style.height=this.height+"px";
                div.style.backgroundColor=this.color;
                //先让div脱离文档流
                  div.style.position="absolute";
                this.x=parseInt(Math.random()*(map.offsetWidth/this.width)*this.width);
                this.y=parseInt(Math.random()*(map.offsetHeight/this.height)*this.height);
                div.style.left=this.x+"px";
                div.style.top=this.y+"px";
                //把div加入到数组中elements
                elements.push(div);
            };
            
            //私有函数——————删除食物
            function remove(){
                //elements数组中有这个食物
                for(var i=0;i<elements.length;i++){
                    // 获取数组中的元素
                    var ele=elements[i];
                    //找到数组的父级元素，接着删除这个子元素
                    ele.parentNode.removeChild(ele);
                    //再次把数组的子元素删除
                    elements.aplice(i,1);
                }
            }

            // 把Food暴露给window，使外部能使用Food
            window.Food=Food;
        }());
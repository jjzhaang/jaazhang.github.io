/*!
** by zhangxinxu(.com)
** 与HTML5 video视频真实交互的弹幕效果
** http://www.zhangxinxu.com/wordpress/?p=6386
** MIT License
** 保留版权申明
*/
// 弹幕数据
var dataBarrage = [
    {
      value: "老狮这素谁呀？这不是偶们家幺琴师吧？ ",
      color: "blue",
      range: [0, 0.5]
    },
    {
      value: "丑的各不相同",
      color: "blue",
      range: [0, 0.6]
    },
    {
      value: "妈咪厚涂多少",
      color: "blue",
      range: [0, 0.5]
    },
    {
      value: "长的好恶心 实在不行p一下吧 别出来恶心人了小姐姐 辱我推呀",
      color: "black",
      range: [0.1, 1]
    },
    {
      value: "隔着屏幕都闻着丑",
      color: "black",
      range: [0.2, 1]
    },
    {
      value: "呃啊啊啊啊，，脏东西滚开",
      color: "black",
      range: [0.2, 0.9]
    },
    {
      value: "牛魔的滚，恶心到了喵 ",
      color: "black",
      range: [0.2, 1]
    },
    {
      value: "兄弟你那俩眼珠子下面那点黑眼圈就是你的试妆吗",
      color: "black",
      range: [0.2, 1]
    },
    {
      value: "小解解你别出cos了 我建议你去亖",
      color: "black",
      range: [0.2, 0.9]
    },
    {
      value: "大姐你出的研磨和你的自设让我想吐了 长得丑的不准出cos了",
      color: "black",
      range: [0.2, 1]
    },
    {
      value: "小姐姐你素一坨史 ​",
      color: "black",
      range: [0.6, 0.7]
    },
    {
      value: "小姐姐你有点恶心到我了",
      color: "black",
      range: [0.2, 1]
    },
    {
      value: "救命你不如杀了我呢小姐姐",
      color: "black",
      range: [0, 0.9]
    },
    {
      value: "哒姐 你疯了 你真是有病 再cos一个试试呢你 ",
      color: "black",
      range: [0.7, 1]
    },
    {
      value: " …滚真的丑的受不了。",
      color: "black",
      range: [0.7, 0.95]
    },
    {
      value: "大姐你什么东西啊。。。看起来见见的 ​",
      color: "orange",
      range: [0.5, 0.8]
    },
    {
        value: " 有点像牛郎 总结一个字：凑 ​。",
        color: "black",
        range: [0.7, 0.95]
      },
      {
        value: " 丑的让人想报警  滚 ",
        color: "black",
        range: [0.7, 0.95]
      },
      {
        value: "小姐姐你是智力障碍吗[允悲] ​",
        color: "black",
        range: [0.7, 0.95]
      },
     
  ];
  
  // 弹幕方法
  var canvasBarrage = function(canvas, data) {
    if (!canvas || !data || !data.length) {
      return;
    }
    if (typeof canvas == "string") {
      canvas = document.querySelector(canvas);
      canvasBarrage(canvas, data);
      return;
    }
    var context = canvas.getContext("2d");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  
    // 存储实例
    var store = {};
  
    // 字号大小
    var fontSize = 28;
  
    // 实例方法
    var Barrage = function(obj, index) {
      // 随机x坐标也就是横坐标，对于y纵坐标，以及变化量moveX
      this.x = (1 + index * 0.1 / Math.random()) * canvas.width;
      this.y =
        obj.range[0] * canvas.height +
        (obj.range[1] - obj.range[0]) * canvas.height * Math.random() +
        36;
      if (this.y < fontSize) {
        this.y = fontSize;
      } else if (this.y > canvas.height - fontSize) {
        this.y = canvas.height - fontSize;
      }
      this.moveX = 1 + Math.random() * 3;
  
      this.opacity = 0.8 + 0.2 * Math.random();
      this.params = obj;
  
      this.draw = function() {
        var params = this.params;
        // 根据此时x位置绘制文本
        context.strokeStyle = params.color;
        context.font = "bold " + fontSize + 'px "microsoft yahei", sans-serif';
        context.fillStyle = "rgba(255,255,255," + this.opacity + ")";
        context.fillText(params.value, this.x, this.y);
        context.strokeText(params.value, this.x, this.y);
      };
    };
  
    data.forEach(function(obj, index) {
      store[index] = new Barrage(obj, index);
    });
  
    // 绘制弹幕文本
    var draw = function() {
      for (var index in store) {
        var barrage = store[index];
        // 位置变化
        barrage.x -= barrage.moveX;
        if (barrage.x < -1 * canvas.width * 1.5) {
          // 移动到画布外部时候从左侧开始继续位移
          barrage.x = (1 + index * 0.1 / Math.random()) * canvas.width;
          barrage.y =
            (barrage.params.range[0] +
              (barrage.params.range[1] - barrage.params.range[0]) *
                Math.random()) *
            canvas.height;
          if (barrage.y < fontSize) {
            barrage.y = fontSize;
          } else if (barrage.y > canvas.height - fontSize) {
            barrage.y = canvas.height - fontSize;
          }
          barrage.moveX = 1 + Math.random() * 3;
        }
        // 根据新位置绘制圆圈圈
        store[index].draw();
      }
    };
  
    // 画布渲染
    var render = function() {
      // 清除画布
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      // 绘制画布上所有的圆圈圈
      draw();
  
      // 继续渲染
      requestAnimationFrame(render);
    };
  
    render();
  };
  
  canvasBarrage("#canvasBarrage", dataBarrage);
  
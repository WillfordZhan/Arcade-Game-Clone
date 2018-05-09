// 这是我们的玩家要躲避的敌人 
var Enemy = function(y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = Math.random()*600;
    this.y = y;
    this.speed = Math.floor(Math.random()*100+100);
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    if (this.x>=505) {
        this.x = -100;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.initPosition();
};

// 此函数用于把小人放回初始位置
Player.prototype.initPosition = function(){
    this.x = 200;
    this.y = 306;
};

Player.prototype.update = function() {
    // 碰撞检测
    allEnemies.forEach(enemy => {
        if (this.y == enemy.y && Math.abs(this.x - enemy.x) <= 75){
            this.initPosition();
        }
    });
    // 胜利检测
    if (this.y < 60) {
        swal("Congradulations! You won!","You has reached the river!", "success", {
            button: "Play again!",
          }).then((result) => {
            this.initPosition();
          });
        
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.handleInput = function(key){
    if (key == "left" && this.x>=0) {this.x -= 101};
    if (key == "right" && this.x<=400) {this.x += 101};
    if (key == "up" && this.y>=0) {this.y -= 82};
    if (key == "down" && this.y<380) {this.y += 82};

};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
var player = new Player();
for (let i = 0; i < 3; i++) {
    allEnemies[i] = new Enemy(i*82 + 60);
}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

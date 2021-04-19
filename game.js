function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("player.js");
include("enemy.js");
include("bullet.js");

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyRealeased);

var pcon = 0;


var enemys = [];
var ecount = 0;
var ekills = 0;

var bullets = [];

function makeEnemy()
{
    ex = 900;
    ey = Math.random()*525;
    edx = -6
    edy = 8;
    var enemy = new Enemy(ex, ey, edx, edy);
    enemys.push(enemy);
}

function makeBullet()
{
    var bx = player.x + 75;
    var by = player.y + 75/2 - 5/2;
    var bdx = 15;
    
    var bullet = new Bullet(bx, by, bdx);

    bullets.push(bullet);
}

var pl = {x:100, y:300, dx:10, dy:10}; //player param
var player = new Player(pl.x, pl.y, pl.dx, pl.dy);

var timer = 0;
var btimer = 0;


var fonimg = new Image();
fonimg.src = 'img/dchgjnn-572f728b-0c91-4b93-a093-bf91dd58e6721.jpg';
fx = 0;


var enemimg = new Image();
enemimg.src = 'img/enemy.png';

var controlimg = new Image();
var keybord = new Image();
var mouse = new Image();
var course = new Image();

controlimg.src = "img/control.png";
keybord.src = "img/keyboard.png";
mouse.src = "img/mouse.png";
course.src = "img/wand.png";

var buttonX = [250, 250, 250];
var buttonY = [200, 320, 390];
var buttonW = [120, 120, 120];
var buttonH = [50, 50, 50];

var leftKeyPress = false;
var rightKeyPress = false;
var upKeyPress = false;
var downKeyPress = false;
var spaceKeyPress = false;
//var spaceKeyPress = false;

const LEFT_KEY = 37;
const RIGHT_KEY = 39; 
const UP_KEY = 38;
const DOWN_KEY = 40;
const SPACE_KEY = 32;

function keyPressed(evt)
{
    if(evt.keyCode == LEFT_KEY)
    {
        leftKeyPress = true;
    }
    if(evt.keyCode == RIGHT_KEY)
    {
        rightKeyPress = true;
    }
    if(evt.keyCode == UP_KEY)
    {
        upKeyPress = true;
    }
    if(evt.keyCode == DOWN_KEY)
    {
        downKeyPress = true;
    }
    if(evt.keyCode == SPACE_KEY)
    {
        spaceKeyPress = true;
    }
}

function keyRealeased(evt)
{
    if(evt.keyCode == LEFT_KEY)
    {
        leftKeyPress = false;
    }
    if(evt.keyCode == RIGHT_KEY)
    {
        rightKeyPress = false;
    }
    if(evt.keyCode == UP_KEY)
    {
        upKeyPress = false;
    }
    if(evt.keyCode == DOWN_KEY)
    {
        downKeyPress = false;
    }
    if(evt.keyCode == SPACE_KEY)
    {
        makeBullet();
        spaceKeyPress = false;
    }
}

function pmove()
{
    if(leftKeyPress && player.x - player.dx >= 0)
    {
        player.x -= player.dx;
    }
    if(rightKeyPress && player.x + player.dx <= 825)
    {
        player.x += player.dx;
    }
    if(upKeyPress && player.y - player.dy >= 0)
    {
        player.y -= player.dy;
    }
    if(downKeyPress && player.y + player.dy <= 525)
    {
        player.y += player.dy;
    }
}

function emove()
{
    timer++;
    if (timer%34 == 0 && ecount < 20)
    {
        makeEnemy();
        ecount++;
    }
    //phis
    for(i in enemys)
    {
        enemys[i].move();
        //border
        if (enemys[i].x <= 0)
        { 
            enemys[i].x = 900; 
            enemys[i].y = Math.random()*525;
        }
        if (enemys[i].y >= 525 || enemys[i].y < 0) enemys[i].dy = -enemys[i].dy;
        //collusion
        if(enemys[i].y + 75 > player.y && enemys[i].y < player.y + 75 && enemys[i].x + 75 > player.x && enemys[i].x < player.x + 75)
        {
            console.log('hit');
        }
    }

    fx += 6;//bg move speed
}

function bmove()
{
    for(i in bullets) 
    {
        bullets[i].move();
        if(bullets[i].outOfRange() || bullets[i].hasCollided())
        {
            delete bullets[i];
        }
    }
    bullets = bullets.filter(item => item !== undefined);
}

fonimg.onload = function() 
{
    context.drawImage(fonimg, fx, 0, 600, 399, 0, 0, 900, 600);
    game();
}



function game()
{
    update();
    render();
    requestAnimFrame(game);
}

function update()
{
    pmove();
    emove();
    bmove();
}

function render()
{
    context.drawImage(fonimg, fx, 0, 600, 399, 0, 0, 900, 600);
    if(fx >= 600)
    {
        fx = 1;
    }
    for(i in enemys) enemys[i].draw();
    for(i in bullets) bullets[i].draw();
    player.draw();
}

var requestAnimFrame = (function()
{
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimatoinFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimatoinFrame ||
    function(callback)
    {
        window.setTimeout(callback, 1000 / 20);
    };
})();
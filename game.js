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
canvas.addEventListener("mousemove", checkPos);
var fadeId = 0;

var pcon = 0; //0-main menu 1-game 2-death-screen
var pcont = 0; //1-keyboard 2-mouse only
var Img = [];
var z = 0;
for (var i = 0; i < 15; i++)
{
    Img[i] = new Image();
    Img[i].src = "pimg/"+i+".gif";
}

var enemys = [];
var ecount = 0;
var ekills = 0;

var bullets = [];

function makeEnemy()
{
    ex = 900;
    ey = Math.random()*525;
    edx = Math.random(-30)*-10;
    edy = Math.random(10)*30;
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
var kd = 0;

var pl = {x:100, y:300, dx:10, dy:10}; //player param
var player = new Player(pl.x, pl.y, pl.dx, pl.dy);
var plph = 3;

var timer = 0;
var btimer = 0;
var godtimer = 0;


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
keybord.src = "img/keyboard1.png";
mouse.src = "img/mouse.png";
course.src = "img/wand.png";



var buttonX = [250, 250, 250];
var buttonY = [200, 320, 390];
var buttonW = [549, 577, 403];
var buttonH = [90, 63, 63];



var leftKeyPress = false;
var rightKeyPress = false;
var upKeyPress = false;
var downKeyPress = false;
var spaceKeyPress = false;
var spaceKeyPress = false;

const LEFT_KEY = 37;
const RIGHT_KEY = 39; 
const UP_KEY = 38;
const DOWN_KEY = 40;
const SPACE_KEY = 32;

function keyPressed(evt)
{
    if(evt.keyCode == LEFT_KEY && pcont == 1)
    {
        leftKeyPress = true;
    }
    if(evt.keyCode == RIGHT_KEY && pcont == 1)
    {
        rightKeyPress = true;
    }
    if(evt.keyCode == UP_KEY && pcont == 1)
    {
        upKeyPress = true;
    }
    if(evt.keyCode == DOWN_KEY && pcont == 1)
    {
        downKeyPress = true;
    }
    if(evt.keyCode == SPACE_KEY && pcont == 1)
    {
        if(kd <= 0)
        {
            makeBullet();
            kd = 20;
        }
    }
    
}

function shoot()
{
        if(kd <= 0)
        {
            makeBullet();
            kd = 20;
        }
}

function keyRealeased(evt)
{
    if(evt.keyCode == LEFT_KEY && pcont == 1)
    {
        leftKeyPress = false;
    }
    if(evt.keyCode == RIGHT_KEY && pcont == 1)
    {
        rightKeyPress = false;
    }
    if(evt.keyCode == UP_KEY && pcont == 1)
    {
        upKeyPress = false;
    }
    if(evt.keyCode == DOWN_KEY && pcont == 1)
    {
        downKeyPress = false;
    }
    if(evt.keyCode == SPACE_KEY && pcont == 1)
    {
        spaceKeyPress = false;
    }
}

canvas.addEventListener('click', function(event) { 
    if (mouseX > buttonX[1] && mouseX < buttonX[1] + buttonW[1] && mouseY > buttonY[1] &&  mouseY < buttonY[1] + buttonH[1] )
    {
        pcon = 1;
        pcont = 1;
    } 
    else if (mouseX > buttonX[2] && mouseX < buttonX[2] + buttonW[2] && mouseY > buttonY[2] &&  mouseY < buttonY[2] + buttonH[2] )
    {
        pcon = 1;
        pcont = 2;
        document.getElementById('game').style.cursor = "none";
    }
  }); 

function pmove()
{
    if(pcont == 1)
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
    if(pcont == 2)
    {
        player.x = mouseX - 75/2;
        player.y = mouseY - 75/2;
    }
}

function emove()
{
    if(godtimer > 0)
    {
        godtimer--;
    }
    timer++;
    if (timer%20 == 0 && ecount < 25 && ekills <= 50 && godtimer == 0)
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
            godtimer = 180;
            plph--;
            enemys.forEach(function(enemy, i)
            {
                delete enemys[i];
                ecount--;
            });
            enemys = enemys.filter(item => item !== undefined);
            if(pcont == 1)
            {
                player.x = 100;
                player.y = 300;
            }
            console.log('hit');
        }
    }

    fx += 6;//bg move speed
}

function bmove()
{
    if(kd > 0)
    {
        kd--;
    }
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

function checkPos(mouseEvent)
{
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;
    //console.log(mouseX);
    //console.log(mouseY);
}

function game()
{
    update();
    render();
    requestAnimFrame(game);
}

function update()
{
    
    if(pcon == 0)
    {
        
    }
    if(pcon == 1)
    {
        if(pcont == 2)
        {
            shoot();
        }
        pmove();
        emove();
        bmove();
    }
}

function render()
{
    context.drawImage(fonimg, fx, 0, 600, 399, 0, 0, 900, 600);
    if(fx >= 600)
    {
        fx = 1;
    }
    
    if(pcon == 0)
    {
        context.drawImage(controlimg, buttonX[0], buttonY[0]);
        context.drawImage(keybord, buttonX[1], buttonY[1]);
        context.drawImage(mouse, buttonX[2], buttonY[2]);
    }
    if(pcon == 1)
    {
        for(i in enemys) enemys[i].draw();
        for(i in bullets) bullets[i].draw();
        
        z++
        if(z >= 75)
        {
            z = 0;
        }
        player.draw(Math.floor(z / 5));

    }
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


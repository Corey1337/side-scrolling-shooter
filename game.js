function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("player.js");
include("enemy.js");

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


var enemys = [];

function makeEnemy()
{
    ex = 900;
    ey = Math.random()*525;
    edx = -2;
    edy = 8;
    var enemy = new Enemy(ex, ey, edx, edy);
    enemys.push(enemy);
}


var pl = {x:100, y:300, dx:2, dy:2};
var player = new Player(pl.x, pl.y, pl.dx, pl.dy);

var timer = 0;


var fonimg = new Image();
fonimg.src = 'img/dchgjnn-572f728b-0c91-4b93-a093-bf91dd58e672.jpg';

var enemimg = new Image();
enemimg.src = 'img/enemy.png';


fonimg.onload = function() 
{
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
    timer++;
    if (timer%30 == 0)
    {
        makeEnemy();
    }
    //phis
    for(i in enemys)
    {
        enemys[i].move();
    //граница
    if (enemys[i].x <= 0)
    { 
        enemys[i].x = 900; 
        enemys[i].y = Math.random()*525;
    }
    if (enemys[i].y >= 525 || enemys[i].y < 0) enemys[i].dy = -enemys[i].dy;
    }
}

function render()
{
    context.drawImage(fonimg, 0, 0, 900, 600);
    for(i in enemys) enemys[i].draw();
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

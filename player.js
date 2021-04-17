class Player
{
    constructor(x, y, dx, dy)
    {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    draw()
    {
        var pimg = new Image();
        pimg.src = 'img/witch.gif';
        context.drawImage(pimg, this.x, this.y, 75, 75);
    }
}
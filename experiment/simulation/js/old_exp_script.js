var mycircle = function (canvas, x, y) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.r = 25;
    this.mycolor = 'red';
};
mycircle.prototype.draw = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    context.fillStyle = this.mycolor;
    context.fill();
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.stroke();
};
mycircle.prototype.setconnection = function (x, y) {
    this.x1 = x;
    this.y1 = y;
    this.connect = 1;
};
mycircle.prototype.drawline = function () {
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x1, this.y1);
    this.context.strokeStyle = "black";
    this.context.lineWidth = 3;
    this.context.stroke();
};
//--------------------------------------------------------------------------------
//# sourceMappingURL=old_exp_script.js.map
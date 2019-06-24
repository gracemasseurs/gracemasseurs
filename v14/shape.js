console.log("shape js called");

class Rectangle{
    //class Rectangle takes these variables (x,y,width,height and colour as an rgb string)
    constructor(x, y, w, h, c1){
        //defining the variables
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = c1;
    }
    update(){
        //draw the rectangle
        this.draw();

    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h); //rectangle parameters
        ctx.fillStyle = this.fill;
        ctx.fill();
    }
}

class Circle{
     //class Circle takes these variables (x, y, radiusX, radiusY, rotation, startAngle, endAngle, colour)
    constructor(xS, yS, xM, yM, c1){
        this.xC = (xS + xM)/2; // centre x
        this.yC = (yS + yM)/2; // centre y
        this.radiusX = Math.abs( (xM - xS)/2 ); //Math.abs is to make the values always positive
        this.radiusY = Math.abs( (yM - yS)/2 );
        this.r = 0; //setting the radius to 0
        //when radiusX is less than radiusY
        if(this.radiusX <this.radiusY){ 
            this.r = this.radiusX; //the radius of the circle will be radiusX
        }
            else{
                this.r = this.radiusY //otherwise the radius of the circle will be radiusY
            };
        
        this.fill = c1;
    }

    update(){
        //draws the circle
        this.draw();
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.xC, this.yC, this.r, 0, 2*Math.PI); //circle parameter
        ctx.fillStyle = this.fill;
        ctx.fill();
    }

}

class Line{
    constructor(xS, yS, xM, yM,dw, c1){
        //These are the defined variables required for a line
        this.xS = xS; //xMouseStart
        this.yS = yS; //yMouseStart
        this.xM = xM; //xMouse
        this.yM = yM; //yMouse
        this.dw = dw; //line width
        this.fill = c1;
    }

    update(){
        //this will draw the line
        this.draw()
    }

    draw(){
        //line function
        ctx.strokeStyle = this.fill;
        ctx.lineWidth = this.dw; //the width of the line is equal to dw, instead of having a set width
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.xS, this.yS); //where the line begins
        ctx.lineTo(this.xM, this.yM); //where the line ends
        ctx.stroke();
    }
}

class Brush{
    // class brush(x, y, r, colour)
    constructor(xM,yM,r, c1){
        //defined variables
        this.xC = xM; // this is the centre of x
        this.yC = yM; // this is the centre of y
        this.r = r; //radius
        this.fill = c1; //this controls the fill colour of the brush stroke
    }

update(){
    //draws the brush
    this.draw();
    }

draw(){
    ctx.beginPath();
    ctx.arc(this.xC, this.yC, this.r, 0, 2*Math.PI); //brush parameter
    ctx.fillStyle = this.fill;
    ctx.fill();
    }
}

class Ellipse{
    //class ellipse (x, y, radiusX, radiusY, rotation, startAngle, endAngle, colour)
    constructor(xS, yS, xM, yM, c1){ 
        //defined variables
        //finding the midpoint for the xMouseStart and the xMouse and the same for y
        this.xC = (xS + xM)/2; // centre x
        this.yC = (yS + yM)/2; // centre y
        //calculating the x radius and the y radius
        this.radiusX = Math.abs( (xM - xS)/2 ); //Math.abs is to make the values always positive
        this.radiusY = Math.abs( (yM - yS)/2 ); //Math.abs is to make the values always positive
        this.rotation = 0; //sets rotation to sero so it won't rotate
        this.startAngle = 0;
        this.endAngle = 2*Math.PI;
        this.fill = c1;
    }


    update(){
        //draws the ellipse
        this.draw();
    }

    draw(){
        ctx.beginPath();
        ctx.ellipse(this.xC, this.yC, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle); //parameters of the ellipse
        ctx.fillStyle = this.fill;
        ctx.fill();
    }
}

class Square{
    //class Square takes the variables (x (xMouseStart), y (yMouseStart), w, h, colour)
    constructor(xS, yS, w, h, c1){
        //defining the variables
        this.xC = xS + w/2; //centre of x
        this.yC = yS + h/2; //centre of y
        this.s = (w + h)/2; //calculation for w and h
        this.ang = 45; //setting the angle of the square to 45
        this.fill = c1;
}
    
    update(){
        //draws the square
        this.draw();
    }
    
    draw(){
        ctx.save()
        ctx.translate(this.xC, this.yC);
        ctx.beginPath();
        ctx.rect(0 - this.s/2, 0 - this.s/2, this.s, this.s); //parameters of the square
        ctx.fillStyle = this.fill;
        ctx.fill();
        ctx.restore();
        }
}


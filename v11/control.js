console.log("control object js called")

class ControlObject{
    constructor(x,y,rW,rH, canvas){

        //these control the width and the height of the dragged rectangle
        //these will be used for width and height of any created object
        this.x = x;
        this.y = y;
        //these are fixed dimensions for the background rectangle and are set using parameters
        this.rW = rW;
        this.rH = rH;

        this.xMouse = 0;
        this.yMouse = 0;
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.dragging = false;

        //for difference between start of xMouse and current xMouse
        this.w = 0;
        this.h = 0;

        this.dx = 0;
        this.dy = 0;
        this.stroke= colArray[0][1];

        this.r = 0;

        //boundary and dragging permissions
        this.insideBoundary = false;

        this.element = canvas;
        this.element.addEventListener ('mousedown', this.mDown.bind(this));
        this.element.addEventListener ('mousemove', this.mMove.bind(this));
        this.element.addEventListener ('mouseup', this.mUp.bind(this));

        this.objectSet = [];

    }

    mDown(e){
        this.xMouseStart = e.offsetX;
        this.yMouseStart = e.offsetY;
        if(this.insideBoundary == true){
            this.dragging = true;
        }
 
    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        this.insideBoundary = this.boundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.rW, this.rH);
        console.log(this.insideBoundary);
        if (this.dragging){
            
            if (this.xMouse < this.x){
                console.log(this.xMouse);
                this.xMouse = this.x;
            }
            if(this.xMouse > this.x + this.rW){
                this.xMouse = this.x + this.rW
            }
            if (this.yMouse < this.y){
                this.yMouse = this.y;
            }
            if(this.yMouse > this.y + this.rH){
                this.yMouse = this.y + this.rH
            }
        } 

        if(this.dragging){
            this.r = 10;
            if(ShapeButton.selectedShape == "Brush"){
                var sizes = new Brush(this.xMouse, this.yMouse, this.r, colourButton.selectedColour);
                this.objectSet.push(sizes);
            }
        }



    }

    mUp(e){
        if(this.dragging){

            this.dw = width_Button.selectedWidth;

            if (ShapeButton.selectedShape == "Rectangle"){
                var ROne = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colourButton.selectedColour);
                this.objectSet.push(ROne);    
            }else if(ShapeButton.selectedShape == "Ellipse"){    
                var EOne = new Ellipse (this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourButton.selectedColour);
            this.objectSet.push(EOne); 
            }else if (ShapeButton.selectedShape == "Circle"){
                var COne = new Circle(this.xMouse, this.yMouse, this.xMouseStart, this.yMouseStart, colourButton.selectedColour);
                this.objectSet.push(COne); 
            }else if (ShapeButton.selectedShape == "Line"){
                var LOne = new Line(this.xMouse, this.yMouse, this.xMouseStart, this.yMouseStart, this.dw, colourButton.selectedColour);
                this.objectSet.push(LOne); 
            }else if (ShapeButton.selectedShape == "Brush"){
                var BOne = new Brush(this.xMouse, this.yMouse, colourButton.selectedColour);
                this.objectSet.push(BOne); 
            }else if (ShapeButton.selectedShape == "Square"){
                var SOne = new Square(this.xMouseStart, this.yMouseStart, this.w, this.h ,colourButton.selectedColour);
                this.objectSet.push(SOne); 
            }
        }

        if (ShapeButton.selectedShape == "Reset"){
            this.objectSet = [];
            ShapeButton.selected = "";
        }
        if (ShapeButton.selectedShape == "Undo"){
            this.objectSet.pop ();
            ShapeButton.selected = "";
        }

        this.dragging = false;
    }

    update(){
        ctx.save();
        ctx.beginPath();
        this.drawBoundaryRect(this.x, this.y, this.rW, this.rH, "rgb(230,230,230)");
        ctx.clip();


        //the variables will be called again in the main which will define the position of the background boundary
        // this is where the width and the hieght of the dragged rectangle is updated
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        if(this.dragging){
            console.log("mouse is down");
            //this draws the bounding box when you drag
            this.draw();
        }


        for(var i = 0; i < this.objectSet.length; i ++){
            this.objectSet[i].update();
        }
        ctx.restore();

        if(this.dragging){
                 // this draws the rectangle (guide)
                 console.log("draw");
                this.draw();
        }
  
    }


    draw(){

        if(ShapeButton.selectedShape == "Line" || ShapeButton.selectedShape == "Rectangle" || ShapeButton.selectedShape == "Ellipse" || ShapeButton.selectedShape == "Circle" || ShapeButton.selectedShape == "Square"){
            this.drawRect(this.xMouseStart, this.yMouseStart, this.w, this.h);
        }

    }

    //this function draws the rectangle that is dragged
    drawRect(x,y,w,h){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = colourButton.selectedColour; //determins the colour of the stroke of the dragging rectangle
        ctx.stroke();

    } 

    drawCircle(x,y,r){
        ctx.beginPath();
        ctx.arc(x,y,r,0,2*Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = colourButton.selectedColour;
        ctx.stroke();
    }

    drawLine(x,y,w,h){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(w,h);
        ctx.lineWidth = 10;
        ctx.strokeStyle = colourButton.selectedColour;
        ctx.stroke();
    }

    drawBrush(x,y,r){
        ctx.beginPath();
        ctx.arc(x,y,r,0, 2*Math.PI);
        lineWidth = 10;
        ctx.strokeStyle = colourButton.selectedColour;
        ctx.stroke();
    }
    
    //this function draws the background rectangle
    drawBoundaryRect(x,y,w,h,col){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 1;
        ctx.fillStyle = col; //determins the colour of the fill of the boundary rectangle
        ctx.fill();
    }
// returns true or false if mouse is inside rectangular boundary
// paramters x and y mouse position and x, y, width, height of the boundary
    boundsCheck(xM, yM, x, y, w, h){ 
        if(xM > x && xM < x + w && yM > y && yM < y+ h){
            return true;
        }else{
            return false;
        }
}

}
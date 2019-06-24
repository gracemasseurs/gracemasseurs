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

        // set radius (r) to 0, for the brush
        this.r = 0;

        //boundary and dragging permissions
        this.insideBoundary = false;

        this.element = canvas;
        //the event listeners are called
        this.element.addEventListener ('mousedown', this.mDown.bind(this)); //function - addEventListener
        this.element.addEventListener ('mousemove', this.mMove.bind(this)); //function - addEventListener
        this.element.addEventListener ('mouseup', this.mUp.bind(this)); //function - addEventListener

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

        //these if statements mean that the mouse can leave the boundary and the shape can still be released
        if (this.dragging){
            
            if (this.xMouse < this.x){
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

        //creating the brush shape to not have a guideline
        if(this.dragging){
            this.r = width_Button.selectedRadius; // this sets the radius to the different button sizes
            if(ShapeButton.selectedShape == "Brush"){
                var sizes = new Brush(this.xMouse, this.yMouse, this.r, colourButton.selectedColour); //button for brush
                this.objectSet.push(sizes); //pushes the button so it will appear
            }
        }



    }

    mUp(){
        //condition: these shapes will only appear when mouseDown is true and mouse is in bound (when a shape is being dragged)
        if(this.dragging){

            this.dw = width_Button.selectedWidth;

            //Buttons appear on the screen with text etc. this links with main.js - the variables will be defined for each individual button there
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
            }else if (ShapeButton.selectedShape == "Square"){
                var SOne = new Square(this.xMouseStart, this.yMouseStart, this.w, this.h ,colourButton.selectedColour);
                this.objectSet.push(SOne); 
            }
        }

        //reset button 
        if (ShapeButton.selectedShape == "Reset"){
            this.objectSet = []; //clears the entire canvas
            ShapeButton.selected = ""; //this ensures the button won't stay selected
            ShapeButton.selectedShape = ""; //this deselects the already selected shape button
        }
        //undo button
        if (ShapeButton.selectedShape == "Undo"){
            this.objectSet.pop (); //clears (pops) the last shape drawn on the canvas
            ShapeButton.selected = ""; //this ensures the buttons won't stay selected
            ShapeButton.selectedShape = ""; //this deselects the already selected shape button
        }

        this.dragging = false;
    }

    update(){
        ctx.fillStyle = this.textC; //fillStyle is equal to textC
        var myFont = "bold italic 25px helvetica"; //declares font and size for text
        ctx.font = myFont;
        ctx.fillText ("Select a shape, colour and size and draw away!", 294, 610);

        ctx.save();
        ctx.beginPath(); // starts the program
        this.drawBoundaryRect(this.x, this.y, this.rW, this.rH, "rgb(230,230,230)"); //boundary rectangle
        ctx.clip(); //clipping things off

        //the variables will be called again in the main which will define the position of the background boundary
        //this is where the width and the hieght of the dragged rectangle is updated
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        //gives permission to draw 
        if(this.dragging){
            //this draws the bounding box when you drag
            this.draw();
        }

        // loops for the object set
        for(var i = 0; i < this.objectSet.length; i ++){
            this.objectSet[i].update();
        }
        ctx.restore(); //restores the object set

        if(this.dragging){
                 // this draws the rectangle (guide)
                this.draw();
        }
  
    }


    draw(){

        if(ShapeButton.selectedShape == "Line" || ShapeButton.selectedShape == "Rectangle" || ShapeButton.selectedShape == "Ellipse" || ShapeButton.selectedShape == "Circle" || ShapeButton.selectedShape == "Square"){
            //guide rectangle
            //defining the variable and telling the program how to draw the rectangle quideline
            this.drawRect(this.xMouseStart, this.yMouseStart, this.w, this.h);
        }

    }

    //this function draws the rectangle that is dragged
    drawRect(x,y,w,h){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 1.5; //sets line width to 1.5
        ctx.strokeStyle = colourButton.selectedColour; //determins the colour of the stroke of the dragging rectangle
        ctx.stroke();

    } 
    
    //this function draws the background rectangle
    drawBoundaryRect(x,y,w,h,col){
        ctx.beginPath(); 
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 1; //sets lineWidth to 1
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
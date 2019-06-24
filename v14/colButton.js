console.log("colour buttons js called");

class colourButton{
    //variables
    constructor(x, y,w, h, stroke, fill, canvas){
        //defining the variables
        this.x = x;
        this.y =y;
        this.w = w;
        this.h = h;
        this.stroke =stroke;
        this.fill = fill;

        //delcaring that the mouse location starts at 0
        this.xMouse = 0;
        this.yMouse = 0;

        //setting everything to false to begin
        this.bound= false;
        this.selected = false;

        this.element = canvas;
        this.element.addEventListener('mousedown', this.mClick.bind(this)); //function - addEventListener
        this.element.addEventListener('mousemove', this.mMove.bind(this)); //function - addEventListener

    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        this.bound = this.boundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h); //boundary check

    }

    mClick(){
        if(this.bound == true){

            colourButton.selected = this;
            colourButton.selectedColour =this.fill; //connects the variables together with fill
           
        }
    }

    update(){
        this.draw();

    }

    draw(){
        ctx.strokeStyle = this.stroke;
        ctx.fillStyle = this.fill;
        if(colourButton.selected == this){
            ctx.strokeStyle = "rgb(0,0,255)"; //declares what the outline colour of the button will change to if the mouse is inside the button

        }
        else if(this.bound){
            ctx.strokeStyle = "rgb(0,0,255)"; //declares what the outline colour of the button will be when the mouse is outside the button
       

        }

        ctx.beginPath(); //start function
        ctx.rect(this.x,this.y,this.w,this.h); //rectangle parameters
        ctx.lineWidth = 6; //linewidth of the shape button
        ctx.fill();
        ctx.stroke();
        
    }

    boundsCheck(xM, yM, x, y, w, h){ 
        if(xM > x && xM < x + w && yM > y && yM < y+ h){
            return true;
        }else{
            return false;
        }
        
}


}
colourButton.selected =""; //static variable
colourButton.selectedColour ="rgb(0,0,0)"; //static variable

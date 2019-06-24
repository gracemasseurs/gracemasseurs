console.log("shape buttons js called");

//class ShapeButton (for the text)
class ShapeButton{
    //variables
    constructor(text, x, y,w, h, stroke, fill, textC,over,canvas){
        //below are the defined variables
        this.x = x; 
        this.y =y;
        this.w = w;
        this.h = h; 
        this.stroke =stroke; //outline colour of the button
        this.fill = fill; //fill colour of the button
        this.textC= textC; //text colour
        this.text = text; //the text
        this.over =  over; //when the mouse is over the button it will change to the 'over' colour

        //declares that the mouse starts at 0 for both x and y
        this.xMouse = 0;
        this.yMouse = 0;

        //sets the boundary rectangle and mouse click to false to begin
        this.bound= false;
        this.selected = false;

        this.element = canvas;
        this.element.addEventListener('mousedown', this.mClick.bind(this)); //function - addEventListener
        this.element.addEventListener('mousemove', this.mMove.bind(this)); //function - addEventListener

    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        this.bound = this.boundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h); //boundary rectangle check
    }

    mClick(){
        if(this.bound == true){
            
            ShapeButton.selected = this;
            ShapeButton.selectedShape =this.text;
            //this links the shape button variable with text, so that the user knows which button is selected.
           
        }
    }

    update(){
        this.draw();
        this.writeText(); //this calls the written text

    }

    draw(){
        if(ShapeButton.selected == this){
            ctx.fillStyle = this.over; //if button is selected, the colour will be white
            
        }
        else if(this.bound){
            ctx.fillStyle = this.over; //if button hovers over button, the color will be white 

        }
        else{
            ctx.fillStyle = this.fill; //otherwise, the fill colour stays the same
        }
        
        ctx.beginPath(); //starts function
        ctx.rect(this.x,this.y,this.w,this.h); //variables for the rectangular buttons
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = 6; //linewidth of the shape button
        ctx.fill();
        ctx.stroke();
        
    }
    writeText(){
        ctx.fillStyle = this.textC; //declares fillStyle is equal to textC
        ctx.font = "20px sans-serif";
        ctx.textAlign = "center";
        const baseline = ['middle'];
        ctx.textBaseline = baseline;
        ctx.fillText(this.text,this.x + this.w/2,this.y + this.h/2); //location of the text
    }

    //boundary function starts
    boundsCheck(xM, yM, x, y, w, h){ 
        if(xM > x && xM < x + w && yM > y && yM < y+ h){
            return true;
        }else{
            return false;
        }
    }
}
ShapeButton.selected =""; //universal
ShapeButton.selectedShape =""; //universal

class width_Button{
    //variables
    constructor(text, x, y, w, h, width, radius, stroke, fill, textC, over, canvas){
        //below are the defined variables
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.radius = radius; // This is the size for brush
        this.width = width; // This is the size for line
        this.stroke = stroke; //outline colour
        this.fill = fill; //fill colour
        this.textC = textC; //This is the colour for the text
        this.text = text;
        this.over = over; //When the mouse is over the boundary, it changes colour 

        //delcares the mouse location starts at 0
        this.xMouse = 0;
        this.yMouse = 0;

        //setting to false
        this.bound = false;
        this.click = false;

        this.element = canvas;
        this.element.addEventListener('mousedown', this.mClick.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
    }

    mClick(){
        if(this.bound == true){
            
            width_Button.selected = this;
            width_Button.selectedWidth = this.width; //sizing for line shape
            width_Button.selectedRadius = this.radius;// sizing for brush

        }
    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        this.bound = this.boundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h); //bound check
    }

    update(){
        this.draw();
        this.writeText();
        }

    draw(){
        if(ShapeButton.selected == this ){
            ctx.fillStyle = colArray[3][4];//if button is selected colour will be this colour

        }
        else if( this.bound ){
            ctx.fillStyle = this.over; //if button is selected colour will be white

        }
        else{
            ctx.fillStyle = this.fill //otherwise, the fill colour will stay the same
        }
        
        ctx.beginPath(); //starts function
        ctx.rect(this.x, this.y, this.w, this.h); //parameters
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = 5; //line width of the button is set
        ctx.fill();
        ctx.stroke();

    }

    writeText(){
        ctx.fillStyle = this.textC; //declares fillStyle is equal to textC
        ctx.font = "20px sans-serif";
        ctx.textAlign = "center";
        const baseline = ['middle'];
        ctx.textBaseline = baseline;
        ctx.fillText(this.text,this.x + this.w/2,this.y + this.h/2); //location of the text
    }

    //boundary function starts
    boundsCheck(xM, yM, x, y, w, h){ 
        if(xM > x && xM < x + w && yM > y && yM < y+ h){
            return true;
        }else{
            return false;
        }
        
}


}
width_Button.selected = ""; //universal
width_Button.selectedWidth = ""; //universal
width_Button.selectedRadius = 10; //universal

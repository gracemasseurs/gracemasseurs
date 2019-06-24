console.log("main js called");
objectSet= [];

var objectOne = new ControlObject (12,73, 515, 502.7, canvas);
objectSet.push(objectOne);

// drawing the button
//class button (constructor) text, x, y,w, h, stroke, fill, textC,over,canvas
var butOne = new ShapeButton("Rectangle", 14, 24, 120, 40, colArray[0][1], colArray[0][1], colArray[2][2], colArray[2][0], canvas);
var butTwo = new ShapeButton("Ellipse", 144, 24, 120, 40, colArray[0][1], colArray[0][1], colArray[2][2], colArray[2][0], canvas);
var butThree = new ShapeButton("Circle", 274, 24, 120, 40, colArray[0][1], colArray[0][1], colArray[2][2], colArray[2][0], canvas);
var butFour = new ShapeButton("Line", 534, 24, 120, 40, colArray[0][1], colArray[3][9], colArray[2][2], colArray[2][0], canvas);
var butFive = new ShapeButton("Brush", 664, 24, 120, 40, colArray[0][1], colArray[3][10], colArray[2][2], colArray[2][0], canvas);
var butSix = new ShapeButton("Square", 404, 24, 120, 40, colArray[0][1], colArray[0][1], colArray[2][2], colArray[2][0], canvas);

//these are the two buttons for when you make a mistake on the canvas or would like to restart
var reset = new ShapeButton("Reset", 534, 533, 120, 40, colArray[0][1], colArray[0][1], colArray[2][2], colArray[2][0], canvas);
var undo = new ShapeButton("Undo", 664, 533, 120, 40, colArray[0][1], colArray[0][1], colArray[2][2], colArray[2][0], canvas);

//Width buttons to change the width of the line 
var w1 = new width_Button("XS", 533, 75, 39, 40, 2, 0, colArray[3][9], colArray[3][9], colArray[2][2], colArray[2][0], canvas);
var w2 = new width_Button("S", 581, 75, 50, 40, 5, 0, colArray[3][9], colArray[3][9], colArray[2][2], colArray[2][0], canvas);
var w3 = new width_Button("M", 639.5, 75, 40, 40, 8, 0, colArray[3][9], colArray[3][9], colArray[2][2], colArray[2][0], canvas);
var w4 = new width_Button("L", 688, 75, 50, 40, 12, 0, colArray[3][9], colArray[3][9], colArray[2][2], colArray[2][0], canvas);
var w5 = new width_Button("XL", 746, 75, 39, 40, 18, 0, colArray[3][9], colArray[3][9], colArray[2][2], colArray[2][0], canvas);

var r1 = new width_Button("XS", 533, 126, 39, 40, 0, 2, colArray[3][10], colArray[3][10], colArray[2][2], colArray[2][0], canvas);
var r2 = new width_Button("S", 581, 126, 50, 40, 0, 5, colArray[3][10], colArray[3][10], colArray[2][2], colArray[2][0], canvas);
var r3 = new width_Button("M", 639.5, 126, 40, 40, 0, 10, colArray[3][10], colArray[3][10], colArray[2][2], colArray[2][0], canvas);
var r4 = new width_Button("L", 688, 126, 50, 40, 0, 14, colArray[3][10], colArray[3][10], colArray[2][2], colArray[2][0], canvas);
var r5 = new width_Button("XL", 746, 126, 39, 40, 0, 20, colArray[3][10], colArray[3][10], colArray[2][2], colArray[2][0], canvas);

// here are the loops for the colour buttons x, y, w, h, stroke, fill, over, canvas
// i = x/list, j = y/colour in the list
// i starts on the first list end on the third list
//the colours are in order in rows going from a lighter colour to a darker and brighter of the same colour as it progresses downwards
for( var i = 0 ; i<9 ; i++){
    var temp= new colourButton (534 +(i%3)*86,176+Math.floor(i/3)*50,78,40, colArray[0][i], colArray[0][i], canvas);
    objectSet.push(temp);//pushes the loop so the colour buttons appear
}
//these are the loops for the colours
for( var i = 0 ; i<9 ; i++){
    var temp1= new colourButton (534 +(i%3)*86,329+Math.floor(i/3)*50,78,40, colArray[1][i], colArray[1][i], canvas);
    objectSet.push(temp1);
}

//colour purple 
var colSeven = new colourButton (534,482,78,40, colArray[1][9], colArray[1][9], canvas);
var colFourteen = new colourButton (620,482,78,40, colArray[1][10], colArray[1][10], canvas);
var colTwentyone = new colourButton (706,482,78,40, colArray[1][11], colArray[1][11], canvas);


//pushing the buttons so they appear on the drawing canvas
objectSet.push(butOne, butTwo, butThree, butFour, butFive, butSix, reset, undo, w1, w2, w3, w4, w5, r1, r2, r3, r4, r5, colSeven, colFourteen, colTwentyone);

//loops for object set
function animate(){
    ctx.clearRect(0,0,width,height); // rectangle clear
    for(var i=0; i<objectSet.length; i++){ //loops
        objectSet[i].update();
    }


    window.requestAnimationFrame(animate);

}
animate();
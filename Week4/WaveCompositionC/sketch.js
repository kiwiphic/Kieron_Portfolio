/* Week 4 - Waves & Distribution
 * Kieron, Wave Composition C, Changed the colour range, shape and randomness
*/

var magnify = 250; // how big we want the rose to be
var rotation = 250;
var radius = 80;
var elements = 20; // no. of elements to draw

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  colorMode(RGB);
  frameRate(80);
}
 
function draw() {
  background(0);
    
  radius = map(frameCount - 2, 30, width, 0, 10);
  rotation = map(frameCount / 10, 0, height, 70, 10);
  
  var spacing = TWO_PI/elements; // how far apart each 'node' will be
  translate(width*0.5, height*0.5); // translate the whole sketch to the centre of the screen
  
  for (var i = 0; i < elements ;i++) {
      stroke(i*3, random(200,255), random(200,255));
      fill(random(0, 255), random(0, 170), random(100, 200));
      
      push();
      rotate(spacing * i * rotation);
      translate(sin(spacing*i*radius) * magnify, 0); 
      //comment out the line above and swap for the line below for uneven spacing
      //translate(i * 5 ,0);
      triangle(0, random(30, 40), 40, 10 , 20,  random(-20, -40), -40);
      triangle(0, random(30, 50), 40, 10 , 70,  random(30, 40), 40);
      pop();
  }
}
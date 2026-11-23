/* Week 9 - Fractals & Recursion 
 * Kieron, Fractal Tree, Changed the colour and tweaks elements of the tree
*/
const DEPTH = 9;
let seed = 7;
let sky;
let bark, twig;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 470, 120, 90, 100);
  sky = createGraphics(width, height);
  paintSky(sky);
  bark = color(10, 75, 30);
  twig = color(35, 85, 45);
}

function draw() {
  randomSeed(seed);
  image(sky, 0, 0);

  const angle = map(mouseX, 0, width, 0.15, 0.75);

  push();
  translate(width / 2, height - 90);
  branch(155, DEPTH, angle);
  pop();

  noStroke();
  fill(250, 45, 12);
  ellipse(width / 2, height + 40, width * 1.6, 300);
}

function branch(len, depth, angle) {
  const t = 1 - depth / DEPTH;
  stroke(lerpColor(bark, twig, t));
  strokeWeight(map(depth, 0, DEPTH, 0.6, 16));
  strokeCap(ROUND);
  line(0, 0, 0, -len);

  translate(0, -len);

  if (depth === 0) {
    blossom();
    return;
  }

  const wind = (noise(depth * 0.3, frameCount * 0.008) - 0.5) * 0.5 * t;

  push();
  rotate(angle + random(-0.1, 0.15) + wind);
  branch(len * random(0.7, 0.78), depth - 1, angle);
  pop();

  push();
  rotate(-angle + random(-0.15, 0.15) + wind);
  branch(len * random(0.7, 0.78), depth - 1, angle);
  pop();
}

function blossom() {
  noStroke();
  fill(240, 35, 100, 55);
  circle(0, 0, random(12, 18));
}


function paintSky(g) {
  g.colorMode(HSB, 360, 100, 100, 100);
  g.noStroke();
  for (let y = 0; y < g.height; y++) {
    const t = y / g.height;
    g.fill(lerpColor(color(250, 60, 14), color(15, 55, 75), pow(t, 1.8)));
    g.rect(0, y, g.width, 1);
  }
  randomSeed(3);
  for (let i = 0; i < 140; i++) {
    g.fill(0, 0, 100, random(20, 80));
    g.circle(random(g.width), random(g.height * 0.55), random(0.8, 2.2));
  }
  g.fill(100, 20, 100, 90);
  g.circle(g.width * 0.78, g.height * 0.24, 70);
}

function keyPressed() {
  if (key === "r" || key === "R") seed = floor(random(100000));
  if (key === "s" || key === "S") saveCanvas("living-tree", "png");
}
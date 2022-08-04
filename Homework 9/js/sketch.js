var r = 0;
var g = 0;
var b = 0;
var fade = 0;

function setRGB(){
  switch(fade){
    case 0:
      for(i = 0; i < 255; i++){
        r++;
        if(b > 0){
          b--;
        }
        if(r == 255){
          fade++;
        }
        break;
      }
      break;
    case 1:
      for(i = 0; i < 255; i++){
        g++;
        if(r > 0){
          r--;
        }
        if(g == 255){
          fade++;
        }
        break;
      }
      break;
    case 2:
      for(i = 0; i < 255; i++){
        b++;
        if(g > 0){
          g--;
        }
        if(b == 255){
          fade = 0;
        }
        break;
      }
      break;
  }
}

function setup(){
    createCanvas(500,500);
}

function draw(){
    setRGB();
    background(255);
  
  stroke(0,0,0,0);
  strokeWeight(3);
  
  //hair
  fill(203,154,73);
  triangle(120,170,270,300,90,350);
  triangle(120,170,270,300,120,400);
  triangle(120,170,270,300,150,450);
  
  triangle(380,170,230,300,410,350);
  triangle(380,170,230,300,380,400);
  triangle(380,170,230,300,350,450);
  
  //ears
  fill(232,190,172);
  ellipse(115,250,50,100);
  ellipse(385,250,50,100);
  
  //head
  fill(232,190,172);
  ellipse(250,250,270,350);
  
  //beard
  fill(183,134,53);
  ellipse(250,350,220,150);
  
  //nose
  fill(232,190,172);
  quad(250,220,225,290,250,300,275,290);
  stroke(212,170,160);
  line(250,220,225,290);
  line(225,290,250,300);
  stroke(0,0,0,0);
  
  //mouth
  fill(0);
  rect(200,350,100,10);
  
  //bangs
  fill(203,154,73);
  quad(180,75,250,65,250,130,130,130);
  quad(250,130,250,65,320,75,370,130);
  quad(180,75,250,65,250,130,100,200);
  quad(250,130,250,65,320,75,400,200);
  quad(180,75,250,65,250,140,150,200);
  quad(250,140,250,65,320,75,350,200);
  
  //eyes
  fill(255);
  ellipse(180,230,80,50);
  ellipse(320,230,80,50);
  fill(r,g,b);
  circle(180,230,50);
  circle(320,230,50);
  stroke(0,0,0,180);
  strokeWeight(30);
  point(180,230);
  point(320,230);
  
  //name
  strokeWeight(0);
  fill(0);
  textSize(30);
  textFont('Times New Roman');
  text('Richard Way',320,450);
  
}
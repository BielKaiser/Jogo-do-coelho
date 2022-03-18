const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var floor
var fundo
var corda,corda2,corda3
var maca
var ligar,ligar2,ligar3
var coelho,coelhoPiscando,coelhoComendo,coelhoTriste
var botao,botao2,botao3
var som1
var sadSound
var eatSound
var somAr
var somCorda
var somCorte
var mutar
var balao
var largura
var altura

function preload ()
{ 
  
  
  fundo = loadImage ("background.png");
  
  maca = loadImage ("melon.png"); 
  
  coelhoPiscando = loadAnimation ("blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_1.png","blink_1.png","blink_1.png","blink_1.png");
  coelhoComendo = loadAnimation ("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  coelhoTriste = loadAnimation ("sad_1.png","sad_1.png","sad_1.png","sad_1.png","sad_1.png","sad_2.png","sad_2.png","sad_2.png","sad_2.png","sad_3.png","sad_3.png","sad_3.png","sad_3.png"); 
  coelhoComendo.looping = false
  coelhoTriste.looping = false
  
  som1 = loadSound ("sound1.mp3");
  sadSound = loadSound ("sad.wav");
  eatSound = loadSound ("eating_sound.mp3");
  somAr = loadSound ("air.wav");
  somCorda = loadSound ("rope_cut.mp3");

}

function setup() 
{
  
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    largura = displayWidth
    altura = displayHeight
    createCanvas(displayWidth+80,displayHeight);
  }
  else {
    largura = windowWidth
    altura = windowHeight
    createCanvas(windowWidth,windowHeight);
  }
  
  frameRate(80);
  
  engine = Engine.create();
  world = engine.world;
  botao = createImg ("cut_btn.png");
  botao.position (220,15)
  botao.size (50,50)
  botao.mouseClicked (drop)
  
  botao2 = createImg ("cut_btn.png");
  botao2.position (70,180)
  botao2.size (50,50)
  botao2.mouseClicked (drop2)
  
  botao3 = createImg ("cut_btn.png");
  botao3.position (350,150)
  botao3.size (50,50)
  botao3.mouseClicked (drop3)
  
  corda = new rope (6,{x: 245, y: 20})
  corda2 = new rope (6,{x: 75, y: 200})
  corda3 = new rope (6,{x: 380, y: 155})
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode (CENTER)
  textSize(50)
  
  coelho = createSprite (350,altura-80) 
  coelho.scale = 0.2
  
  coelhoPiscando.frameDelay = 50
  coelho.addAnimation("coelhoPiscando",coelhoPiscando);
  coelhoComendo.frameDelay = 20
  
  floor = new chao (200,altura,600,20);
  fruta = Bodies.circle (300,300,20);
  Matter.Composite.add (corda.body,fruta);
  ligar = new link (corda,fruta);
  ligar2 = new link (corda2,fruta);
  ligar3 = new link (corda3,fruta);
  
  som1.play()
  som1.setVolume (0.1);

  mutar = createImg ("mute.png");
  mutar.position (430,30);
  mutar.size (50,50);
  mutar.mouseClicked (mute);

  balao = createImg ("balloon.png");
  balao.position (20,300);
  balao.size (100,100);
  balao.mouseClicked (ar);
}

function ar()
{
  somAr.play()

  if (fruta.position.y >= 200 && fruta.position.y <=400){
    Matter.Body.applyForce (fruta,{x:0,y:0},{x:0.05,y:0});
  }

}

function mute()
{

  if (som1.isPlaying()){
    som1.stop()
  }
   else {
     som1.play()
   }

}

function draw() 
{
  Engine.update(engine);
  background (51)
  imageMode (CENTER)
  image (fundo,largura/2,altura/2,largura,altura) 
  drawSprites()
  
  if (colidir(fruta,coelho)==true){
    coelho.addAnimation ("coelhoComendo",coelhoComendo)
    coelho.changeAnimation ("coelhoComendo")
    eatSound.play()
    eatSound.looping = false
    eatSound.setVolume (3)
  } 
  
  if (colidir(fruta,floor.floor)==true){
    coelho.addAnimation ("coelhoTriste",coelhoTriste)
    coelho.changeAnimation ("coelhoTriste")
    
    sadSound.play()
    sadSound.setVolume (7)
    sadSound.looping = false
    
  }

  corda.show ();
  corda2.show ();
  corda3.show();
  if (fruta != null){
    image (maca,fruta.position.x,fruta.position.y,70,70);
  }
  
}

function drop () {
  
  corda.break();
  ligar.remove();
  ligar = null; 
  
  somCorda.play()
  somCorda.setVolume (3)

}

function drop2 () {
  
  corda2.break();
  ligar2.remove();
  ligar2 = null; 
  
  somCorda.play()
  somCorda.setVolume (3)

}

function drop3 () {
  
  corda3.break();
  ligar3.remove();
  ligar3 = null; 
  
  somCorda.play()
  somCorda.setVolume (3)

}
function colidir(body,sprite){
  if (body != null){
    var distancia = dist (body.position.x,body.position.y,sprite.position.x,sprite.position.y);
     if (distancia <= 100){
       World.remove(engine.world,fruta);
       fruta = null
        return true 
        }
      else{
        return false
      }  
    }   
}  


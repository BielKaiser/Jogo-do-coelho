class chao{
    constructor (x,y,w,h){
     this.w = w
     this.h = h   
     var config = {
      isStatic: true
      }
     this.floor = Bodies.rectangle (x,y,w,h,config);
     World.add (world,this.floor);
    }   
 display (){
    fill ("255");
    rect (this.floor.position.x,this.floor.position.y,this.w,this.h);   
 
}
  
} 
 
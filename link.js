class link {
    constructor (bodyA,bodyB){
        var tamanho = bodyA.body.bodies.length-2
        this.link = Constraint.create({
            bodyA:bodyA.body.bodies [tamanho],
            pointA:{x:0,y:0},
            bodyB:bodyB,
            pointB:{x:0,y:0},
            stiffness:0.01,length:-10
        })
    World.add (engine.world,this.link);
        
    }
remove (){
    World.remove (engine.world,this.link);
}
    
}
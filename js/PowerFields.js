function _PowerField(params){
    var that = this;
    var models =[
        new MyDriver.Object("shape",{shapeType:"rectangle",bordered:true,borderSize:2,sideX:86,sideY:61,color:0xffcc00}),
        new MyDriver.Object("shape",{shapeType:"rectangle",bordered:true,borderSize:2,sideX:86,sideY:61,color:0xffcc00}),
        new MyDriver.Object("shape",{shapeType:"rectangle",bordered:true,borderSize:2,sideX:86,sideY:61,color:0xffcc00}),
        new MyDriver.Object("shape",{shapeType:"rectangle",bordered:true,borderSize:2,sideX:86,sideY:61,color:0xffcc00})
    ]
    for(var i=0;i<models.length;i++)
    {
        var elem = models[i];
        elem.Scale = 0.7*1/Math.pow(2,i);
        var fieldSide = {x:86*0.7,y:61*0.7};
        elem.Position.Set(params.pos.x + fieldSide.x * (i==0?0:1) * ( 1 + (i<2?0:Math.pow(2,i-1)) ) / ( Math.pow(2,i+1) ) , params.pos.y + fieldSide.y * (i==0?0:1) * ( 1 + (i<2?0:Math.pow(2,i-1)) ) / ( Math.pow(2,i+1) ));
        elem.visible = false;
        Driver.Scene.AddToScene(elem);
    }
    var anims = true;
    this.Hide = function(){
        anims = false;
        for(var i=0;i<models.length;i++)
        {
            models[i].visible = false;
        }
    }
    this.Show = function(){
        anims = true;
    }
    this.Position = {x:params.Pos.x,y:params.Pos.y};
    GameData.Map[this.Position.y][this.Position.x].content.power = this;
    this.MoveToAnotherField = function(newPos)
    {
        GameData.Map[that.Position.y][that.Position.x].content.power = "";
        GameData.Map[that.Position.y][that.Position.x].content.power = null;
        that.Position = {x:newPos.x,y:newPos.y};
        GameData.Map[that.Position.y][that.Position.x].content.power = that;
        var newPosition = {x:GameData.Map[that.Position.y][that.Position.x].Position.x,y:GameData.Map[that.Position.y][that.Position.x].Position.y};
        for(var i=0;i<models.length;i++)
        {
            var elem = models[i];
            elem.Scale = 0.7*1/Math.pow(2,i);
            var fieldSide = {x:86*0.7,y:61*0.7};
            elem.Position.Set(newPosition.x + fieldSide.x * (i==0?0:1) * ( 1 + (i<2?0:Math.pow(2,i-1)) ) / ( Math.pow(2,i+1) ) , newPosition.y + fieldSide.y * (i==0?0:1) * ( 1 + (i<2?0:Math.pow(2,i-1)) ) / ( Math.pow(2,i+1) ));
        }
    }
    var which = 0;
    function Anim()
    {
        if(anims)
        {
            var prevModel = which;
            if(which < 2)
            {
                which++;
            }
            else
            {
                which = 0;
            }
            models[prevModel].visible = false;
            models[which].visible = true;
        }
    }
    setInterval(Anim,250);
}
function _Player(params)
{
    var that = this;
    if(params.type == "chaos")
    {
        this.side = "chaos";
        this.mColor = 0x0f3f00;
        this.CentralPosition = {x:6,y:5};
    }
    else
    {
        this.side = "order";
        this.mColor = 0xa58d00;
        this.CentralPosition = {x:14,y:5};
    }
    this.Units = [];
    var Controller = params.ctl ? params.ctl : "human";
    this.Mana = 87;
    this.Cursor = new MyDriver.Object("shape",{shapeType:"rectangle",color:this.mColor,bordered:true,sideX:86,sideY:61,borderSize:5,scale:0.7});
    this.ManaObject = new MyDriver.Object("shape",{shapeType:"rectangle",color:this.mColor,sideX:10,sideY:this.Mana*2});
    this.ManaObject.Position.Set(this.side == "chaos" ? 75 : Data.canvas.width-85,Data.playfieldHeight*1.25-this.Mana*2);
    Driver.Scene.AddToScene(this.ManaObject);
    this.ManaObject.visible = false;
    this.Cursor.FieldPosition = {x:this.CentralPosition.x-1,y:this.CentralPosition.y-1};
    this.Cursor.Position.Set(GameData.Map[this.CentralPosition.y-1][this.CentralPosition.x-1].Position.x,GameData.Map[this.CentralPosition.y-1][this.CentralPosition.x-1].Position.y);
    this.Units = [];
    this.Units.RemoveAt = function(i)
    {
        if(i < this.length)
        {
            RemoveFromArray(i,this);
        }
    }
    this.Units.Remove = function()
    {
        for(var x=0;x<=arguments.length;x++)
        {
            for(var i=0;i<this.length;i++)
            {
                if(arguments[x] == this[i])
                {
                    RemoveFromArray(i,this);
                    return;
                }
            }
        }
    }
    this.SelectUnits = [];
    var but = this.side == "chaos" ? {up:38,down:40,left:37,right:39,action:13} : {up:87,down:83,left:65,right:68,action:32};
    this.Input = new _Input({type:Controller,button:but})
    this.DefaultMove = function(main)
    {
        that.Input.actions.left = function(){
            if(that.Cursor.FieldPosition.x > 1)
                that.Cursor.FieldPosition.x-=1;
        }
        that.Input.actions.up = function(){
            if(that.Cursor.FieldPosition.y > 0)
                that.Cursor.FieldPosition.y-=1;
        }
        that.Input.actions.down = function(){
            if(that.Cursor.FieldPosition.y < 8)
                        that.Cursor.FieldPosition.y+=1;
        }
        that.Input.actions.right = function(){
            if(that.Cursor.FieldPosition.x < 17)
                        that.Cursor.FieldPosition.x+=1;
        }
        that.Input.actions.action = function(){
             if(main && main instanceof Function)
                    main();
        }
        that.Input.Handle();
    }
    this.Active = function(){
        that.Cursor.visible = true;
        GameData.ActPlayer = that;
        for(var i=0;i<that.Units.length;i++)
        {
            var unit = that.Units[i];
            var indexer;
            if(unit.Position.x == 9 && unit.Position.y == 1)
            {
                that.Mana += 10;
            }
            else if(unit.Position.x == 9 && unit.Position.y == 7)
            {
                that.Mana += 10;
            }
            for(var j=0;j<GameData.movingPowerFields.length;j++)
            {
                if(unit.Position.x == GameData.movingPowerFields[j].Position.x && unit.Position.y == GameData.movingPowerFields[j].Position.y)
                {
                    that.Mana+=5;
                }
            }
            
        }
        that.ManaObject.visible = true;
        that.ManaObject.Position.y = Data.playfieldHeight*1.25-that.Mana*2;
        that.DefaultMove(function(){
            if(GameData.Action && GameData.Action instanceof Function)
              GameData.Action()
        });
        var inter = setInterval(function(){
            var actField = GameData.Map[that.Cursor.FieldPosition.y][that.Cursor.FieldPosition.x];
            if(that.Cursor.Position.x == actField.Position.x && that.Cursor.Position.y == actField.Position.y)
            {
                return;
            }
            if(parseInt(that.Cursor.Position.x) > parseInt(actField.Position.x))
            {
                that.Cursor.Position.x--;
            }
            else if(parseInt(that.Cursor.Position.x) < parseInt(actField.Position.x))
            {
                that.Cursor.Position.x++;
            }
            if(parseInt(that.Cursor.Position.y) > parseInt(actField.Position.y))
            {
                that.Cursor.Position.y--;
            }
            else if(parseInt(that.Cursor.Position.y) < parseInt(actField.Position.y))
            {
                that.Cursor.Position.y++;
            }
        },1)
        that.EndTurn = function()
        {
            if(GameData.notEnded){
                that.Cursor.visible = false;
                that.ManaObject.visible = false;
                for(var i=0;i<that.SelectUnits.length;i++)
                {
                    that.SelectUnits[i].model.visible = false;
                }
                that.Input.StopHandle();
                clearInterval(inter);
                GameData.ChangePlayer();
            }
            
        }
    }
}
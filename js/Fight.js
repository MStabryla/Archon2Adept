function _BattleField()
{
    var that = this;
    this.model = new MyDriver.Object("shape",{shapeType:"rectangle",sideX:1,sideY:1,color:0x111110});
    this.model.visible = false;
    Driver.Scene.AddToScene(this.model);
    var tempo = 10;
    this.StartFight = function(paramets){
        that.model.visible = true;
        var iter=1;
        function Res(){
            that.model.Resize({sideX:Data.canvas.width*(iter/tempo),sideY:Data.canvas.height*(iter/tempo)});
            that.model.Position.Set(Data.canvas.width/2-(that.model.sideX/2),Data.canvas.height/2-(that.model.sideY/2));
            console.log("start fight",iter,that.model.Position);
            if(iter<tempo)
            {
                iter++;
                setTimeout(Res,200);
            }
            else
            {
                if(GameData.Map[1][9].content.power)
                    GameData.Map[1][9].content.power.Hide();
                if(GameData.Map[7][9].content.power)
                    GameData.Map[7][9].content.power.Hide();
                for(var i=0;i<GameData.movingPowerFields.length;i++)
                {
                    GameData.movingPowerFields[i].Hide();
                }
                for(var i=0;i<GameData.Player1.Units.length;i++)
                {
                    var elem = GameData.Player1.Units[i];
                    if(elem != paramets.actUnit && elem != paramets.secUnit)
                        elem.model.visible = false;
                }
                for(var i=0;i<GameData.Player2.Units.length;i++)
                {
                    var elem = GameData.Player2.Units[i];
                    if(elem != paramets.actUnit && elem != paramets.secUnit)
                        elem.model.visible = false;
                }
                if(GameData.Player1.Cursor)
                    GameData.Player1.Cursor.visible = false;
                if(GameData.Player2.Cursor)
                    GameData.Player2.Cursor.visible = false;
                if(GameData.Player1.Cursor)
                    GameData.Player1.ManaObject.visible = false;
                if(GameData.Player2.Cursor)
                    GameData.Player2.ManaObject.visible = false;
                var chaosPos = {x:150,y:parseInt(Data.canvas.height/2)}
                var orderPos = {x:parseInt(Data.canvas.width)-200,y:parseInt(Data.canvas.height/2)}
                var actUnitPosCopy = {x:paramets.actUnit.Position.x,y:paramets.actUnit.Position.y};
                var secUnitPosCopy = {x:paramets.secUnit.Position.x,y:paramets.secUnit.Position.y};
                function MoveUnit()
                {
                    var chaosUnit = paramets.actUnit.Owner.side == "chaos" ? paramets.actUnit : paramets.secUnit;
                    var orderUnit = paramets.actUnit.Owner.side == "order" ? paramets.actUnit : paramets.secUnit;
                    chaosUnit.model.Position.x = parseInt(chaosUnit.model.Position.x);
                    chaosUnit.model.Position.y = parseInt(chaosUnit.model.Position.y);
                    orderUnit.model.Position.x = parseInt(orderUnit.model.Position.x);
                    orderUnit.model.Position.y = parseInt(orderUnit.model.Position.y);
                    if(chaosUnit.model.Position.x < chaosPos.x)
                    {
                        chaosUnit.model.Position.x++;
                    }
                    else if(chaosUnit.model.Position.x > chaosPos.x){
                        chaosUnit.model.Position.x--;
                    }
                    if(chaosUnit.model.Position.y < chaosPos.y)
                    {
                        chaosUnit.model.Position.y++;
                    }
                    else if(chaosUnit.model.Position.y > chaosPos.y){
                        chaosUnit.model.Position.y--;
                    }

                    if(orderUnit.model.Position.x < orderPos.x)
                    {
                        orderUnit.model.Position.x++;
                    }
                    else if(orderUnit.model.Position.x > orderPos.x){
                        orderUnit.model.Position.x--;
                    }
                    if(orderUnit.model.Position.y < orderPos.y)
                    {
                        orderUnit.model.Position.y++;
                    }
                    else if(orderUnit.model.Position.y > orderPos.y){
                        orderUnit.model.Position.y--;
                    }
                    if(orderUnit.model.Position.y == orderPos.y && orderUnit.model.Position.x == orderPos.x && chaosUnit.model.Position.y == chaosPos.y && chaosUnit.model.Position.x == chaosPos.x)
                    {
                        that.SetBattle({orderUnit:orderUnit,chaosUnit:chaosUnit});
                    }
                    else
                    {
                        setTimeout(MoveUnit,1);
                    }
                }
                MoveUnit();
            }
        }
        Res();
    }
    this.SetBattle = function (params){
        console.log("fight",params);
        var chaosHealth = new MyDriver.Object("shape",{shapeType:"rectangle",color:params.chaosUnit.Owner.mColor,sideX:10,sideY:params.chaosUnit.health*4})
        chaosHealth.Position.Set(75,Data.playfieldHeight*1.25-params.chaosUnit.health*4);
        Driver.Scene.AddToScene(chaosHealth);
        var orderHealth = new MyDriver.Object("shape",{shapeType:"rectangle",color:params.orderUnit.Owner.mColor,sideX:10,sideY:params.orderUnit.health*4})
        orderHealth.Position.Set(Data.canvas.width-85,Data.playfieldHeight*1.25-params.orderUnit.health*4)
        Driver.Scene.AddToScene(orderHealth);
        var chPlayer = params.chaosUnit.Owner;
        var orPlayer = params.orderUnit.Owner;
        var butStarter ={
            ch:{up:false,down:false,left:false,right:false},
            or:{up:false,down:false,left:false,right:false}
        }
        chPlayer.Input.actions.up = function(){
            if(!butStarter.ch.up)
            {
                var inter = setInterval(function(){
                    butStarter.ch.up = true;
                    if(params.chaosUnit.model.Position.y > 50)
                    {
                        params.chaosUnit.model.Position.y--;
                        if(!chPlayer.Input.controls.up)
                        {
                            butStarter.ch.up = false;
                            clearInterval(inter);
                        }
                    }
                },5)
            }
        }
        chPlayer.Input.actions.down = function(){
            if(!butStarter.ch.down)
            {
                var inter = setInterval(function(){
                    butStarter.ch.down = true;
                    if(params.chaosUnit.model.Position.y < Data.canvas.height - 150)
                    {
                        params.chaosUnit.model.Position.y++;
                        if(!chPlayer.Input.controls.down)
                        {
                            butStarter.ch.down = false;
                            clearInterval(inter);
                        }
                    }
                },5)
            }
        }
        chPlayer.Input.actions.left = function(){
            if(!butStarter.ch.left)
            {
                var inter = setInterval(function(){
                    butStarter.ch.left = true;
                    if(params.chaosUnit.model.Position.x > 85)
                    {
                        params.chaosUnit.model.Position.x--;
                        if(!chPlayer.Input.controls.left)
                        {
                            butStarter.ch.left = false;
                            clearInterval(inter);
                        }
                    }
                },5)
            }
        }
        chPlayer.Input.actions.right = function(){
            if(!butStarter.ch.right)
            {
                var inter = setInterval(function(){
                    butStarter.ch.right = true;
                    if(params.chaosUnit.model.Position.x < Data.canvas.width - 150)
                    {
                        params.chaosUnit.model.Position.x++;
                        if(!chPlayer.Input.controls.right)
                        {
                            butStarter.ch.right = false;
                            clearInterval(inter);
                        }
                    }
                },5)
            }
        }
        chPlayer.Input.Handle();
        orPlayer.Input.actions.up = function(){
            if(!butStarter.or.up)
            {
                var inter = setInterval(function(){
                    butStarter.or.up = true;
                    if(params.orderUnit.model.Position.y > 50)
                    {
                        params.orderUnit.model.Position.y--;
                        if(!orPlayer.Input.controls.up)
                        {
                            butStarter.or.up = false;
                            clearInterval(inter);
                        }
                    }
                },5)
            }
        }
        orPlayer.Input.actions.down = function(){
            if(!butStarter.or.down)
            {
                var inter = setInterval(function(){
                    butStarter.or.down = true;
                    if(params.orderUnit.model.Position.y < Data.canvas.height - 150)
                    {
                        params.orderUnit.model.Position.y++;
                        if(!orPlayer.Input.controls.down)
                        {
                            butStarter.or.down = false;
                            clearInterval(inter);
                        }
                    }
                },5)
            }
        }
        orPlayer.Input.actions.left = function(){
            if(!butStarter.or.left)
            {
                var inter = setInterval(function(){
                    butStarter.or.left = true;
                    if(params.orderUnit.model.Position.x > 85)
                    {
                        params.orderUnit.model.Position.x--;
                        if(!orPlayer.Input.controls.left)
                        {
                            butStarter.or.left = false;
                            clearInterval(inter);
                        }
                    }
                },5)
            }
        }
        orPlayer.Input.actions.right = function(){
            if(!butStarter.or.right)
            {
                var inter = setInterval(function(){
                    butStarter.or.right = true;
                    if(params.orderUnit.model.Position.x < Data.canvas.width - 150)
                    {
                        params.orderUnit.model.Position.x++;
                        if(!orPlayer.Input.controls.right)
                        {
                            butStarter.or.right = false;
                            clearInterval(inter);
                        }
                    }
                },5)
            }
        }
        orPlayer.Input.Handle();
    }
}
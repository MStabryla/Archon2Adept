function _BattleField()
{
    var that = this;
    this.model = new MyDriver.Object("shape",{shapeType:"rectangle",sideX:1,sideY:1,color:0x111110});
    this.model.visible = false;
    Driver.Scene.AddToScene(this.model);
    var tempo = 10;
    var battleFieldPosition = {x:0,y:0};
    var obstackle = [];
    this.StartFight = function(paramets){
        var actElemental = GameData.Map[paramets.position.y][paramets.position.x].content.elemental;
        obstackle = [];
        var obstackleLen = parseInt(Math.random() * 10) + 5;
        if(actElemental != "n")
        {
            for(var i=0;i<obstackleLen;i++)
            {
                var img;
                switch(actElemental)
                {
                    case "f":
                        img = document.getElementById("A_fire");
                        break;
                    case "a":
                        img = document.getElementById("A_air");
                        break;
                    case "w":
                        img = document.getElementById("A_water");
                        break;
                    case "g":
                        img = document.getElementById("A_earth");
                        break;
                }
                var obs = new MyDriver.Object("image",{image:img});
                var randX = parseInt(Math.random() * (Data.canvas.width - 65))+85;
                var randY = parseInt(Math.random() * (Data.canvas.height -100))+50;
                var notGood = false;
                while(notGood)
                {
                    function Collision(coord){
                        var CheckX = coord.x > this.Position.x-(this.Image.width/2) && coord.x < this.Position.x + this.Image.width*this.Scale;
                        var CheckY = coord.y > this.Position.y-(this.Image.height/2) && coord.y < this.Position.y + this.Image.height*this.Scale;
                        if(CheckX && CheckY)
                        {
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                    var randX = parseInt(Math.random() * (Data.canvas.width - 65))+85;
                    var randY = parseInt(Math.random() * (Data.canvas.height -100))+50;
                    if(rand)
                    {
                        
                    }
                }
                var randX = parseInt(Math.random() * (Data.canvas.width - 65))+85;
                var randY = parseInt(Math.random() * (Data.canvas.height -100))+50;
                obs.Position.Set(randX,randY);
                obs.Scale = 0.2;
                obs.Collision = function(coord){
                    var CheckX = coord.x > this.Position.x-(this.Image.width/2) && coord.x < this.Position.x + this.Image.width*this.Scale;
                    var CheckY = coord.y > this.Position.y-(this.Image.height/2) && coord.y < this.Position.y + this.Image.height*this.Scale;
                    if(CheckX && CheckY)
                    {
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                obstackle.push(obs);
            }
        }

        GameData.Communicator.visible = false;
        GameData.SecondCom.visible = false;
        battleFieldPosition = paramets.position;
        that.model.visible = true;
        var iter=1;
        function Res(){
            that.model.Resize({sideX:Data.canvas.width*(iter/tempo),sideY:Data.canvas.height*(iter/tempo)});
            that.model.Position.Set(Data.canvas.width/2-(that.model.sideX/2),Data.canvas.height/2-(that.model.sideY/2));
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
        for(var i=0;i<obstackle.length;i++)
        {
            Driver.Scene.AddToScene(obstackle[i]);
        }
        var chaosHealth = new MyDriver.Object("shape",{shapeType:"rectangle",color:params.chaosUnit.Owner.mColor,sideX:10,sideY:params.chaosUnit.health*4})
        chaosHealth.Position.Set(75,Data.playfieldHeight*1.25-params.chaosUnit.health*4);
        Driver.Scene.AddToScene(chaosHealth);
        var orderHealth = new MyDriver.Object("shape",{shapeType:"rectangle",color:params.orderUnit.Owner.mColor,sideX:10,sideY:params.orderUnit.health*4})
        orderHealth.Position.Set(Data.canvas.width-85,Data.playfieldHeight*1.25-params.orderUnit.health*4)
        Driver.Scene.AddToScene(orderHealth);
        var chPlayer = params.chaosUnit.Owner;
        var orPlayer = params.orderUnit.Owner;
        var butStarter ={
            ch:{up:false,down:false,left:false,right:false,action:false},
            or:{up:false,down:false,left:false,right:false,action:false}
        }
        function CheckCollision(coord){
            for(var i=0;i<obstackle.length;i++)
            {
                if(obstackle[i].Collision(coord))
                {
                    return true;
                }
            }
            return false;
        }
        function SetChaosPlay(){
            chPlayer.Input.actions.up = function(){
                if(!butStarter.ch.up)
                {
                    var inter = setInterval(function(){
                        butStarter.ch.up = true;
                        if(params.chaosUnit.model.Position.y > 50 && !CheckCollision({x:params.chaosUnit.model.Position.x,y:params.chaosUnit.model.Position.y-1}))
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
                        if(params.chaosUnit.model.Position.y < Data.canvas.height - 150  && !CheckCollision({x:params.chaosUnit.model.Position.x,y:params.chaosUnit.model.Position.y+1}))
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
                        if(params.chaosUnit.model.Position.x > 85  && !CheckCollision({x:params.chaosUnit.model.Position.x-1,y:params.chaosUnit.model.Position.y}))
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
                        if(params.chaosUnit.model.Position.x < Data.canvas.width - 150  && !CheckCollision({x:params.chaosUnit.model.Position.x+1,y:params.chaosUnit.model.Position.y}))
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
            chPlayer.Input.actions.action = function(){
                var direct = "";
                if(butStarter.ch.up)
                {
                    direct += "up";
                    if(butStarter.ch.left)
                    {
                        direct += "-left";
                    }
                    else if(butStarter.ch.right)
                    {
                        direct += "-right";
                    }
                }
                else if(butStarter.ch.down)
                {
                    direct += "down";
                    if(butStarter.ch.left)
                    {
                        direct += "-left";
                    }
                    else if(butStarter.ch.right)
                    {
                        direct += "-right";
                    }
                }
                else if(butStarter.ch.left)
                {
                    direct += "left";
                }
                else if(butStarter.ch.right)
                {
                    direct += "right";
                }
                var odl = Math.sqrt(Math.abs(params.orderUnit.model.Position.x-params.chaosUnit.model.Position.x)*Math.abs(params.orderUnit.model.Position.x-params.chaosUnit.model.Position.x) + Math.abs(params.orderUnit.model.Position.y-params.chaosUnit.model.Position.y)*Math.abs(params.orderUnit.model.Position.y-params.chaosUnit.model.Position.y));
                params.chaosUnit.Attack({bs:butStarter.ch,enemy:params.orderUnit,back:SetChaosPlay,odl:odl,direct:direct});
            }
            chPlayer.Input.Handle();
        }
        SetChaosPlay();
        function SetOrderPlay(){
            orPlayer.Input.actions.up = function(){
                if(!butStarter.or.up)
                {
                    var inter = setInterval(function(){
                        butStarter.or.up = true;
                        if(params.orderUnit.model.Position.y > 50  && !CheckCollision({x:params.orderUnit.model.Position.x,y:params.orderUnit.model.Position.y-1}))
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
                        if(params.orderUnit.model.Position.y < Data.canvas.height - 150 && !CheckCollision({x:params.orderUnit.model.Position.x,y:params.orderUnit.model.Position.y+1}))
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
                        if(params.orderUnit.model.Position.x > 85  && !CheckCollision({x:params.orderUnit.model.Position.x-1,y:params.orderUnit.model.Position.y}))
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
                        if(params.orderUnit.model.Position.x < Data.canvas.width - 150  && !CheckCollision({x:params.orderUnit.model.Position.x+1,y:params.orderUnit.model.Position.y}))
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
            orPlayer.Input.actions.action = function(){
                var direct = "";
                if(butStarter.or.up)
                {
                    direct += "up";
                    if(butStarter.or.left)
                    {
                        direct += "-left";
                    }
                    else if(butStarter.or.right)
                    {
                        direct += "-right";
                    }
                }
                else if(butStarter.or.down)
                {
                    direct += "down";
                    if(butStarter.or.left)
                    {
                        direct += "-left";
                    }
                    else if(butStarter.or.right)
                    {
                        direct += "-right";
                    }
                }
                else if(butStarter.or.left)
                {
                    direct += "left";
                }
                else if(butStarter.or.right)
                {
                    direct += "right";
                }
                var odl = Math.sqrt(Math.abs(params.orderUnit.model.Position.x-params.chaosUnit.model.Position.x)*Math.abs(params.orderUnit.model.Position.x-params.chaosUnit.model.Position.x) + Math.abs(params.orderUnit.model.Position.y-params.chaosUnit.model.Position.y)*Math.abs(params.orderUnit.model.Position.y-params.chaosUnit.model.Position.y));
                params.orderUnit.Attack({bs:butStarter.or,enemy:params.chaosUnit,back:SetOrderPlay,odl:odl,direct:direct});
            }
            orPlayer.Input.Handle();
        }
        SetOrderPlay();
        var inteCh = setInterval(function(){
            chaosHealth.Position.Set(75,Data.playfieldHeight*1.25-params.chaosUnit.health*4);
            chaosHealth.Resize({sideX:10,sideY:params.chaosUnit.health*4});
            orderHealth.Position.Set(Data.canvas.width-85,Data.playfieldHeight*1.25-params.orderUnit.health*4);
            orderHealth.Resize({sideX:10,sideY:params.orderUnit.health*4});
            if(params.chaosUnit.health <= 0)
            {
                console.log("chaos dead");
                clearInterval(inteCh);
                for(var key in chPlayer.Input.actions)
                {
                    chPlayer.Input.actions[key]=function(){}
                }
                for(var key in orPlayer.Input.actions)
                {
                    orPlayer.Input.actions[key]=function(){}
                }
                chPlayer.Units.Remove(params.chaosUnit);
                Driver.Scene.Remove(params.chaosUnit.model);
                Driver.Scene.Remove(chaosHealth);
                Driver.Scene.Remove(orderHealth);
                that.EndBattle(params.orderUnit);
            }
            else if(params.orderUnit.health <= 0)
            {
                console.log("order dead");
                clearInterval(inteCh);
                for(var key in chPlayer.Input.actions)
                {
                    chPlayer.Input.actions[key]=function(){}
                }
                for(var key in orPlayer.Input.actions)
                {
                    orPlayer.Input.actions[key]=function(){}
                }
                orPlayer.Units.Remove(params.orderUnit);
                Driver.Scene.Remove(params.orderUnit.model);
                Driver.Scene.Remove(chaosHealth);
                Driver.Scene.Remove(orderHealth);
                that.EndBattle(params.chaosUnit);
            }
        },10);
    }
    this.EndBattle = function(winner){
        for(var i=0;i<obstackle.length;i++)
        {
            Driver.Scene.Remove(obstackle[i]);
        }
        function MoveToField(){
            var destinyPosition = {x:parseInt(GameData.Map[battleFieldPosition.y][battleFieldPosition.x].Position.x),y:parseInt(GameData.Map[battleFieldPosition.y][battleFieldPosition.x].Position.y)};
            if(winner.model.Position.x < destinyPosition.x)
            {
                winner.model.Position.x++;
            }
            else if(winner.model.Position.x > destinyPosition.x)
            {
                winner.model.Position.x--;
            }
            if(winner.model.Position.y < destinyPosition.y)
            {
                winner.model.Position.y++;
            }
            else if(winner.model.Position.y > destinyPosition.y)
            {
                winner.model.Position.y--;
            }
            if(winner.model.Position.x == destinyPosition.x && winner.model.Position.y == destinyPosition.y)
            {
                GameData.Map[battleFieldPosition.y][battleFieldPosition.x].content.ActualUnit = null;
                winner.ChangePosition(battleFieldPosition);
                console.log("change Position",winner.Position,battleFieldPosition,GameData.Map[winner.Position.y][winner.Position.x]);
                ShowField();
            }
            else
            {
                setTimeout(MoveToField,1);
            }
        }
        MoveToField();
        function ShowField()
        {
            if(GameData.Map[1][9].content.power)
                GameData.Map[1][9].content.power.Show();
            if(GameData.Map[7][9].content.power)
                GameData.Map[7][9].content.power.Show();
            for(var i=0;i<GameData.movingPowerFields.length;i++)
            {
                GameData.movingPowerFields[i].Show();
            }
            for(var i=0;i<GameData.Player1.Units.length;i++)
            {
                var elem = GameData.Player1.Units[i];
                    elem.model.visible = true;
            }
            for(var i=0;i<GameData.Player2.Units.length;i++)
            {
                var elem = GameData.Player2.Units[i];
                    elem.model.visible = true;
            }
            if(GameData.Player1.Cursor)
                GameData.Player1.Cursor.visible = true;
            if(GameData.Player2.Cursor)
                GameData.Player2.Cursor.visible = true;
            if(GameData.Player1.Cursor)
                GameData.Player1.ManaObject.visible = true;
            if(GameData.Player2.Cursor)
                GameData.Player2.ManaObject.visible = true;
            var iter=10;
            function HideBattleField(){
                that.model.Resize({sideX:Data.canvas.width*(iter/10),sideY:Data.canvas.height*(iter/10)});
                that.model.Position.Set(Data.canvas.width/2-(that.model.sideX/2),Data.canvas.height/2-(that.model.sideY/2));
                if(iter > 1)
                {
                    iter--;
                    setTimeout(HideBattleField,200);
                }
                else
                {
                    that.model.visible = false;
                    GameData.ActPlayer.EndTurn();
                }
            }
            HideBattleField();
        }
    }
}
function _Missile(params){
    var that = this;
    this.model = new MyDriver.Object("image",{image:params.img});
    this.model.Scale = 0.1;
    this.model.Position.Set(params.x,params.y);
    Driver.Scene.AddToScene(this.model);
    this.power = params.power;
    this.direct = params.direct;
    this.exist = true;
    this.speed = params.speed ? params.speed : 1;
    this.Move = function () {
        that.inter = setInterval(function(){
            switch(params.direct){
                case "up":
                    if(that.model.Position.y > 50)
                        that.model.Position.y-=that.speed;
                    else
                        that.Remove();
                    break;
                case "down":
                    if(that.model.Position.y < Data.canvas.height - 150)
                        that.model.Position.y+=that.speed;
                    else
                        that.Remove();
                    break;
                case "up-left":
                    if(that.model.Position.x > 85 && that.model.Position.y > 50)
                    {
                        that.model.Position.x-=that.speed;
                        that.model.Position.y-=that.speed;
                    }
                    else
                        that.Remove();
                    break;
                case "down-left":
                    if(that.model.Position.x > 85 && that.model.Position.y < Data.canvas.height - 150)
                    {
                        that.model.Position.x-=that.speed;
                        that.model.Position.y+=that.speed;
                    }
                    else
                        that.Remove();
                    break;
                case "left":
                    if(that.model.Position.x > 85)
                        that.model.Position.x-=that.speed;
                    else
                        that.Remove();
                    break;
                case "up-right":
                    if(that.model.Position.x < Data.canvas.width - 150 && that.model.Position.y > 50)
                    {
                        that.model.Position.x+=that.speed;
                        that.model.Position.y-=that.speed;
                    }
                    else
                        that.Remove();
                    break;
                case "down-right":
                    if(that.model.Position.x < Data.canvas.width - 150 && that.model.Position.y < Data.canvas.height - 150)
                    {
                        that.model.Position.x+=that.speed;
                        that.model.Position.y+=that.speed;
                    }
                    else
                        that.Remove();
                    break;
                case "right":
                    if(that.model.Position.x < Data.canvas.width - 150)
                        that.model.Position.x+=that.speed;
                    else
                        that.Remove();
                    break;
            }
            var posThat = {x:that.model.Position.x+(that.model.Image.width/2)*that.model.Scale,y:that.model.Position.y+(that.model.Image.height/2)*that.model.Scale};
            var posEnemy = {x:params.target.model.Position.x+(params.target.model.Image.width/2)*params.target.model.Scale,y:params.target.model.Position.y+(params.target.model.Image.height/2)*params.target.model.Scale}
            var odl = Math.sqrt(Math.abs(posThat.x - posEnemy.x)*Math.abs(posThat.x - posEnemy.x) + Math.abs(posThat.y - posEnemy.y)*Math.abs(posThat.y - posEnemy.y));
            console.log(posThat,posEnemy,odl);
            if(odl < 20 && !params.target.immune)
            {
                params.target.health -= that.power;
                that.Remove();
            }
        },5);
    }
    this.Remove = function(){
        that.exist = false;
        clearInterval(that.inter);
        Driver.Scene.Remove(that.model);
    }
}
function _AttackArea(params){
    var that = this;
    this.model = new MyDriver.Object("image",{image:params.img});
    this.model.Scale=0.3;
    this.model.Position.Set(params.x-(this.model.Image.width/4)*this.model.Scale,params.y-(this.model.Image.height/4)*this.model.Scale);
    Driver.Scene.AddToScene(this.model);
    this.power = params.power;
    this.range = params.range ? params.range : 15;
    this.Move = function(callback){
        var howLong = 0;
        that.inter = setInterval(function(){
            var posThat = {x:that.model.Position.x+(that.model.Image.width/2)*that.model.Scale,y:that.model.Position.y+(that.model.Image.height/2)*that.model.Scale};
            var posEnemy = {x:params.target.model.Position.x+(params.target.model.Image.width/2)*params.target.model.Scale,y:params.target.model.Position.y+(params.target.model.Image.height/2)*params.target.model.Scale}
            var odl = Math.sqrt(Math.abs(posThat.x - posEnemy.x)*Math.abs(posThat.x - posEnemy.x) + Math.abs(posThat.y - posEnemy.y)*Math.abs(posThat.y - posEnemy.y));
            if(odl < that.range && !params.target.immune)
            {
                params.target.health -= that.power;
                if(params.addAttack && params.addAttack instanceof Function)
                    params.addAttack();
            }
            howLong++;
            if(howLong > 10)
            {
                that.Remove();
            }
        },200)
    }
    this.Remove = function(){
        if(params.callback && params.callback instanceof Function)
            params.callback();
        clearInterval(that.inter);
        Driver.Scene.Remove(that.model);
    }
}
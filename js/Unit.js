function _Unit(params)
{
    var that = this;
    if(params && params.type && params.position)
    {
        this.Owner = params.owner;
        this.name = params.type.replace("C_","").replace("P_","");
        this._type = params.type;
        this.model = new MyDriver.Object("image",{image:document.getElementById(params.type)});
        this.Position = params.position;
        this.model.Position.Set(GameData.Map[this.Position.y][this.Position.x].Position.x,GameData.Map[this.Position.y][this.Position.x].Position.y);
        this.health = params.health;
        this.cost = params.cost ? params.cost : 10;
        this.ChangePosition = function(newpos)
        {
            var prevPos = {x:that.Position.x,y:that.Position.y};
            that.Position = newpos;
            that.model.Position.Set(GameData.Map[that.Position.y][that.Position.x].Position.x,GameData.Map[that.Position.y][that.Position.x].Position.y);
            GameData.Map[prevPos.y][prevPos.x].content.ActualUnit = "";
            GameData.Map[prevPos.y][prevPos.x].content.ActualUnit = null;
            if(GameData.Map[that.Position.y][that.Position.x].content.ActualUnit == null)
                GameData.Map[that.Position.y][that.Position.x].content.ActualUnit = that;
            else
                Game_Fight();
        }
        var Astarted = false;
        if("adept_1" == this.name.toLowerCase() || "adept_2" == this.name.toLowerCase())
        {
            this.Action = function() {
                var position = 0;
                var actSpell = Spells.library[position];
                GameData.Communicator.Send("SELECT A SPELL");
                GameData.Communicator.visible = true;
                GameData.SecondCom.Send(actSpell.name);
                GameData.SecondCom.visible = true;
                GameData.ActPlayer.Input.actions.up = function(){
                    actSpell = Spells.library[position];
                    GameData.SecondCom.Send(actSpell.name);
                    if(position > 0)
                        position--;
                }
                GameData.ActPlayer.Input.actions.down = function(){
                    actSpell = Spells.library[position];
                    GameData.SecondCom.Send(actSpell.name);
                    if(position < Spells.library.length-1)
                                position++;
                }
                GameData.ActPlayer.Input.actions.left = function(){}
                GameData.ActPlayer.Input.actions.right = function(){}
                GameData.ActPlayer.Input.actions.action = function(){
                    actSpell.using(GameData.Map[that.Position.y][that.Position.x].content.elemental);
                }
            }
            
            this.Attack=function(params){
                if(params.direct != "" && !Astarted)
                {
                    Astarted = true;
                    var Mis = new _Missile({power:12,speed:3,img:that.Owner.side == "chaos"?document.getElementById("A_fire"):document.getElementById("A_air"),direct:params.direct,x:that.model.Position.x,y:that.model.Position.y,target:params.enemy});
                    Mis.Move();
                    var iter = setInterval(function(){
                        if(Mis.exist)
                        {
                            if(that.Owner.Input.controls.up)
                            {
                                Mis.model.Position.y-=2;
                            }
                            if(that.Owner.Input.controls.down)
                            {
                                Mis.model.Position.y+=2;
                            }
                            if(that.Owner.Input.controls.left)
                            {
                                Mis.model.Position.x-=2;
                            }
                            if(that.Owner.Input.controls.right)
                            {
                                Mis.model.Position.x+=2;
                            }
                        }
                        else
                        {
                            for(var key in params.bs){
                                params.bs[key] = false;
                            } 
                            clearInterval(iter);
                            Astarted = false;
                        }
                    },5);
                   for(var key in params.bs){
                        params.bs[key] = true;
                    } 
                }
            }
        }
        else
        {
            this.Action = function(){
                var temPosition = {x:that.Position.x,y:that.Position.y}
                var toAE = false;   
                GameData.ActPlayer.Input.actions.left = function(){
                    if(temPosition.x > 0)
                    {
                        if(GameData.Map[temPosition.y][temPosition.x-1].content.elemental != GameData.Map[that.Position.y][that.Position.x].content.elemental)
                        {
                            if(!toAE)
                            {
                                toAE = true;
                                temPosition.x-=1;
                            }
                        }
                        else
                        {
                            toAE = false;
                            temPosition.x-=1;
                        }
                    } 
                }
                GameData.ActPlayer.Input.actions.up = function(){
                    if(temPosition.y > 0)
                    {
                        if(GameData.Map[temPosition.y-1][temPosition.x].content.elemental != GameData.Map[that.Position.y][that.Position.x].content.elemental)
                        {
                            if(!toAE)
                            {
                                toAE = true;
                                temPosition.y-=1;
                            }
                        }
                        else
                        {
                            toAE = false;
                            temPosition.y-=1;
                        }
                    } 
                }
                GameData.ActPlayer.Input.actions.right = function(){
                    if(temPosition.x < 18)
                    {
                        if(GameData.Map[temPosition.y][temPosition.x+1].content.elemental != GameData.Map[that.Position.y][that.Position.x].content.elemental)
                        {
                            if(!toAE)
                            {
                                toAE = true;
                                temPosition.x+=1;
                            }
                        }
                        else
                        {
                            toAE = false;
                            temPosition.x+=1;
                        }
                    } 
                }
                GameData.ActPlayer.Input.actions.down = function(){
                    if(temPosition.y < 8)
                    {
                        if(GameData.Map[temPosition.y+1][temPosition.x].content.elemental != GameData.Map[that.Position.y][that.Position.x].content.elemental)
                        {
                            if(!toAE)
                            {
                                toAE = true;
                                temPosition.y+=1;
                            }
                        }
                        else
                        {
                            toAE = false;
                            temPosition.y+=1;
                        }
                    } 
                }
                GameData.ActPlayer.Input.actions.action = function(){
                    if(GameData.Map[temPosition.y][temPosition.x].content.ActualUnit != null && !GameData.ActPlayer.Units.find(e => e == GameData.Map[temPosition.y][temPosition.x].content.ActualUnit))
                    {
                        clearInterval(inter);
                        GameData.ActPlayer.Input.StopHandle();
                        GameData.BattleField.StartFight({actUnit:that,secUnit:GameData.Map[temPosition.y][temPosition.x].content.ActualUnit,position:{x:temPosition.x,y:temPosition.y}});
                    }
                    else if(!GameData.ActPlayer.Units.find(e => e == GameData.Map[temPosition.y][temPosition.x].content.ActualUnit))
                    {
                        that.ChangePosition({x:temPosition.x,y:temPosition.y});
                        clearInterval(inter);
                        GameData.ActPlayer.EndTurn();
                    }
                }
                var inter = setInterval(function(){
                    var actField = GameData.Map[temPosition.y][temPosition.x];
                    if(that.model.Position.x == actField.Position.x && that.model.Position.y == actField.Position.y)
                    {
                        return;
                    }
                    if(parseInt(that.model.Position.x) > parseInt(actField.Position.x))
                    {
                        that.model.Position.x--;
                    }
                    else if(parseInt(that.model.Position.x) < parseInt(actField.Position.x))
                    {
                        that.model.Position.x++;
                    }
                    if(parseInt(that.model.Position.y) > parseInt(actField.Position.y))
                    {
                        that.model.Position.y--;
                    }
                    else if(parseInt(that.model.Position.y) < parseInt(actField.Position.y))
                    {
                        that.model.Position.y++;
                    }
                })
            }
            switch(this.name.toLowerCase())
            {
                case "behemot":
                    this.Attack = function(params){
                        if(params.odl < 5)
                        {
                            params.enemy.health -=10;
                        }
                    }
                    break;
                case "gigant":
                    this.Attack = function(params){
                        if(params.direct != "" && !Astarted)
                        {
                            Astarted = true;
                            var Mis = new _Missile({power:6,speed:2,img:document.getElementById("A_earth"),direct:params.direct,x:that.model.Position.x,y:that.model.Position.y,target:params.enemy});
                            Mis.Move();
                            var iter = setInterval(function(){
                                if(!Mis.exist){
                                    clearInterval(iter);
                                    Astarted = false;
                                }
                            },5);
                        }
                        
                    }
                    break;
                case "kraken":
                    this.Attack = function(params){
                        if(params.direct != ""  && !Astarted)
                        {
                            Astarted = true;
                            var Mis = new _Missile({power:5,speed:4,img:document.getElementById("A_water"),direct:params.direct,x:that.model.Position.x,y:that.model.Position.y,target:params.enemy});
                            Mis.Move();
                            var iter = setInterval(function(){
                                if(!Mis.exist){
                                    clearInterval(iter);
                                    Astarted = false;
                                }
                            },5);
                        }
                        
                    }
                    break;
                case "syrena":
                    this.Attack = function(params){
                        if(!that.started)
                        {
                            var iter=setInterval(function(){
                                that.started = true;
                                if(that.Owner.Input.controls.action)
                                {
                                    params.enemy.health -= 3;
                                }
                                else
                                {
                                    that.started = false;
                                    clearInterval(iter);
                                }
                            },500)
                        }
                    }
                    break;
                case "ifryt":
                    this.Attack = function(params){
                        if(params.direct != ""  && !Astarted)
                        {
                            Astarted = true;
                            var Mis = new _Missile({power:5,speed:5,img:document.getElementById("A_air"),direct:params.direct,x:that.model.Position.x,y:that.model.Position.y,target:params.enemy});
                            Mis.Move();
                            var iter = setInterval(function(){
                                if(!Mis.exist){
                                    clearInterval(iter);
                                    Astarted = false;
                                }
                            },5);
                        }
                        
                    }
                    break;
                case "thunder":
                    this.Attack = function(params){
                        if(params.direct != ""  && !Astarted)
                        {
                            Astarted = true;
                            var Mis = new _Missile({power:12,speed:3,img:document.getElementById("A_fire"),direct:params.direct,x:that.model.Position.x,y:that.model.Position.y,target:params.enemy});
                            Mis.Move();
                            var iter = setInterval(function(){
                                if(!Mis.exist){
                                    clearInterval(iter);
                                    Astarted = false;
                                }
                            },5);
                        }
                        
                    }
                    break;
                case "firebird":
                    this.Attack = function(params){
                        if(!that.immune)
                        {
                            for(var key in params.bs)
                            {
                                params.bs[key] = true;
                            }
                            that.immune = true;
                            var Area = new _AttackArea({
                                power:8,
                                img:document.getElementById("A_fireA"),
                                direct:params.direct,
                                x:that.model.Position.x,
                                y:that.model.Position.y,
                                target:params.enemy,
                                range:30,
                                callback:function(){
                                    that.immune = false;
                                    for(var key in params.bs)
                                    {
                                        params.bs[key] = false;
                                    }
                                }
                            });
                            Area.Move();
                            var item = setInterval(function(){
                                Area.model.Position.Set(that.model.Position.x-(Area.model.Image.width/4)*Area.model.Scale,that.model.Position.y-(Area.model.Image.height/4)*Area.model.Scale);
                                if(!that.Owner.Input.controls.action)
                                {
                                    clearInterval(item);
                                    Area.Remove();
                                }
                            },5);
                        }
                    }
                    break;
                case "salamandra":
                    this.Attack = function(params){
                        if(params.direct != ""  && !Astarted)
                        {
                            Astarted = true;
                            var Mis = new _Missile({power:13,speed:3,img:document.getElementById("A_fire"),direct:params.direct,x:that.model.Position.x,y:that.model.Position.y,target:params.enemy});
                            Mis.Move();
                            var iter = setInterval(function(){
                                if(!Mis.exist){
                                    clearInterval(iter);
                                    Astarted = false;
                                }
                            },5);
                        }
                        
                    }
                    break;
                case "juggemut":
                    this.Attack = function(params){
                        if(!that.immune){
                            for(var key in params.bs)
                            {
                                params.bs[key] = true;
                            }
                            console.log((that.Owner.side == "chaos" ? "C_" : "P_") + "Juggemut_A",document.getElementById((that.Owner.side == "chaos" ? "C_" : "P_") + "Juggemut_A"))
                            that.model.Image = document.getElementById((that.Owner.side == "chaos" ? "C_" : "P_") + "Juggemut_A");
                            var inter = setInterval(function(){
                                if(that.Owner.Input.controls.action)
                                {
                                    that.immune = true;
                                    var odl = Math.sqrt(Math.abs(that.model.Position.x-params.enemy.model.Position.x)*Math.abs(that.model.Position.x-params.enemy.model.Position.x) + Math.abs(that.model.Position.y-params.enemy.model.Position.y)*Math.abs(that.model.Position.y-params.enemy.model.Position.y));
                                    if(odl < 30)
                                    {
                                        if(!params.enemy.immune)
                                            params.enemy.health -= 4;
                                    }
                                }
                                else{
                                    for(var key in params.bs)
                                    {
                                        params.bs[key] = false;
                                    }
                                    that.model.Image = document.getElementById((that.Owner.side == "chaos" ? "C_" : "P_") + "Juggemut");
                                    that.immune = false;
                                    clearInterval(inter);
                                }
                            },100)
                        }
                    }
                    break;
                case "gorgona":
                    this.Attack = function(params){
                        if(params.direct != ""  && !Astarted)
                        {
                            Astarted = true;
                            var Mis = new _Missile({power:10,speed:4,img:document.getElementById("A_water"),direct:params.direct,x:that.model.Position.x,y:that.model.Position.y,target:params.enemy});
                            Mis.Move();
                            var iter = setInterval(function(){
                                if(!Mis.exist){
                                    clearInterval(iter);
                                    Astarted = false;
                                }
                            },5);
                        }
                    }
                    break;
                case "widmo":
                    this.Attack = function(params){
                        if(!that.blocking)
                        {
                            for(var key in params.bs)
                            {
                                params.bs[key] = true;
                            }
                            that.blocking = true;
                            var Area = new _AttackArea({
                                power:3,
                                img:document.getElementById("A_widmo"),
                                direct:params.direct,
                                x:that.model.Position.x,
                                y:that.model.Position.y,
                                target:params.enemy,
                                range:30,
                                callback:function(){
                                    that.blocking = false;
                                    for(var key in params.bs)
                                    {
                                        params.bs[key] = false;
                                    }
                                },
                                addAttack:function(){that.health+=1}});
                            Area.Move();
                            var item = setInterval(function(){
                                Area.model.Position.Set(that.model.Position.x-(Area.model.Image.width/4)*Area.model.Scale,that.model.Position.y-(Area.model.Image.height/4)*Area.model.Scale);
                                if(!that.Owner.Input.controls.action)
                                {
                                    that.blocking = false;
                                    clearInterval(item);
                                    Area.Remove();
                                }
                            },5);
                        }
                    }
                    break;
                case "chime":
                    this.Attack = function(params){
                        if(!that.whichAt)
                        {
                            that.whichAt=0;
                        }
                        if(that.whichAt < 2)
                            that.whichAt++;
                        else
                            that.whichAt=0;
                        switch(that.whichAt)
                        {
                            case 0:
                                if(params.odl < 5)
                                {
                                    params.enemy.health -= 15;
                                }
                                break;
                            case 1:
                                if(params.direct != ""  && !Astarted)
                                {
                                    Astarted = true;
                                    var Mis = new _Missile({power:12,speed:3,img:document.getElementById("A_fire"),direct:params.direct,x:that.model.Position.x,y:that.model.Position.y,target:params.enemy});
                                    Mis.Move();
                                    var iter = setInterval(function(){
                                        if(!Mis.exist){
                                            clearInterval(iter);
                                            Astarted = false;
                                        }
                                    },5);
                                }
                                break;
                            case 2:
                                if(params.direct != ""  && !Astarted)
                                {
                                    Astarted = true;
                                    var Mis = new _Missile({power:9,speed:5,img:document.getElementById("A_water"),direct:params.direct,x:that.model.Position.x,y:that.model.Position.y,target:params.enemy});
                                    Mis.Move();
                                    var iter = setInterval(function(){
                                        if(!Mis.exist){
                                            clearInterval(iter);
                                            Astarted = false;
                                        }
                                    },5);
                                }
                                break;
                        }
                    }
                    break;
            }

        }

    }
}
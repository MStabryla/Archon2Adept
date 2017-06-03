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
        if("adept_1" == this.name.toLowerCase())
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
        }
        else
        {
            this.Action = function(){
                var temPosition = {x:that.Position.x,y:that.Position.y}
                var toAE = false; 
                console.log(GameData.Map[that.Position.y][that.Position.x].content.elemental)     
                GameData.ActPlayer.Input.actions.left = function(){
                    console.log(GameData.Map[temPosition.y][temPosition.x-1].content.elemental)
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
                    console.log(GameData.Map[temPosition.y][temPosition.x],temPosition,!GameData.ActPlayer.Units.find(e => e == GameData.Map[temPosition.y][temPosition.x].content.ActualUnit));
                    if(GameData.Map[temPosition.y][temPosition.x].content.ActualUnit != null && !GameData.ActPlayer.Units.find(e => e == GameData.Map[temPosition.y][temPosition.x].content.ActualUnit))
                    {
                        clearInterval(inter);
                        GameData.ActPlayer.Input.StopHandle();
                        GameData.BattleField.StartFight({actUnit:that,secUnit:GameData.Map[temPosition.y][temPosition.x].content.ActualUnit});
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
        }
    }
}
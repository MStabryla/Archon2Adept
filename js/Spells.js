var Spells = {
    library:[
        { name:"SUMMON" , using: function(elemental){
            var player = GameData.ActPlayer;
            if(player.Mana > 8)
            {
                GameData.Communicator.Send("SELECT A UNIT");
                player.Cursor.FieldPosition = {x:1,y:7};
                player.Cursor.FieldPosition.x = player.side == "chaos" ? 0 : GameData.Map[0].length-1; 
                for(var i=0;i<player.SelectUnits.length;i++)
                {
                    player.SelectUnits[i].model.visible = true;
                }
                player.Cursor.Position.Set(GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].Position.x,GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].Position.y);
                GameData.SecondCom.Send(GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit.name.toUpperCase());
                var indicator = new MyDriver.Object("shape",{shapeType:"rectangle",sideX:15,sideY:2,color:0xffffff});
                indicator.Position.Set(player.side == "chaos" ? 75 : Data.canvas.width-85,Data.playfieldHeight*1.25-player.Mana*2)
                Driver.Scene.AddToScene(indicator);
                indicator.Position.y = Data.playfieldHeight*1.25-player.Mana*2+GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit.cost*2;
                GameData.ActPlayer.Input.actions.up = function(){
                    if(player.Cursor.FieldPosition.y > 0)
                          player.Cursor.FieldPosition.y-=1;
                    indicator.Position.y = Data.playfieldHeight*1.25-player.Mana*2+GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit.cost*2;
                    GameData.SecondCom.Send(GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit.name.toUpperCase());
                    
                }
                GameData.ActPlayer.Input.actions.down = function(){
                    if(player.Cursor.FieldPosition.y < 7)
                                player.Cursor.FieldPosition.y+=1;
                    indicator.Position.y = Data.playfieldHeight*1.25-player.Mana*2+GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit.cost*2;
                    GameData.SecondCom.Send(GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit.name.toUpperCase());
                    
                }
                GameData.ActPlayer.Input.actions.action = function(){
                    var choiseUnit = GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit;
                    if(player.Mana >= choiseUnit.cost)
                    {
                        player.Mana -= choiseUnit.cost;
                        player.DefaultMove(function(){
                            var actField = GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x];
                            if(actField.content.ActualUnit == null && actField.content.elemental == elemental)
                            {
                                var newUnit = new _Unit({type:choiseUnit._type,position:{x:actField.content.Pos.x,y:actField.content.Pos.y},health:choiseUnit.health,cost:choiseUnit.cost,owner:GameData.ActPlayer});
                                newUnit.model.Scale = 1.4;
                                Driver.Scene.AddToScene(newUnit.model);
                                actField.content.ActualUnit = newUnit;
                                player.Units.push(newUnit);
                                Driver.Scene.Remove(indicator);
                                player.EndTurn();
                            }
                        })
                    }
                }
            }
        }},
        {name:"TELEPORT",using:function(){
            var player = GameData.ActPlayer;
            var actUnit = GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit;
            player.DefaultMove(function(){
                if(GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit != null && !GameData.ActPlayer.Units.find(e => e == GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit))
                {
                    player.Input.StopHandle();
                    GameData.BattleField.StartFight({actUnit:actUnit,secUnit:GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit,position:{x:player.Cursor.FieldPosition.x,y:player.Cursor.FieldPosition.y}});
                }
                else if(!GameData.ActPlayer.Units.find(e => e == GameData.Map[player.Cursor.FieldPosition.y][player.Cursor.FieldPosition.x].content.ActualUnit))
                {
                    actUnit.ChangePosition({x:player.Cursor.FieldPosition.x,y:player.Cursor.FieldPosition.y});
                    player.EndTurn();
                }
            })
        }},
        {
            name:"RAGNAROCK",
            using:function(){
                var firstPlayer = GameData.Player1;
                var secPlayer = GameData.Player2;
                var fpUnit = new _Unit({type:"P_Adept_2",position:{x:firstPlayer.CentralPosition.x,y:firstPlayer.CentralPosition.y},owner:GameData.Player1,health:GameData.Player1.Mana});
                fpUnit.model.Scale = 1.4;
                Driver.Scene.AddToScene(fpUnit.model);
                var spUnit = new _Unit({type:"C_Adept_2",position:{x:secPlayer.CentralPosition.x,y:secPlayer.CentralPosition.y},owner:GameData.Player2,health:GameData.Player1.Mana});
                spUnit.model.Scale = 1.4;
                Driver.Scene.AddToScene(spUnit.model);
                GameData.ActPlayer.Input.StopHandle();
                GameData.BattleField.StartFight({actUnit:fpUnit,secUnit:spUnit,position:{x:9,y:4}});
                var iter = setInterval(function(){
                    if(spUnit.health <= 0 || fpUnit.health <= 0)
                    {
                        GameData.notEnded = false;
                        if(spUnit.health <= 0)
                        {
                            GameData.Communicator.Send("THE GAME IS ENDED ...");
                            GameData.SecondCom.Send("ORDER WINS");
                        }
                        else if(fpUnit.health <= 0)
                        {
                            GameData.Communicator.Send("THE GAME IS ENDED ...");
                            GameData.SecondCom.Send("CHAOS WINS");
                        }
                        GameData.ActPlayer.StopHandle();
                        GameData.ChangePlayer = function(){
                            console.log("nope");
                        }
                        clearInterval(iter);
                    }
                },10);
            }
        }
    ]
}
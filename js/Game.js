function InitGame()
{
    Data.canvas = document.getElementById("Display");
    Data.playfieldWidth = Data.canvas.width*0.6;
    Data.playfieldHeight = Data.canvas.height*0.75;
    for(var i=0;i<Data.field.length;i++)
    {
        GameData.Map.push([]);
        for(var j=0;j<Data.field[i].length;j++)
        {
            var params = {elemental:Data.field[i][j],pos:{x:j,y:i}}
            var elem = new _Field(params);
            var ElemGen = new MyDriver.Object("image",{image:elem.back});
            ElemGen.content = elem;
            ElemGen.Scale = 0.7;
            Data.playfieldHeight = 9 * (ElemGen.Image.height*ElemGen.Scale+2);
            Data.playfieldWidth = 19 * (ElemGen.Image.width*ElemGen.Scale+2);
            ElemGen.Position.Set((Data.canvas.width-Data.playfieldWidth)/2+j*(ElemGen.Image.width*ElemGen.Scale+2),Data.playfieldHeight*0.25+i*(ElemGen.Image.height*ElemGen.Scale+2));
            GameData.Map[i].push(ElemGen);
            Driver.Scene.AddToScene(ElemGen);
        }
    }
    var AdeptSignature = new MyDriver.Object("text",{text:"ADEPT",font:"Amiga",fontSize:"50px",color:0xffffff});
    AdeptSignature.Position.Set(Data.canvas.width/2-125,60);
    var LeftSignature = new MyDriver.Object("text",{text:"archon II",font:"Amiga",fontSize:"25px",color:0xffffff});
    LeftSignature.Position.Set((Data.canvas.width-Data.playfieldWidth)/2,65);
    var RightSignature = new MyDriver.Object("text",{text:"archon II",font:"Amiga",fontSize:"25px",color:0xffffff});
    RightSignature.Position.Set(Data.canvas.width-(Data.canvas.width-Data.playfieldWidth)/2-9*25,65);
    Driver.Scene.AddToScene(AdeptSignature);
    Driver.Scene.AddToScene(LeftSignature);
    Driver.Scene.AddToScene(RightSignature);
    
    //GameData.Player1.Active();
    GameData.Interface = new _Interface();
    GameData.Interface.Generate();
    GameData.BattleField = new _BattleField();
    GameAnim();
}
function GameAnim()
{
    //Driver.Scene.MoveCamera();
    Driver.RenderScene();
    requestAnimationFrame(GameAnim);
}
function GameStart()
{
    document.body.onkeydown = function(e){};
    GameData.Player2 = new _Player({type:"chaos",ctl:GameData.Interface.Options.chaos.player});
    GameData.Player1 = new _Player({type:"order",ctl:GameData.Interface.Options.order.player});

    Driver.Scene.AddToScene(GameData.Player1.Cursor);
    Driver.Scene.AddToScene(GameData.Player2.Cursor);

    for(var i=1;i<GameData.UnitList.order.length;i++)
    {
        var testUnit = new _Unit({type:GameData.UnitList.order[i],position:{x:GameData.Map[0].length-1,y:i-1},cost:25-i*2,owner:GameData.Player1,health:50});
        var actField = GameData.Map[i-1][GameData.Map[0].length-1];
        actField.content.ActualUnit = testUnit;
        testUnit.model.Scale = 1.2;
        testUnit.model.visible = false;
        GameData.Player1.SelectUnits.push(testUnit);
        Driver.Scene.AddToScene(testUnit.model);
    }
    for(var i=1;i<GameData.UnitList.chaos.length;i++)
    {
        var testUnit = new _Unit({type:GameData.UnitList.chaos[i],position:{x:0,y:i-1},cost:25-i*2,owner:GameData.Player2,health:50});
        var actField = GameData.Map[i-1][0];
        actField.content.ActualUnit = testUnit;
        testUnit.model.Scale = 1.2;
        testUnit.model.visible = false;
        GameData.Player2.SelectUnits.push(testUnit);
        Driver.Scene.AddToScene(testUnit.model);
    }
    for(var i=1;i<=4;i++)
    {
        var adept = new _Unit({type:"C_Adept_1",position:{x:i,y:4},owner:GameData.Player2,health:100});
        var actField = GameData.Map[4][i];
        actField.content.ActualUnit = adept;
        adept.model.Scale = 1.4;
        GameData.Player2.Units.push(adept);
        Driver.Scene.AddToScene(adept.model);
    }
    for(var i=1;i<=4;i++)
    {
        var adept = new _Unit({type:"P_Adept_1",position:{x:18-i,y:4},owner:GameData.Player1,health:100});
        var actField = GameData.Map[4][18-i];
        actField.content.ActualUnit = adept;
        adept.model.Scale = 1.4;
        GameData.Player1.Units.push(adept);
        Driver.Scene.AddToScene(adept.model);
    }
    GameData.Communicator = new MyDriver.Object("text",{text:"Test",fontSize:"26px",font:"Amiga",color:0xffffff});
    GameData.Communicator.Position.Set(Data.canvas.width/2,Data.playfieldHeight*1.25+50);
    GameData.Communicator.visible = false;
    GameData.Communicator.Send = function(text){
        this.Text = text;
        this.Position.x = Data.canvas.width/2-(text.length/2)*26;
    }
    GameData.SecondCom = new MyDriver.Object("text",{text:"Test",fontSize:"24px",font:"Amiga",color:0xffffff});
    GameData.SecondCom.Position.Set(Data.canvas.width/2,Data.playfieldHeight*1.25+130);
    GameData.SecondCom.visible = false;
    GameData.SecondCom.Send = function(text){
        this.Text = text;
        this.Position.x = Data.canvas.width/2-(text.length/2)*26;
    }
    Driver.Scene.AddToScene(GameData.Communicator);
    Driver.Scene.AddToScene(GameData.SecondCom);

    GameData.Map[1][9].content.power = new _PowerField({pos:{x:GameData.Map[1][9].Position.x,y:GameData.Map[1][9].Position.y},Pos:{x:9,y:1}});
    GameData.Map[7][9].content.power = new _PowerField({pos:{x:GameData.Map[7][9].Position.x,y:GameData.Map[7][9].Position.y},Pos:{x:9,y:7}});

    GameData.movingPowerFields = [
        new _PowerField({pos:{x:GameData.Map[0][1].Position.x,y:GameData.Map[0][1].Position.y},Pos:{x:1,y:0}}),
        new _PowerField({pos:{x:GameData.Map[8][1].Position.x,y:GameData.Map[8][1].Position.y},Pos:{x:1,y:7}}),
        new _PowerField({pos:{x:GameData.Map[0][17].Position.x,y:GameData.Map[0][17].Position.y},Pos:{x:17,y:0}}),
        new _PowerField({pos:{x:GameData.Map[8][17].Position.x,y:GameData.Map[8][17].Position.y},Pos:{x:17,y:7}})
    ]
}
function Game_Fight()
{

}
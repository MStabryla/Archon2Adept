function _Interface()
{
    var that = this;
    this.Options={
        order:{
            player:"human",
            handicap:"beginner"
        },
        chaos:{
            player:"human",
            handicap:"beginner"
        },
    }
    var ControllerOptions = {
        row:0,
        column:0,
        table:[[],[],[],[]],
        markerTable:[[],[],[],[]]
    }
    var Position = {x:(Data.canvas.width-Data.playfieldWidth)/2,y:Data.playfieldHeight*0.25+Data.playfieldHeight-100}
    this.Generate = function() {
        var elems = [];
        var backBorder = new MyDriver.Object("shape",{shapeType:"rectangle",sideY:240,sideX:1182,color:0x843f2e,bordered:true,borderSize:5});
        backBorder.Position.Set((Data.canvas.width-Data.playfieldWidth)/2,Data.playfieldHeight*0.25+Data.playfieldHeight-100);
        var back = new MyDriver.Object("shape",{shapeType:"rectangle",sideY:240,sideX:1182,color:0xffffff})
        back.Position.Set((Data.canvas.width-Data.playfieldWidth)/2,Data.playfieldHeight*0.25+Data.playfieldHeight-100);
        Driver.Scene.AddToScene(back);
        Driver.Scene.AddToScene(backBorder);

        //First panel

        var Order = new MyDriver.Object("text",{text:"ORDER",font:"Amiga",fontSize:"26px",color:0x1f3f00});
        Order.Position.Set(Position.x+Data.playfieldWidth/4-65,Position.y+35);
        elems.push(Order);
        var OptionO = new MyDriver.Object("text",{text:"OPTION",font:"Amiga",fontSize:"26px",color:0x1f3f00});
        OptionO.Position.Set(Position.x+45,Position.y+75)
        elems.push(OptionO);
        var HandicapO = new MyDriver.Object("text",{text:"HANDICAP",font:"Amiga",fontSize:"26px",color:0x1f3f00});
        HandicapO.Position.Set(Position.x + Data.playfieldWidth/4+45,Position.y+75)
        elems.push(HandicapO);
        var HumanO = new MyDriver.Object("text",{text:"HUMAN",font:"Amiga",fontSize:"26px",color:0x1f3f00});
        var CyborgO = new MyDriver.Object("text",{text:"CYBORG",font:"Amiga",fontSize:"26px",color:0x1f3f00});
        var ComputerO = new MyDriver.Object("text",{text:"COMPUTER",font:"Amiga",fontSize:"26px",color:0x1f3f00});
        var BeginnerO = new MyDriver.Object("text",{text:"BEGINNER",font:"Amiga",fontSize:"26px",color:0x1f3f00});
        var StandardO = new MyDriver.Object("text",{text:"STANDARD",font:"Amiga",fontSize:"26px",color:0x1f3f00});
        var AdvansedO = new MyDriver.Object("text",{text:"ADVANCED",font:"Amiga",fontSize:"26px",color:0x1f3f00});
        ControllerOptions.table[0][0] = HumanO;
        ControllerOptions.table[0][1] = CyborgO;
        ControllerOptions.table[0][2] = ComputerO;
        ControllerOptions.table[1][0] = BeginnerO;
        ControllerOptions.table[1][1] = StandardO;
        ControllerOptions.table[1][2] = AdvansedO;
        HumanO.Position.Set(Position.x+45,Position.y+120);
        CyborgO.Position.Set(Position.x+45,Position.y+150);
        ComputerO.Position.Set(Position.x+45,Position.y+180);
        BeginnerO.Position.Set(Position.x + Data.playfieldWidth/4+45,Position.y+120);
        StandardO.Position.Set(Position.x + Data.playfieldWidth/4+45,Position.y+150);
        AdvansedO.Position.Set(Position.x + Data.playfieldWidth/4+45,Position.y+180);

        //Second Panel

        var Chaos = new MyDriver.Object("text",{text:"CHAOS",font:"Amiga",fontSize:"26px",color:0xa58d00});
        Chaos.Position.Set(Position.x+Data.playfieldWidth*3/4-65,Position.y+35);
        elems.push(Chaos);
        var OptionC = new MyDriver.Object("text",{text:"OPTION",font:"Amiga",fontSize:"26px",color:0xa58d00});
        OptionC.Position.Set(Position.x+Data.playfieldWidth/2+45,Position.y+75)
        elems.push(OptionC);
        var HandicapC = new MyDriver.Object("text",{text:"HANDICAP",font:"Amiga",fontSize:"26px",color:0xa58d00});
        HandicapC.Position.Set(Position.x + Data.playfieldWidth*3/4+45,Position.y+75)
        elems.push(HandicapC);
        var HumanC = new MyDriver.Object("text",{text:"HUMAN",font:"Amiga",fontSize:"26px",color:0xa58d00});
        var CyborgC = new MyDriver.Object("text",{text:"CYBORG",font:"Amiga",fontSize:"26px",color:0xa58d00});
        var ComputerC = new MyDriver.Object("text",{text:"COMPUTER",font:"Amiga",fontSize:"26px",color:0xa58d00});
        var BeginnerC = new MyDriver.Object("text",{text:"BEGINNER",font:"Amiga",fontSize:"26px",color:0xa58d00});
        var StandardC = new MyDriver.Object("text",{text:"STANDARD",font:"Amiga",fontSize:"26px",color:0xa58d00});
        var AdvansedC = new MyDriver.Object("text",{text:"ADVANCED",font:"Amiga",fontSize:"26px",color:0xa58d00});
        ControllerOptions.table[2][0] = HumanC;
        ControllerOptions.table[2][1] = CyborgC;
        ControllerOptions.table[2][2] = ComputerC;
        ControllerOptions.table[3][0] = BeginnerC;
        ControllerOptions.table[3][1] = StandardC;
        ControllerOptions.table[3][2] = AdvansedC;
        HumanC.Position.Set(Position.x+Data.playfieldWidth/2+45,Position.y+120);
        CyborgC.Position.Set(Position.x+Data.playfieldWidth/2+45,Position.y+150);
        ComputerC.Position.Set(Position.x+Data.playfieldWidth/2+45,Position.y+180);
        BeginnerC.Position.Set(Position.x + Data.playfieldWidth*3/4+45,Position.y+120);
        StandardC.Position.Set(Position.x + Data.playfieldWidth*3/4+45,Position.y+150);
        AdvansedC.Position.Set(Position.x + Data.playfieldWidth*3/4+45,Position.y+180);

        var StartC = new MyDriver.Object("text",{text:"START",font:"Amiga",fontSize:"32px",color:0x1f3f00});
        StartC.Position.Set(Position.x+Data.playfieldWidth/2-250,Position.y+230);
        var StartO = new MyDriver.Object("text",{text:"START",font:"Amiga",fontSize:"32px",color:0xa58d00});
        StartO.Position.Set(Position.x+Data.playfieldWidth/2+100,Position.y+230);
        elems.push(StartO,StartC);

        for(var i=0;i<4;i++)
        {
            for(var j=0;j<3;j++)
            {
                var newElem = new MyDriver.Object("shape",{shapeType:"rectangle",sideX:220,sideY:-30,color:0xffffff});
                newElem.Position.Set(ControllerOptions.table[i][j].Position.x,ControllerOptions.table[i][j].Position.y+2);
                ControllerOptions.markerTable[i][j] = newElem;
                Driver.Scene.AddToScene(newElem);
            }
        }


        elems.push(HumanO,CyborgO,ComputerO,BeginnerO,StandardO,AdvansedO);
        elems.push(HumanC,CyborgC,ComputerC,BeginnerC,StandardC,AdvansedC);


        for(var i=0;i<elems.length;i++)
        {
            Driver.Scene.AddToScene(elems[i]);
        }
        that.RemoveInterface = function()
        {
            Driver.Scene.Remove(back);
            Driver.Scene.Remove(backBorder);
            for(var i=0;i<elems.length;i++)
            {
                Driver.Scene.Remove(elems[i]);
            }
            for(var i=0;i<4;i++)
            {
                for(var j=0;j<3;j++)
                {
                    Driver.Scene.Remove(ControllerOptions.markerTable[i][j]);
                }
            }
        }
        that.EventHandler();
    }
    this.EventHandler = function(){
        ControllerOptions.table[ControllerOptions.column][ControllerOptions.row].color = 0x1111ff;
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<3;j++)
            {
                ControllerOptions.markerTable[i][j].color = 0xffffff;
            }
        }
        function ChangeOptionView(variable,first,second,third,column)
        {
            switch(variable)
            {
                case first:
                    ControllerOptions.markerTable[column][0].color = 0xaaaaaa;
                    break;
                case second:
                    ControllerOptions.markerTable[column][1].color = 0xaaaaaa;
                    break;
                case third:
                    ControllerOptions.markerTable[column][2].color = 0xaaaaaa;
                    break;
            }
        }
        ChangeOptionView(that.Options.chaos.player,"human","cyborg","computer",0);
        ChangeOptionView(that.Options.chaos.handicap,"beginner","standard","advanced",1);
        ChangeOptionView(that.Options.order.player,"human","cyborg","computer",2);
        ChangeOptionView(that.Options.order.handicap,"beginner","standard","advanced",3);
        document.body.onkeydown = function(e){
            switch(e.keyCode)
            {
                case 38:
                    if(ControllerOptions.row > 0)
                    {
                        ControllerOptions.row--;
                    }
                    break;
                case 40:
                    if(ControllerOptions.row < 2)
                    {
                        ControllerOptions.row++;
                    }
                    break;
                case 37:
                    if(ControllerOptions.column>0)
                    {
                        ControllerOptions.column--;
                    }
                    break;
                case 39:
                    if(ControllerOptions.column<3)
                    {
                        ControllerOptions.column++;
                    }
                    break;
                case 13:
                    var actualField = ControllerOptions.table[ControllerOptions.column][ControllerOptions.row];
                    if(ControllerOptions.column < 2)
                    {
                        if(ControllerOptions.column % 2 != 0)
                        {
                            that.Options.chaos.handicap = actualField.Text.toLowerCase();
                        }
                        else
                        {
                            that.Options.chaos.player = actualField.Text.toLowerCase();
                        }  
                    }
                    else
                    {
                        if(ControllerOptions.column % 2 != 0)
                        {
                            that.Options.order.handicap = actualField.Text.toLowerCase();
                        }
                        else
                        {
                            that.Options.order.player = actualField.Text.toLowerCase();
                        }
                    }
                    for(var i=0;i<4;i++)
                    {
                        for(var j=0;j<3;j++)
                        {
                            ControllerOptions.markerTable[i][j].color = 0xffffff;
                        }
                    }
                    ChangeOptionView(that.Options.chaos.player,"human","cyborg","computer",0);
                    ChangeOptionView(that.Options.chaos.handicap,"beginner","standard","advanced",1);
                    ChangeOptionView(that.Options.order.player,"human","cyborg","computer",2);
                    ChangeOptionView(that.Options.order.handicap,"beginner","standard","advanced",3);
                    break;
                case 16:
                    that.RemoveInterface();
                    GameStart();
                    if(ControllerOptions.column >= 2)
                    {
                        GameData.Player1.Active();
                        GameData.ActPlayer = GameData.Player1;
                    }
                    else
                    {
                        GameData.Player2.Active();
                        GameData.ActPlayer = GameData.Player2;
                    }
                    break;
            }
            ControllerOptions.table[ControllerOptions.column][ControllerOptions.row].color = 0x1111ff;
            for(var i=0;i<4;i++)
            {
                for(var j=0;j<3;j++)
                {
                    if(i != ControllerOptions.column || j != ControllerOptions.row)
                    {
                        var color = i < 2 ? 0x1f3f00 : 0xa58d00;
                        ControllerOptions.table[i][j].color = color;
                    }
                }
            }
        }
    }
}
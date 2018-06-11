var GameData = {
    Map:[],
    UnitList:{
        order:[
            "P_Adept_1",
            "P_Chime",
            "P_Widmo",
            "P_Gorgona",
            "P_Juggemut",
            "P_Salamandra",
            "P_Thunder",
            "P_Kraken",
            "P_Gigant"
        ],
        chaos:[
            "C_Adept_1",
            "C_Chime",
            "C_Widmo",
            "C_Gorgona",
            "C_Juggemut",
            "C_Firebird",
            "C_Ifryt",
            "C_Syrena",
            "C_Behemot"
        ]
    },
    Action: function(){
        if(GameData.ActPlayer)
        {
            GameData.Map[GameData.ActPlayer.Cursor.FieldPosition.y][GameData.ActPlayer.Cursor.FieldPosition.x].content.Select();
        }
    },
    actElemental:"f",
    powerPosition:[
        [{x:1,y:0},{x:1,y:8},{x:17,y:0},{x:17,y:8}],
        [{x:2,y:1},{x:2,y:7},{x:16,y:1},{x:16,y:7}],
        [{x:3,y:2},{x:3,y:6},{x:15,y:2},{x:15,y:6}],
        [{x:4,y:3},{x:4,y:5},{x:14,y:3},{x:14,y:5}]
    ],
    notEnded:true,
    ChangePlayer:function(){
        GameData.Communicator.visible = false;
        GameData.SecondCom.visible = false;
        if(GameData.ActPlayer)
        {
            if(GameData.ActPlayer == GameData.Player1)
            {
                switch(GameData.actElemental)
                {
                    case "e":
                        for(var i=0;i<GameData.movingPowerFields.length;i++)
                        {
                            GameData.movingPowerFields[i].MoveToAnotherField({x:GameData.powerPosition[0][i].x,y:GameData.powerPosition[0][i].y})
                        }
                        GameData.actElemental = "f";
                        break;
                    case "f":
                        for(var i=0;i<GameData.movingPowerFields.length;i++)
                        {
                            GameData.movingPowerFields[i].MoveToAnotherField({x:GameData.powerPosition[1][i].x,y:GameData.powerPosition[1][i].y})
                        }
                        GameData.actElemental = "a";
                        break;
                    case "a":
                        for(var i=0;i<GameData.movingPowerFields.length;i++)
                        {
                            GameData.movingPowerFields[i].MoveToAnotherField({x:GameData.powerPosition[2][i].x,y:GameData.powerPosition[2][i].y})
                        }
                        GameData.actElemental = "w";
                        break;
                    case "w":
                        for(var i=0;i<GameData.movingPowerFields.length;i++)
                        {
                            GameData.movingPowerFields[i].MoveToAnotherField({x:GameData.powerPosition[3][i].x,y:GameData.powerPosition[3][i].y})
                        }
                        GameData.actElemental = "e";
                        break;
                }
                GameData.ActPlayer = GameData.Player2;
            }
            else if(GameData.ActPlayer == GameData.Player2)
            {
                GameData.ActPlayer = GameData.Player1;
            }
            GameData.ActPlayer.Active();
        }
    }
}
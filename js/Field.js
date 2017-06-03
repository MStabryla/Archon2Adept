function _Field(params)
{
    var that = this;
    this.Pos = params.pos ? params.pos : {x:0,y:0};
    if(params.elemental)
    {
        switch(params.elemental)
        {
            case "f":
                this.back = document.getElementById("Fire");
                break;
            case "w":
                this.back = document.getElementById("Water");
                break;
            case "g":
                this.back = document.getElementById("Ground");
                break;
            case "a":
                this.back = document.getElementById("Air");
                break;
            default:
                this.back = document.getElementById("Null");
                break;
        }
    }
    this.elemental = params.elemental ? params.elemental : "n";
    this.ActualUnit = null;
    this.Select = function(){
        if(GameData.ActPlayer)
        {
            if(that.ActualUnit && that.ActualUnit.Action && GameData.ActPlayer == that.ActualUnit.Owner)
            {
                that.ActualUnit.Action();
            }
        }
    }
}
var MyDriver =  {
    Driver2d: function () {
        var that = this;
        var Canvas = null;
        var CanvasContext = null;
        this.RenderCanvas = function (canvas) {
            if (canvas instanceof HTMLElement)
            {
                Canvas = canvas;
                CanvasContext = canvas.getContext("2d");
            }
            else{
                console.error("parameter 'canvas' is not a HTMLElement");
            }
        };
        this.Scene = new MyDriver.Scene();
        this.RenderScene = function(){
            if(that.Scene !== "undefined")
            {
                 if(Canvas !== null)
                 {
                    CanvasContext.clearRect(0,0,Canvas.width,Canvas.height);
                    for(var i=0;i<that.Scene.Children.length;i++)
                    {
                        var actObject = that.Scene.Children[i];
                        if(actObject.ObjectType !== "undefined" && actObject.visible)
                        {
                            CanvasContext.beginPath();
                            CanvasContext.translate((actObject.Position.x-(that.Scene.Camera.Vector.x)),(actObject.Position.y-(that.Scene.Camera.Vector.y)));
                            CanvasContext.rotate(actObject.Rotation);
                            if(actObject.ObjectType == "image")
                            {
                                CanvasContext.drawImage(actObject.Image,0,0,actObject.Image.width*actObject.Scale,actObject.Image.height*actObject.Scale);
                            }
                            else if(actObject.ObjectType == "shape" && actObject.shapeType != "circle")
                            {
                                var colorString = actObject.color.toString(16);
                                if(colorString.length < 6)
                                {
                                    for(var c = colorString.length;c<6;c++)
                                    {
                                        colorString = "0" + colorString;
                                    }
                                }
                                CanvasContext.fillStyle = "#" + colorString;
                                CanvasContext.strokeStyle = "#" + colorString;
                                if(actObject.verticles.length > 0)
                                {
                                    CanvasContext.moveTo(actObject.verticles[0].x,actObject.verticles[0].y);
                                    for(var j=1;j<actObject.verticles.length;j++)
                                    {
                                        CanvasContext.lineTo(actObject.verticles[j].x*actObject.Scale,actObject.verticles[j].y*actObject.Scale);
                                    }
                                    CanvasContext.lineTo(actObject.verticles[0].x*actObject.Scale,actObject.verticles[0].y*actObject.Scale);
                                    if(actObject.bordered)
                                    {
                                        CanvasContext.lineWidth = actObject.borderSize;
                                        CanvasContext.stroke();
                                    }
                                    else{
                                        CanvasContext.fill();
                                    }
                                    
                                }
                                else{console.error("verticles are not defided");}
                            }
                            else if(actObject.ObjectType == "shape" && actObject.shapeType == "circle")
                            {
                                CanvasContext.fillStyle = "#" + actObject.color.toString(16);
                                CanvasContext.strokeStyle = "#" + actObject.color.toString(16);
                                if(actObject.radius)
                                {
                                    CanvasContext.arc(0,0,actObject.radius*actObject.Scale,0,Math.PI*2);
                                }
                                else{console.error("radius are not defided");}
                                if(actObject.bordered)
                                {
                                    console.log(Canvas.Context.strokeStyle);
                                    CanvasContext.lineWidth = actObject.borderSize;
                                    CanvasContext.stroke();
                                }
                                else{
                                    CanvasContext.fill();
                                }
                            }
                            else if(actObject.ObjectType == "text")
                            {
                                CanvasContext.fillStyle = "#" + actObject.color.toString(16);
                                CanvasContext.font = actObject.FontSize + " " + actObject.Font;
                                CanvasContext.fillText(actObject.Text,0,0);
                            }
                            CanvasContext.closePath();
                            CanvasContext.rotate(-actObject.Rotation);
                            CanvasContext.translate(-(actObject.Position.x-(that.Scene.Camera.Vector.x)),-(actObject.Position.y-(that.Scene.Camera.Vector.y)));
                        }
                    }
                    CanvasContext.save();
                 }
                 else{console.error("Canvas is undefined");}
            }else{console.error("Scene is undefined");}
        }
    },
    Scene:function(){
        var that = this;
        this.Children = [];
        this.Camera = new MyDriver.Camera(new MyDriver.Vector(0,0));
        this.AddToScene = function(object){
            if(object.ObjectType !== null)
            {
                object.Parent = that;
                that.Children.push(object);
            }
        }
        this.SetCameraMove = function(){
            st37 = false;
            st38 = false;
            st39 = false;
            st40 = false;
            document.body.onkeydown = function(e){
                if(e.keyCode > 36 && e.keyCode < 41)
                {
                    eval("st"+e.keyCode + " = true");
                }
            }
            document.body.onkeyup = function(e){
                if(e.keyCode > 36 && e.keyCode < 41)
                {
                    eval("st"+e.keyCode + " = false");
                }
            }
            that.MoveCamera = function ()
            {
                if(st37)
                {
                    that.Camera.Vector.x -= 6;
                }
                if(st38)
                {
                    that.Camera.Vector.y -= 6;
                }
                if(st39)
                {
                    that.Camera.Vector.x += 6;
                }
                if(st40)
                {
                    that.Camera.Vector.y += 6;
                }
            }
        }
        this.RemoveAt = function(i)
        {
            if(i < that.Children.length)
            {
                RemoveFromArray(i,that.Children);
            }
        }
        this.Remove = function()
        {
            for(var x=0;x<=arguments.length;x++)
            {
                for(var i=0;i<that.Children.length;i++)
                {
                    if(arguments[x] == that.Children[i])
                    {
                        RemoveFromArray(i,that.Children);
                        return;
                    }
                }
            }
        }
    },
    Object:function(type,params){
        var that = this;
        this.ObjectType = type !== null ? type : "object";
        this.Children = [];
        this.Position = new MyDriver.Vector(0,0);
        this.Rotation = 0;
        this.Scale = params.scale && typeof params.scale === "number" ? params.scale : 1;
        this.visible = true;
        switch(this.ObjectType)
        {
            case "image":
                if(params.image && params.image instanceof HTMLElement)
                {
                    this.Image = params.image;
                    this.verticles = [
                        new MyDriver.Vector(-this.Image.width/2,-this.Image.height/2),
                        new MyDriver.Vector(this.Image.width/2,-this.Image.height/2),
                        new MyDriver.Vector(this.Image.width/2,this.Image.height/2),
                        new MyDriver.Vector(-this.Image.width/2,this.Image.height/2)
                    ]
                    this.CollRange = Math.sqrt((this.Image.width/2)*(this.Image.width/2) + (this.Image.height/2)*(this.Image.height/2));
                    this.Position.x += this.Image.width/2;
                    this.Position.y += this.Image.height/2;
                }
                else{this.Image = null};
                break;
            case "shape":
                if(params.shapeType)
                {
                    this.shapeType = params.shapeType;
                    this.color = params.color && typeof params.color === "number" ? params.color : 0xffffff;
                    this.bordered = params.bordered == true ? true : false;
                    this.borderSize = params.borderSize && typeof params.borderSize == "number" ? params.borderSize : 1;
                    switch(this.shapeType)
                    {
                        case "square":
                            if(params.side)
                            {
                                this.side = params.side;
                                this.verticles = [
                                    new MyDriver.Vector(0,0),
                                    new MyDriver.Vector(this.side,0),
                                    new MyDriver.Vector(this.side,this.side),
                                    new MyDriver.Vector(0,this.side)
                                ]           
                                this.CollRange = Math.sqrt((this.side/2)*(this.side/2) + (this.side/2)*(this.side/2));                    
                            }
                            else{console.error("required side count in params is not definded")};
                            break;
                        case "rectangle":
                            if(params.sideX && params.sideY)
                            {
                                this.sideX = params.sideX;
                                this.sideY = params.sideY;
                                this.verticles = [
                                    new MyDriver.Vector(0,0),
                                    new MyDriver.Vector(this.sideX,0),
                                    new MyDriver.Vector(this.sideX,this.sideY),
                                    new MyDriver.Vector(0,this.sideY)
                                ]
                                this.CollRange = Math.sqrt((this.sideX/2)*(this.sideX/2) + (this.sideY/2)*(this.sideY/2));                    
                            }
                            else{console.error("required sideX or sideY count in params is not defided")};
                            break;
                        case "circle":
                            if(params.radius)
                            {
                                this.radius = params.radius;  
                                this.verticles = [
                                    new MyDriver.Vector(0,-this.radius),
                                    new MyDriver.Vector(this.radius,0),
                                    new MyDriver.Vector(0,this.radius),
                                    new MyDriver.Vector(-this.radius,0)
                                ]
                                this.CollRange = this.radius;                                
                            }
                            else{console.error("required radius in params is not defided")};
                            break;
                        default:
                            this.verticles = params.verticles && params.verticles instanceof Array ? params.verticles : [];
                            break;
                    }
                    this.Resize = function(paramets){
                        switch(that.shapeType)
                        {
                            case "square":
                                if(paramets.side)
                                {
                                    that.side = paramets.side;
                                    that.verticles = [
                                        new MyDriver.Vector(0,0),
                                        new MyDriver.Vector(that.side,0),
                                        new MyDriver.Vector(that.side,that.side),
                                        new MyDriver.Vector(0,that.side)
                                    ];
                                    that.CollRange = Math.sqrt((that.side/2)*(that.side/2) + (that.side/2)*(that.side/2));
                                }
                                break;
                            case "rectangle":
                                if(paramets.sideX && paramets.sideY)
                                {
                                    that.sideX = paramets.sideX;
                                    that.sideY = paramets.sideY;
                                    that.verticles = [
                                        new MyDriver.Vector(0,0),
                                        new MyDriver.Vector(that.sideX,0),
                                        new MyDriver.Vector(that.sideX,that.sideY),
                                        new MyDriver.Vector(0,that.sideY)
                                    ]
                                    that.CollRange = Math.sqrt((that.sideX/2)*(that.sideX/2) + (that.sideY/2)*(that.sideY/2));                    
                                }
                                break;
                            case "circle":
                                if(params.radius)
                                {
                                    that.radius = paramets.radius;  
                                    that.verticles = [
                                        new MyDriver.Vector(0,-that.radius),
                                        new MyDriver.Vector(that.radius,0),
                                        new MyDriver.Vector(0,that.radius),
                                        new MyDriver.Vector(-that.radius,0)
                                    ]
                                    that.CollRange = that.radius;                                
                                }
                                break;
                        }
                    }
                }
                else{console.error("params are not defided")};
                break;
            case "text":
                if(params.text)
                {
                    this.color = params.color && typeof params.color === "number" ? params.color : 0xffffff;
                    this.Text = params.text;
                    this.Font = params.font ? params.font : document.body.style.fontFamily;
                    this.FontSize = params.fontSize ? params.fontSize : "15px";
                }
                break;
        }
        this.AddChildren = function(object){
            if(object.ObjectType !== null)
            {
                object.Parent = that;
                that.Children.push(object);
            }
        }
    },
    Vector:function(x,y){
        var that = this;
        this.x = x !== "undefined" ? x : 0;
        this.y = y !== "undefined" ? y : 0;
        this.Set = function(inX,inY){
            that.x = inX !== "undefined" ? inX : that.x;
            that.y = inY !== "undefined" ? inY : that.y;
        }
        this.SetX = function(inX)
        {
            that.x = inX !== "undefined" ? inX : that.x;
        }
        this.SetY = function(inY){
            that.y = inY !== "undefined" ? inY : that.y;
        }
    },
    Camera:function (vector){
        var that = this;
        this.Vector = vector && vector instanceof MyDriver.Vector ? vector : new MyDriver.Vector(0,0);
        this.SetToObject = function(object) {
            if(object && object instanceof MyDriver.Object){
                that.Vector = new MyDriver.Vector(object.Position.x,object.Position.y);
            }
        }
    }
}
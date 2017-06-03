var MyDriver =  {
    Driver2d: function () {
        var that = this;
        var Canvas = null;
        var CanvasContext = null;
        this.RenderCanvas = function (canvas) {
            if (canvas instanceof HTMLElement)
            {
                console.log(that);
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
                    for(var i=0;i<that.Scene.SceneList.length;i++)
                    {
                        var actObject = that.Scene.SceneList[i];
                        if(actObject.ObjectType !== "undefined")
                        {
                            CanvasContext.beginPath();
                            CanvasContext.translate((actObject.Position.x-(that.Scene.Camera.Vector.x-(Canvas.width/2))),(actObject.Position.y-(that.Scene.Camera.Vector.y-(Canvas.height/2))));
                            CanvasContext.rotate(actObject.Rotation);
                            if(actObject.ObjectType == "image")
                            {
                                CanvasContext.drawImage(actObject.Image,0,0,actObject.Image.width,actObject.Image.height);
                            }
                            else if(actObject.ObjectType == "shape" && actObject.shapeType != "circle")
                            {
                                CanvasContext.fillStyle = "#" + actObject.color.toString(16);
                                if(actObject.verticles.length > 0)
                                {
                                    CanvasContext.moveTo(actObject.verticles[0].x,actObject.verticles[0].y);
                                    for(var j=1;j<actObject.verticles.length;j++)
                                    {
                                        CanvasContext.lineTo(actObject.verticles[j].x,actObject.verticles[j].y);
                                    }
                                    CanvasContext.lineTo(actObject.verticles[0].x,actObject.verticles[0].y);
                                    CanvasContext.fill();
                                }
                                else{console.error("verticles are not defided");}
                            }
                            else if(actObject.ObjectType == "shape" && actObject.shapeType == "circle")
                            {
                                CanvasContext.fillStyle = "#" + actObject.color.toString(16);
                                if(actObject.radius)
                                {
                                    CanvasContext.arc(0,0,actObject.radius,0,Math.PI*2);
                                }
                                else{console.error("radius are not defided");}
                                CanvasContext.fill();
                            }
                            CanvasContext.rotate(-actObject.Rotation);
                            CanvasContext.translate(-(actObject.Position.x-(that.Scene.Camera.Vector.x-(Canvas.width/2))),-(actObject.Position.y-(that.Scene.Camera.Vector.y-(Canvas.height/2))));
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
        this.SceneList = [];
        this.Camera = new MyDriver.Camera(new MyDriver.Vector(0,0));
        this.AddToScene = function(object){
            if(object.ObjectType !== null)
            {
                that.SceneList.push(object);
            }
        }
    },
    Object:function(type,params){
        this.ObjectType = type !== null ? type : "object";
        this.Children = [];
        this.Position = new MyDriver.Vector(0,0);
        this.Rotation = 0;
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
                            }
                            else{console.error("required radius in params is not defided")};
                            break;
                        default:
                            this.verticles = params.verticles && params.verticles instanceof Array ? params.verticles : [];
                            break;
                    }
                }
                else{console.error("params are not defided")};
                break;
        }
    },
    Vector:function(x,y){
        var that = this;
        this.x = x !== "undefined" ? x : 0;
        this.y = y !== "undefined" ? y : 0;
        this.Set = function(inX,inY){
            that.x = inX !== "undefined" ? inX : 0;
            that.y = inY !== "undefined" ? inY : 0;
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
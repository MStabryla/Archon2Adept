function _Input(params)
{
    var that = this;
    this.controls = {up:false,down:false,left:false,right:false,action:false};
    if(params.type == "human" && params.button)
    {
        function Listening(e){
            switch(e.keyCode){
                case params.button.up:
                    that.actions.up();
                    that.controls.up = true;
                    break;
                case params.button.down:
                    that.actions.down();
                    that.controls.down = true;
                    break;
                case params.button.left:
                    that.actions.left();
                    that.controls.left = true;
                    break;
                case params.button.right:
                    that.actions.right();
                    that.controls.right = true;
                    break;
                case params.button.action:
                    that.actions.action();
                    that.controls.action = true;
                    break;
            }
        }
        function StopListening(e){
            switch(e.keyCode){
                case params.button.up:
                    that.controls.up = false;
                    break;
                case params.button.down:
                    that.controls.down = false;
                    break;
                case params.button.left:
                    that.controls.left = false;
                    break;
                case params.button.right:
                    that.controls.right = false;
                    break;
                case params.button.action:
                    that.controls.action = false;
                    break;
            }
        }
        this.Handle = function(){
            
            document.body.addEventListener("keydown",Listening);
            document.body.addEventListener("keyup",StopListening);
        }
        this.StopHandle = function(){
            document.body.removeEventListener("keydown",Listening);
            document.body.removeEventListener("keyup",StopListening);
            that.controls.up = false;
            that.controls.down = false;
            that.controls.left = false;
            that.controls.right = false;
        }
    }
    this.actions ={up:function(){},down:function(){},left:function(){},right:function(){},action:function(){}}
}
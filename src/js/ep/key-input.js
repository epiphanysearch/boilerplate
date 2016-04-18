

define(["jquery"], function($){
        
        var obj = this,
            body = $(document.body);

        this.keyPresses = new Array();

        this.init = function(){

            $(document)
                .on('keydown', this.onKeydown)
                .on('keyup', this.onKeyup);
        }

        this.onKeydown = function(e){

            switch(e.keyCode){
                case 32:    // SPACE bar
                case 8:     // BACKSPACE
                    e.preventDefault();
                    break;
            }
        }

        this.onKeyup = function(e){
            e.preventDefault();

            obj.updateKeyPresses(e.keyCode);
            body.trigger('keyUp', e.keyCode);
        }

        this.updateKeyPresses = function(keyCode){

            obj.keyPresses.push(keyCode);
            if (obj.keyPresses.length > 10) {
                obj.keyPresses.shift();
            }
            var keyPressesStr = obj.keyPresses.join('');

            // UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A
            if (keyPressesStr == '38384040373937396665') {
                obj.onKonamiCode();
            }
        }

        this.onKonamiCode = function(){
            alert('Konami code!');
        }

        this.init();

});
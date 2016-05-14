define(["jquery"],
    (function($) {
        "use strict";


        var DebugWriter = function DebugWriter(maxMessages) {
            this.max = maxMessages || 15;
            this.window = $('#debug-main');
            this.clear = $('#debug-clear');
            this.messages = [];
            this.bootstrap();
        };

        DebugWriter.prototype.bootstrap = function() {
            var _debug = this;
            this.clear.click(function() {
                _debug.messages = [];
                _debug.render();
            });
        };

        DebugWriter.prototype.writeMessage = function(message) {
            var count = this.max - this.messages.length;
            if(count < 0) {
                this.messages = this.messages.slice(-count, this.messages.length);
            }
            this.messages.push(message);
            this.render();
        };

        DebugWriter.prototype.render = function() {
            var str = "";
            for(var i = 0; i < this.messages.length; i++) {
                str += this.messages[i] + "\n";
            }
            this.window.text(str);
        };

        return DebugWriter;
    })
);
var Controls = /** @class */ (function () {
    function Controls(type) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
        switch (type) {
            case "KEYS":
                this.addKeyboardListeners();
                break;
            case "DUMMY":
                this.forward = true;
                break;
        }
    }
    Controls.prototype.addKeyboardListeners = function () {
        var _this = this;
        document.onkeydown = function (Event) {
            switch (Event.key) {
                case "ArrowLeft":
                    _this.left = true;
                    break;
                case "ArrowRight":
                    _this.right = true;
                    break;
                case "ArrowUp":
                    _this.forward = true;
                    break;
                case "ArrowDown":
                    _this.reverse = true;
                    break;
            }
        };
        document.onkeyup = function (Event) {
            switch (Event.key) {
                case "ArrowLeft":
                    _this.left = false;
                    break;
                case "ArrowRight":
                    _this.right = false;
                    break;
                case "ArrowUp":
                    _this.forward = false;
                    break;
                case "ArrowDown":
                    _this.reverse = false;
                    break;
            }
        };
    };
    return Controls;
}());

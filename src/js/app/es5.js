define(['jquery'], function ($) {
    var Test = function (value) {
        this.value = value;
    };

    Test.prototype = {
        alert: function () {
            alert(this.value);
        }
    };

    return Test;
});

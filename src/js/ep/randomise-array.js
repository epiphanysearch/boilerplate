

define([], function(){
	
	return function(array){
        
        // Using Fisher-Yates shuffle algorithm.
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        // prevent weight == 0 from showing first
        var i = 0, flag = false;
        while (!flag) {
            if (array[i].weight == "0") {
                var first = array.shift();
                array.push(first);
            } else {
                flag = true;
            }
            i++;
        }
        
        return array;
    }

})
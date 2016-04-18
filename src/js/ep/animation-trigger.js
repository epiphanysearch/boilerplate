define([
  "jquery"
], function(
  $) {

  return function() {

    //Checks if elements are currently in the view port.
    //Adds an active class to them.
    //Calls an associated function

    //
    /*  Example usage -
    //

          var animationTriggerer = new animationTrigger();
              animationTriggerer.cssActiveClass = "my-css-class"; //Optional - defaults to "active"
              animationTriggerer.positionThreshold = 1; //Optional - defaults to 0.75 (3/4 of way down the page)
              animationTriggerer.init();
    //
    */

    //Css class to add -
    this.cssActiveClass = "active";
    //Height position threshold as proportion of visibile viewport -
    //Eg. 0.5 =halfway down the viewport
    this.positionThreshold = 0.75;

    var anims =[
      {element: $(".one"), func:alertOne},
      {element: $(".two"), func:alertTwo},
      {element: $(".three")},//Can omitt the function if css class only required.
      {element: $(".four"), func:alertFour},
      {element: $(".five"), func:alertFive}
    ];

    var self = this;

    //The check function works out the current page scroll,
    //And for each element looks for the "already active class"
    //If it doesn;t have it, it checks where on the page it is,
    //And if it's above the threshold, adds the class and calls the specified function

    this.check = function(){
      var windowHeight = $(window).height();
      var triggerPoint = windowHeight*this.positionThreshold;
      var scrolled = $(window).scrollTop();

      for(var i=0; i<anims.length; i++){

        var $el = anims[i].element;
        if(!$el.hasClass(this.cssActiveClass)){
          var offset = $el.offset();
          if(offset){
            var top = $el.offset().top;
            var check = top-triggerPoint;

            if (scrolled >= check) {
              $el.addClass(this.cssActiveClass);

              var associatedFunction = anims[i].func;
              if (typeof associatedFunction == 'function') {
                associatedFunction();
              }
            }
          }
        }
      }
    };

    //Set up the scroll listener -
    this.init = function(){
      //Handle window scrolling -
      if(document.addEventListener){
        document.addEventListener("touchmove", onScrollHandler, false);
      }
      $(window).scroll(onScrollHandler);
      //Do an initial check -
      onScrollHandler();
    };

    function onScrollHandler(e){
      self.check();
    }


    //Triggered functions -

    function alertOne(){
      alert("ONE");
    }

    function alertTwo(){
      alert("TWO");
    }

    function alertThree(){
      alert("THREE");
    }

    function alertFour(){
      alert("FOUR");
    }

    function alertFive(){
      alert("FIVE");
    }

  };
});
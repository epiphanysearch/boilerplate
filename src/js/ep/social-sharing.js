define(["jquery"], function($) {

  return function(el) {
    el.find('a').on('click', function(e) {
      e.preventDefault();
      var i = $(this).attr('class');
      var u = this.href;
      var c = {h:370, w:550};
      var xPos = ($(window).width()-c.w)/2;
      var n = window.open(u,i,'height='+c.h+',width='+c.w+',left='+xPos+',top=60,screenX='+xPos+',screenY=60');
      if (window.focus) { n.focus(); }
    });
  };

});

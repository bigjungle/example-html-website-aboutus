(function(){
	function w() {
	  var r = document.documentElement;
	  var a = r.getBoundingClientRect().width;
	  a > 1000&& (a = 1000), rem = a / 10, r.style.fontSize = rem + "px"
	}
	var t;
	w(), window.addEventListener("resize", function() {
	  t && clearTimeout(t), t = setTimeout(w, 300)
	}, false)	
})();
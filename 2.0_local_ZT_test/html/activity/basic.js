(function(){
	function w() {
	  var r = document.documentElement;
	  var a = r.getBoundingClientRect().width;
	  a > 1920&& (a = 1920), rem = a / 19.2, r.style.fontSize = rem + "px"
	}
	var t;
	w(), window.addEventListener("resize", function() {
	  t && clearTimeout(t), t = setTimeout(w, 300)
	}, false)	
})();
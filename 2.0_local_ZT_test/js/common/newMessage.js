$(".NavLi").on("click",function(){
	
	if($(".us").css("display")=="none")
	{
		$(".us").css({display:"block"})
		console.log($(".NavLi .icon2").attr("src"))
		$(".NavLi .icon2").attr({src:"../../img/img2/message/raw.png"})
	}else{
		$(".us").css({display:"none"})
		$(".NavLi .icon2").attr({src:"../../img/img2/message/raw1.png"})
	}
	
})
$(".NavLi1").on("click",function(){
	
	if($(".Disclosure").css("display")=="none")
	{
		$(".Disclosure").css({display:"block"})
		$(".NavLi1 .icon2").attr({src:"../../img/img2/message/raw.png"})
	}else{
		$(".NavLi1 .icon2").attr({src:"../../img/img2/message/raw1.png"})
		$(".Disclosure").css({display:"none"})
	}
	
})
$(".NavLi2").on("click",function(){
	
	if($(".guarantee").css("display")=="none")
	{
		$(".guarantee").css({display:"block"})
		$(".NavLi2 .icon2").attr({src:"../../img/img2/message/raw.png"})
	}else{
		$(".NavLi2 .icon2").attr({src:"../../img/img2/message/raw1.png"})
		$(".guarantee").css({display:"none"})
	}
	
})
$(".NavLi3").on("click",function(){
	
	if($(".media").css("display")=="none")
	{
		$(".media").css({display:"block"})
		$(".NavLi3 .icon2").attr({src:"../../img/img2/message/raw.png"})
	}else{
		$(".NavLi3 .icon2").attr({src:"../../img/img2/message/raw1.png"})
		$(".media").css({display:"none"})
	}
	
})

var fon;
	//menu($('[href=m1]')[0]);
	if(window.location.pathname !='/'){
		if($('[href='+window.location.pathname.slice(1)+']')[0]!=undefined){
			fon = $('[href='+window.location.pathname.slice(1)+']')[0];
			$('[href='+window.location.pathname.slice(1)+']').removeClass('fon1');
			$('[href='+window.location.pathname.slice(1)+']').addClass('fon')
		}
	}else{
			fon = $('[count=m1]')[0];
			$('[count=m1]').removeClass('fon1');
			$('[count=m1]').addClass('fon')	
	}

  $('.link').on('click',function(e){
    e.preventDefault();

 
    menu(this,'/'+e.target.getAttribute('href'))
    history.pushState(e.target.getAttribute('href'),'','/'+e.target.getAttribute('href'))
  
  });


var urlmas = {'m1':0,'m2':1,'m3':2}
function menu(e,x){
    var xhr = new XMLHttpRequest();
	xhr.open("POST",'/post',true);
	xhr.send(x);
    xhr.onreadystatechange = function(){
    	if(xhr.readyState == 4){
    		if(xhr.status == 200){
    			 if(fon!=undefined){
	    	       	 if(urlmas[$(e).attr('count')]>urlmas[$(fon).attr('count')]){
	    	       
	    	       	   $('.side')[1].innerHTML = xhr.responseText;
			           rotate('r')
		             }else if(urlmas[$(e).attr('count')]<urlmas[$(fon).attr('count')]){
		            
		               $('.side')[2].innerHTML = xhr.responseText;
			           rotate('l')
		             }
                 }
					if(fon!=undefined){
				       $(fon).removeClass('fon');
				       $(fon).addClass('fon1');
					}
				  $(e).removeClass('fon1');	
				  $(e).addClass('fon');
				  fon = e;
			}
		}
    }

}

window.addEventListener('popstate',function(e){
	 menu($('[href='+e.state+']'),'/'+e.state);
})
function rotate(e){
	var count = 0;
	var t = 0;

	var start = setInterval(function(){
			if(e=='l'){
		count++;
	}else{count--;}
	t++;
	$('#cube').css({'transform':'rotateX(0deg) rotateY('+count+'deg)'});
	if(t==90){
      clearInterval(start);
      return;
	}
	
    },10);
}
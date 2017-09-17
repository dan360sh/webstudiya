 var EventEmitter = require('events').EventEmitter;
 var event = new EventEmitter;


// server.on('requst',function(requst){
// 	console.log(requst);
// });
// event.emit('request','привет');
var fs = require('fs');
var http = require('http');
var url = require('url');
var client = [];
var server = new http.Server();
server.listen(3000,()=>console.log('сервер работает'));
event.on('ok',function(){
	server.on('request',function(reg,res){
	    var name = url.parse(reg.url,true).pathname;
	    var f;
	    if(name =='/post'){
	   	var message = '';
	   	var content;
	   	reg.on('readable',function(){
	   	  if (null !== (content = reg.read())) {
	        message += content;
	      }
	   	}).on('end',function(){
	   	  f = vibor(message)[0];
	      res.end(f);	
	   	});
	   	
	   }else{
         f = vibor(name);
         if(f[1]=='js'){
         	res.setHeader('content-type', 'text/javascript');
         	res.end(f[0])
         }else if(f[1]=='css'){
	       	res.setHeader('content-type', 'text/css');
         	res.end(f[0])
	     }else{
	     	res.end(filem['header']+f[0]+filem['futer'])
	     }
       }
	});
})
function vibor(e,res){
	var f;
	var h;
  	     switch(e){
	     	case '/': f = filem['main'];
	     	 break;
	     	case '/m2':f = filem['m2'];
	     	 break;
	     	case '/m3':f = filem['m3'];
	     	 break;
	     	case '/start.js':f = filem['start'];
	     	h = 'js';
	     	 break;
	     	case '/style.css':f = filem['style'];
	     	  h = 'css';
	     	break; 
	     	default: f = filem['error'];
	      }
	      return [f,h];
}
var mass = ['header.html','futer.html','main.html','error.html','m2.html','m3.html','start.js','style.css'];
var filem = {}
function loadingf(e){
		fs.readFile(mass[e],"utf8",function(error,data){
		  filem[mass[e].replace(/\.[^.]+$/,"")] = data;
	      e++;
	      if(e == mass.length){
	      	event.emit('ok',e);
	      	return;
	      }
	      loadingf(e); 
     	})
	
}
loadingf(0);

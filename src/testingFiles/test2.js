function(instance, properties, context) {

	var animDivMain = document.getElementById(instance.data.animDivMainID);
	var divas = document.getElementById(instance.data.divasID);
	var textDiv = document.getElementById(instance.data.textDivID);
	var animDiv = document.getElementById(instance.data.animDivID);
	var case1 = document.getElementById(instance.data.case1ID);
	var case2 = document.getElementById(instance.data.case2ID);
	
    
    
    console.log(textDiv)
  console.log(animDivMain)
  console.log(divas)
  console.log(animDiv)
  console.log(case1)
  console.log(case2)
    


	 
	   var lottieContas = document.getElementById('lottieCont');
	//    var backgroundas = document.getElementById('background');
	   var loader = document.getElementById('lottie');
	  
		  var size = properties.loadersize;
	
	var animationData;
	  
	  //document.body.style.display = 'none'
	  
	  //divas.style.display = 'block';
	  
	  // textDiv.style.fontSize = properties.fontsize+'px';
	  
	  
	  document.body.style.height = '100%';
	  document.body.style.overflow = 'hidden';
	  document.body.style.touchAction = "none";
	
	
	var animationDataSelector = properties.loader;
	  
	  var colorsMain =  hexToRgbA(properties.rgbg);
	  
	  var RGB_R = colorsMain[0] / 255;
	  var RGB_G = colorsMain[1] / 255;
	  var RGB_B = colorsMain[2] / 255;
	  
	  
	  
	switch (animationDataSelector) {
	case '1':
	  animationData = {"v":"5.7.11","fr":30,"ip":0,"op":69,"w":1000,"h":1000,"nm":"v-3","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":3,"nm":"Null 1","sr":1,"ks":{"o":{"a":0,"k":0,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":20,"s":[720]},{"t":50.0000020365418,"s":[450]}],"ix":10},"p":{"a":0,"k":[500,500,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[14.000000000000002,18,100],"ix":6,"l":2}},"ao":0,"ip":0,"op":70.0000028511585,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Left","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":-360,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":0,"s":[0,0,0],"to":[-130.952,-101.852,0],"ti":[130.952,101.852,0]},{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"t":20,"s":[-785.714,-611.111,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":50,"s":[-785.714,-611.111,0],"to":[130.952,101.852,0],"ti":[-130.952,-101.852,0]},{"t":69.0000028104276,"s":[0,0,0]}],"ix":2,"l":2},"a":{"a":0,"k":[-83.299,-61.299,0],"ix":1,"l":2},"s":{"a":0,"k":[2500.286,1944.667,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[10.881,0],[0,-10.881],[-10.881,0],[0,10.881]],"o":[[-10.881,0],[0,10.881],[10.881,0],[0,-10.881]],"v":[[0,-19.701],[-19.701,0],[0,19.701],[19.701,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-83.299,-61.299],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":70.0000028511585,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 6","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":-360,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":0,"s":[0,0,0],"to":[130.952,-101.852,0],"ti":[-130.952,101.852,0]},{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"t":20,"s":[785.714,-611.111,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":50,"s":[785.714,-611.111,0],"to":[-130.952,101.852,0],"ti":[130.952,-101.852,0]},{"t":69.0000028104276,"s":[0,0,0]}],"ix":2,"l":2},"a":{"a":0,"k":[-83.299,-61.299,0],"ix":1,"l":2},"s":{"a":0,"k":[2500.286,1944.667,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[10.881,0],[0,-10.881],[-10.881,0],[0,10.881]],"o":[[-10.881,0],[0,10.881],[10.881,0],[0,-10.881]],"v":[[0,-19.701],[-19.701,0],[0,19.701],[19.701,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-83.299,-61.299],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":70.0000028511585,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 5","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":-360,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":0,"s":[0,0,0],"to":[-130.952,101.852,0],"ti":[130.952,-101.852,0]},{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"t":20,"s":[-785.714,611.111,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":50,"s":[-785.714,611.111,0],"to":[130.952,-101.852,0],"ti":[-130.952,101.852,0]},{"t":69.0000028104276,"s":[0,0,0]}],"ix":2,"l":2},"a":{"a":0,"k":[-83.299,-61.299,0],"ix":1,"l":2},"s":{"a":0,"k":[2500.286,1944.667,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[10.881,0],[0,-10.881],[-10.881,0],[0,10.881]],"o":[[-10.881,0],[0,10.881],[10.881,0],[0,-10.881]],"v":[[0,-19.701],[-19.701,0],[0,19.701],[19.701,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-83.299,-61.299],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":70.0000028511585,"st":0,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"Shape Layer 4","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":-360,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":0,"s":[0,0,0],"to":[130.952,101.852,0],"ti":[-130.952,-101.852,0]},{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"t":20,"s":[785.714,611.111,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":50,"s":[785.714,611.111,0],"to":[-130.952,-101.852,0],"ti":[130.952,101.852,0]},{"t":69.0000028104276,"s":[0,0,0]}],"ix":2,"l":2},"a":{"a":0,"k":[-83.299,-61.299,0],"ix":1,"l":2},"s":{"a":0,"k":[2500.286,1944.667,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[10.881,0],[0,-10.881],[-10.881,0],[0,10.881]],"o":[[-10.881,0],[0,10.881],[10.881,0],[0,-10.881]],"v":[[0,-19.701],[-19.701,0],[0,19.701],[19.701,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-83.299,-61.299],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":70.0000028511585,"st":0,"bm":0}],"markers":[]}
	  
	  if(size == 'medium'){
	//   textDiv.style.marginTop = '-0.7rem';
	  animDivMain.style.width = "300px";
	  animDivMain.style.height = "300px";
	  }else if(size == 'small'){
	//   textDiv.style.marginTop = '-1.4rem';
	  animDivMain.style.width = "200px";
	  animDivMain.style.height = "200px";
	  }else if(size == 'large'){
	//   textDiv.style.marginTop = '0.3rem';
	  animDivMain.style.width = "400px";
	  animDivMain.style.height = "400px";
	  } 
			
	  case1.style.width = "100%";
	  case1.style.height = "60%";
	 
	  animDivMain.style.position = 'absolute';
	  animDivMain.style.top = '50%';
	  animDivMain.style.left = '50%';
	  animDivMain.style.transform = 'translate(-50%, -60%)';
			
			
		  break;
	case '2':
	  animationData = {"v":"5.8.1","fr":30,"ip":0,"op":60,"w":300,"h":300,"nm":"loading_6","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"t":60,"s":[360]}],"ix":10},"p":{"a":0,"k":[150.00000000000003,150.00000000000003,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[30.000000000000004,30.000000000000004,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[300,300],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":50,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":10,"s":[0]},{"t":60,"s":[99]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[1]},{"t":50,"s":[100]}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"t":60,"s":[3]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":300,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":30,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[150.00000000000003,150.00000000000003,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[30.000000000000004,30.000000000000004,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[300,300],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[0.6666666666666666,0.8431372549019608,0.9215686274509803,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":50,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":300,"st":0,"bm":0}],"markers":[]}
	
	  if(size == 'medium'){
	//   textDiv.style.marginTop = '-1rem';
	  animDivMain.style.width = "330px";
	  animDivMain.style.height = "330px";
	  }else if(size == 'small'){
	//   textDiv.style.marginTop = '-1.4rem';
	  animDivMain.style.width = "210px";
	  animDivMain.style.height = "210px";
	  }else if(size == 'large'){
	//   textDiv.style.marginTop = '-0.6rem';
	  animDivMain.style.width = "450px";
	  animDivMain.style.height = "450px";
	  } 
			
	  case1.style.width = "100%";
	  case1.style.height = "60%";
	
	  animDivMain.style.position = 'absolute';
	  animDivMain.style.top = '50%';
	  animDivMain.style.left = '50%';
	  animDivMain.style.transform = 'translate(-50%, -60%)';
		  break;
	  case '3':
	  animationData = {"v":"5.7.4","fr":30,"ip":0,"op":180,"w":1920,"h":1080,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"circle outline","parent":2,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,0,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,55.228],[55.228,0],[0,-55.228],[-55.228,0]],"o":[[0,-55.228],[-55.228,0],[0,55.228],[55.228,0]],"v":[[0,0],[-100,-100],[-200,0],[-100,100]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,55.228],[-55.228,0],[0,-55.228],[55.228,0]],"o":[[0,-55.228],[55.228,0],[0,55.228],[-55.228,0]],"v":[[0,0],[100,-100],[200,0],[100,100]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":0,"k":100,"ix":1},"e":{"a":0,"k":80,"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"t":60,"s":[360]}],"ix":3,"x":"var $bm_rt;\n$bm_rt = loopOut();"},"m":2,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":52,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false}],"ip":0,"op":180,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"t":60,"s":[360]}],"ix":10,"x":"var $bm_rt;\n$bm_rt = loopOut();"},"p":{"a":0,"k":[960,540,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"d":1,"ty":"el","s":{"a":0,"k":[100,100],"ix":2},"p":{"a":0,"k":[-100,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"d":1,"ty":"el","s":{"a":0,"k":[100,100],"ix":2},"p":{"a":0,"k":[100,0],"ix":3},"nm":"Ellipse Path 2","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false}],"ip":0,"op":200,"st":0,"bm":0}],"markers":[]}
	
	  if(size == 'medium'){
	//   textDiv.style.marginTop = '-0.5rem';
	  animDivMain.style.width = "480px";
	  animDivMain.style.height = "480px";
	  }else if(size == 'small'){
	//   textDiv.style.marginTop = '-1.4rem';
	  animDivMain.style.width = "300px";
	  animDivMain.style.height = "300px";
	  }else if(size == 'large'){
	//   textDiv.style.marginTop = '1rem';
	  animDivMain.style.width = "700px";
	  animDivMain.style.height = "700px";
	  }  
	
	  case1.style.width = "100%";
	  case1.style.height = "60%";
	 
	  animDivMain.style.position = 'absolute';
	  animDivMain.style.top = '50%';
	  animDivMain.style.left = '50%';
	  animDivMain.style.transform = 'translate(-50%, -50%)';
	
	
	  break;
	case '4':
	  animationData = {"v":"4.8.0","meta":{"g":"LottieFiles AE 1.0.0","a":"","k":"","d":"","tc":"none"},"fr":60,"ip":9,"op":41,"w":300,"h":300,"nm":"Comp 1","ddd":0,"assets":[{"id":"comp_0","layers":[{"ddd":0,"ind":1,"ty":4,"nm":"ball4","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":223,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.534],"y":[0]},"t":25,"s":[169.5]},{"i":{"x":[0.424],"y":[1]},"o":{"x":[0.514],"y":[0]},"t":40,"s":[129.5]},{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.054],"y":[0]},"t":55,"s":[169.5]},{"t":70,"s":[129.5]}],"ix":4}},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-14.359],[14.359,0],[0,14.359],[-14.359,0]],"o":[[0,14.359],[-14.359,0],[0,-14.359],[14.359,0]],"v":[[26,0],[0,26],[-26,0],[0,-26]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":40,"op":71,"st":25,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"ball 4","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":150,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.534],"y":[0]},"t":20,"s":[169.5]},{"i":{"x":[0.424],"y":[1]},"o":{"x":[0.514],"y":[0]},"t":35,"s":[129.5]},{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.054],"y":[0]},"t":50,"s":[169.5]},{"t":65,"s":[129.5]}],"ix":4}},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-14.359],[14.359,0],[0,14.359],[-14.359,0]],"o":[[0,14.359],[-14.359,0],[0,-14.359],[14.359,0]],"v":[[26,0],[0,26],[-26,0],[0,-26]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":35,"op":66,"st":20,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"ball 3","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":77,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.534],"y":[0]},"t":15,"s":[169.5]},{"i":{"x":[0.424],"y":[1]},"o":{"x":[0.514],"y":[0]},"t":30,"s":[129.5]},{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.054],"y":[0]},"t":45,"s":[169.5]},{"t":60,"s":[129.5]}],"ix":4}},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-14.359],[14.359,0],[0,14.359],[-14.359,0]],"o":[[0,14.359],[-14.359,0],[0,-14.359],[14.359,0]],"v":[[26,0],[0,26],[-26,0],[0,-26]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":30,"op":61,"st":15,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"ball3","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":223,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.534],"y":[0]},"t":-6,"s":[169.5]},{"i":{"x":[0.424],"y":[1]},"o":{"x":[0.514],"y":[0]},"t":9,"s":[129.5]},{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.054],"y":[0]},"t":24,"s":[169.5]},{"t":39,"s":[129.5]}],"ix":4}},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-14.359],[14.359,0],[0,14.359],[-14.359,0]],"o":[[0,14.359],[-14.359,0],[0,-14.359],[14.359,0]],"v":[[26,0],[0,26],[-26,0],[0,-26]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":9,"op":40,"st":-6,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"ball 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":150,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.534],"y":[0]},"t":-11,"s":[169.5]},{"i":{"x":[0.424],"y":[1]},"o":{"x":[0.514],"y":[0]},"t":4,"s":[129.5]},{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.054],"y":[0]},"t":19,"s":[169.5]},{"t":34,"s":[129.5]}],"ix":4}},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-14.359],[14.359,0],[0,14.359],[-14.359,0]],"o":[[0,14.359],[-14.359,0],[0,-14.359],[14.359,0]],"v":[[26,0],[0,26],[-26,0],[0,-26]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":4,"op":35,"st":-11,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"ball 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":77,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.534],"y":[0]},"t":-16,"s":[169.5]},{"i":{"x":[0.424],"y":[1]},"o":{"x":[0.514],"y":[0]},"t":-1,"s":[129.5]},{"i":{"x":[0.465],"y":[1]},"o":{"x":[0.054],"y":[0]},"t":14,"s":[169.5]},{"t":29,"s":[129.5]}],"ix":4}},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-14.359],[14.359,0],[0,14.359],[-14.359,0]],"o":[[0,14.359],[-14.359,0],[0,-14.359],[14.359,0]],"v":[[26,0],[0,26],[-26,0],[0,-26]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_G,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":-1,"op":30,"st":-16,"bm":0}]}],"layers":[{"ddd":0,"ind":1,"ty":0,"nm":"Pre-comp 1","refId":"comp_0","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[150,150,0],"ix":2},"a":{"a":0,"k":[150,150,0],"ix":1},"s":{"a":0,"k":[41,41,100],"ix":6}},"ao":0,"w":300,"h":300,"ip":0,"op":211,"st":0,"bm":0}],"markers":[]}
						if(size == 'medium'){
	//   textDiv.style.marginTop = '-1.5rem';
	  animDivMain.style.width = "350px";
	  animDivMain.style.height = "350px";
	  }else if(size == 'small'){
	//   textDiv.style.marginTop = '-1.6rem';
	  animDivMain.style.width = "200px";
	  animDivMain.style.height = "200px";
	  }else if(size == 'large'){
	  animDivMain.style.width = "500px";
	  animDivMain.style.height = "500px";
	  }  
			
	  case1.style.width = "100%";
	  case1.style.height = "60%";
	
	  animDivMain.style.position = 'absolute';
	  animDivMain.style.top = '50%';
	  animDivMain.style.left = '50%';
	  animDivMain.style.transform = 'translate(-50%, -50%)';
			
			
	  break;
	case '5':
	  animationData = {"v":"5.5.8","fr":29.9700012207031,"ip":0,"op":45.0000018328876,"w":200,"h":200,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"circle_group","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[100,100,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":0,"s":[100,100,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":15,"s":[100,100,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":23,"s":[50,50,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":30,"s":[100,100,100]},{"t":45.0000018328876,"s":[100,100,100]}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[0.57,0.926],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-277.715,-177.537],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[72,72],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[RGB_R,RGB_G,RGB_B,1]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":23,"s":[0.239215686917,0.784313738346,1,1]},{"t":45.0000018328876,"s":[RGB_R,RGB_G,RGB_B,1]}],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":0,"s":[0,-50],"to":[-9.167,16.667],"ti":[-9.167,-16.667]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":15,"s":[-55,50],"to":[9.167,16.667],"ti":[-9.167,16.667]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":30,"s":[55,50],"to":[9.167,-16.667],"ti":[9.167,16.667]},{"t":45.0000018328876,"s":[0,-50]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"circle_A","np":3,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[72,72],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[RGB_R,RGB_G,RGB_B,1]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":23,"s":[0.239215686917,0.784313738346,1,1]},{"t":45.0000018328876,"s":[RGB_R,RGB_G,RGB_B,1]}],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":0,"s":[-55,50],"to":[18.333,0],"ti":[-9.167,16.667]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":15,"s":[55,50],"to":[9.167,-16.667],"ti":[18.333,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":30,"s":[0,-50],"to":[-18.333,0],"ti":[9.167,-16.667]},{"t":45.0000018328876,"s":[-55,50]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"circle_B","np":3,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[72,72],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[RGB_R,RGB_G,RGB_B,1]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":23,"s":[0.239215686917,0.784313738346,1,1]},{"t":45.0000018328876,"s":[RGB_R,RGB_G,RGB_B,1]}],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":0,"s":[55,50],"to":[-9.167,-16.667],"ti":[18.333,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":15,"s":[0,-50],"to":[-18.333,0],"ti":[-9.167,-16.667]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":30,"s":[-55,50],"to":[9.167,16.667],"ti":[-18.333,0]},{"t":45.0000018328876,"s":[55,50]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"circle_C","np":3,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0}],"markers":[]}
	 
						if(size == 'medium'){
	//   textDiv.style.marginTop = '-0.7rem';
	  animDivMain.style.width = "130px";
	  animDivMain.style.height = "130px";
	  }else if(size == 'small'){
	//   textDiv.style.marginTop = '-1.6rem';
	  animDivMain.style.width = "70px";
	  animDivMain.style.height = "70px";
	  }else if(size == 'large'){
	  animDivMain.style.width = "200px";
	  animDivMain.style.height = "200px";
	  }  
	  
		animDivMain.style.position = 'absolute';
	  animDivMain.style.top = '50%';
	  animDivMain.style.left = '50%';
	  animDivMain.style.transform = 'translate(-50%, -67%)';     
	   
		  break;
	  case '6':
	  animationData = {"v":"4.8.0","meta":{"g":"LottieFiles AE 1.1.0","a":"","k":"","d":"","tc":""},"fr":12,"ip":7,"op":25,"w":500,"h":500,"nm":"Test SVG","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[250,250,0],"ix":2},"a":{"a":0,"k":[-0.211,-0.621,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-95.209,0],[0,-95.209],[95.209,0],[0,95.209]],"o":[[95.209,0],[0,95.209],[-95.209,0],[0,-95.209]],"v":[[0,-172.391],[172.391,0],[0,172.391],[-172.391,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.86],"y":[0.344]},"o":{"x":[0.464],"y":[-0.058]},"t":20,"s":[0]},{"i":{"x":[0.526],"y":[0.907]},"o":{"x":[0.097],"y":[0.746]},"t":30,"s":[62.085]},{"t":40,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.254],"y":[1.02]},"o":{"x":[0.76],"y":[0.098]},"t":18,"s":[0]},{"t":38,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":76,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[-0.211,-0.621],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":18,"op":78,"st":18,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[250,250,0],"ix":2},"a":{"a":0,"k":[-0.211,-0.621,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-95.209,0],[0,-95.209],[95.209,0],[0,95.209]],"o":[[95.209,0],[0,95.209],[-95.209,0],[0,-95.209]],"v":[[0,-172.391],[172.391,0],[0,172.391],[-172.391,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.86],"y":[0.344]},"o":{"x":[0.464],"y":[-0.058]},"t":2,"s":[0]},{"i":{"x":[0.526],"y":[0.907]},"o":{"x":[0.097],"y":[0.746]},"t":12,"s":[62.085]},{"t":22,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.254],"y":[1.02]},"o":{"x":[0.76],"y":[0.098]},"t":0,"s":[0]},{"t":20,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":76,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[-0.211,-0.621],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":60,"st":0,"bm":0}],"markers":[]};
			
				if(size == 'medium'){
	//   textDiv.style.marginTop = '-1rem';
	  animDivMain.style.width = "130px";
	  animDivMain.style.height = "130px";
	  }else if(size == 'small'){
	//   textDiv.style.marginTop = '-2rem';
	  animDivMain.style.width = "70px";
	  animDivMain.style.height = "70px";
	  }else if(size == 'large'){
	  animDivMain.style.width = "200px";
	  animDivMain.style.height = "200px";
	  }    
		   
	  case1.style.width = "100%";
	  case1.style.height = "60%";
	 
	  animDivMain.style.position = 'absolute';
	  animDivMain.style.top = '50%';
	  animDivMain.style.left = '50%';
	  animDivMain.style.transform = 'translate(-50%, -67%)';
			
			
			
		  break;
	  case '7':
	  animationData = {"v":"5.1.1","fr":24,"ip":0,"op":48,"w":640,"h":640,"nm":"loader_circular1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[320,320,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":2,"ty":"el","s":{"a":0,"k":[200,200],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":36,"ix":5},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":180,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.34],"y":[1]},"o":{"x":[0.66],"y":[0]},"n":["0p34_1_0p66_0"],"t":18,"s":[0],"e":[99]},{"t":48}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":0,"s":[1],"e":[100]},{"t":32}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":0,"s":[0],"e":[720]},{"t":48}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":72,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[320,320,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":2,"ty":"el","s":{"a":0,"k":[360,360],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":36,"ix":5},"lc":2,"lj":2,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.34],"y":[1]},"o":{"x":[0.66],"y":[0]},"n":["0p34_1_0p66_0"],"t":18,"s":[0],"e":[99]},{"t":48}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":["0p667_1_0p333_0"],"t":0,"s":[1],"e":[100]},{"t":32}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":0,"s":[0],"e":[360]},{"t":48}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":72,"st":0,"bm":0}],"markers":[]}
	   
			  if(size == 'medium'){
	//   textDiv.style.marginTop = '-1rem';
	  animDivMain.style.width = "150px";
	  animDivMain.style.height = "150px";
	  }else if(size == 'small'){
	//   textDiv.style.marginTop = '-2rem';
	  animDivMain.style.width = "90px";
	  animDivMain.style.height = "90px";
	  }else if(size == 'large'){
	  animDivMain.style.width = "250px";
	  animDivMain.style.height = "250px";
	  }    
			
	  case1.style.width = "100%";
	  case1.style.height = "60%";
	
	  animDivMain.style.position = 'absolute';
	  animDivMain.style.top = '50%';
	  animDivMain.style.left = '50%';
	  animDivMain.style.transform = 'translate(-50%, -65%)';
			
			
	   break;
	  case '8':
		  animationData = {"v":"5.7.11","fr":60,"ip":0,"op":60,"w":1920,"h":1080,"nm":"Loading Dots","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Dot4","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":25,"s":[25]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":39,"s":[100]},{"t":55,"s":[25]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":25,"s":[1142,540,0],"to":[0,-6.667,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":39,"s":[1142,500,0],"to":[0,0,0],"ti":[0,-6.667,0]},{"t":55,"s":[1142,540,0]}],"ix":2,"l":2},"a":{"a":0,"k":[-284,92,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":25,"s":[50,50,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":39,"s":[75,75,100]},{"t":55,"s":[50,50,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[120,120],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-284,92],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":360,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Dot3","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":17,"s":[25]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":31,"s":[100]},{"t":47,"s":[25]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":17,"s":[1022.0000000000001,540,0],"to":[0,-6.667,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":31,"s":[1022.0000000000001,500,0],"to":[0,0,0],"ti":[0,-6.667,0]},{"t":47,"s":[1022.0000000000001,540,0]}],"ix":2,"l":2},"a":{"a":0,"k":[-284,92,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":17,"s":[50,50,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":31,"s":[75,75,100]},{"t":47,"s":[50,50,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[120,120],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-284,92],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":360,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Dot2","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":9,"s":[25]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":23,"s":[100]},{"t":39,"s":[25]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":9,"s":[902,540,0],"to":[0,-6.667,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":23,"s":[902,500,0],"to":[0,0,0],"ti":[0,0,0]},{"t":39,"s":[902,540,0]}],"ix":2,"l":2},"a":{"a":0,"k":[-284,92,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":9,"s":[50,50,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":23,"s":[75,75,100]},{"t":39,"s":[50,50,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[120,120],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-284,92],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":360,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"Dot1","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[25]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":14,"s":[100]},{"t":30,"s":[25]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":0,"s":[782,540,0],"to":[0,-6.667,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":14,"s":[782,500,0],"to":[0,0,0],"ti":[0,-6.667,0]},{"t":30,"s":[782,540,0]}],"ix":2,"l":2},"a":{"a":0,"k":[-284,92,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":0,"s":[50,50,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":14,"s":[75,75,100]},{"t":30,"s":[50,50,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[120,120],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"fl","c":{"a":0,"k":[RGB_R,RGB_G,RGB_B,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-284,92],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":360,"st":0,"bm":0}],"markers":[]} 
	   
			if(size == 'medium'){
	//   textDiv.style.marginTop = '-2.5rem';
		 animDivMain.style.width = "400px";
	   animDivMain.style.height = "400px";
	  }else if(size == 'small'){
	//  textDiv.style.marginTop = '-2rem';
			 animDivMain.style.width = "200px";
	   animDivMain.style.height = "200px";
	  }else if(size == 'large'){
	//    textDiv.style.marginTop = '-2rem';    
	   animDivMain.style.width = "600px";
	   animDivMain.style.height = "600px";
	  }    
			
	  case1.style.width = "100%";
	  case1.style.height = "60%";
	 
	  animDivMain.style.position = 'absolute';
	  animDivMain.style.top = '50%';
	  animDivMain.style.left = '50%';
	  animDivMain.style.transform = 'translate(-50%, -50%)';
			
			
			
			
		  break;
		   case 'image':
		  
		  
		  var test2 = document.createElement('div');
	  
		  test2.style.position = 'absolute';
		  test2.style.margin = '0';
		
		  
		   var test = document.createElement('img');
		  test.src = properties.imgc;
		  test.id = 'blob';
		test.style.height = properties.imgs + 'px';
		  test.style.width =  properties.imgs + 'px';
		
	
		  
		  test2.style.height =  test.style.height;
		  test2.style.width = test.style.width;
	 
		  case1.style.height =  test.style.height;
		  case1.style.width = test.style.width;
		  case1.style.display = 'flex';
		  case2.style.marginTop  = '8px';
	  
		case1.style.justifyContent = 'center';
		  case1.style.alignItems = 'center';
		  
		  
		  
		  case1.appendChild(test2);
		  test2.appendChild(test);
		  
		  break;
	default:
	}
	
	
	
	var params = {
		   container: animDivMain,
		  renderer: 'html',
		  loop: true,
		  autoplay: true,
		  animationData: animationData,
		   rendererSettings: {
			  clearCanvas: false,
			  viewBoxOnly : true
			  
	}
	  };
	  var anim;
	
	  anim = lottie.loadAnimation(params);
	
	
	  setTimeout(function() {
		console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx')
		console.log(lottieContas)
		// console.log(backgroundas)
		console.log(divas)
		  lottieContas.remove();
		  document.body.style.overflow = 'auto';
		//   backgroundas.remove();
		  
		  document.body.style.touchAction = "auto";
		  divas.remove();
	  }, properties.duration);
	
	  
	function hexToRgbA(hex){
		  rgb = hex.substring(5, hex.length-1)
		   .replace(/ /g, '')
		   .split(',');
	
	  return rgb
	} 
	
}
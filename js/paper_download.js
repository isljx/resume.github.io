var downLoad = function(imgArray){
	this.arr = [];
	this.imgCount = 0;
	this.imgArray = imgArray;
	this.imgLength = imgArray.length;
	this.transfer = 0;
	this.getImg = function(){
		var imgArray = this.imgArray;
		for(var i = 0; i < imgArray.length; i++){
			var src = imgArray[i].src;
			imgArray[i].setAttribute('crossOrigin', 'anonymous');
			this.requestImg(imgArray[i],src);
		}
	}
	this.requestImg = function(img,src){
		var _this = this
		var src = src;
		img.src = src;
		img.onerror = function(){
			var timeStamp = +new Date();
			_this.requestImg(img,src+'?'+timeStamp);
		}
		img.onload = function(){
			_this.imgCount++;
		}
	}
	this.getBase64Image = function(image,ext){
		var canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		var context = canvas.getContext("2d");
		context.drawImage(image,0,0,image.width,image.height);
		
		// 这里是不支持跨域的
		var base64 = canvas.toDataURL("image/"+ext);
		return base64;
	}
	this.init = function(dom,target,fileName,paperSize){
		var _this = this;
		var targetId = targetId || 'content';
		var fileName = fileName || 'content';
		var paperSize = paperSize || 'a4';
		this.getImg();
		dom.onclick = function(){
			document.body.scrollTop = document.body.scrollHeight - screen.height;
			document.body.scrollTop = 0;
			try{
				$('.test-lists').find('.test-lists-bottom,.test-lists-sy,.test-lists-xy,.test-lists-score,.test-lists-remove').hide();
				$('.answer-sheet').show();
			}catch(e){
				console.log('不是试题');
			}
			target.style.background = 'white';
			if(_this.imgCount == _this.imgArray.length){
				if(_this.transfer == 0){
					for(var i = 0; i < _this.imgArray.length; i++){
					_this.arr.push(_this.getBase64Image(_this.imgArray[i],'png'))
					}
					for(var i = 0; i < _this.arr.length; i++){
						_this.imgArray[i].src = _this.arr[i];
					}
					_this.transfer = 1;
				}
				renderPDF(target,fileName,paperSize, function(){
					_this.arr = [];
					_this.imgCount = _this.imgLength;
					try{
						$('.test-lists').find('.test-lists-bottom,.test-lists-sy,.test-lists-xy,.test-lists-score,.test-lists-remove').show();
						$('.answer-sheet').hide();
					}catch(e){
						console.log('不是试题');
					}
	        	});
			}
		}
	}
}
//downLoad.prototype.getImg = function(){
//	var imgArray = this.imgArray;
//	for(var i = 0; i < imgArray.length; i++){
//		var src = imgArray[i].src;
//		imgArray[i].setAttribute('crossOrigin', 'anonymous');
//		this.requestImg(imgArray[i],src);
//	}
//}
//downLoad.prototype.requestImg = function(img,src){
//	var _this = this
//	var src = src;
//	img.src = src;
//	img.onerror = function(){
//		var timeStamp = +new Date();
//		_this.requestImg(img,src+'?'+timeStamp);
//	}
//	img.onload = function(){
//		_this.imgCount++;
//	}
//}
//downLoad.prototype.getBase64Image = function(image,ext){
//	var canvas = document.createElement("canvas");
//	canvas.width = image.width;
//	canvas.height = image.height;
//	var context = canvas.getContext("2d");
//	context.drawImage(image,0,0,image.width,image.height);
//	
//	// 这里是不支持跨域的
//	var base64 = canvas.toDataURL("image/"+ext);
//	return base64;
//}
//downLoad.prototype.init = function(dom,target,fileName,paperSize){
//	var _this = this;
//	var targetId = targetId || 'content';
//	var fileName = fileName || 'content';
//	var paperSize = paperSize || 'a4';
//	this.getImg();
//	dom.onclick = function(){
//		document.body.scrollTop = document.body.scrollHeight - screen.height;
//		document.body.scrollTop = 0;
//		try{
//			$('.test-lists').find('.test-lists-bottom,.test-lists-sy,.test-lists-xy,.test-lists-score,.test-lists-remove').hide();
//			$('.answer-sheet').show();
//		}catch(e){
//			console.log('不是试题');
//		}
//		target.style.background = 'white';
//		if(_this.imgCount == _this.imgArray.length){
//			if(_this.transfer == 0){
//				for(var i = 0; i < _this.imgArray.length; i++){
//				_this.arr.push(_this.getBase64Image(_this.imgArray[i],'png'))
//				}
//				for(var i = 0; i < _this.arr.length; i++){
//					_this.imgArray[i].src = _this.arr[i];
//				}
//				_this.transfer = 1;
//			}
//			renderPDF(target,fileName,paperSize, function(){
//				_this.arr = [];
//				_this.imgCount = 0;
//				try{
//					$('.test-lists').find('.test-lists-bottom,.test-lists-sy,.test-lists-xy,.test-lists-score,.test-lists-remove').show();
//					$('.answer-sheet').hide();
//				}catch(e){
//					console.log('不是试题');
//				}
//      	});
//		}
//		else{
//			alert(_this.imgCount)
//			console.log(_this.imgArray)
//		}
//	}
//}
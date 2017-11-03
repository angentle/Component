//图片预加载
(function($){
	
	function PreLoad(imgs,options){
		this.imgs=(typeof imgs === 'string')?[imgs]:imgs;
		this.opts=$.extend({},PreLoad.DEFAULTS,options);
		
		this._unordered();
	}
	PreLoad.DEFAULTS={
		each:null,//每一张图片加载完毕后执行
		all:null //所有图片加载完毕后执行
	}
	PreLoad.prototype.unordered=function(){//无序加载
		var imgs=this.imgs,
			opts=this.opts,
			count=0,
			len=imgs.length;
		if(typeof src !==  'string') return;
		$.each(imgs,function(i,src){
					var imgObj=new Image();
					
					$(imgObj).on('load error',function(){
						opts.each && opts.each(count);
						
						if(count >= len - 1){
							opts.all && opts.all();
						}
						count++;
					});
					imgObj.src=src;
				})
	}
	
//	插件调用 两种写法
//	$.fn.extend ->$('#imgs').preload() 
//	$.extend ->$.preload()
		$.extend({
		preLoad:function(imgs,opts){
			new 	PreLoad(imgs,opts)
		}
		})
})(jQuery);

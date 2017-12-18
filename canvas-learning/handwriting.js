var canvasWidth=800
var canvasHeight = canvasWidth
var isMouseDown =false //鼠标是否按下
var lastLoc={ x:0,y:0}
var lastTimeStamp =0
var lastLineWidth=-1

var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");

canvas.width= canvasWidth
canvas.height= canvasHeight
drawGrid()
//document.onmousedown = function(e){
//	alert(e.clientX + "," + e.clientY)
//}  //测试用的
//如何设置 屏幕坐标与canvas坐标的转换
//屏幕坐标x= x-canvas.left
//屏幕坐标y= y-canvas.top
//canvas.getBoundingClientRect() 可以取得 canvas距离上边缘以及左边缘的距离

canvas.onmousedown=function(e){//鼠标摁下
	e.preventDefault()//阻止默认事件响应 键盘操作 以及 移动设配操作时
	isMouseDown =true
	console.log("onmousedown")
	lastLoc =windowToCanvas(e.clientX,e.clientY)
	//alert(loc.x+","+loc.y)
	lastTimeStamp =new Date().getTime()
}
canvas.onmouseup=function(e){//鼠标抬起
	e.preventDefault()
	isMouseDown =false
	console.log("onmouseup")
}
canvas.onmouseout =function(e){//鼠标离开画布
	e.preventDefault()
	isMouseDown =false
	console.log("onmouseout")
}
canvas.onmousemove =function(e){//鼠标在区域中移动
	e.preventDefault();
	if(isMouseDown){
		//draw
		var curLoc =windowToCanvas(e.clientX,e.clientY) 
		var curTimeStamp= new Date().getTime()
		var s=calcDistance(curLoc,lastLoc)
		var t=curTimeStamp-lastTimeStamp
		
		var lineWidth = calLineWidth(t,s)
		context.beginPath()
		context.moveTo(lastLoc.x,lastLoc.y)
		context.lineTo(curLoc.x,curLoc.y)
		
		context.strokeStyle="black"
		context.lineWidth=lineWidth
		context.lineCap="round" //防止字体出现锯齿
		context.lineJoin="round" //线条衔接更加自然
		context.stroke();
		
		lastLoc=curLoc;
		lastTimeStamp=curTimeStamp
		lastLineWidth=lineWidth
	//		console.log("onmousemove")

	}
}
function calLineWidth(t,s){
	var v=s/t
	var resultLineWidth
	
	if(v<=0.1)
		resultLineWidth =30
	else if(v >= 10)
		resultLineWidth =1
	else
		resultLineWidth =30 -(v-0.1)/(10-0.1)*(30-1)
	if(lastLineWidth == -1)
	return resultLineWidth
		return lastLineWidth*2/3+resultLineWidth*1/3
}
function calcDistance(loc1,loc2){
	return Math.sqrt(Math.pow(loc1.x-loc2.x,2)+Math.pow(loc1.y-loc2.y ,2))

}
function windowToCanvas(x,y){
	var bbox = canvas.getBoundingClientRect()
	return {x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)}
}

function drawGrid(){
	context.save() //状态设置 使其不影响 函数外的调用
	
	context.strokeStyle ="rgb(230,11,9)" //绘制一个边框为6红色方形
	
	//绘制正方形
	context.beginPath()
	context.moveTo(3,3)
	context.lineTo(canvasWidth - 3,3)
	context.lineTo(canvasWidth-3,canvasHeight-3)
	context.lineTo(3,canvasHeight-3)
	context.closePath()
	
	context.lineWidth=6
	context.stroke()
	
	//绘制米字格
	context.beginPath()
	context.moveTo(0,0)
	context.lineTo(canvasWidth,canvasHeight)
	
	context.moveTo(canvasWidth,0)
	context.lineTo(0,canvasHeight)
	
	context.moveTo(canvasWidth/2,0)
	context.lineTo(canvasWidth/2,canvasHeight)
	
	context.moveTo(0,canvasHeight/2)
	context.lineTo(canvasWidth,canvasHeight/2)
	context.lineWidth =1
	context.setLineDash([2, 5]); //a为虚线线段长度,b为虚线线段间隔长度
	context.stroke()
	
	context.restore()
}

//求斜边的长度 （x的平方+y的平方）开根号
//function getBeveling(x,y){
//	return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
//}
//function drawDashLine(context,x1,y1,x2,y2,dashLen){
//	dashLen=dashLen ===undefined ?
//}


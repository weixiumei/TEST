var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
//每个数字离画布上边距的距离。
var MARGIN_TOP = 60;
//第一个数字离画布左边距的距离。
var MARGIN_LEFT = 30;

//月数是0-11代表1-12月。（时2位，只能倒计时4天）
//const endTime = new Date(2016,1,19,18,47,52);
var endTime = new Date();
endTime.setTime(endTime.getTime() + 3600*1000);
//现在倒计时需要多少秒
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#993300","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function(){

	WINDOW_WIDTH = document.documentElement.clientWidth;
	WINDOW_HEIGHT = document.documentElement.clientHeight-100;

	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108) - 1;

	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5)-50;

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();
	setInterval(
		function(){
			render(context);
			update();
		}
		,
		50
	);
}

function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	//时钟
	var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
	return ret;

	//倒计时
	// var ret = endTime.getTime() - curTime.getTime();
	// ret = Math.round(ret/1000);

	// return ret >= 0 ? ret : 0;
}

function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	

	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds % 60;

	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60);
	var curSeconds = curShowTimeSeconds % 60;

	if(nextSeconds != curSeconds){
		if(parseInt(curHours/10) != parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours/10));
		}
		if(parseInt(curHours%10) != parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10));
		}

		if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));
		}

		if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));
		}

		curShowTimeSeconds = nextShowTimeSeconds;
	}
	//对现在已经存在的小球状态进行更新
	updateBalls();
	console.log(balls.length);
}

function updateBalls(){
	for(var i = 0; i < balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy +=balls[i].g;

		if(balls[i].y >= WINDOW_HEIGHT - RADIUS){
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}

	var cnt = 0;
	for(var i = 0; i < balls.length; i++)
		if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
			balls[cnt ++] = balls[i];
		}

		while(balls.length > Math.min(300, cnt)){
			balls.pop();
		}
}

function addBalls(x, y, num){
	for(var i = 0; i < digit[num].length; i++)
		for(var j = 0; j < digit[num][i].length; j++)
			if(digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push( aBall );
		}
}

function render(cxt){

	cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
	//gettime
	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
	var seconds = curShowTimeSeconds % 60;

	//时第一位
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10), cxt);
	//时第二位
	renderDigit(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10), cxt);
	//：
	renderDigit(MARGIN_LEFT + 30*(RADIUS+1),MARGIN_TOP, 10, cxt);
	//分第一位
	renderDigit(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP, parseInt(minutes/10), cxt);
	//分第二位
	renderDigit(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP, parseInt(minutes%10), cxt);
	//：
	renderDigit(MARGIN_LEFT + 69*(RADIUS+1),MARGIN_TOP, 10, cxt);
	//秒第一位
	renderDigit(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP, parseInt(seconds/10), cxt);
	renderDigit(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP, parseInt(seconds%10), cxt);

	for(var i = 0; i < balls.length; i++){

		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
		cxt.closePath();

		cxt.fill();
		}
}

function renderDigit(x, y, num, cxt){
	//填充颜色
	cxt.fillStyle = "rgb(0,102,153)";

	for(var i = 0; i < digit[num].length; i++)
		for(var j = 0; j < digit[num][i].length; j++)
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				//画圆
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
}
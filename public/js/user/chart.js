function genChart(canvas, dataset){

	const c = canvas.getContext('2d');

	var cWidth = eWallet.find("main", 1).offsetWidth - 20,
		cHeight = innerHeight / 2;

	// cWidth = eWallet.find('main', 1).offsetWidth / 2;

	canvas.width = `${cWidth}`;
	canvas.height = `${cHeight}`;

	dataset.length = dataset.values.length;
	dataset.max = Math.max(...dataset.values);

	if (dataset.max === 0) {
		c.font = "20px sans-serif";
		c.fillStyle = "#e74c3c";
		c.textAlign = "center";
		c.fillText('No existen datos en el período especificado', cWidth / 2, cHeight / 2);
		return;
	}
	
	const colors = [
	    '#2185C5',
	    '#7ECEFD',
	    '#FF7F66',//
	    "#30426D", 
	    "#C03665", 
	    "#202636", 
	    "#B7A167", 
	    "#CECECC", 
	    "#B93269",
	    "#6394B5",
	    "#323F56",
	    "#384658",
	    "#72344F",
	    "#BE447A",
	    "#BE6A8F",
	    "#31BE36",
	    "#347236",
	    "#424BF5",
	    "#AFAEF0",
	    "#BE3162",
	    "#5931C2",
	    "#4A9CC1",
	    "#64D8F0",
	    "#6EEDF4",
	    "#2E112D",
	    "#540032",
	    "#820333",
	    "#C9283E",
	    "#F0433A",
	];

	let strokeWidth = 5;
	let maxHeigth = cHeight * .8;
	let cant = dataset.length, barWidth = (cWidth / (cant + 2)) - strokeWidth * 2,
		fixedColours = [], coloursFlag = true;

	while(coloursFlag){
		for (var i = 0; i < cant; i++) {
			fixedColours[i] = randomColor(colors);
		}

		fixedColours = fixedColours.filter(function(item, pos, self) {
		    return self.indexOf(item) == pos;
		})

		coloursFlag = fixedColours.length === 1;
	}

	addEventListener('resize', function() {
		cWidth = eWallet.find("main", 1).offsetWidth;
		cHeight = innerHeight / 2;
		maxHeigth = cHeight * .8;
		barWidth = (cWidth / (cant + 2)) - strokeWidth * 2;
		canvas.width = cWidth;	
		canvas.height = cHeight;

		init();
	});

	function randomIntFromRange(min,max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function randomColor(colors) {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	function distance(x1, y1, x2, y2) {
	    const xDist = x2 - x1;
	    const yDist = y2 - y1;

	    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
	}

	function hexToRgbA(hex, op){
	    var color;
	    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
	        color= hex.substring(1).split('');
	        if(color.length== 3){
	            color= [color[0], color[0], color[1], color[1], color[2], color[2]];
	        }
	        color= '0x'+color.join('');
	        return 'rgba('+[(color>>16)&255, (color>>8)&255, color&255].join(',')+',' + op + ')';
	    }
	    throw new Error('Bad Hex');
	}

	function Bar(x, y, color, per, title, sub) {
		this.x = x;
		this.y = y;
		this.dy = 1;
		this.topY = -maxHeigth;
		this.per = per;
		this.color = color;
		this.sub = sub;
		this.title = title;

		this.update = function() {
			// let aux = true, abAux = true;

			// if(this.topY + this.dy < 0 && this.topY + this.dy >= -cHeight && abAux) {
			// 	this.dy = aux ? this.dy : -this.dy;
			// }else if(this.topY + this.dy > 0 && abAux) {
			// 	aux = false;
			// 	this.dy = -this.dy;
			// }else if(this.topY <= -cHeight * 0.99){
			// 	// this.topY = -cHeight * .8;
			// 	this.dy = 0;
			// 	if (!abAux) {
			// 		if (this.dy > 0 && this.topY >= -cHeight * 0.8) {
			// 			this.dy = 0;
			// 		}
			// 		this.dy = 1;
			// 	}else{
			// 		abAux = false;
			// 	}
			// }

			// this.topY += this.dy;
			// this.dy += this.dy !== 0 && abAux ? 0.5 : abAux ? 1 : this.dy;
			this.draw();
		};

		this.draw = function() {
			c.font = "18px sans-serif";
			c.fillStyle = this.color;
			c.textAlign = "center";
			c.fillText(this.title, this.x + (barWidth / 2), this.y + (this.topY * this.per) - 10); 
			c.font = "italic 12px sans-serif";
			c.fillStyle = this.color;
			c.textAlign = "center";
			c.fillText(this.sub, this.x + (barWidth / 2), this.y + (this.topY * this.per) - 25); 
			c.beginPath();
			c.rect(this.x, this.y, barWidth, this.topY * this.per);	
			c.fillStyle = hexToRgbA(this.color, 0.5);
			c.lineWidth = strokeWidth;
			c.strokeStyle = this.color;
			c.stroke();
			c.fill();
			c.closePath();
		};
	}

	let bars;
	function init() {
		let auxX = barWidth;
		bars = [];
		for (let i = 0; i < cant; i++) {
			bars[i] = new Bar(auxX, cHeight, fixedColours[i], (dataset.values[i] / dataset.max), dataset.titles[i], dataset.subs[i]);
			auxX += barWidth + strokeWidth * 2;
		}
		animate();
	}

	function animate() {
		// requestAnimationFrame(animate);
		c.clearRect(0, 0, canvas.width, canvas.height);

		bars.forEach(bar => {
			bar.update();
		});
	}

	init();
	// animate();
}
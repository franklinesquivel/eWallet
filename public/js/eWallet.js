/*!
  * eWallet App v1
  *
  * Authors: [Frank Esquivel, Leo López]
  *
  * Realeased under the MIT License
  * Repo: https://github.com/franklinesquivel/eWallet/
*/
(function(window){
	if (window.eWallet === undefined || typeof window.eWallet !== "object") {
		window.eWallet = {};

		//Soporte de LocalStorage
		eWallet.dataFlag = !(typeof Storage === undefined);

	}
})(window);

class Slider {
	constructor(element, btns, time) {
		this.element = element;
		this.btns = btns;
		this.time = time;
		this.cFlag = true;
		this.counter = 1;

		this.slide = this.slide.bind(this);
		this.rmvClass = this.rmvClass.bind(this);
		this.slideHandler = this.slideHandler.bind(this);
		this.init = this.init.bind(this);
	}

	slide(x){
		this.element.style.transform = "translateX(-" + ( x * (100 / this.btns.length) ) + "%)";
	}

	rmvClass(x){
		for (var j = 0; j < this.btns.length; j++) {
            this.btns[j].classList.remove("selected");
        }
        this.btns[x].classList.add("selected");
	}

	slideHandler(){
		this.cFlag = this.counter == 0 ? true : this.counter == (this.btns.length - 1) ? false : this.cFlag;
        this.slide(this.counter);
        this.rmvClass(this.counter);
        this.counter += this.cFlag ? 1 : -1;
	}

	init(){
		this.interval = setInterval(this.slideHandler, this.time);
	}
}

class Modal {
	constructor(element) {
		this.element = element;
		this.back = eWallet.find('#_background', 1);
	}

	open(){
		console.log('o');
		if (this.back === null) {
			eWallet.genPopOutBackground();
			this.back = eWallet.find('#_background', 1);
		}

		this.back.classList.add('active');
		this.element.classList.add('open');
	}

	close(){
		console.log('c');
		this.back.classList.remove('active');
		this.element.classList.remove('open');
	}
}

eWallet.updateTextFields = () => {
	const input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=date], input[type=search], textarea'.split(',');
	input_selector.forEach(i => {
		eWallet.find(i).forEach(j => {
			if (j.length !== 0) {
				let jLabel = j.nextElementSibling === undefined || j.nextElementSibling === null ? j.previousElementSibling : j.nextElementSibling;
				if (j.value.length !== 0 || j.getAttribute('placeholder') !== null) {
					jLabel.classList.add("active");
				}
			}
		})
	});
}

eWallet.on = function(el, evt, sel, handler) {
	el.addEventListener(evt, function(event) {
		var t = event.target;
		while (t && t !== this) {
			if (t.matches(sel)) {
				handler.call(t, event);
			}
			t = t.parentNode;
		}
	});
}

eWallet.delegate = function(criteria, listener){
	return function(e) {
		var el = e.target;
		do {
			if (!criteria(el)) continue;
			e.delegateTarget = el;
			listener.apply(this, arguments);
			return;
		} while( (el = el.parentNode) );
	};
}

eWallet.create = function(tag, content = null, dataset = null){
	let element = document.createElement(tag);

	if (dataset !== null && typeof dataset === "object") {
		try{
			for(attr in dataset){
				element.setAttribute(attr, dataset[attr]);
			}
		}catch(err){
			console.error("eWallet Error: Parámetros inválidos para la creación del elemento");
		}
	}

	if (content !== null) {
		let elementPattern = /^<.+>.*<\/.+>$/i;

		if (eWallet.isElement(content)) {
			element.appendChild(content);
		}else{
			element.innerHTML = content;
		}
	}

	return element;
};

eWallet.isElement = function(obj){
	try{
		return (obj.constructor.__proto__.prototype.constructor.name) ? true : false;
	}catch(e){
		return false;
	}
};

eWallet.find = function(selector, index = false){
	if (selector === undefined || selector === null || typeof selector !== "string" || selector.length <= 0) {
		console.error("eWallet Error: Ingrese un selector válido");
	}else{
		try{
			let elCollection = document.querySelectorAll(selector);
			// return (elCollection.length == 1 ? elCollection[0] : elCollection);
			return index !== false ? elCollection[index - 1] : elCollection;
		}catch(ex){
			console.error("eWallet Error: El elemento no existe");
		}
	}
};

eWallet.register = function(dataset, handler = null){
	if (typeof dataset !== "object" || !eWallet.dataFlag) return false;
	if(typeof handler !== null && typeof handler !== "function")
		console.error("");
	localStorage.setItem(dataset.email, JSON.stringify(dataset));
};

eWallet.login = function(credentials){
	if (typeof credentials !== "object" || !eWallet.dataFlag) return false;
	let loginData = localStorage.getItem(credentials.email);
	if (loginData) {
		
	}else{
		return false;
	}
};

eWallet.slider = function(selector){
	const elements = document.querySelectorAll(selector);
	// console.log(elements);
	if (elements.length > 0) {
		elements.forEach(element => {
			if (!element instanceof HTMLDivElement){
				console.error("eWallet Error: El elemento no es válido para instanciar un slider!");
				return;
			}else if(element.children.length == 0){
				console.error("eWallet Error: El slider que se quiere instanciar no posee imágenes para mostrar!");
				return;
			}else{
				eWallet.newSlider(element);
			}
		})
	}
};

eWallet.newSlider = function(element, time = 3000){
	let slides = element.children,
		btn_cont = eWallet.create('div', eWallet.create('ul', '', {class: 'btns_list'}), {class: 'btns'}),
		btns_element = [];

	element.style.width = (element.childElementCount * 100) + "%";

	for (var i = 0; i < slides.length; i++) {
		element.children[i].style.width = (100 / element.childElementCount) + "%";
		btns_element.push(eWallet.create('li', '', {class: 'btns_item'}))
		btn_cont.firstElementChild.eWallet.append(btns_element[i]);
	}

	element.parentNode.eWallet.append(btn_cont);
	const SliderObj = new Slider(element, btns_element, time);
	SliderObj.init();
	btns_element.forEach((btn, i) => {
		btn.addEventListener('click', function(){
			SliderObj.rmvClass(i);
			SliderObj.slide(i);
			SliderObj.counter = i;
		})
		i == 0 ? btn.classList.add('selected') : "";
	})
};

eWallet.genPopOutBackground = function(){
	let background = eWallet.create('div', '', {id: '_background'});
	eWallet.find('body', 1).eWallet.append(background);
}

eWallet.modal = function(selector){
	let element = eWallet.find(selector);
	
	if (element.length > 1){
		console.error('eWallet Error: Se quiere instaciar más de un elemento como modal, favor hacerlo individual');
		return;
	}

	element = element[0];
	const _id = element.getAttribute('id'),
		trigger = _id !== null ? eWallet.find(`.modal-trigger[modal=${_id}]`, 1) : null;

	if (eWallet.find('#_background').length == 0) eWallet.genPopOutBackground();

	if (!element instanceof HTMLDivElement) {
		console.error('eWallet Error: El parámetro no es un elemento válido para instaciar un modal!');
		return;
	}

	!element.classList.contains('modal') ? element.classList.add('modal') : "";

	const ModalObj = new Modal(element);
	if (_id !== null && trigger !== undefined)
		trigger.addEventListener('click', function(){ModalObj.open()});

	window.addEventListener('keydown', function(e){
	    if ( e.keyCode == 27 && ModalObj.element.classList.contains('open')) {
	        ModalObj.close();
	    }
	})

	return ModalObj;
};

(function(){
	//----------------------------------------------------------------------------------//
	//																					//
	//						**** eWallet DOM Methods ****								//
	//																					//			
	//	 					- Version: 1.1												//
	//	 					- author: Franklin Esquivel									//
	//																					//
	//----------------------------------------------------------------------------------//
	const CustomForm = function(element) {
		this.element = element;
	};

	const CustomInput = function(element){
		this.element = element;
	};

	const CustomElement = function(element){
		this.element = element;
	};

	const eWallet_Methods = function(element){
		this.element = element;
	};

	eWallet_Methods.prototype.validate = function(dataset) {
		if (!this.element instanceof HTMLFormElement) return false; 
		if (typeof dataset === "object") {
			if (dataset.rules !== undefined && typeof dataset.rules === "object") {
				let f = 0, options = dataset.rules;
				for(el in options){
					if (this.element[el] !== undefined) {
						for(rule in options[el]){
							let msg = options[el][rule].msg,
								pattern = msg !== undefined ? options[el][rule].value : undefined,
								condition;

							switch(rule){
								case "required":
									condition = parseInt(this.element[el].value.trim().length) === 0;
									break;
								case "pattern":
									condition = !pattern.test(this.element[el].value);
									break;
							}
							condition ? f++ : "";
							this.element[el].eWallet.validateInput(condition, msg);
						}
					}else{
						console.warn(`eValidate Warning: El elemento ${el} no existe en el DOM!`);
					}
				}

				if (dataset.success !== undefined && typeof dataset.success === "function")  {
					f == 0 ? dataset.success() : "";
				}else if((dataset.invalid !== undefined && typeof dataset.invalid === "function")){
					f == 0 ? "" : dataset.invalid();
				}else{
					return f == 0;
				}
			}else{
				console.error("eValidate Error: El parámetro no posee un atributo 'Rules'!");
			}
		}else{
			console.error(`eValidate Error: Parámetro inválido!`);
		}
	}

	eWallet_Methods.prototype.validateInput = function(toogle, msg = undefined){
		if (!this.element instanceof HTMLInputElement) return false;
		toogle ? this.element.classList.add('invalid') : this.element.classList.remove('invalid');
		// !toogle ? this.element.classList.add('valid') : this.element.classList.remove('valid');
		msg !== undefined && toogle ? this.insertMsg(msg) : "";
	}

	eWallet_Methods.prototype.insertMsg = function(msg, toogle = 1){
		if (!this.element instanceof HTMLInputElement) return false;
		if (this.element.nextElementSibling === null) {
			this.element.parentNode.appendChild(eWallet.create('div', msg, {
				class: `msg ${toogle ? 'error' : 'success'}`,
				id: `${this.element.getAttribute('name')}-${toogle ? 'error' : 'success'}`
			}))
		}
	}

	eWallet_Methods.prototype.prepend = function(content){
		if (this.element instanceof Element) {
			let elementPattern = /^<.+>.*<\/.+>$/i;

			if (this.element.children[0]) {
				if(eWallet.isElement(content)){
					let auxContent = this.element.innerHTML;
					this.element.innerHTML = "";
					this.element.append(content);
					this.element.innerHTML += auxContent;
				}else if(elementPattern.test(content)){
					let auxContent = this.element.innerHTML;
					this.element.innerHTML = content + auxContent;
				}else{
					content = eWallet.isElement(content) ? content : document.createTextNode(content);
					this.element.insertBefore(content, this.element.children[0]);
				}
			}else{
				eWallet.isElement(content) ? this.element.appendChild(content) : this.element.innerHTML = content;
			}
		}
	}

	eWallet_Methods.prototype.append = function(content){
		if (this.element instanceof Element) {
			let elementPattern = /^<.+>.*<\/.+>$/i;

			if (!eWallet.isElement(content) || typeof content === "string") {
				content = !elementPattern.test(content) ? document.createTextNode(content) : content;

				elementPattern.test(content) ? this.element.innerHTML += content :  this.element.appendChild(content);
			}else if(eWallet.isElement(content)){
				this.element.appendChild(content);
			}
		}
	}

	// Object.defineProperty(HTMLFormElement.prototype, "eWallet", {
	// 	get: function () {
	// 		Object.defineProperty(this, "eWallet", {
	// 			value: new eWallet_Methods(this)
	// 		});
			
	// 		return this.eWallet;
	// 	},
	// 	configurable: true,
	// 	writeable: false
	// });

	// Object.defineProperty(HTMLInputElement.prototype, "eWallet", {
	// 	get: function () {
	// 		Object.defineProperty(this, "eWallet", {
	// 			value: new eWallet_Methods(this)
	// 		});
			
	// 		return this.eWallet;
	// 	},
	// 	configurable: true,
	// 	writeable: false
	// });

	Object.defineProperty(Element.prototype, "eWallet", {
		get: function () {
			Object.defineProperty(this, "eWallet", {
				value: new eWallet_Methods(this)
			});
			
			return this.eWallet;
		},
		configurable: true,
		writeable: false
	});
	//							END eWallet DOM Methods									//
	//----------------------------------------------------------------------------------//
	

	//----------------------------------------------------------------------------------//
	//																					//
	//								Material Inputs Plugin								//
	//																					//
	//----------------------------------------------------------------------------------//
	const input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=date], input[type=search], textarea'.split(',');
	document.addEventListener('DOMContentLoaded', () => {
		input_selector.forEach(i => {
			let jLabel;
			eWallet.find(i).forEach(j => {
				if (j.length !== 0) {
					eWallet.on(document, 'focusin', j.tagName, function(e){
						let input = e.target, label = input.nextElementSibling;
						label = label === null || label instanceof HTMLLabelElement ? input.previousElementSibling : label;
						label.classList.add("active");
					})

					eWallet.on(document, 'focusout', j.tagName, function(e){
						let input = e.target, label = input.nextElementSibling;
						label = label === null || label instanceof HTMLLabelElement ? input.previousElementSibling : label;
						if (input.value.length === 0 && input.getAttribute('placeholder') === null) {
							label.classList.remove("active");
						}
					})
				}
			})
		});

		eWallet.updateTextFields();
		eWallet.slider('.slider');
	})
	//							END Material Inputs Plugin								//
	//----------------------------------------------------------------------------------//
})();
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

//----------------------------------------------------------------------------------//
//																					//
//						**** eWallet Encryptation ****								//
//																					//			
//	 					- Version: 1.1												//
//	 					- author: Leo López											//
//	 					- adaptation: Frank Esquivel								//
//																					//
//----------------------------------------------------------------------------------//

class EncryptDecrypt {
	constructor(){
		this.numbers = ["e", "l", "a", "y", "A", "L", "F", "R","o", "p"];
		this.letters = ["a", "b", "c", "d","e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","A", "B", "C", "D","E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
		this.space = ["-", "*", "/", "!", "?"];

		this.VerifyNumber = this.VerifyNumber.bind(this);
		this.VerifyLetter = this.VerifyLetter.bind(this);
		this.VerifySpace = this.VerifySpace.bind(this);
		this.Encrypt = this.Encrypt.bind(this);
		this.Decrypt = this.Decrypt.bind(this);
	}

	VerifyNumber(char){
	    for (let i = 0; i < this.numbers.length; i++) {
	        if (char == i) {
	            return this.numbers[i];
	        }
	    }
	    return -1;
	}
	VerifyLetter(char){
	    for (let i = 0; i < this.letters.length; i++) {
	        if (char == this.letters[i]) {
	            return i;
	        }
	    }
	    return -1;
	}

	VerifySpace(char){
	    for (let i = 0; i < this.space.length; i++) {
	        if (char == this.space[i]) {
	            return true;
	        }
	    }
	    return false;
	}

	Encrypt(pass){
        let encrypted = "";

        for (let i=0; i < pass.length; i++) {
        	let AscciCaracter, lengthCaracter, verifyNumber, verifyLetter, randSpace;

            AscciCaracter = pass[i].charCodeAt(0);
            lengthCaracter = (pass[i].charCodeAt(0).toString()).length;
            verifyNumber = this.VerifyNumber(pass[i]);
            verifyLetter = this.VerifyLetter(pass[i]);
            randSpace = Math.floor((Math.random() * 4) + 0);
            if (verifyNumber != -1) {
            	encrypted += `${AscciCaracter}${verifyNumber}${lengthCaracter}${this.space[randSpace]}`
            }else if(verifyLetter != -1){
                encrypted += `${AscciCaracter}${verifyLetter}${lengthCaracter}${this.space[randSpace]}`;
            }else{
                encrypted += `${AscciCaracter}${lengthCaracter}${this.space[randSpace]}`;
            }
        }

        return encrypted;
    }

    Decrypt(pass){
        let decrypted = "", word = "";

        for (let i = 0; i < pass.length; i++) {

            if (this.VerifySpace(pass[i])) {
            	let lengthWord, AscciCaracter;
                lengthWord = word.substr(-1);
                AscciCaracter = word.substr(0, lengthWord);
                decrypted += String.fromCharCode(AscciCaracter);
                word = "";
            }else{
                word += pass[i];
            }
        }

        return decrypted;
    }
}

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

eWallet.encryptation = new EncryptDecrypt();

class Modal {
	constructor(element) {
		this.element = element;
		this.back = eWallet.find('#_background', 1);
	}

	open(callback = null){
		if (this.back === null) {
			eWallet.genPopOutBackground();
			this.back = eWallet.find('#_background', 1);
		}

		this.back.eWallet.fadeIn(2);
		this.element.eWallet.fadeIn();
		this.element.classList.add('open');
		typeof callback === "function" ? callback() : "";
	}

	close(callback = null){
		this.back.eWallet.fadeOut(2);
		this.element.classList.remove('open');
		typeof callback === "function" ? callback() : "";
	}
}

class Menu {
	constructor(element) {
		this.element = element;
		this.back = eWallet.find('#_background', 1);
	}

	open(callback = null){
		if (this.back === null) {
			eWallet.genPopOutBackground();
			this.back = eWallet.find('#_background', 1);
		}

		this.back.eWallet.fadeIn(2);
		this.element.classList.add('active');
		typeof callback === "function" ? callback() : "";
	}

	close(callback = null){
		this.back.eWallet.fadeOut(2);
		this.element.classList.remove('active');
		typeof callback === "function" ? callback() : "";
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

eWallet.destroy = function(selector){
	if (typeof selector !== "string" && !eWallet.isElement(selector)) return;

	if (typeof selector === "string") {
		let elements = eWallet.find(selector);

		if (elements.length > 0) {
			for (var i = 0; i < elements.length; i++) {
				elements[i].parentNode.removeChild(elements[i]);
			}
		}
	}else{
		selector.parentNode.removeChild(selector);
	}
};

eWallet.toast = function(msg, time = 2, style = 'grey darken-3'){
	if (typeof msg !== "string") return;
	var toast = eWallet.create('div', msg, {class: "toast"});

	if (style.split(' ').length > 1) {
		let cls = style.split(' ');
		cls.forEach(c => toast.classList.add(c));
	}else if (style.trim() !== ""){
		toast.classList.add(style);
	}
	
	toast.style.animation = `toast-animation ${time}s ease-in`;
	document.querySelector('body').appendChild(toast);

	setTimeout(function(){
		eWallet.destroy(toast);
	}, ((time * 1000) + 500));
};

eWallet.register = function(dataset, handler = null){
	if (typeof dataset !== "object" || !eWallet.dataFlag) return false;
	if(typeof handler !== null && typeof handler !== "function"){
		console.error("eWallet Error: Parámetro inválido en el registro de usuario!");
		return;
	}
	
	handler(true);
	localStorage.setItem(dataset.email, eWallet.encryptation.Encrypt(JSON.stringify(dataset)));
};

eWallet.getLocalData = function(key){
	if (typeof key !== "string" || !eWallet.dataFlag) return false;
	if (localStorage.length > 0){
		return localStorage.getItem(key) !== null ? localStorage.getItem(key) : false;
	}
}

eWallet.getSessionData = function(key){
	if (typeof key !== "string" || !eWallet.dataFlag) return false;
	if (sessionStorage.length > 0){
		return sessionStorage.getItem(key) !== null ? sessionStorage.getItem(key) : false;
	}
}

eWallet.logIn = function(credentials, handler){
	let data = eWallet.getLocalData(credentials.email);
	if ( data !== false) {
		let loginData = JSON.parse(eWallet.encryptation.Decrypt(data));
		if (loginData.email == credentials.email && loginData.password == credentials.password) {
			sessionStorage.setItem(credentials.email, true);
			window.eWallet.user = credentials.email;
			handler(true, loginData);
		}else{
			handler(false);
		}
	}else{
		handler(false);
	}
};

eWallet.logOut = function(credentials, handler = null){
	let data = eWallet.getSessionData(credentials.email);
	if (data !== false) {
		sessionStorage.clear();
		typeof handler === "function" ? handler(true): "";
	}else{
		typeof handler === "function" ? handler(false): "";
	}
}

eWallet.checkSession = function(user = null, keyFlag = false){
	let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	if (user === null) {
		for(i in sessionStorage){
			if (emailPattern.test(i) && sessionStorage[i] === "true") {
				return !keyFlag ? true : i;
			}
		}
		eWallet.UserData = undefined;
		return false;
	}else if(typeof user === "string"){
		return emailPattern.test(user) && sessionStorage[user] === "true";
	}
}

eWallet.sessionLocation = function(sessionFlag = false){
	let actualEnvironment = location.protocol === "file:" && location.host === "" ? "local" : "server",
		appRoot = actualEnvironment === "server" ? '/' : 'index.html',
		userDir = actualEnvironment === "server" ? '/user' : 'user/index.html';

	let localAppRootFlag = true, actualHref = location.href.split('/');

	localAppRootFlag = actualHref[actualHref.length - 1] === "index.html" && actualHref[actualHref.length - 2] === "public";

	if (!sessionFlag && !(actualEnvironment === "server" ? location.pathname === appRoot : localAppRootFlag)) {
		let locationAux = location.href.split('/'), newLocation = "";

		for (var i = 0; i < locationAux.length; i++) {
			if (locationAux[i] !== "eWallet") newLocation += `${locationAux[i]}/`; else break;
		}

		newLocation += `eWallet/public/${appRoot}`;
		location.href = actualEnvironment === "server" ? appRoot : newLocation;
	}else if (actualEnvironment === "server" && location.pathname === appRoot) {
		if (sessionFlag) location.href = `${location}/${userDir}`;
	}else if(actualEnvironment === "local" && localAppRootFlag){
		let hrefAux = location.href.split('/');
		hrefAux[hrefAux.length - 1] = userDir;
		if (sessionFlag) location.href = hrefAux.join('/');
	}
}

eWallet.setSessionData = function(){
	if (eWallet.checkSession()) {
		let actualEnvironment = location.protocol === "file:" && location.host === "" ? "local" : "server",
		appRoot = actualEnvironment === "server" ? '/' : 'index.html',
		userDir = actualEnvironment === "server" ? '/user' : 'user/index.html';

		if ((actualEnvironment === "server" && location.pathname === appRoot) || (actualEnvironment === "local" && location.href.search("/eWallet/public/index.html") !== -1)) {
			eWallet.UserData = undefined;
		}else{
			eWallet.UserData = JSON.parse(eWallet.encryptation.Decrypt(eWallet.getLocalData(eWallet.checkSession(null, true))));
		}
	}
}

eWallet.updateUserData = function(previousId, dataset){
	if (eWallet.checkSession(previousId)) {
		localStorage.setItem(dataset.email, eWallet.encryptation.Encrypt(JSON.stringify(dataset)));
		
		if (previousId !== dataset.email) {
			let auxData;

			for(i in sessionStorage){
				auxData[i] = sessionStorage[i];
			}

			sessionStorage.clear;

			for(i in auxData){
				sessionStorage.setItem(i, auxData[i]);
			}
		}
	}
}

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
		triggers = _id !== null ? eWallet.find(`.modal-trigger[modal=${_id}]`) : null;

	if (eWallet.find('#_background').length == 0) eWallet.genPopOutBackground();

	if (!element instanceof HTMLDivElement) {
		console.error('eWallet Error: El parámetro no es un elemento válido para instaciar un modal!');
		return;
	}

	!element.classList.contains('modal') ? element.classList.add('modal') : "";

	const ModalObj = new Modal(element);
	if (_id !== null && triggers.length !== 0){
		triggers.forEach(trigger => trigger.addEventListener('click', function(){ModalObj.open()}));
	}

	window.addEventListener('keydown', function(e){
	    if ( e.keyCode == 27 && ModalObj.element.classList.contains('open')) {
	        ModalObj.close();
	    }
	})

	eWallet.find("#_background", 1).addEventListener('click', function(e){
		if (e.target === eWallet.find("#_background", 1) && ModalObj.element.classList.contains('open')) {
	        ModalObj.close();
		}
	})

	return ModalObj;
};

eWallet.menu = function(selector){
	let element = eWallet.find(selector);
	
	if (element.length > 1){
		console.error('eWallet Error: Se quiere instaciar más de un elemento como menu, favor hacerlo individual');
		return;
	}

	element = element[0];
	const _id = element.getAttribute('id'),
		triggers = _id !== null ? eWallet.find(`.menu-trigger[menu=${_id}]`) : null;

	if (eWallet.find('#_background').length == 0) eWallet.genPopOutBackground();

	if (!element instanceof HTMLDivElement) {
		console.error('eWallet Error: El parámetro no es un elemento válido para instaciar un menu!');
		return;
	}
	
	const MenuObj = new Menu(element);
	if (_id !== null && triggers.length !== 0){
		triggers.forEach(trigger => trigger.addEventListener('click', function(){MenuObj.open()}));
	}

	window.addEventListener('keydown', function(e){
	    if ( e.keyCode == 27 && MenuObj.element.classList.contains('active')) {
	        MenuObj.close();
	    }
	})

	eWallet.find("#_background", 1).addEventListener('click', function(e){
		if (e.target === eWallet.find("#_background", 1) && MenuObj.element.classList.contains('active')) {
	        MenuObj.close();
		}
	})

	return MenuObj;		
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

	eWallet_Methods.prototype.validate = function(dataset, handler = null) {
		if (!this.element instanceof HTMLFormElement) return false; 
		if (typeof dataset === "object") {
			let f = 0, options = dataset;
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
							// case "condition":
							// 	condition = ;
						}
						condition ? f++ : "";
						this.element[el].eWallet.validateInput(condition, msg);
					}
				}else{
					console.warn(`eValidate Warning: El elemento ${el} no existe en el DOM!`);
				}
			}

			if (handler !== null && typeof handler === "function")  {
				handler(f == 0)
			}
		}else{
			console.error(`eValidate Error: Parámetro inválido!`);
		}
	};

	eWallet_Methods.prototype.validateInput = function(toogle, msg = undefined){
		if (!this.element instanceof HTMLInputElement || !this.element instanceof HTMLSelectElement) return false;
		toogle ? this.element.classList.add('invalid') : this.element.classList.remove('invalid');
		// !toogle ? this.element.classList.add('valid') : this.element.classList.remove('valid');
		msg !== undefined && toogle ? this.insertMsg(msg) : "";
	};

	eWallet_Methods.prototype.insertMsg = function(msg, toogle = 1){
		if (!this.element instanceof HTMLInputElement || !this.element instanceof HTMLSelectElement) return false;
		if (this.element.nextElementSibling === null) {
			this.element.parentNode.appendChild(eWallet.create('div', msg, {
				class: `msg ${toogle ? 'error' : 'success'}`,
				id: `${this.element.getAttribute('name')}-${toogle ? 'error' : 'success'}`
			}))
		}
	};

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
	};

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
	};

	eWallet_Methods.prototype.fadeIn = function(time = 1){
		if (this.element instanceof Element) {
			let el = this.element, op = 0.1, timer;

			el.style.display = 'block';
			timer = setInterval(function(){
				if (op >= 1) {
					clearInterval(timer);
				}
				el.style.opacity = op;
				el.style.filter = `alpha(opacity=${op * 100})`;
				op += op * 0.1;
			}, time);
		}
	};

	eWallet_Methods.prototype.fadeOut = function(time = 1){
		if (this.element instanceof Element) {
			let el = this.element, op = 1, timer;

			timer = setInterval(function(){
				if (op <= 0.1) {
					clearInterval(timer);
					el.style.display = 'none';
				}
				el.style.opacity = op;
				el.style.filter = `alpha(opacity=${op * 100})`;
				op -= op * 0.1;
			}, time);
		}
	};

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
		if(eWallet.checkSession()){
			eWallet.setSessionData();
			eWallet.UserData === undefined ? eWallet.toast('Ya existe una sesión activa.<br><center>REDIRIGIENDO!</center>', 2, 'yellow darken-3') : "";
			setTimeout(function(){
				eWallet.sessionLocation(true);
			}, 2300)
		}else{
			eWallet.sessionLocation(false);
		}

		input_selector.forEach(i => {
			let jLabel;
			eWallet.find(i).forEach(j => {
				if (j.length !== 0) {
					eWallet.on(document, 'focusin', j.tagName, function(e){
						let input = e.target, label = input.previousElementSibling;
						// label = label !== null || !label instanceof HTMLLabelElement ? label : input.previousElementSibling;
						label.classList.add("active");
					})

					eWallet.on(document, 'focusout', j.tagName, function(e){
						let input = e.target, label = input.previousElementSibling;
						// label = label === null || label instanceof HTMLLabelElement ? input.previousElementSibling : label;
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

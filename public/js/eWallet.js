/*!
  * eWallet App v3.0
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

		//Directorio general del proyecto
		eWallet.dir = 'public';

		//Razones de pago para GASTOS
		eWallet.reasons = "Pago de celular|Pago de luz eléctrica|Pago de agua|Pago de casa/alquiler|Pago de cable|Pago de internet|Pago de educación|Supermercado|Cine|Discoteca|Teatro|Ropa|Restaurante|Tecnología|Mascota|Gasolina|Reparaciones";
	}
})(window);

//Clase general para el elemento de SLIDER
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

//Clase para el elemento de la ventana MODAL
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
		this.element.classList.remove('closed');
		this.element.classList.add('open');
		typeof callback === "function" ? callback() : "";
	}

	close(callback = null){
		this.back.eWallet.fadeOut(2);
		this.element.classList.remove('open');
		this.element.classList.add('closed');
		typeof callback === "function" ? callback() : "";
	}
}

//Clase para el elemento del MENÚ en las distintas vistas del usuario.
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
			let jLabel = j.nextElementSibling === undefined || j.nextElementSibling === null ? j.previousElementSibling : j.nextElementSibling;
			if (i === input_selector[6]) {
				jLabel.classList.add("active");
			}else{
				if (j.length !== 0) {
					if (j.value.trim().length !== 0 || j.getAttribute('placeholder') !== null) {
						jLabel.classList.add("active");
					}else{
						jLabel.classList.remove("active");
					}
				}
			}
		})
	});
};

eWallet.setPayment = function(select, radios){
	let accounts = eWallet.UserData.accounts.map(i => i),
		creditCards = eWallet.UserData.creditCards.map(i => i);

	radios.value = eWallet.UserData.defaultPayment.type;

	if (eWallet.UserData.defaultPayment.type === "Cuenta de Ahorros") {
		select.removeAttribute('disabled');
		if (accounts.length > 0) {
			accounts.forEach((el, i) => select.eWallet.append(`<option value="${i}">${el.bank} [${el.accountNumber}]</option>`));
		}
	}else if(eWallet.UserData.defaultPayment.type === "Tarjeta de Crédito") {
		select.removeAttribute('disabled');
		if (creditCards.length > 0) {
			creditCards.forEach((el, i) => select.eWallet.append(`<option value="${i}">${el.bank} [${el.cardNumber}]</option>`));
		}
	}else if(eWallet.UserData.defaultPayment.type === "Efectivo") {
		select.setAttribute('disabled', true);
		select.innerHTML = `<option value="none" disabled selected>Seleccione una opción</option>`;
	}

	select.selectedIndex = eWallet.UserData.defaultPayment.relation + 1;
}

eWallet.defaultPayment = function(select, radios){
	let accounts = eWallet.UserData.accounts.map(i => i),
		creditCards = eWallet.UserData.creditCards.map(i => i),
		radioFlag = radios.value === "";
	select.innerHTML = "<option disabled selected value='none'>Seleccione una opción</option>";
	if ((radios.value !== "" && radios.value === "Cuenta de Ahorros") || (radioFlag && eWallet.UserData.defaultPayment.type === "Cuenta de Ahorros")) {
		radios[1].setAttribute('checked', true);
		select.removeAttribute('disabled');
		if (accounts.length > 0) {
			accounts.forEach((el, i) => select.eWallet.append(`<option value="${i}">${el.bank} [${el.accountNumber}]</option>`));
			select.value = eWallet.UserData.defaultPayment.relation !== null ? eWallet.UserData.defaultPayment.relation : 'none';
		}else{
			eWallet.toast('No ha existen cuentas de ahorro para seleccionar!', 2, 'red darken-1');
		}
	}else if((radios.value !== "" && radios.value === "Tarjeta de Crédito") || (radioFlag && eWallet.UserData.defaultPayment.type === "Tarjeta de Crédito")) {
		radios[2].setAttribute('checked', true);
		select.removeAttribute('disabled');
		if (creditCards.length > 0) {
			creditCards.forEach((el, i) => select.eWallet.append(`<option value="${i}">${el.bank} [${el.cardNumber}]</option>`));
			select.value = eWallet.UserData.defaultPayment.relation !== null ? eWallet.UserData.defaultPayment.relation : 'none';
		}else{
			eWallet.toast('No ha existen tarjetas de crédito para seleccionar!', 2, 'red darken-1');
		}
	}else if((radios.value !== "" && radios.value === "Efectivo") || (radioFlag && eWallet.UserData.defaultPayment.type === "Efectivo")) {
		radios[0].setAttribute('checked', true);
		select.setAttribute('disabled', true);
	}
};

eWallet.setReasons = function(select){
		select.innerHTML = (`<option value="none" disabled selected>Selecciona un motivo</option>`);
		eWallet.reasons.split('|').forEach((el, i) => {
			select.eWallet.append(`<option value="${el}">${el}</option>`);
		})
		if (eWallet.UserData.xtraReasons.length > 0) {
			select.eWallet.append("<option disabled>Motivos personalizados</option>")
			eWallet.UserData.xtraReasons.forEach((el, i) => {
				select.eWallet.append(`<option value="${el}">${el}</option>`);
			})
		}
};

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

//Método del OBJETO GENERAL para crear elementos del DOM
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
		let elementPattern = /<[a-z][\s\S]*>/im;

		if (eWallet.isElement(content)) {
			element.appendChild(content);
		}else{
			element.innerHTML = content;
		}
	}

	return element;
};

//Método del OBJETO GENERAL para verificar sí su parámetro es un elemento del DOM
eWallet.isElement = function(obj){
	try{
		return (obj.constructor.__proto__.prototype.constructor.name) ? true : false;
	}catch(e){
		return false;
	}
};

//Método del OBJETO GENERAL para encontrar y obtener un o varios elementos del DOM
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

//Método del OBJETO GENERAL para eliminar elementos del DOM
eWallet.destroy = function(selector){
	if (typeof selector !== "string" && !eWallet.isElement(selector)) return;

	if (selector !== null) {
		if (typeof selector === "string") {
			let elements = eWallet.find(selector);

			if (elements.length > 0) {
				for (var i = 0; i < elements.length; i++) {
					elements[i].parentNode.removeChild(elements[i]);
				}
			}
		}else if(selector.parentNode !== null){
			selector.parentNode.removeChild(selector);
		}
	}
};

//Método del OBJETO GENERAL para mostrar un mensaje temporal en una caja personalizada
eWallet.toast = function(msg, time = 2, style = 'grey darken-3'){
	if (typeof msg !== "string") return;
	var toast = eWallet.create('div', msg, {class: "toast"});

	style = style.trim();
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

(function(){
	function genRandom(){
		let key = "", pattern = [".", "-", "*", "+", "|", "°", ",", "<", ">", "="], len = Math.round(Math.random() * 100);
		for (let i = 0; i < len; i++) {
			key += i % 2 == 0 ? pattern[Math.round(Math.random() * 9)] : `${i}` ;
		}

		return key;
	}

	const DecryptKey = genRandom();
	//----------------------------------------------------------------------------------//
	//																					//
	//						**** eWallet Encryptation ****								//
	//																					//			
	//	 					- Version: 1.1												//
	//	 					- author: Leo López											//
	//	 					- adaptation: Frank Esquivel								//
	//																					//
	//----------------------------------------------------------------------------------//

	//Clase para la encriptación / decriptación de datos
	class Encryptation {
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

		Encrypt(pass, key){
			if (key === DecryptKey) {
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
			}else{
				console.warn("eWallet Warning: No tienes permiso para efectuar esta operación!");
			}
	    }

	    Decrypt(pass, key){
	    	if (key === DecryptKey) {
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
	    	}else{
	    		console.warn("eWallet Warning: No tienes permiso para efectuar esta operación!");
	    	}
	    }
	}

	eWallet.encryptation = new Encryptation();
	//							END eWallet Encryptation								//
	//----------------------------------------------------------------------------------//

	//Método del OBJETO GENERAL para  registrar un usuario en el LocalStorage
	eWallet.register = function(dataset, handler = null){
		if (typeof dataset !== "object" || !eWallet.dataFlag) return false;
		if(typeof handler !== null && typeof handler !== "function"){
			console.error("eWallet Error: Parámetro inválido en el registro de usuario!");
			return;
		}
		
		handler(true);
		localStorage.setItem(dataset.email, eWallet.encryptation.Encrypt(JSON.stringify(dataset), DecryptKey));
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
		if (eWallet.UserData === undefined) {
			let data = eWallet.getLocalData(credentials.email);
			if ( data !== false) {
				let loginData = JSON.parse(eWallet.encryptation.Decrypt(data, DecryptKey));
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
		}
	};

	eWallet.logOut = function(handler = null){
		if (eWallet.UserData !== undefined) {
			let data = eWallet.getSessionData(eWallet.UserData.email);
			if (data !== false) {
				sessionStorage.clear();
				typeof handler === "function" ? handler(true): "";
			}else{
				typeof handler === "function" ? handler(false): "";
			}
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
			hostFlag = location.hostname === "localhost",
			appRoot = actualEnvironment === "server" ? (hostFlag ? '/' : '/eWallet/public/') : 'index.html',
			userDir = actualEnvironment === "server" ? (hostFlag ? '/user' : '/user/') : 'user/index.html';

		let localAppRootFlag = true, actualHref = location.href.split('/');
		localAppRootFlag = actualHref[actualHref.length - 1] === "index.html" && actualHref[actualHref.length - 2] === eWallet.dir;

		if (!sessionFlag && !(actualEnvironment === "server" ? location.pathname === appRoot : localAppRootFlag)) {
			let locationAux = location.href.split('/'), newLocation = "";

			for (var i = 0; i < locationAux.length; i++) {
				if (locationAux[i] !== "eWallet") newLocation += `${locationAux[i]}${locationAux[i + 1] === "eWallet" ? "" : "/"}`; else break;
			}
			newLocation += hostFlag ? `eWallet/${eWallet.dir}/${appRoot}` : `${appRoot}/`;
			location.href = actualEnvironment === "server" ? appRoot : newLocation;
		}else if (actualEnvironment === "server" && location.pathname === appRoot) {
			if (hostFlag) {
				let locationAux = location.href.split('/'), hrefAux = [];
				for (var i = 0; i < locationAux.length - 1; i++) {
					hrefAux[i] = locationAux[i];
				}
				if (sessionFlag) location.href = (`${hrefAux.join('/')}${userDir}`);
			}else{
				if (sessionFlag) location.href = `${location.href}${userDir.substring(1)}`;
			}
		}else if(actualEnvironment === "local" && localAppRootFlag){
			let hrefAux = location.href.split('/');
			hrefAux[hrefAux.length - 1] = userDir;
			if (sessionFlag) location.href = hrefAux.join('/');
		}
	}

	eWallet.setSessionData = function(){
		if (eWallet.checkSession()) {
			let actualEnvironment = location.protocol === "file:" && location.host === "" ? "local" : "server",
			hostFlag = location.hostname === "localhost",
			appRoot = actualEnvironment === "server" ? (hostFlag ? '/' : '/eWallet/') : 'index.html',
			userDir = actualEnvironment === "server" ? (hostFlag ? '/user' : '/eWallet/user') : 'user/index.html';

			if ((actualEnvironment === "server" && location.pathname === appRoot) || (actualEnvironment === "local" && location.href.search("/eWallet/" + eWallet.dir + "/index.html") !== -1)) {
				eWallet.UserData = undefined;
			}else{
				eWallet.UserData = JSON.parse(eWallet.encryptation.Decrypt(eWallet.getLocalData(eWallet.checkSession(null, true)), DecryptKey));
				eWallet.UserData.calcBalance = function(){
					let aux = 0, auxEarn = 0, auxExp = 0;
					if (this.accounts.length > 0) {
						for (let i = 0; i < this.accounts.length; i++) {
							aux += Number(this.accounts[i].balance);
						}
					}
					if (this.creditCards.length > 0) {
						for (let i = 0; i < this.creditCards.length; i++) {
							aux += Number(this.creditCards[i].balance);
						}
					}
					if (this.earnings.length > 0) {
						for (let i = 0; i < this.earnings.length; i++) {
							auxEarn += Number(this.earnings[i].amount);
						}
					}
					if (this.expenses.length > 0) {
						for (let i = 0; i < this.expenses.length; i++) {
							auxExp += Number(this.expenses[i].amount);
						}
					}

					aux += Number(this.cash);
					this.generalBalance = aux;
					this.totalEarnings = auxEarn;
					this.totalExpenses = auxExp;
				};

				eWallet.UserData.setMinBalance = function(){

					if (this.generalBalance > (this.minBalance.value * .5)) {
						this.minBalance.color = "green-text";
					}else if(this.generalBalance > (this.minBalance.value * .25) && this.generalBalance <= (this.minBalance.value * .5)){
						this.minBalance.color = "yellow-text text-darken-3";
					}else if(this.generalBalance > (this.minBalance.value * .05) && this.generalBalance <= (this.minBalance.value * .25)){
						this.minBalance.color = "red-text";
					}else{
						this.minBalance.color = null;
					}
				}
			}
		}
	}

	eWallet.updateUserData = function(previousId, dataset){
		if (eWallet.checkSession(previousId)) {
			localStorage.setItem(dataset.email, eWallet.encryptation.Encrypt(JSON.stringify(dataset), DecryptKey));
			
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

			eWallet.setSessionData();
		}
	}
})();

eWallet.genPopOutBackground = function(){
	let background = eWallet.create('div', '', {id: '_background'});
	eWallet.find('body', 1).eWallet.append(background);
}

eWallet.slider = function(selector){
	const elements = document.querySelectorAll(selector);
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

eWallet.setMenu = function(dataset, container, handler){
	var menuUl = eWallet.create('ul', '', {class: 'list-items'}),
		rootFlag = location.protocol === "file:" ? location.pathname.split('/')[location.pathname.split('/').length - 1].split('.')[0] === "index" ? 1 : 0 : location.pathname === "/user/" || location.pathname === "/eWallet/public/user/";
		rootAux = location.protocol === "file:" ? rootFlag ? "./index.html" : "../index.html" : "/user/",
		menuCont = eWallet.create('div', '', {class: 'options-menu'}),
		hrefAux = location.protocol === "file:" ? rootFlag ? "views/" : "./" : rootFlag ? "views/" : "";
	for (let i = 0; i < dataset.length; i++) {
		let listElement = "",
			locationFlag;
		if (dataset[i].subList === undefined) {
			let item = dataset[i];
			locationFlag = (location.pathname.split('/')[location.pathname.split('/').length - 1].split('.')[0] === item.href);
			listElement = eWallet.create('li', 
				`<a href="${item.href === '../' ? i == 0 ? rootAux : "" : (`${hrefAux}${item.href}.html`)}"><i class="material-icons">${item.icon}</i><span>${item.name}</span></a>`, 
				{class: `item ${locationFlag ? 'active' : ''}`})

		}else{
			let listCont = eWallet.create('li', `<a class="item-menu"><i class="material-icons">${dataset[i].icon}</i><span>${dataset[i].name}</span></a>`, {class: 'item'}),
				ulCont = eWallet.create('ul', '', {class: 'list-subitems'});
			for (let j = 0; j < dataset[i].subList.length; j++) {
				let item = dataset[i].subList[j];
				locationFlag = (location.pathname.split('/')[location.pathname.split('/').length - 1].split('.')[0] === item.href);
				ulCont.eWallet.append(`<li class="sub-item ${locationFlag ? 'active' : ''}"><a href="${hrefAux + item.href}.html"><i class="material-icons">${item.icon}</i><span>${item.name}</span></a></li>`);
			
				if (locationFlag) {
					listCont.classList.add('active');
					ulCont.classList.add('active');
				}
			}
			listCont.appendChild(ulCont);
			listElement = listCont;
		}

		menuUl.appendChild(listElement);
	}
	menuUl.eWallet.append(eWallet.create('li', '<a><i class="material-icons">close</i><span>Cerrar Sesión</span></a>', {id: 'btnUnLog', class: 'item'}))
	menuCont.appendChild(menuUl);
	container.appendChild(menuCont);

	typeof handler === "function" ? handler() : "" ;
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
	const eWallet_Methods = function(element){
		this.element = element;
	};

	eWallet_Methods.prototype.validate = function(dataset, handler = null) {
		if (!this.element instanceof HTMLFormElement) return false; 
		if (typeof dataset === "object") {
			let f = 0, options = dataset;
			for(el in options){
				if (this.element[el] !== undefined) {
					let condition, msg;
					if (this.element[el] instanceof HTMLInputElement || this.element[el][this.element[el].length - 1] instanceof HTMLInputElement) {
						for(rule in options[el]){
							msg = options[el][rule].msg;
							let pattern = msg !== undefined ? options[el][rule].value : undefined;
							switch(rule){
								case "required":
									condition = parseInt(this.element[el].value.trim().length) === 0;
									break;
								case "pattern":
									condition = !pattern.test(this.element[el].value);
									break;
								case "condition":
									condition = !options[el][rule].value;
									break;
							}
						}
					}else if(this.element[el] instanceof HTMLSelectElement){
						for(rule in options[el]){
							msg = options[el][rule].msg;
							if (rule === "required") {
								condition = this.element[el].selectedIndex === 0;
							}
						}
					}

					if (this.element[el] instanceof RadioNodeList){
						this.element[el].forEach((rdbEl, i) => {
							rdbEl.getAttribute('disabled') === null && condition ? f++ : "";
							rdbEl.getAttribute('disabled') === null ? rdbEl.eWallet.validateInput(condition, msg) : "";
						});
					}else{
						this.element[el].getAttribute('disabled') === null && condition ? f++ : "";
						this.element[el].eWallet.validateInput(condition, msg);
					}
				}else{
					console.warn(`eValidate Warning: El elemento ${el} no existe en el DOM!`);
				}
			}

			if (handler !== null && typeof handler === "function")  {
				handler(f == 0);
			}
			return f == 0;
		}else{
			console.error(`eValidate Error: Parámetro inválido!`);
		}
	};

	eWallet_Methods.prototype.validateInput = function(toogle, msg = undefined){
		if (!this.element instanceof HTMLInputElement || !this.element instanceof HTMLSelectElement) return false;
		if (this.element.getAttribute('disabled') !== null) {
			this.element.parentNode.classList.remove('invalid');
			this.deleteMsg();
			this.element.classList.remove('invalid');
			return false;
		}
		if (this.element instanceof HTMLInputElement) {
			toogle ? this.element.classList.add('invalid') : this.element.classList.remove('invalid');
		}else if(this.element instanceof HTMLSelectElement){
			toogle ? this.element.parentNode.classList.add('invalid') : this.element.parentNode.classList.remove('invalid');
		}
		// !toogle ? this.element.classList.add('valid') : this.element.classList.remove('valid');
		// msg !== undefined ? (toogle ? (this.insertMsg(msg) : this.deleteMsg())) : (!toogle ? this.deleteMsg() : "");
		msg !== undefined ? (toogle ? this.insertMsg(msg) : this.deleteMsg()) : (!toogle ? this.deleteMsg() : "");
	};

	eWallet_Methods.prototype.deleteMsg = function(){
		if (!this.element instanceof HTMLInputElement || !this.element instanceof HTMLSelectElement) return false;
		let container = this.element.parentNode, msgEl = null;
		if(this.element instanceof HTMLSelectElement){
			container = this.element.parentNode.parentNode;
		}else if(this.element instanceof HTMLInputElement){
			switch(this.element.getAttribute('type')){
				case "radio":
					container = this.element.parentNode.parentNode;
					break;
				default:
					container = this.element.parentNode;
					break;
			}
		}

		let childrens = container.children;
		for (let i = 0; i < childrens.length; i++) {
			if (childrens[i].getAttribute('validate_msg') !== null) {
				msgEl = childrens[i]; break;
			}
		}
		if (msgEl !== null) {
			msgEl.eWallet.fadeOut(1, function(){
				eWallet.destroy(msgEl);
			})
		}
	}

	eWallet_Methods.prototype.insertMsg = function(msg, toogle = 1){
		if (!this.element instanceof HTMLInputElement || !this.element instanceof HTMLSelectElement) return false;
		if(this.element instanceof HTMLSelectElement){
			if (this.element.parentNode.nextElementSibling === null) {
				this.element.parentNode.parentNode.appendChild(eWallet.create('div', msg, {
					class: `msg ${toogle ? 'error' : 'success'}`,
					id: `${this.element.getAttribute('name')}-${toogle ? 'error' : 'success'}`,
					validate_msg: true
				}))
			}
		}else if(this.element instanceof HTMLInputElement){
			let msgFlag = false, container = this.element.parentNode, 
				msgEl = eWallet.create('div', msg, {
					class: `msg ${toogle ? 'error' : 'success'}`,
					id: `${this.element.getAttribute('name')}-${toogle ? 'error' : 'success'}`,
					validate_msg: true
				});

			switch(this.element.getAttribute('type')){
				case "radio":
					container = this.element.parentNode.parentNode;
					break;
				default:
					container = this.element.parentNode;
					break;
			}
			
			let childrens = container.children;

			for (let i = 0; i < childrens.length; i++) {
				if (childrens[i].getAttribute('validate_msg') !== null) {
					msgFlag = true; break;
				}
			}

			if (!msgFlag) {
				switch(this.element.getAttribute('type')){
					case "radio":
						toogle ? container.children[1].classList.add('invalid') : container.children[1].classList.remove('invalid');
						container.eWallet.append(msgEl);
						break;
					default:
						container.eWallet.append(msgEl);
						break;
				}
			}
		}
	};

	eWallet_Methods.prototype.prepend = function(content){
		if (this.element instanceof Element) {
			let elementPattern = /<[a-z][\s\S]*>/im;

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
			let elementPattern = /<[a-z][\s\S]*>/im;

			if (!eWallet.isElement(content) || typeof content === "string") {
				content = !elementPattern.test(content) ? document.createTextNode(content) : content;

				elementPattern.test(content) ? this.element.innerHTML += content :  this.element.appendChild(content);
			}else if(eWallet.isElement(content)){
				this.element.appendChild(content);
			}
		}
	};

	eWallet_Methods.prototype.fadeIn = function(time = 1, handler){
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
			setTimeout(function(){
				typeof handler === "function" ? handler() : "";
			}, time * 1000);
		}
	};

	eWallet_Methods.prototype.fadeOut = function(time = 1, handler){
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
			setTimeout(function(){
				typeof handler === "function" ? handler() : "";
			}, time * 1000);
		}
	};

	/*
	El objeto eWallet_Methods es añadido a TODOS los elementos existentes y/o que existirán en
	el DOM como una propiedad más. Mediante esta propiedad se podrá acceder a todos los métodos
	declarados anteriormente.
	*/
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
	const input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea'.split(',');
	
	eWallet.setInputs = function(){
		input_selector.forEach(i => {
			let jLabel;
			eWallet.find(i).forEach(j => {
				if (j.length !== 0) {
					eWallet.on(document, 'focusin', i, function(e){
						let input = e.target, label = input.previousElementSibling;
						// label = label !== null || !label instanceof HTMLLabelElement ? label : input.previousElementSibling;
						label.classList.add("active");
					})

					eWallet.on(document, 'focusout', i, function(e){
						let input = e.target, label = input.previousElementSibling;
						// label = label === null || label instanceof HTMLLabelElement ? input.previousElementSibling : label;
						if (input.value.length === 0 && input.getAttribute('placeholder') === null) {
							label.classList.remove("active");
						}
					})
				}
			})
		});
	}
	//							END Material Inputs Plugin								//
	//----------------------------------------------------------------------------------//

	document.addEventListener('DOMContentLoaded', function() {
		if(eWallet.checkSession()){
			eWallet.setSessionData();
			if ((location.pathname === "/eWallet/public/" && location.hostname !== "localhost" && location.protocol === "file:") || (location.pathname === "/" && (location.hostname === "localhost" || location.protocol !== "file:"))) {
				eWallet.toast('Ya existe una sesión activa.<br><center>REDIRIGIENDO!</center>', 2, 'yellow darken-3')
			}
			setTimeout(function(){
				eWallet.sessionLocation(true);
			}, 2000)
		}else{
			eWallet.sessionLocation(false);
		}

		eWallet.setInputs();
		eWallet.updateTextFields();
	})
})();

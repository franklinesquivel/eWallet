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

(function(){
	//----------------------------------------------------------------------------------//
	//																					//
	//						**** eWallet DOM Methods ****								//
	//																					//			
	//	 						- Version: 1.1											//
	//	 						- author: Franklin Esquivel								//
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
	})
	//							END Material Inputs Plugin								//
	//----------------------------------------------------------------------------------//
})();
(function(window){
	if (window.eWallet === undefined || typeof window.eWallet !== "object") {
		window.eWallet = {};
	}

// })(window)

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
		let parser = new DOMParser(),
			elementPattern = /^<.+>.*<\/.+>$/i;

		if (!eWallet.isElement(content)) {
			content = elementPattern.test(content) ? parser.parseFromString(content, "text/xml") : content;
			element.innerHTML = content;
		}else{
			element.appendChild(content);
		}
	}

	return element;
}

eWallet.isElement = function(obj){
	try{
		return (obj.constructor.__proto__.prototype.constructor.name) ? true : false;
	}catch(e){
		return false;
	}
}

eWallet.find = function(selector){
	if (selector === undefined || selector === null || typeof selector !== "string" || selector.length <= 0) {
		console.error("eWallet Error: Ingrese un selector válido");
	}else{
		try{
			let elCollection = document.querySelectorAll(selector);
			return (elCollection.length == 1 ? elCollection[0] : elCollection);
		}catch(ex){
			console.error("eWallet Error: El elemento no existe");
		}
	}
}

// (function(){

	//----------------------------------------------------------------------------------------------------------------------------------//
	//																																	//
	//														**** eValidate ****															//
	//																																	//			
	//	 												- Version: 1.1																	//
	//	 												- author: Franklin Esquivel														//
	//																																	//
	//----------------------------------------------------------------------------------------------------------------------------------//
	const CustomForm = function(element) {
		this.element = element;
	};

	const CustomInput = function( element ){
		this.element = element;
	};

	Object.defineProperty(HTMLFormElement.prototype, "eWallet", {
		get: function () {
			Object.defineProperty(this, "eWallet", {
				value: new CustomForm(this)
			});
			
			return this.eWallet;
		},
		configurable: true,
		writeable: false
	});

	Object.defineProperty(HTMLInputElement.prototype, "eWallet", {
		get: function () {
			Object.defineProperty(this, "eWallet", {
				value: new CustomInput(this)
			});
			
			return this.eWallet;
		},
		configurable: true,
		writeable: false
	});

	CustomForm.prototype.validate = function(dataset) {
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

	CustomInput.prototype.validateInput = function(toogle, msg = undefined){
		toogle ? this.element.classList.add('invalid') : this.element.classList.remove('invalid');
		// !toogle ? this.element.classList.add('valid') : this.element.classList.remove('valid');
		msg !== undefined && toogle ? this.insertMsg(msg) : "";
	}

	CustomInput.prototype.insertMsg = function(msg, toogle = 1){
		if (this.element.nextElementSibling === null) {
			this.element.parentNode.appendChild(eWallet.create('div', msg, {
				class: `msg ${toogle ? 'error' : 'success'}`,
				id: `${this.element.getAttribute('name')}-${toogle ? 'error' : 'success'}`
			}))
		}
	}
	//															END eValidate															//
	//----------------------------------------------------------------------------------------------------------------------------------//
	

	//----------------------------------------------------------------------------------------------------------------------------------//
	//																																	//
	//														Material Inputs Plugin														//
	//																																	//
	//----------------------------------------------------------------------------------------------------------------------------------//
	const input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=date], input[type=search], textarea'.split(',');
	document.addEventListener('DOMContentLoaded', () => {
		input_selector.forEach(i => {
			let jLabel;
			document.querySelectorAll(i).forEach(j => {
			// eWallet.find(i).forEach(j => {
				j.addEventListener('focus', () => {
					let elCond = j.nextElementSibling !== null && j.nextElementSibling.tagName === "LABEL";
					jLabel = elCond ? j.nextElementSibling : j.previousElementSibling;
					jLabel.classList.add("active");
				})

				j.addEventListener('blur', () => {
					if (j.value.length === 0 && j.getAttribute('placeholder') === null) {
						jLabel.classList.remove("active");
					}
				})
			})
		});

		window.updateTextFields();
	})

	window.updateTextFields = () => {
		input_selector.forEach(i => {
			document.querySelectorAll(i).forEach(j => {
				let jLabel = j.nextElementSibling === undefined || j.nextElementSibling === null ? j.previousElementSibling : j.nextElementSibling;
				if (j.value.length !== 0 || j.getAttribute('placeholder') !== null) {
					jLabel.classList.add("active");
				}
			})
		});
	}
	//													END Material Inputs Plugin														//
	//----------------------------------------------------------------------------------------------------------------------------------//
})(window)
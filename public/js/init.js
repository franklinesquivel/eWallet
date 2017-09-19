(function(){
	const CustomForm = function(element) {
		this.element = element;
	};

	CustomForm.prototype.validate = function(dataset) {
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
					this.element[el].custom.validateInput(condition, msg);
				}
			}else{
				console.warn(`El elemento ${el} no existe en el DOM!`);
			}
		}

		f == 0 ? dataset.success() : dataset.invalid();
	}

	Object.defineProperty(HTMLFormElement.prototype, "custom", {
		get: function () {
			Object.defineProperty(this, "custom", {
				value: new CustomForm(this)
			});
			
			return this.custom;
		},
		configurable: true,
		writeable: false
	});

	const CustomInput = function( element ){
		this.element = element;
	}

	CustomInput.prototype.validateInput = function(toogle, msg = undefined){
		toogle ? this.element.classList.add('invalid') : this.element.classList.remove('invalid');
		// toogle ? txt.classList.remove('valid') : txt.classList.add('valid');
		msg !== undefined && toogle ? console.log(msg) : "";
	}

	Object.defineProperty(HTMLInputElement.prototype, "custom", {
		get: function () {
			Object.defineProperty(this, "custom", {
				value: new CustomInput(this)
			});
			
			return this.custom;
		},
		configurable: true,
		writeable: false
	});

	const input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=date], input[type=search], textarea'.split(',');
	document.addEventListener('DOMContentLoaded', () => {
		input_selector.forEach(i => {
			document.querySelectorAll(i).forEach(j => {
				j.addEventListener('focus', () => {
					j.previousElementSibling.classList.add("active");
				})

				j.addEventListener('blur', () => {
					if (j.value.length === 0 && j.getAttribute('placeholder') === null) {
						j.previousElementSibling.classList.remove("active");
					}
				})
			})
		});

		window.updateTextFields();
		
		frmRegister.custom.validate({
			"rules": {
				"txtName": {
					"required": {
						"msg": "Ingrese un valor!"
					}
				},
				"txtLast": {
					"required": {
						"msg": "Ingrese un valor!"
					}
				},
				"txtDui": {
					"required": {
						"msg": "Ingrese un valor!"
					},
					"pattern": {
						"value": /\d{8}\-\d/,
						"msg": "Ingrese un valor válido!"
					}
				},
				"txtDate": {
					"required": {
						"msg": "Ingrese un valor!"
					}
				}
			},
			"success": function(){
				alert('Válido');
			},
			"invalid": function(){
				alert('Inválido');
			}
		})
	})

	window.updateTextFields = () => {
		input_selector.forEach(i => {
			document.querySelectorAll(i).forEach(j => {
				if (j.value.length !== 0 || j.getAttribute('placeholder') !== null) {
					j.previousElementSibling.classList.add("active");
				}
			})
		});
	}
})()
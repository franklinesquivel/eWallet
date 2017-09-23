var mdl;
(function(){
	document.addEventListener('DOMContentLoaded', function(){
		frmRegister.onsubmit = function(){
			return false;
		}

		eWallet.on(document, 'click', '#btnRegister', function(){
			frmRegister.eWallet.validate({
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
					eWallet.register({
						name: txtName.value,
						lastName: txtLast.value,
						email: txtEmail.value,
						password: txtPass.value,
						// address: txt
						securityQuestion: {
							question: "¿Yei?",
							answer: "Yei"
						},
						dui: txtDui.value,
						nit: txtNit.value,
						phone: txtTel.value,
						birthdate: txtDate.value
					}, function(r){
						
					});
					// console.log('Yei');
				},
				"invalid": function(){
					// console.log('Error!');
				}
			})
		})

		mdl = eWallet.modal('.modal');
	})
})()
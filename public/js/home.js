(function(){
	document.addEventListener('DOMContentLoaded', function(){

		frmRegister.onsubmit = function(){
			return false;
		}

		document.querySelector('#btnRegister').addEventListener('click', function(){
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
					console.log('Yei');
				},
				"invalid": function(){
					console.log('Error!');
				}
			})
		})
	})
})()
(function(){
	document.addEventListener('DOMContentLoaded', function(){
		// frmRegister.onsubmit = function(){
		// 	return false;
		// }

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


		var frmRegister = 0, mdl = eWallet.modal('.modal');
		window.addEventListener("scroll", function(){viewMenu();});

		function viewMenu(){
			if(!frmRegister){
				if(window.pageYOffset > 0){
					// document.querySelector(".content-cover").style.top = window.pageYOffset * .4 + "px";
					if(window.pageYOffset >= (document.querySelector(".wraper").offsetTop - 85)){
						document.querySelector(".navbar-header").classList.add("scroll-active");
					}else{
						document.querySelector(".navbar-header").classList.remove("scroll-active");
					}
				}
			}
		}

		document.querySelector('main').appendChild(document.querySelector('.container-bodys'));//Carga Inicial
		
		document.querySelector('.arrow-register').addEventListener("click", function(){
			document.querySelector('.container-arrow').classList.remove("active");
			switchForms(0);
		});//Quitar frmRegister
		document.querySelector('.arrow-home').addEventListener('click', function(){
			document.querySelector('.container-arrow').classList.add("active");	
			switchForms(1)}
		);//Agrega frmRegister
		document.querySelector('.arrow-register2').addEventListener("click", function(){
			document.querySelector('.container-arrow').classList.remove("active");
			switchForms(0);
		});//Quitar frmRegister

		function switchForms(quitFrmRegister){
			if(quitFrmRegister){//Se agrega el formulario de registro
				document.querySelector('.container-bodys').style.marginLeft = "-100%";
				document.querySelector('main').style.height = "1100px"
				frmRegister = 1;
			}else{//Se quita el formulario de registro
				document.querySelector('.container-bodys').style.marginLeft = "0%";
				document.querySelector('main').style.height = "auto";
				frmRegister = 0;
				viewMenu();
			}
		}

		document.querySelector('#modal1 .close').addEventListener('click', function(){
			eWallet.modal('#modal1').close();
		});
	})
})()
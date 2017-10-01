(function(){
	document.addEventListener('DOMContentLoaded', function(){

		var departments = [
			{
				name: "Ahuachapán",
				cities: ["Ahuachapán", "Apaneca", "Atiquizaya", "Cocepción de ataco", "El refugio", "Guaymango", "Jujutla", "San Francisco Menendez", "San Lorenzo", "San Pedro Puxtla", "Tacuba", "Turín"] 
			},
			{
				name: "Cabañas",
				cities: ["Cinquera", "Dolores", "Guacotecti", "Ilobasco", "Jutiapa", "San Isidro", "Sensuntepeque", "Tejutepeque", "Victoria"]
			},
			{
				name: "Chalatenango",
				cities: ["Agua Caliente", "Arcatao", "Azacualpa", "Chalatenango", "Comalapa", "Citalá", "Concepción Quezaltepeque", "Dulce Nombre de María", "El Carrizal", "El Paraíso", "La Laguna", "La Palma", "La Reina", "Las Vueltas", "Nueva Concepción", "Nueva Trinidad", "Nombre de Jesús", "Ojos de Agua", "Potonico", "San Antonio de la Cruz", "San Antonio Los Ranchos", "San Fernando", "San Francisco Lempa", "San Francisco Morazán", "San Ignacio", "San Isidro Labrador", "San José Cancasque", "San José Las Flores", "San Luis del Carmen", "San Miguel de Mercedes", "San Rafael", "Santa Rita", "Tejutla"]
			},
			{
				name: "Cuscatlán",
				cities: ["Candelaria", "Cojutepeque", "El Carmen", "El Rosario", "Monte San Juan", "Oratorio de Concepción", "San Bartolomé Perulapía", "San Cristóbal", "San José Guayabal", "San Pedro Perulapán", "San Rafael Cedros", "San Ramón", "Santa Cruz Analquito", "Santa Cruz Michapa", "Suchitoto", "Tenancingo"]
			},
			{
				name: "La Libertad",
				cities: ["Antiguo Cuscatlán", "Chiltiupán", "Ciudad Arce", "Colón", "Comasagua", "Huizúcar", "Jayaque", "Jicalapa", "La Libertad", "Nueva San Salvador (Santa Tecla)", "Nuevo Cuscatlán", "San Juan Opico", "Quezaltepeque", "Sacacoyo", "San José Villanueva", "San Matías", "San Pablo Tacachico", "Talnique", "Tamanique", "Teotepeque", "Tepecoyo", "Zaragoza"]
			},
			{
				name: "La Paz",
				cities: ["Cuyultitán", "El Rosario", "Jerusalén", "Mercedes La Ceiba", "Olocuilta", "Paraíso de Osorio", "San Antonio Masahuat", "San Emigdio", "San Francisco Chinameca", "San Juan Nonualco", "San Juan Talpa", "San Juan Tepezontes", "San Luis Talpa", "San Luis La Herradura", "San Miguel Tepezontes", "San Pedro Masahuat", "San Pedro Nonualco", "San Rafael Obrajuelo", "Santa María Ostuma", "Santiago Nonualco", "Tapalhuaca", "Zacatecoluca"]
			},
			{
				name: "La Unión",
				cities: ["Anamorós", "Bolivar", "Concepción de Oriente", "Conchagua", "El Carmen", "El Sauce", "Intipucá", "La Unión", "Lislique", "Meanguera del Golfo", "Nueva Esparta", "Pasaquina", "Polorós", "San Alejo", "San José", "Santa Rosa de Lima", "Yayantique", "Yucuaiquín"]
			},
			{
				name: "Morazán",
				cities: ["Arambala", "Cacaopera", "Chilanga", "Corinto", "Delicias de Concepción", "El Divisadero", "El Rosario", "Gualococti", "Guatajiagua", "Joateca", "Jocoaitique", "Jocoro", "Lolotiquillo", "Meanguera", "Osicala", "Perquín", "San Carlos", "San Fernando", "San Francisco Gotera", "San Isidro", "San Simón", "Sensembra", "Sociedad", "Torola", "Yamabal", "Yoloaiquín"]
			},
			{
				name: "San Miguel",
				cities: ["Carolina", "Chapeltique", "Chinameca", "Chirilagua", "Ciudad Barrios", "Comacarán", "El Tránsito", "Lolotique", "Moncagua", "Nueva Guadalupe", "Nuevo Edén de San Juan", "Quelepa", "San Antonio del Mosco", "San Gerardo", "San Jorge", "San Luis de la Reina", "San Miguel", "San Rafael Oriente", "Sesori", "Uluazapa"]
			},
			{
				name: "San Salvador",
				cities: ["Aguilares", "Apopa", "Ayutuxtepeque", "Cuscatancingo", "Ciudad Delgado", "El Paisnal", "Guazapa", "Ilopango", "Mejicanos", "Nejapa", "Panchimalco", "Rosario de Mora", "San Marcos", "San Martín", "San Salvador", "Santiago Texacuangos", "Santo Tomás", "Soyapango", "Tonacatepeque"]
			},
			{
				name: "San Vicente",
				cities: ["Apastepeque", "Guadalupe", "San Cayetano Istepeque", "San Esteban Catarina", "San Ildefonso", "San Lorenzo", "San Sebastián", "San Vicente", "Santa Clara", "Santo Domingo", "Tecoluca", "Tepetitán", "Verapaz"]
			},
			{
				name: "Santa Ana",
				cities: ["Candelaria de la Frontera", "Chalchuapa", "Coatepeque", "El Congo", "El Porvenir", "Masahuat", "Metapán", "San Antonio Pajonal", "San Sebastián Salitrillo", "Santa Ana", "Santa Rosa Guachipilín", "Santiago de la Frontera", "Texistepeque"]
			},
			{
				name: "Sonsonate",
				cities: ["Acajutla", "Armenia", "Caluco", "Cuisnahuat", "Izalco", "Juayúa", "Nahuizalco", "Nahulingo", "Salcoatitán", "San Antonio del Monte", "San Julián", "Santa Catarina Masahuat", "Santa Isabel Ishuatán", "Santo Domingo Guzmán", "Sonsonate", "Sonzacate"]
			},
			{
				name: "Usulután",
				cities: ["Alegría", "Berlín", "California", "Concepción Batres", "El Triunfo", "Ereguayquín", "Estanzuelas", "Jiquilisco", "Jucuapa", "Jucuarán", "Mercedes Umaña", "Nueva Granada", "Ozatlán", "Puerto El Triunfo", "San Agustín", "San Buenaventura", "San Dionisio", "San Francisco Javier", "Santa Elena", "Santa María", "Santiago de María", "Tecapán", "Usulután"]
			},
		]

		for (var i = 0; i < departments.length; i++) {
			departments[i].cities.sort();
			frmRegister.cmbDepartamento.append(eWallet.create('option', departments[i].name, {value: departments[i].name}))
		}

		frmRegister.cmbDepartamento.addEventListener('change', function(){
			frmRegister.cmbMunicipio.innerHTML = "<option selected disabled>Selecciona un opción</option>";
			let index = frmRegister.cmbDepartamento.selectedIndex - 1;
			for (var i = 0; i < departments[index].cities.length; i++) {
				frmRegister.cmbMunicipio.append(eWallet.create('option', departments[index].cities[i], {value: departments[index].cities[i]}));
				
			}
		})

		frmRegister.onsubmit = function(){
			return false;
		}

		frmLogin.onsubmit = function() {
			return false;
		}

		eWallet.on(document, 'click', '#btnRegister', function(){
			frmRegister.eWallet.validate({
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
				"txtEmail": {
					"required": {
						"msg": "Ingrese un valor!"
					},
					"pattern": {
						"value": /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						"msg": "Ingrese un correo electrónico válido!"
					}
				},
				"txtPass": {
					"required": {
						"msg": "Ingrese un valor!"
					},
					"pattern": {
						"value": /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,}$/,
						"msg": "Mín 8 carácteres. Min 1 letra Mayúscula, 1 minúscula, 1 símbolo y 1 dígito"
					}
				},
				"txtPass2": {
					"condition": {
						"value": frmRegister.txtPass2.value === frmRegister.txtPass.value,
						"msg": "La contraseña debe de ser idéntica a las anterior"
					}
				},
				"cmbDepartamento": {

				},
				"cmbMunicipio": {

				},
				"txtCol": {
					"required": {
						"msg": "Ingrese un valor válido!"
					}
				},
				"txtPje": {
					"required": {
						"msg": "Ingrese un valor válido!"
					}
				},
				"txtNCasa": {
					"required": {
						"msg": "Ingrese un valor válido!"
					}
				},
				"cmbSecurityQuestion": {

				},
				"txtAnswer": {
					"required": {
						"msg": "Ingrese un valor válido!"
					}
				},
				"txtDui": {
					"required": {
						"msg": "Ingrese un valor!"
					},
					"pattern": {
						"value": /^\d{8}\-\d$/,
						"msg": "Ingrese un valor válido!"
					}
				},
				"txtNit": {
					"required": {
						"msg": "Ingrese un valor!"
					},
					"pattern": {
						"value": /^\d{4}-\d{6}-\d{3}-\d$/,
						"msg": "Ingrese un valor válido!"
					}
				},
				"txtTel": {
					"required": {
						"msg": "Ingrese un valor!"
					},
					"pattern": {
						"value": /^(7|6|2)\d{3}\-?\d{4}$/,
						"msg": "Ingrese un valor válido!"
					}
				},
				"txtDate": {
					"required": {
						"msg": "Ingrese un valor!"
					}
				}
			}, function(r){
				if (r) {
					eWallet.register({
						name: txtName.value,
						lastName: txtLast.value,
						email: frmRegister.txtEmail.value,
						password: txtPass.value,
						address: {
							department: cmbDepartamento.value,
							city: cmbMunicipio.value,
							colony: txtCol.value,
							street: txtPje.value,
							house: txtNCasa.value
						},
						securityQuestion: {
							question: cmbSecurityQuestion.value,
							answer: txtAnswer.value
						},
						dui: txtDui.value,
						nit: txtNit.value,
						phone: txtTel.value,
						birthdate: txtDate.value,
						firstLogin: true
					}, function(f){
						console.log(f);
						eWallet.toast(f ? 'El usuario ha sido registrado éxitosamente!' : 'Ha ocurrido un error!', (f ? 'green' : 'red') + ' darken-1');
						f ? frmRegister.reset() : "";
					});
				}else{
					eWallet.toast('Ingrese los datos solicitados!', 2, 'red darken-1');
				}
			})
		})

		eWallet.find('#btnLog', 1).addEventListener('click', function(){
			frmLogin.eWallet.validate({
				"txtEmail": {
					"pattern": {
						"value": /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						"msg": "Ingrese un correo válido!"
					}
				},
				"txtPassword": {
					"required": {
						"msg": "Ingrese un valor!"
					}
				}
			}, function(r){
				if (r) {
					eWallet.logIn({
						email: frmLogin.txtEmail.value,
						password: frmLogin.txtPassword.value
					}, function(f, obj){
						if (f) {
							eWallet.toast(`<i>${obj.email}</i> ha iniciado sesión éxitosamente!`, 2, 'green darken-1');
							setTimeout(function(){
								eWallet.sessionLocation(true);
							}, 2300);
						}else{
							eWallet.toast('Ese usuario no existe!', 2, 'red darken-1');
							frmLogin.reset();
						}
					})
				}else{
					eWallet.toast('Ingrese los datos solicitados!', 2, 'red darken-1');
				}
			})
		})

		var bodyFlag = 0, mdl = eWallet.modal('.modal');
		window.addEventListener("scroll", function(){viewMenu();});

		function viewMenu(){
			if(!bodyFlag){
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
			switchForms(1);
		});//Agrega frmRegister
		document.querySelector('.arrow-register2').addEventListener("click", function(){
			document.querySelector('.container-arrow').classList.remove("active");
			switchForms(0);
		});//Quitar frmRegister

		function switchForms(quitFrmRegister){
			if(quitFrmRegister){//Se agrega el formulario de registro
				document.querySelector('.container-bodys').style.marginLeft = "-100%";
				//document.querySelector('main').style.height = "1100px"
				bodyFlag = 1;
			}else{//Se quita el formulario de registro
				document.querySelector('.container-bodys').style.marginLeft = "0%";
				document.querySelector('main').style.height = "auto";
				bodyFlag = 0;
				viewMenu();
			}
		}

		document.querySelector('#mdlLogin .close').addEventListener('click', function(){
			eWallet.modal('#mdlLogin').close();
		});

		document.querySelector('#txtName').addEventListener('focus', function(){
			document.querySelector('.container-arrow').classList.add("active");	
			switchForms(1);
		});
	})
})()
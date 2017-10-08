(function(){
	document.addEventListener('DOMContentLoaded', function(){
		let f = true, accounts = [], creditCards = [], type = [];
		while(f){
			if (eWallet.UserData !== undefined) {
				setFormData();
				f = false;
			}else{
				setTimeout(function(){
					f = true;
				}, 1000);
			}
		}

		document.querySelectorAll('[name=rdbPayment]').forEach(el => {
			el.addEventListener('change', function(){
				// eWallet.UserData.defaultPayment.relation = "none";
				eWallet.defaultPayment(frmUser.cmbPayment, frmUser.rdbPayment);
			});
		})

		eWallet.find('#btnSave', 1).addEventListener('click', function(){
			frmUser.eWallet.validate({
				txtMinBalance: {
					required: {
						msg: "Ingrese un valor!"
					}
				},
				cmbPayment: {
					required: {
						msg: "Seleccione un valor!"
					}
				},
				rdbPayment: {
					required: {
						msg: "Seleccione un valor!"
					}
				}
			}, function(r){
				if (r) {
					eWallet.UserData.defaultPayment = {
						type: frmUser.rdbPayment.value,
						relation: frmUser.rdbPayment.value === "Efectivo" ? "none" : frmUser.cmbPayment.selectedIndex - 1
					}
					eWallet.UserData.minBalance.value = Number(frmUser.txtMinBalance.value);
					eWallet.UserData.setMinBalance();
					eWallet.updateUserData(eWallet.UserData.email, eWallet.UserData);
					eWallet.toast('Configuración General de Usuario ACTUALIZADA!', 2, 'green darken-1');
					setFormData();
				}else{
					eWallet.toast('Ingrese todos los datos del formulario!', 2, 'red darken-1');
				}
			})
		})

		function setFormData(){
			frmUser.txtMinBalance.value = eWallet.UserData.minBalance.value.toFixed(2);
			accounts = eWallet.UserData.accounts.map(i => i);
			creditCards = eWallet.UserData.creditCards.map(i => i);
			type.push(accounts, creditCards);
			eWallet.setPayment(frmUser.cmbPayment, frmUser.rdbPayment);
			// eWallet.defaultPayment(frmUser.cmbPayment, frmUser.rdbPayment);
			eWallet.updateTextFields();
		}
	})
})();
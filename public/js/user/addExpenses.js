(function(){

	document.addEventListener('DOMContentLoaded', function(){
		var mdl = eWallet.modal('#mdlReasons');
		document.querySelector('#mdlReasons .close').addEventListener('click', function(){
			mdl.close();
		});

		frmAdd.onsubmit = function(){
			return false;
		}
		frmReasons.onsubmit = function(){
			return false;
		}

		eWallet.find('#btnReason', 1).addEventListener('click', function(){
			frmReasons.eWallet.validate({
				txtReason: {
					required: {
						msg: "Ingrese un valor!"
					}
				}
			}, function(r){
				if (r) {
					eWallet.UserData.xtraReasons.push(txtReason.value);
					eWallet.updateUserData(eWallet.UserData.email, eWallet.UserData);
					eWallet.toast('El motivo se ha añadido éxitosamente!', 2, 'green darken-1');
					frmReasons.reset();
					eWallet.setReasons(frmAdd.cmbReasons);
					eWallet.updateTextFields()
				}else{
					eWallet.toast('Ingrese todos los datos solicitados!', 2, 'red darken-1');
				}
			})
		})

		var local = new Date(new Date());
	    local.setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset());
		frmAdd.txtDate.valueAsDate = local;

		eWallet.setReasons(frmAdd.cmbReasons);

		eWallet.defaultPayment(frmAdd.cmbAddTo, frmAdd.rdbType);

		frmAdd.rdbType.forEach(el => {
			el.addEventListener('change', function(){
				// eWallet.UserData.defaultPayment.relation = "none";
				eWallet.defaultPayment(frmAdd.cmbAddTo, frmAdd.rdbType);
			});
		})

		eWallet.find('#btnAdd', 1).addEventListener('click', function(){
			frmAdd.eWallet.validate({
				txtDate: {
					required: {
						msg: "Ingrese un valor!"
					}
				},
				cmbReasons: {
					required: {
						msg: "Selecciona una opción!"
					}
				},
				txtAmount: {
					required: {
						msg: "Selecciona una opción!"
					},
					pattern: {
                        value: /^(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?|\(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?\))$/,
						msg: "ingrese un valor válido!"
					}
				},
				rdbType: {
					required: {
						msg: "Selecciona una opción!"
					}
				},
				cmbAddTo: {
					required: {
						msg: "Selecciona una opción!"
					}
				}
			}, function(r){
				if (r) {
					let expense = {
						date: frmAdd.txtDate.value,
						reason: frmAdd.cmbReasons.value,
						amount: Number(frmAdd.txtAmount.value)
					},
					auxBalance = 0;

					if (frmAdd.cmbAddTo.selectedIndex - 1 !== -1) {
						expense.addedTo = {};
						expense.addedTo.type = frmAdd.rdbType.value === "Cuenta de Ahorros" ? "accounts" : "creditCards";
						expense.addedTo.index = Number(frmAdd.cmbAddTo.value);
						if (expense.amount > eWallet.UserData[expense.addedTo.type][expense.addedTo.index].balance) {
							frmAdd.txtAmount.eWallet.validateInput(1);
							eWallet.toast('El monto del gasto no debe ser mayor a la cantidad de efectivo del pago seleccionado!', 2, 'red darken-1');
							return;
						}
						eWallet.UserData[expense.addedTo.type][expense.addedTo.index].balance -= Number(expense.amount);
					}else{
						if (expense.amount > eWallet.UserData.cash) {
							frmAdd.txtAmount.eWallet.validateInput(1);
							eWallet.toast('El monto del gasto no debe ser mayor a la cantidad de efectivo del pago seleccionado!', 2, 'red darken-1');
							return;
						}
						eWallet.UserData.cash -= Number(expense.amount);
					}
					frmAdd.txtAmount.eWallet.validateInput(0);
					eWallet.UserData.expenses.push(expense);
					eWallet.UserData.calcBalance();
					eWallet.UserData.setMinBalance();
					eWallet.updateUserData(eWallet.UserData.email, eWallet.UserData);
					eWallet.toast('El gasto ha sido registrado éxitosamente!', 2, 'green darken-1');
					frmAdd.reset();
					eWallet.setReasons(frmAdd.cmbReasons);
					eWallet.setPayment(frmAdd.cmbAddTo, frmAdd.rdbType);
					// eWallet.defaultPayment(frmAdd.cmbAddTo, frmAdd.rdbType);
					eWallet.updateTextFields();
				}else{
					eWallet.toast('Ingrese todos los datos solicitados!', 2, 'red darken-1');
				}
			});
		})
	})

})();
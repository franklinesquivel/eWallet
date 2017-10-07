(function(){

	document.addEventListener('DOMContentLoaded', function(){
		frmAdd.onsubmit = function(){
			return false;
		}

		var local = new Date(new Date());
	    local.setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset());
		frmAdd.txtDate.valueAsDate = local;

		frmAdd.cmbReasons.eWallet.append(`<option value="none" disabled selected>Selecciona un motivo</option>`);
		eWallet.reasons.split('|').forEach((el, i) => {
			frmAdd.cmbReasons.eWallet.append(`<option value="${el}">${el}</option>`);
		})

		eWallet.defaultPayment(frmAdd.cmbAddTo, frmAdd.rdbType);

		frmAdd.rdbType.forEach(el => {
			el.addEventListener('change', function(){
				eWallet.UserData.defaultPayment.type = el.value;
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
					}
					if (frmAdd.cmbAddTo.selectedIndex - 1 !== -1) {
						expense.addedTo = {};
						expense.addedTo.type = frmAdd.rdbType.value === "Cuenta de Ahorros" ? "accounts" : "creditCards";
						expense.addedTo.index = Number(frmAdd.cmbAddTo.value);
						eWallet.UserData[expense.addedTo.type][expense.addedTo.index].balance -= Number(expense.amount);
					}else{
						eWallet.UserData.cash -= Number(expense.amount);
					}
					eWallet.UserData.expenses.push(expense);
					eWallet.UserData.calcBalance();
					eWallet.updateUserData(eWallet.UserData.email, eWallet.UserData);
					eWallet.toast('El gasto ha sido registrado éxitosamente!', 2, 'green darken-1');
					frmAdd.reset();
					eWallet.defaultPayment(frmAdd.cmbAddTo, frmAdd.rdbType);
					eWallet.updateTextFields();
				}else{
					eWallet.toast('Ingrese todos los datos solicitados!', 2, 'red darken-1');
				}
			});
		})
	})

})();
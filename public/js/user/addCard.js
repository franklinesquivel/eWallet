(function(){
	
	document.addEventListener('DOMContentLoaded', function(){
		frmAdd.onsubmit = function(){
			return false;
		}

		eWallet.find('#btnAdd', 1).addEventListener('click', function(){
			frmAdd.eWallet.validate({
				txtBank: {
					required: {
						msg: "Ingrese un valor!"
					}
				},
				txtCardNumber: {
					required: {
						msg: "Ingrese un valor!"
					},
					pattern: {
						value: /^\d{4}[ \-]\d{4}[ \-]\d{4}[ \-]\d{4}$/,
						msg: "Ingrese un valor válido!"
					}
				},
				txtBalance: {
					required: {
						msg: "Ingrese un valor!"
					},
					pattern: {
                        value: /^(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?|\(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?\))$/,
						msg: "Ingrese un valor válido!"
					}
				},
				txtInterest: {
					required: {
						msg: "Ingrese un valor!"
					},
					pattern: {
                        value: /^(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?|\(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?\))$/,
						msg: "Ingrese un valor válido!"
					}
				},
				txtPayment: {
					required: {
						msg: "Ingrese un valor!"
					}
				}
			}, function(r){
				if (r) {
					eWallet.UserData.creditCards.push({
						bank: txtBank.value,
						cardNumber: txtCardNumber.value.trim().split(' ').join('-'),
						balance: Number(txtBalance.value),
						interest: Number(txtInterest.value),
						paymentDate: txtPayment.value
					})

                    eWallet.UserData.calcBalance();
					eWallet.updateUserData(eWallet.UserData.email, eWallet.UserData);
					eWallet.toast('La tarjeta de crédito se han guardado éxitosamente!', 2, 'green darken-1');
					frmAdd.reset();
                    eWallet.updateTextFields()
				}else{
					eWallet.toast('Ingrese todos los datos solicitados!', 2, 'red darken-1');
				}
			})
		})
	});

})();
(function(){
	document.addEventListener('DOMContentLoaded', function(){

		eWallet.find('.btnAdd', 1).addEventListener('click', function(){
			frmAdd.eWallet.validate({
				txtBank: {
                    required: {
                        msg: "Ingrese un valor"
                    }
                },
                txtAccountNumber: {
                    required: {
                        msg: "Ingrese un valor"
                    },
                    pattern: {
                    	/*
OBSERVACIÓN: La validación actual es para tarjetas de crédito y no para N° de cuenta bancaria
                    	*/
                        value: /^\d{4}[ \-]\d{4}[ \-]\d{4}[ \-]\d{4}$/,
                    	// value: /^d{4}[ \-]\d{4}\$/
                        msg: "Ingrese un valor válido!"
                    }
                },
                txtBankBalance: {
                    required: {
                        msg: "Ingrese un valor"
                    },
                    pattern: {
                        value: /^(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?|\(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?\))$/,
                        msg: "Ingrese un valor válido!"
                    }
                }
			}, function(r){
				if (r) {
					eWallet.UserData.accounts.push({
						bank: txtBank.value,
						accountNumber: txtAccountNumber.value.trim().split(' ').join('-'),
						balance: txtBankBalance.value
					})

					eWallet.updateUserData(eWallet.UserData.email, eWallet.UserData);
					eWallet.toast('La cuenta se han guardado éxitosamente!', 2, 'green darken-1');
					frmAdd.reset();
				}else{
					eWallet.toast('Ingrese todos los datos solicitados!', 2, 'red darken-1');
				}
			})
		})

	})
})();
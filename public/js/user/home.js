(function(){
	document.addEventListener('DOMContentLoaded', function(){
		if (eWallet.UserData.firstLogin) {
	        if (eWallet.find('.balance').length > 1) {
	            eWallet.find('.balance', 1).innerHTML = "$0.00";
	            eWallet.find('.balance', 1).eWallet.append(`<h6 class="center sub">(Ingresa los datos requeridos para establecer tu saldo inicial)</h6>`);
	        }
	        document.body.eWallet.append(`
	            <div class="modal" id="mdlBalance">
	                <div class="content">
	                    <h1 class="center">Bienvenido a eWallet!</h1>
	                    <h5 class="sub center">Esta es la primera vez que inicias sesión y necesitamos que nos proveas unos datos extra para poder manejar tus finanzas con mayor facilidad!</h5>
	                    <br>
	                    <div class="forms row">
	                        <form name="frmBalance" class="row">
	                            <div class="input-field col s12 l3 m3 offset-l3 offset-m3">
	                                <label for="txtBalance">Efectivo actual</label>
	                                <input type="text" name="txtBalance" id="txtBalance">
	                            </div>
	                            <div class="input-field col s12 l4 m4">
	                                <label for="txtAccounts">¿Cuántas cuentas de ahorro desea registrar?</label>
	                                <input type="number" name="txtAccounts" id="txtAccounts">
	                            </div>
	                            
	                        </form>
	                        <div class="col l4 m6 s8 offset-l4 offset-m3 offset-s2">
	                            <button id="btnBalance" class="button skew-fill">Siguiente</button>
	                        </div>
	                    </div>
	                </div>
	                <div class="footer fixed-foo">
	                    <a class="modal-btn close" mdl-action="close">Cerrar</a>
	                </div>
	            </div>`);

	        var mdlBalance = eWallet.modal('#mdlBalance');

	        document.querySelector('#mdlBalance .close').addEventListener('click', function(){
				mdlBalance.close();
			});

	        frmBalance.onsubmit = function(){
	            return false;
	        }

	        eWallet.setInputs();
			eWallet.updateTextFields();

	        eWallet.find('#btnBalance', 1).addEventListener('click', function(){
	            frmBalance.eWallet.validate({
	                txtBalance: {
	                    pattern: {
	                        value: /^(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?|\(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?\))$/,
	                        msg: 'Ingrese un valor válido!'
	                    }
	                },
	                txtAccounts: {
	                    required: {
	                        msg: "Ingrese un valor!"
	                    }
	                }
	            }, function(r){
	                if (r) {
	                    let accountsForm = "", auxBalance = Number(frmBalance.txtBalance.value).toFixed(2);
	                     for (var i = 0; i < frmBalance.txtAccounts.value; i++) {
	                        accountsForm += `
	                            <h4 class="center">Cuenta N° ${i+1}</h4>
	                            <form name="frmAccount_${i+1}" class="frmAccounts row">
	                                <div class="input-field col s12 l4 m4">
	                                    <label for="txtBank">Banco</label>
	                                    <input type="text" name="txtBank" id="txtBank">
	                                </div>
	                                <div class="input-field col s12 l4 m4">
	                                    <label for="txtAccountNumber">Número de cuenta</label>
	                                    <input type="text" name="txtAccountNumber" id="txtAccountNumber" placeholder="xxxx xxxx xxxx xxxx">
	                                </div>
	                                <div class="input-field col s12 l4 m4">
	                                    <label for="txtBankBalance">Saldo actual</label>
	                                    <input type="number" name="txtBankBalance" id="txtBankBalance">
	                                </div>
	                            </form>
	                        `;
	                    }
	                    accountsForm += `<div class="col l4 m6 s8 offset-l4 offset-m3 offset-s2">
	                                <button id="btnSaveAccounts" class="button skew-fill">Guardar Datos</button>
	                            </div>`;
	                    eWallet.toast('Ingresa los datos de las cuentas bancarias', 2, 'yellow darken-4');
	                    eWallet.find('#mdlBalance .content .forms', 1).innerHTML = (accountsForm);
	                    eWallet.setInputs();
						eWallet.updateTextFields();

	                    eWallet.find('#btnSaveAccounts', 1).addEventListener('click', function(){
	                        let forms = eWallet.find('.frmAccounts'), formsFlag = 0, dataAux = [];
	                        for (var i = 0; i < forms.length; i++) {
	                            let resultAux = forms[i].eWallet.validate({
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
	                                        msg: "Ingrese un valor valido!"
	                                    }
	                                },
	                                txtBankBalance: {
	                                    required: {
	                                        msg: "Ingrese un valor"
	                                    },
	                                    pattern: {
	                                        value: /^(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?|\(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?\))$/,
	                                        msg: "Ingrese un valor valido!"
	                                    }
	                                }
	                            }, function(r){
	                                if (r) {
	                                    dataAux[i] = {
	                                        bank: forms[i].txtBank.value,
	                                        accountNumber: forms[i].txtAccountNumber.value.trim().split(' ').join('-'),
	                                        balance: Number(forms[i].txtBankBalance.value),
	                                    }
	                                }
	                            })
	                            formsFlag += resultAux ? 1 : 0;
	                        }
	                        if (formsFlag) {
	                            eWallet.UserData.accounts = dataAux;
	                            eWallet.UserData.cash = Number(auxBalance);
	                            eWallet.UserData.firstLogin = false;
	                            eWallet.UserData.calcBalance();
	                            eWallet.updateUserData(eWallet.UserData.email, eWallet.UserData);
	                            mdlBalance.close();
	                            eWallet.toast('Los datos han sido guardados con éxito!', 2, 'green darken-1');
	                            setTimeout(function(){
	                                location.reload();
	                            }, 1000);
	                        }else{
	                            eWallet.toast('Ingrese todos los valores requeridos!', 2, 'red darken-1');
	                        }
	                    })

	                }else{
	                    eWallet.toast('Ingrese todos los valores requeridos!', 2, 'red darken-1');
	                }
	            })
	        })

	        mdlBalance.open();
	    }else{
	    	eWallet.UserData.calcBalance();
	        if (eWallet.find('.balance').length > 0) {
	        	eWallet.find('.balance', 1).className += (` ${eWallet.UserData.minBalance.color !== null ? eWallet.UserData.minBalance.color : ''}`);
	            eWallet.find('.balance', 1).innerHTML = `$${eWallet.UserData.generalBalance.toFixed(2)}`;
	        }
	    }

	    let tbl = eWallet.find('#tblBalance', 1), balanceAux = 0;
		if (eWallet.UserData.creditCards.length > 0) {
			for(let i = 0; i < eWallet.UserData.creditCards.length; i++)
				balanceAux += eWallet.UserData.creditCards[i].balance;
	    }
	    balanceAux = 0;
	    tbl.eWallet.prepend(`<tr><th>Tarjetas de Crédito</th><td>$${balanceAux.toFixed(2)}</td></tr>`);
	    if (eWallet.UserData.accounts.length > 0) {
	    	for(let i = 0; i < eWallet.UserData.accounts.length; i++)
	    		balanceAux += eWallet.UserData.accounts[i].balance;
	    }
	    tbl.eWallet.prepend(`<tr><th>Cuentas de Ahorro</th><td>$${balanceAux.toFixed(2)}</td></tr>`);
	    tbl.eWallet.prepend(`<tr><th>Efectivo</th><td>$${eWallet.UserData.cash.toFixed(2)}</td></tr>`);
		eWallet.find('#tdTotal h2', 1).innerHTML = "$" + eWallet.UserData.generalBalance.toFixed(2);
	})
})();
(()=>{
    document.addEventListener('DOMContentLoaded', function(){
        frmBalance.onsubmit = function(){
            return false;
        }

        var mdlBalance = eWallet.modal('.modal');

        if (eWallet.UserData.firstLogin) {
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
                                        <input type="text" name="txtAccountNumber" id="txtAccountNumber">
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
                                        }
                                        // pattern: {
                                        //     value: ,
                                        //     msg: "Ingrese un´valor valido!"
                                        // }
                                    },
                                    txtBankBalance: {
                                        required: {
                                            msg: "Ingrese un valor"
                                        },
                                        pattern: {
                                            value: /^(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?|\(\$?\d{1,3}(,?\d{3})?(\.\d\d?)?\))$/,
                                            msg: "Ingrese un´valor valido!"
                                        }
                                    }
                                }, function(r){
                                    if (r) {
                                        dataAux[i] = {
                                            bank: forms[i].txtBank.value,
                                            accountNumber: forms[i].txtAccountNumber.value,
                                            balance: forms[i].txtBankBalance.value,
                                        }
                                    }
                                })
                                formsFlag += resultAux ? 1 : 0;
                            }
                            if (formsFlag) {
                                eWallet.UserData.accounts = dataAux;
                                eWallet.UserData.generalBalance = auxBalance;
                                eWallet.UserData.firstLogin = false;
                                eWallet.updateUserData(eWallet.user, eWallet.UserData);
                                mdlBalance.close();
                                eWallet.toast('Los datos han sido guardados con éxito!', 2, 'green darken-1');
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
            alert(':p');
        }

        eWallet.find('#btnUnLog', 1).addEventListener('click', function(){
            eWallet.logOut(function(){
                eWallet.sessionLocation();
            });
        })

        var slideMenu = eWallet.menu('.menu-wraper');
    
        for(var i = 0; i < document.querySelectorAll('a.item-menu').length; i++){
            document.querySelectorAll('a.item-menu')[i].addEventListener('click', function(){
                if(this.nextElementSibling.getAttribute('class') == 'list-subitems active'){
                    this.nextElementSibling.classList.remove('active');
                    this.classList.remove('active');
                }else{
                    this.nextElementSibling.classList.add('active');
                    this.classList.add('active');
                }
            });
        }

        if(eWallet.find('select#cmbReason').length > 0){
            eWallet.find('select#cmbReason', 1).eWallet.append("<option selected disabled>Seleccione una opción</option>");
            for(var i = 0; i < options.length; i++){
                eWallet.find('select#cmbReason', 1).eWallet.append("<option value='"+i+"'>"+options[i].text+"</option>");
            }
        }
    });

    /*
        Array de objetos que contiene las opciones por default de los select.

        Mi idea es que se guarde la posición pero por cualquier cosa le puse el value.
    */
    var options = [
        {
            text: "Pago celular",
            value: ""
        },
        {
            text: "Pago de luz eléctrica",
            value: ""
        },
        {
            text: "Pago de agua",
            value: ""
        },
        {
            text: "Pago casa/alquiler",
            value: ""
        },
        {
            text: "Pago de cable",
            value: ""
        },
        {
            text: "Pago de internet",
            value: ""
        },
        {
            text: "Pago de educación",
            value: ""
        },
        {
            text: "Supermercado",
            value: ""
        },
        {
            text: "Cine",
            value: ""
        },
        {
            text: "Discoteca",
            value: ""
        },
        {
            text: "Teatro",
            value: ""
        },
        {
            text: "Ropa",
            value: ""
        },
        {
            text: "Restaurante",
            value: ""
        },
        {
            text: "Tecnología",
            value: ""
        },
        {
            text: "Mascota",
            value: ""
        },
        {
            text: "Gasolina",
            value: ""
        },
        {
            text: "Reparaciones",
            value: ""
        }
    ];
})();
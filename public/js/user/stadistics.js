(function(){

	var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

	function setOptions(value){
		if (value === "M") {
			if(eWallet.find('#data-field #combo', 1).style.display !== 'block'){
				frmData.cmbPeriod.removeAttribute('disabled');
				eWallet.find('#data-field #dates', 1).eWallet.fadeOut(0.25, function(){
					eWallet.find('#data-field #combo', 1).eWallet.fadeIn(1);
				});
			}
			fillSelect(frmData.cmbPeriod, value);
		}else if(value === "Y"){
			if(eWallet.find('#data-field #combo', 1).style.display !== 'block'){
				frmData.cmbPeriod.removeAttribute('disabled');
				eWallet.find('#data-field #dates', 1).eWallet.fadeOut(0.25, function(){
					eWallet.find('#data-field #combo', 1).eWallet.fadeIn(1);
				});
			}
			fillSelect(frmData.cmbPeriod, value);
		}else if(value === "P"){
			eWallet.find('.txtPeriod').forEach((el, i) => {
				let auxDate = new Date();
			    auxDate.setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset());
				el.valueAsDate = auxDate;
			})
			frmData.cmbPeriod.setAttribute('disabled', true);
			frmData.cmbPeriod.removeAttribute('type');
			eWallet.find('#data-field #combo', 1).eWallet.fadeOut(0.25, function(){
				eWallet.find('#data-field #dates', 1).eWallet.fadeIn(1);
			});
			setChart(value, null, frmData.txtPeriod_1.valueAsDate, frmData.txtPeriod_2.valueAsDate);
		}
	}

	function fillSelect(select, type){
		var date = new Date();
	    date.setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset());
	    select.innerHTML = "<option value='none' disabled selected>Selecciona un " + (type === "M" ? "mes" : "año") + "</option>";
		if (type === "M") {
			for (var i = date.getMonth() - 1; i >= 0; i--) {
				select.eWallet.append(`<option value="${i}">${months[i]}</option>`);
			}
		}else if(type === "Y"){
			for (var i = date.getFullYear(); i >= date.getFullYear() - 75; i--) {
				select.eWallet.append(`<option value="${i}">${i}</option>`);
			}
		}
		select.setAttribute('type', type);
		select.selectedIndex = 1;
		setChart(type, Number(select.value));
	}

	function setChart(period, keyIndex = null, initDate = null, endDate = null){
		let dataset = {}, typeAux = period === "M" ? "getMonth" : "getFullYear", 
			type = Number(eWallet.find(`[name=rdbType]:checked`, 1).value);

		dataset.values = [];
		if (type === 1){
			dataset.titles = ["Ingresos", "Gastos"];
			let auxEarn = 0, auxExp = 0;
			if (period !== "P") {
				if (eWallet.UserData.earnings.length > 0) {
					eWallet.UserData.earnings.forEach((el, i) => {
						let auxDate = new Date(el.date);
						auxEarn += auxDate[typeAux]() - (period === "M" ? 1 : 0) === keyIndex ? el.amount : 0;
					})
				}

				if (eWallet.UserData.expenses.length > 0) {
					eWallet.UserData.expenses.forEach((el, i) => {
						let auxDate = new Date(el.date);
						auxExp += auxDate[typeAux]() - (period === "M" ? 1 : 0) === keyIndex ? el.amount : 0;
					})
				}
			}else{
				if (eWallet.UserData.earnings.length > 0) {
					eWallet.UserData.earnings.forEach((el, i) => {
						let auxDate = new Date(el.date);
						auxEarn += initDate <= auxDate && endDate >= auxDate ? el.amount : 0;
					})
				}

				if (eWallet.UserData.expenses.length > 0) {
					eWallet.UserData.expenses.forEach((el, i) => {
						let auxDate = new Date(el.date);
						auxExp += initDate <= auxDate && endDate >= auxDate ? el.amount : 0;
					})
				}
			}

			dataset.values.push(auxEarn);
			dataset.values.push(auxExp);
		}else if(type === 2 || type === 3){
			dataset.titles = ["Efectivo", "Cuentas de Ahorro", "Tarjetas de Crédito"];

			let auxCash = 0, auxAccounts = 0, auxCards = 0;
			if (eWallet.UserData[type === 2 ? "earnings" : "expenses"].length > 0) {
				eWallet.UserData[type === 2 ? "earnings" : "expenses"].forEach((el, i) => {
					let auxDate = new Date(el.date),
						timeFlag = period !== "P" ? auxDate[typeAux]() - (period === "M" ? 1 : 0) === keyIndex : initDate <= auxDate && endDate >= auxDate;

					if (el.addedTo === undefined) {
						auxCash += timeFlag ? el.amount : 0;
					}else if(el.addedTo.type === "accounts"){
						auxAccounts += timeFlag ? el.amount : 0;
					}else if(el.addedTo.typw == "creditCards"){
						auxCards += timeFlag ? el.amount : 0;
					}
				})

				dataset.values.push(auxCash);
				dataset.values.push(auxAccounts);
				dataset.values.push(auxCards);
			}
		}
		
		dataset.subs = dataset.values.map((el, i) => `$${el.toFixed(2)}`);
		genChart(eWallet.find('canvas', 1), dataset);
	}

	addEventListener('DOMContentLoaded', function(){
		eWallet.find('#data-field #dates', 1).style.display = "none";
		eWallet.find('#data-field #combo', 1).style.display = "none";
		frmData.rdbType.forEach((radio, i) => {
			radio.addEventListener('change', function(){
				radio.checked ? setOptions(frmData.rdbPeriod.value) : eWallet.toast('Seleccione un tipo de gráfica!', 2, 'red darken-1');
			});
		});

		frmData.rdbPeriod.forEach((radio, i) => {
			radio.addEventListener('change', function(){
				radio.checked ? setOptions(radio.value) : eWallet.toast('Seleccione un período de tiempo!', 2, 'red darken-1');
			});
		});

		frmData.cmbPeriod.addEventListener('change', function(){
			frmData.eWallet.validate({
				cmbPeriod: {
					required: {
						msg: "Seleccione una opción!"
					}
				}
			}, function(r){
				frmData.txtPeriod_1.eWallet.validateInput(0);
				frmData.txtPeriod_2.eWallet.validateInput(0);
				if(r){
					if (frmData.cmbPeriod.getAttribute('disabled') === null) {
						let type = frmData.cmbPeriod.getAttribute('type'), keyIndex = Number(frmData.cmbPeriod.value);
						setChart(type, keyIndex);
					}
				}else{
					eWallet.toast('Selecciona un período!', 2, 'red darken-1');
				}
			})
		});

		eWallet.find('.txtPeriod').forEach((el, i) => {
			el.addEventListener('blur', function(){
				frmData.eWallet.validate({
					txtPeriod_1: {
						required: {
							msg: "Ingrese una fecha inicial!"
						},
						condition: {
							value: frmData.txtPeriod_1.valueAsDate.getTime() === frmData.txtPeriod_2.valueAsDate.getTime() ? true : (frmData.txtPeriod_1.valueAsDate < frmData.txtPeriod_2.valueAsDate),
							msg: "La fecha inicial no debe de ser mayor a la fecha final!"
						}
					},
					txtPeriod_2: {
						required: {
							msg: "Ingrese una fecha final!"
						},
						condition: {
							value: frmData.txtPeriod_1.valueAsDate.getTime() === frmData.txtPeriod_2.valueAsDate.getTime() ? true : (frmData.txtPeriod_1.valueAsDate < frmData.txtPeriod_2.valueAsDate),
							msg: "La fecha final no debe de ser menor a la fecha inicial!"
						}
					}
				}, function(r){
					frmData.cmbPeriod.eWallet.validateInput(0);
					if(r){
						setChart("P", null, frmData.txtPeriod_1.valueAsDate, frmData.txtPeriod_2.valueAsDate);
					}else{
						eWallet.toast('Ingresa todos los datos requeridos!', 2, 'red darken-1');
					}
				})
			})
		})

		frmData.rdbPeriod[0].checked = true;
		frmData.rdbType[0].checked = true;
		frmData.cmbPeriod.selectedIndex = 1;
		setOptions('M');
		setChart('M', Number(frmData.cmbPeriod.value));
	})
})();
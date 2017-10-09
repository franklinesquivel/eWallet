(function(){
	
	document.addEventListener('DOMContentLoaded', function(){
		let tbl = eWallet.find('table tbody', 1);

		if (eWallet.UserData.expenses.length > 0) {
			eWallet.UserData.expenses.forEach((el, i) => {
				let addFlag = el.addedTo === undefined,
					auxData = addFlag ? null : eWallet.UserData[el.addedTo.type][el.addedTo.index];
				
				tbl.eWallet.append(`
					<tr>
						<td>${i+1}</td>
						<td>${el.reason}</td>
						<td>
							${addFlag ? `Efectivo` : el.addedTo.type === `accounts` ? `<h4 class="sub">Cuenta de Ahorros</h4>` : `<h4 class="sub">Tarjeta de Crédito</h4>`}
							<h5>${addFlag ? "" : auxData.bank}</h5>
							<span style="font-size: .8rem">${addFlag ? "" : `[${auxData[el.addedTo.type === "accounts" ? "accountNumber" : "cardNumber"]}]`}</span>
						</td>
						<td>$${el.amount.toFixed(2)}</td>
				`)
			});
		}else{
			tbl.eWallet.append(`
				<tr><td colspan="5" class="error-cell"><h3 class="error">No hay GASTOS registrados</h3></td></tr>
			`)
		}
	})

})();
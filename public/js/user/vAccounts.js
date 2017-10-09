(function(){
	document.addEventListener('DOMContentLoaded', function(){
		let f = true;
		while(f){
			if (eWallet.UserData !== undefined) {
				let tbl = eWallet.find('.tblAccounts tbody', 1);
				if (eWallet.UserData.accounts.length) {
					eWallet.UserData.accounts.forEach((el, i) => {
						tbl.eWallet.append(`
							<tr>
								<td>${i + 1}</td>
			                    <td>${el.bank}</td>
			                    <td>${el.accountNumber}</td>
			                    <td>$${Number(el.balance).toFixed(2)}</td>
							</tr>
						`);
					})
				}else{
					tbl.eWallet.append(`
						<tr><td colspan="4" class="error-cell"><h3 class="error">No hay CUENTAS DE AHORRO registrados</h3></td></tr>
					`)
				}
				f = false;
			}else{
				setTimeout(function(){
					f = true;
				}, 1000);
			}
		}
	})
})();
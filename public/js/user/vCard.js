(function(){
	document.addEventListener('DOMContentLoaded', function(){
		let f = true;
		while(f){
			if (eWallet.UserData !== undefined) {
				let tbl = eWallet.find('table tbody', 1);
				if (eWallet.UserData.creditCards.length) {
					eWallet.UserData.creditCards.forEach((el, i) => {
						tbl.eWallet.append(`
							<tr>
								<td>${i + 1}</td>
			                    <td>${el.bank}</td>
			                    <td>${el.cardNumber}</td>
			                    <td>${el.interest}%</td>
			                    <td>${(el.paymentDate)}</td>
			                    <td>$${Number(el.balance).toFixed(2)}</td>
							</tr>
						`);
					})
				}else{
					tbl.eWallet.append(`
						<tr><td colspan="6" class="error-cell"><h3 class="error">No hay TARJETAS DE CRÉDITO registradas</h3></td></tr>
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
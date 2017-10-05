(function(){
	document.addEventListener('DOMContentLoaded', function(e){
		let f = true;
		while(f){
			if (eWallet.UserData !== undefined) {
				let tbl = eWallet.find('.tblAccounts tbody', 1);
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
				f = false;
			}else{
				setTimeout(function(){
					f = true;
				}, 1000);
			}
		}
	})
})();
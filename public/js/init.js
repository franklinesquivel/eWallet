(function(){
	const input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=date], input[type=search], textarea'.split(',');
	document.addEventListener('DOMContentLoaded', () => {
		input_selector.forEach(i => {
			document.querySelectorAll(i).forEach(j => {
				j.addEventListener('focus', () => {
					j.previousElementSibling.classList.add("active");
				})

				j.addEventListener('blur', () => {
					if (j.value.length === 0 && j.getAttribute('placeholder') === null) {
						j.previousElementSibling.classList.remove("active");
					}
				})
			})
		});

		window.updateTextFields();
	})

	window.updateTextFields = () => {
		input_selector.forEach(i => {
			document.querySelectorAll(i).forEach(j => {
				if (j.value.length !== 0 || j.getAttribute('placeholder') !== null) {
					j.previousElementSibling.classList.add("active");
				}
			})
		});
	}
})()
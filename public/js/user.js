(()=>{
    document.addEventListener('DOMContentLoaded', function(){

        eWallet.find('#btnUnLog', 1).addEventListener('click', function(){
            eWallet.logOut(eWallet.UserData, function(){
                eWallet.sessionLocation();
            });
        })

        var slideMenu = eWallet.menu('.menu-wraper');

        // document.querySelector('#slide-menu').addEventListener('click', function(){

        //     if (eWallet.find('#_background').length == 0) eWallet.genPopOutBackground();

        //     if(document.querySelector('.menu-wraper').getAttribute('class') == 'menu-wraper active'){
        //         document.querySelector('.menu-wraper').classList.remove('active');
        //     }else{
        //         eWallet.find('#_background', 1).classList.add('active');
        //         document.querySelector('.menu-wraper').classList.add('active');
        //     }
        // });
    
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

        // document.querySelector('label').addEventListener('click',)
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
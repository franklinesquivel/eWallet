(function() {

    var menuList = [
        {
            name: "Inicio",
            icon: "home",
            href: "../"
        },
        {
            name: "Cuentas",
            icon: "monetization_on",
            subList: [
                {
                    name: "Ver",
                    icon: "visibility",
                    href: "viewAccounts"
                },
                {
                    name: "Agregar",
                    icon: "add",
                    href: "addAccounts"
                }
            ]
        },
        {
            name: "Ingresos",
            icon: "attach_money",
            subList: [
                {
                    name: "Ver",
                    icon: "visibility",
                    href: "viewEarnings"
                },
                {
                    name: "Agregar",
                    icon: "add",
                    href: "addEarnings"
                }
            ]
        },
        {
            name: "Gastos",
            icon: "money_off",
            subList: [
                {
                    name: "Ver",
                    icon: "visibility",
                    href: "viewExpenses"
                },
                {
                    name: "Agregar",
                    icon: "add",
                    href: "addExpenses"
                }
            ]
        },
        {
            name: "Tarjetas",
            icon: "credit_card",
            subList: [
                {
                    name: "Ver",
                    icon: "visibility",
                    href: "viewCard"
                },
                {
                    name: "Agregar",
                    icon: "add",
                    href: "addCard"
                }
            ]
        },
        {
            name: "Estadísticas",
            icon: "graphic_eq",
            href: "statistics"
        },
        {
            name: "Configuración",
            icon: "settings",
            href: "setting"
        },
    ];

    document.addEventListener('DOMContentLoaded', function(){

        eWallet.setMenu(menuList, eWallet.find('.menu-items', 1), function(){
            // eWallet.find('#btnUnLog', 1).addEventListener('click', function(){
            //     eWallet.logOut(function(){
            //         eWallet.sessionLocation();
            //     });
            // })

            var slideMenu = eWallet.menu('.menu-wraper');
        
            for(var i = 0; i < document.querySelectorAll('a.item-menu').length; i++){
                console.log(':p');
                eWallet.on(document, 'click', 'a.item-menu', function(){
                })

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
        });


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
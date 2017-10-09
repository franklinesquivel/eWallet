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
        });
    });
})();
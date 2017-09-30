(()=>{
    document.addEventListener('DOMContentLoaded', function(){
        document.querySelector('#slide-menu').addEventListener('click', function(){
            if(document.querySelector('.menu-wraper').getAttribute('class') == 'menu-wraper active'){
                document.querySelector('.menu-wraper').classList.remove('active');
            }else{
                document.querySelector('.menu-wraper').classList.add('active');
            }
        });
    
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
    })
})()
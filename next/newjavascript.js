    function count(event){
        event.preventDefault();
        let s = document.getElementsByName("select1")[0];
        let t = document.getElementsByName("text1");
        let r = document.getElementById("result");
        if(t[0].value ===""|| t[0].value<=0){
            r.innerHTML ="Введите корректное значение!";
            return false;
        }
        else{
            let price={
                "o1"=10;
                "o2"=20;
                "o3"=100;
                "o4"=70;
            }
            r.innerHTML ="Стоимость заказа: "+t[0].value*price+" рублей";
        }
        return false;
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        let b = document.getElementById("button_click");
        b.addEventListener('click', count);
    });

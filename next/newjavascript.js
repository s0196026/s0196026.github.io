    function count(event){
        event.preventDefault();
        let s = document.getElementsByName("select1")[0];
        let t = document.getElementsByName("text1");
        let r = document.getElementById("result");
        if(isNaN(t[0].value) || t[0].value ===""|| t[0].value<=0){
            r.innerHTML ="Введите числовое значение!";
            return false;
        }
        else{
            let price;
            if (s.value === "o1") price = 10;
            else if (s.value === "o2") price = 20;
            else if (s.value === "o3") price = 100;
            else if (s.value === "o4") price = 70;
            else price = 0;
            r.innerHTML ="Стоимость заказа: "+t[0].value*price+" рублей";
        }
        return false;
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        let b = document.getElementById("button_click");
        b.addEventListener('click', count);
    });

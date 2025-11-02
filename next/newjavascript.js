function display(){
    const s = document.getElementsByName("select1")[0];
    s.addEventListener('change', function(event){
        document.getElementById("choice_color").classList.add("d-none"); 
        document.getElementById("choice_check").classList.add("d-none");
        if(s.value === "o2"){
            document.getElementById("choice_color").classList.remove("d-none");
        }
        else if(s.value === "o3"){
            document.getElementById("choice_check").classList.remove("d-none");
        }
        else if(s.value === "o4"){
            document.getElementById("choice_color").classList.remove("d-none");
            document.getElementById("choice_check").classList.remove("d-none");
        }
    });
}

function count(){
    let s = document.getElementsByName("select1")[0];
    let t = document.getElementsByName("text1")[0];
    let d = document.getElementsByName("radio-group-2");
    let s2 = document.getElementsByName("select2")[0];
    let ch = document.getElementsByName("check2")[0];
    let r = document.getElementById("result");
    
    if(t.value === ""){
        r.innerHTML = "Поле не может быть пустым!";
        return false;
    }
    else if (isNaN(t.value) || /^0/.test(t.value)) {
        r.innerHTML = "Введите корректное числовое значение!";
        return false;
    }
    let price = {
        'o1': 10, //ни селект, ни чек бокс
        'o2': 20, //только селект
        'o3': 100, // чекбокс
        'o4': 70 //и селекст и чекбокс
    };
    let startPrice = price[s.value] || 0;
    
    let price_delivery = {
        'D1': 50,
        'D2': 40,
        'D3': 30
    };
    for (let i = 0; i < d.length; i++){
        if(d[i].checked){
            startPrice_delivery = price_delivery[d[i].value];
            break;
        }
    }
    
    let price_color = {
        'c1': 5,
        'c2': 10,
        'c3': 15
    };
    let startPrice_color = (s.value === "o2" || s.value === "o4") ? price_color[s2.value] : 0;
    
    let price_check = (s.value === "o3" || s.value === "o4") && ch.checked ? 20 : 0;
    
    resul = t.value*(startPrice + startPrice_color)+ startPrice_delivery + price_check;
    r.innerHTML ="Стоимость заказа: "+resul+" рублей";
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementsByName("select1")[0].addEventListener('change', count);
    document.getElementsByName("text1")[0].addEventListener('input', count);
    
    let d = document.getElementsByName("radio-group-2");
    for (let i = 0; i < d.length; i++) {
        d[i].addEventListener('change', count);
    }
    
    if(document.getElementsByName("select2")[0])
        document.getElementsByName("select2")[0].addEventListener('change', count);
    
    if(document.getElementById("choice_check"))
        document.getElementsByName("check2")[0].addEventListener('change', count);
    
    display();
    count();
}); 

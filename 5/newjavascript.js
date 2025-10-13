function count(){
    let s = document.getElementsByName("select1")[0];
    let t = document.getElementsByName("text1");
    let r = document.getElementById("result");
    let price;
    if (s.value === "o1") price = 10;
    else if (s.value === "o2") price = 20;
    else if (s.value === "o3") price = 100;
    else if (s.value === "o4") price = 70;
    else price = 0;
    r.innerHTML ="Стоимость заказа: "+t[0].value*price+" рублей";
    return false;
}

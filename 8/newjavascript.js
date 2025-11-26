document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById("formPopup");
    const openBtn = document.getElementById("buttonPopup");
    const closeBtn = document.querySelector(".close");

    openBtn.addEventListener('click', function () {
        popup.style.display = "block";
    });

    closeBtn.addEventListener('click', function () {
        popup.style.display = "none";
    });
    
    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
    
    // В обработчике input/change для каждого поля формы
    popup.addEventListener('change', function () {
        const formData = {
            name: document.getElementsByName('name')[0].value,
            email: document.getElementsByName('email')[0].value,
            telephone: document.getElementsByName('telephone')[0].value,
            organization: document.getElementsByName('organization')[0].value,
            massege: document.getElementsByName('massege')[0].value
        };
        localStorage.setItem('formData', JSON.stringify(formData));
    });
    
    function openPopup() {
        const saved = localStorage.getItem('formData');
        if (saved) {
            const formData = JSON.parse(saved);
            
            document.getElementsByName('name')[0].value = formData.name || '';
            document.getElementsByName('email')[0].value = formData.email || '';
            document.getElementsByName('telephone')[0].value = formData.telephone || '';
            document.getElementsByName('organization')[0].value = formData.organization || '';
            document.getElementsByName('massege')[0].value = formData.massege || '';
        }
    }
    
    function onFormSubmitSuccess() {
        localStorage.removeItem('formData');
        // или localStorage.clear() если других данных нет
    }
    document.addEventListener('popstate', function(){
        popup.style.display = "none";
    });
});

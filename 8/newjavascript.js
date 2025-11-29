document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById("formPopup");
    const openBtn = document.getElementById("buttonPopup");
    const closeBtn = document.querySelector(".close");
    const form = document.querySelector('#formPopup form');
    
    function closePopup() {
        popup.style.display = "none";
        history.back();
    }
    
    function openPopup() {
        const saved = localStorage.getItem('formData');
        if (saved) {
            const formData = JSON.parse(saved);
            document.getElementsByName('name')[0].value = formData.name || '';
            document.getElementsByName('email')[0].value = formData.email || '';
            document.getElementsByName('tel')[0].value = formData.tel || '';
            document.getElementsByName('organization')[0].value = formData.organization || '';
            document.getElementsByName('message')[0].value = formData.message || '';
        }

        popup.style.display = "block";
        history.pushState({form: 'open'}, '', '#form');
    }

    openBtn.addEventListener('click', openPopup);

    closeBtn.addEventListener('click', closePopup);

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            closePopup();
        }
    });

    window.addEventListener('popstate', function (event) {
        if (!location.hash.includes('#form')) {
            closePopup();
        }
    });
    
    popup.addEventListener('input', function () {
        const formData = {
            name: document.getElementsByName('name')[0].value,
            email: document.getElementsByName('email')[0].value,
            tel: document.getElementsByName('tel')[0].value,
            organization: document.getElementsByName('organization')[0].value,
            message: document.getElementsByName('message')[0].value
        };
        localStorage.setItem('formData', JSON.stringify(formData));
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementsByName('name')[0].value,
            email: document.getElementsByName('email')[0].value,
            tel: document.getElementsByName('tel')[0].value,
            organization: document.getElementsByName('organization')[0].value,
            message: document.getElementsByName('message')[0].value
        };

        fetch('https://formcarry.com/s/BcYyM6cOGKV', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        alert('Сообщение отправлено');
                        localStorage.removeItem('formData');
                        closePopup();
                    } else {
                        alert('Ошибка отправки');
                    }
                });
    });
});

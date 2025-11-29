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
            document.getElementById('name').value = formData.name || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('tel').value = formData.tel || '';
            document.getElementById('organization').value = formData.organization || '';
            document.getElementById('message').value = formData.message || '';
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
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            tel: document.getElementById('tel').value,
            organization: document.getElementById('organization').value,
            message: document.getElementById('message').value
        };
        localStorage.setItem('formData', JSON.stringify(formData));
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const checkbox = document.getElementById('check');
        if (!checkbox.checked) {
            alert('Необходимо согласиться с политикой обработки персональных данных');
            return;
        }
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            tel: document.getElementById('tel').value,
            organization: document.getElementById('organization').value,
            message: document.getElementById('message').value
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
                alert('Сообщение отправлено!');
                localStorage.removeItem('formData');
                closePopup();
            } else {
                alert('Ошибка отправки: ' + (data.message || 'Попробуйте еще раз'));
            }
        })
        .catch(error => {
            alert('Ошибка сети: ' + error.message);
        });
    });
});


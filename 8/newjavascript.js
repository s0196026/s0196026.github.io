document.addEventListener('DOMContentLoaded', function() {
                const popup = document.getElementById("formPopup");
                const openBtn = document.getElementById("buttonPopup");
                const closeBtn = document.querySelector(".close");
                const form = document.getElementById("popupForm");
                
                function closePopup() {
                    popup.style.display = "none";
                    if (window.location.hash === '#form') {
                        history.back();
                    }
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
                    if (window.location.hash !== '#form') {
                        history.pushState({form: 'open'}, '', '#form');
                    }
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
                
                // Сохраняем данные формы при изменении
                form.addEventListener('input', function () {
                    const formData = {
                        name: document.getElementsByName('name')[0].value,
                        email: document.getElementsByName('email')[0].value,
                        tel: document.getElementsByName('tel')[0].value,
                        organization: document.getElementsByName('organization')[0].value,
                        message: document.getElementsByName('message')[0].value
                    };
                    localStorage.setItem('formData', JSON.stringify(formData));
                });

                // Обработка отправки формы
                form.addEventListener('submit', function (event) {
                    event.preventDefault(); // Предотвращаем стандартную отправку формы

                    // Проверяем, отмечен ли чекбокс
                    const checkbox = document.getElementsByName('check')[0];
                    if (!checkbox.checked) {
                        alert('Необходимо согласиться с политикой обработки персональных данных');
                        return;
                    }

                    const formData = {
                        name: document.getElementsByName('name')[0].value,
                        email: document.getElementsByName('email')[0].value,
                        tel: document.getElementsByName('tel')[0].value,
                        organization: document.getElementsByName('organization')[0].value,
                        message: document.getElementsByName('message')[0].value
                    };

                    // Отправляем данные через Fetch API
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
                            form.reset(); // Очищаем форму
                            closePopup();
                        } else {
                            alert('Ошибка отправки: ' + (data.message || 'Неизвестная ошибка'));
                        }
                    })
                    .catch(error => {
                        console.error('Ошибка:', error);
                        alert('Произошла ошибка при отправке формы');
                    });
                });
            });

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
});
/* =====================================================
   LIVO - HOSPITALITY RESOURCE EXCHANGE
   Dashboard JavaScript
===================================================== */

/* =====================================================
   1. TOAST NOTIFICATION
===================================================== */

function toast(message) {
    const toastElement = document.getElementById("toast");
    if (!toastElement) return;

    toastElement.textContent = message;
    toastElement.classList.add("show");

    setTimeout(function () {
        toastElement.classList.remove("show");
    }, 3000);
}

/* =====================================================
   2. INITIALIZE DASHBOARD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    console.log("Livo Provider Dashboard loaded.");
});


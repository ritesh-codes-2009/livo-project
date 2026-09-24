// =====================================================
// LIVO LOGIN JAVASCRIPT
// =====================================================


// -----------------------------------------------------
// PASSWORD VISIBILITY
// -----------------------------------------------------

function togglePassword() {

    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (password.type === "password") {

        password.type = "text";

        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");

    }
}



// -----------------------------------------------------
// LOGIN FORM
// -----------------------------------------------------

document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        // Get values
        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;


        // Basic validation
        if (username === "") {

            alert("Please enter your username.");

            return;
        }


        if (password === "") {

            alert("Please enter your password.");

            return;
        }


        // Demo login
        alert("Login successful!");


        /*
        =================================================
        FLASK CONNECTION - LATER
        =================================================

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {

            if (data.success) {

                window.location.href =
                    "dashboard.html";

            } else {

                alert(data.message);

            }

        })
        .catch(error => {

            console.error("Login error:", error);

            alert("Unable to connect to server.");

        });

        */

    });
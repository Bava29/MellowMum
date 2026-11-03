
document.addEventListener("DOMContentLoaded", function () {

    const html = document.documentElement;

    const themeToggle = document.getElementById("mmThemeToggle");
    const rtlToggle = document.getElementById("mmRtlToggle");

    /* =========================================
       SHARED THEME SETTINGS
       Same storage key as public website
    ========================================= */

    const themeKey = "mellowmum-theme";

    function applyTheme(isDark) {

        html.classList.toggle("dark-mode", isDark);

        if (themeToggle) {

            themeToggle.innerHTML = isDark
                ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
                : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';

            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                String(isDark)
            );
        }
    }

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem(themeKey);
    } catch (error) {
        console.warn("Theme preference unavailable.");
    }

    applyTheme(savedTheme === "dark");

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const isDark = !html.classList.contains("dark-mode");

            applyTheme(isDark);

            try {
                localStorage.setItem(
                    themeKey,
                    isDark ? "dark" : "light"
                );
            } catch (error) {
                console.warn("Unable to save theme preference.");
            }

        });
    }


    /* =========================================
       SHARED RTL SETTINGS
       Same storage key as public main.js
    ========================================= */

    const rtlKey = "mellowmum-rtl";

    function applyDirection(isRTL) {

        html.setAttribute(
            "dir",
            isRTL ? "rtl" : "ltr"
        );

        if (rtlToggle) {

            rtlToggle.setAttribute(
                "aria-pressed",
                String(isRTL)
            );

            rtlToggle.setAttribute(
                "aria-label",
                isRTL
                    ? "Switch to left-to-right layout"
                    : "Switch to right-to-left layout"
            );

            rtlToggle.setAttribute(
                "title",
                isRTL
                    ? "Switch to LTR layout"
                    : "Switch to RTL layout"
            );
        }
    }

    let savedDirection = null;

    try {
        savedDirection = localStorage.getItem(rtlKey);
    } catch (error) {
        console.warn("RTL preference unavailable.");
    }

    /* Load public website RTL preference */
    applyDirection(savedDirection === "true");

    if (rtlToggle) {

        rtlToggle.addEventListener("click", function () {

            const isRTL =
                html.getAttribute("dir") !== "rtl";

            applyDirection(isRTL);

            try {
                localStorage.setItem(
                    rtlKey,
                    String(isRTL)
                );
            } catch (error) {
                console.warn("Unable to save RTL preference.");
            }

        });
    }


    /* =========================================
       SHOW / HIDE PASSWORD
    ========================================= */

    document.querySelectorAll(".mm-password-toggle").forEach(function (button) {

        button.addEventListener("click", function () {

            const targetId =
                button.getAttribute("data-password-target");

            const input = document.getElementById(targetId);

            if (!input) return;

            const show = input.type === "password";

            input.type = show ? "text" : "password";

            button.innerHTML = show
                ? '<i class="fa-regular fa-eye-slash" aria-hidden="true"></i>'
                : '<i class="fa-regular fa-eye" aria-hidden="true"></i>';

            button.setAttribute(
                "aria-label",
                show ? "Hide password" : "Show password"
            );

            button.setAttribute(
                "aria-pressed",
                String(show)
            );

        });

    });


    /* =========================================
       LOGIN FORM VALIDATION
    ========================================= */

    const loginForm = document.getElementById("mmLoginForm");
    const loginStatus = document.getElementById("mmLoginStatus");

    if (loginForm && loginStatus) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!loginForm.checkValidity()) {

                loginForm.reportValidity();
                return;
            }

            loginStatus.textContent =
                "Your details are valid. Connect an authentication backend to sign in.";

        });
    }


    /* =========================================
       REGISTER FORM VALIDATION
    ========================================= */

    const registerForm = document.getElementById("mmRegisterForm");
    const registerStatus = document.getElementById("mmRegisterStatus");

    if (registerForm && registerStatus) {

        const password =
            document.getElementById("mmRegisterPassword");

        /* Correct ID from register.html */
        const confirmPassword =
            document.getElementById("mmRegisterConfirmPassword");

        if (confirmPassword && password) {

            confirmPassword.addEventListener("input", function () {
                confirmPassword.setCustomValidity("");
            });

            password.addEventListener("input", function () {
                confirmPassword.setCustomValidity("");
            });
        }

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!registerForm.checkValidity()) {

                registerForm.reportValidity();
                return;
            }

            /* Confirm password validation */
            if (
                password &&
                confirmPassword &&
                password.value !== confirmPassword.value
            ) {

                confirmPassword.setCustomValidity(
                    "Passwords do not match."
                );

                confirmPassword.reportValidity();

                confirmPassword.setCustomValidity("");

                confirmPassword.focus();

                return;
            }

            registerStatus.textContent =
                "Your form is valid. Connect an authentication backend to create your account.";

        });
    }


    /* =========================================
       SOCIAL LOGIN PLACEHOLDERS
    ========================================= */

    document.querySelectorAll("[data-social]").forEach(function (button) {

        button.addEventListener("click", function () {

            alert(
                button.getAttribute("data-social") +
                " sign-in needs to be configured with its authentication provider."
            );

        });

    });

});

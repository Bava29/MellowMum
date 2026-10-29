document.addEventListener("DOMContentLoaded", function () {
    const html = document.documentElement;
    const themeToggle = document.getElementById("mmThemeToggle");
    const rtlToggle = document.getElementById("mmRtlToggle");

    /* Dark mode */
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
        }
    }

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("mellowmum-theme");
    } catch (error) { }

    applyTheme(
        savedTheme
            ? savedTheme === "dark"
            : window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const isDark = !html.classList.contains("dark-mode");
            applyTheme(isDark);

            try {
                localStorage.setItem(
                    "mellowmum-theme",
                    isDark ? "dark" : "light"
                );
            } catch (error) { }
        });
    }

    /* RTL toggle */
    function applyDirection(isRTL) {
        html.setAttribute("dir", isRTL ? "rtl" : "ltr");

        if (rtlToggle) {
            rtlToggle.setAttribute("aria-pressed", String(isRTL));
            rtlToggle.setAttribute(
                "title",
                isRTL ? "Switch to LTR layout" : "Switch to RTL layout"
            );
        }
    }

    let savedDirection = null;

    try {
        savedDirection = localStorage.getItem("mellowmum-auth-direction");
    } catch (error) { }

    applyDirection(savedDirection === "rtl");

    if (rtlToggle) {
        rtlToggle.addEventListener("click", function () {
            const isRTL = html.getAttribute("dir") !== "rtl";
            applyDirection(isRTL);

            try {
                localStorage.setItem(
                    "mellowmum-auth-direction",
                    isRTL ? "rtl" : "ltr"
                );
            } catch (error) { }
        });
    }

    /* Show / hide password */
    document.querySelectorAll(".mm-password-toggle").forEach(function (button) {
        button.addEventListener("click", function () {
            const targetId = button.getAttribute("data-password-target");
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

            button.setAttribute("aria-pressed", String(show));
        });
    });

    /* Login form - frontend validation only */
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

    /* Register form - frontend validation only */
    const registerForm = document.getElementById("mmRegisterForm");
    const registerStatus = document.getElementById("mmRegisterStatus");

    if (registerForm && registerStatus) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!registerForm.checkValidity()) {
                registerForm.reportValidity();
                return;
            }

            const password = document.getElementById("mmRegisterPassword");
            const confirmPassword = document.getElementById("mmRegisterConfirm");

            if (password && confirmPassword &&
                password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity("Passwords do not match.");
                confirmPassword.reportValidity();
                confirmPassword.setCustomValidity("");
                confirmPassword.focus();
                return;
            }

            registerStatus.textContent =
                "Your form is valid. Connect an authentication backend to create your account.";
        });
    }

    /* Social login placeholders */
    document.querySelectorAll("[data-social]").forEach(function (button) {
        button.addEventListener("click", function () {
            alert(
                button.getAttribute("data-social") +
                " sign-in needs to be configured with its authentication provider."
            );
        });
    });
});


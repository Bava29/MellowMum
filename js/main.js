
/* ==============================
   MELLOWMUM HEADER JAVASCRIPT
============================== */

document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;

    // Menu elements
    const menuToggle = document.getElementById("mm-menu-toggle");
    const mobileMenu = document.getElementById("mm-mobile-menu");
    const menuIcon = menuToggle?.querySelector("i");

    // Theme buttons
    const desktopTheme = document.getElementById("mm-desktop-theme");
    const mobileTheme = document.getElementById("mm-mobile-theme");

    // RTL buttons
    const desktopRtl = document.getElementById("mm-desktop-rtl");
    const mobileRtl = document.getElementById("mm-mobile-rtl");

    const responsiveQuery = window.matchMedia("(max-width: 1024px)");

    /* ------------------------------
       OPEN / CLOSE MOBILE MENU
    ------------------------------ */

    function closeMenu() {
        if (!menuToggle || !mobileMenu) return;

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        mobileMenu.classList.remove("is-open");
        mobileMenu.setAttribute("aria-hidden", "true");
        mobileMenu.inert = true;

        if (menuIcon) {
            menuIcon.className = "fa-solid fa-bars";
        }
    }

    function openMenu() {
        if (!menuToggle || !mobileMenu) return;

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");

        mobileMenu.classList.add("is-open");
        mobileMenu.setAttribute("aria-hidden", "false");
        mobileMenu.inert = false;

        if (menuIcon) {
            menuIcon.className = "fa-solid fa-xmark";
        }
    }

    menuToggle?.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        isOpen ? closeMenu() : openMenu();
    });

    // Close when a navigation link is clicked
    mobileMenu?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close when clicking outside the header
    document.addEventListener("click", (event) => {
        if (
            mobileMenu?.classList.contains("is-open") &&
            !event.target.closest(".mm-header")
        ) {
            closeMenu();
        }
    });

    // Close with Escape key
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            mobileMenu?.classList.contains("is-open")
        ) {
            closeMenu();
            menuToggle?.focus();
        }
    });

    // Close menu when switching back to desktop
    responsiveQuery.addEventListener("change", (event) => {
        if (!event.matches) {
            closeMenu();
        }
    });

    /* ------------------------------
       DARK MODE
    ------------------------------ */

    const themeKey = "mellowmum-theme";

    function applyTheme(isDark) {
        html.classList.toggle("dark-mode", isDark);

        const iconClass = isDark
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

        [desktopTheme, mobileTheme].forEach((button) => {
            if (!button) return;

            const icon = button.querySelector("i");

            if (icon) {
                icon.className = iconClass;
            }

            button.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

            button.setAttribute("aria-pressed", String(isDark));
        });
    }

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem(themeKey);
    } catch (error) {
        // Continue without saved preferences if storage is unavailable.
    }

    applyTheme(savedTheme === "dark");

    function toggleTheme() {
        const isDark = !html.classList.contains("dark-mode");

        applyTheme(isDark);

        try {
            localStorage.setItem(
                themeKey,
                isDark ? "dark" : "light"
            );
        } catch (error) {
            // Theme still works for the current page.
        }
    }

    desktopTheme?.addEventListener("click", toggleTheme);
    mobileTheme?.addEventListener("click", toggleTheme);

    /* ------------------------------
       RTL MODE
    ------------------------------ */

    const rtlKey = "mellowmum-rtl";

    function applyRtl(isRtl) {
        html.setAttribute("dir", isRtl ? "rtl" : "ltr");

        [desktopRtl, mobileRtl].forEach((button) => {
            if (!button) return;

            button.setAttribute("aria-pressed", String(isRtl));

            button.setAttribute(
                "aria-label",
                isRtl ? "Switch to left-to-right layout" :
                    "Switch to right-to-left layout"
            );
        });

        if (mobileRtl) {
            const label = mobileRtl.querySelector("span");

            if (label) {
                label.textContent = isRtl ? "LTR Mode" : "RTL Mode";
            }
        }
    }

    let savedRtl = null;

    try {
        savedRtl = localStorage.getItem(rtlKey);
    } catch (error) {
        // Continue with the default LTR direction.
    }

    applyRtl(savedRtl === "true");

    function toggleRtl() {
        const isRtl = html.getAttribute("dir") !== "rtl";

        applyRtl(isRtl);

        try {
            localStorage.setItem(rtlKey, String(isRtl));
        } catch (error) {
            // RTL still works for the current page.
        }
    }

    desktopRtl?.addEventListener("click", toggleRtl);
    mobileRtl?.addEventListener("click", toggleRtl);

    // Initialize responsive menu state
    closeMenu();
});


/* Footer: Current year */

const footerYear = document.getElementById("mm-footer-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

/* Footer: Back to top */

const backToTop = document.querySelector(".mm-back-top");

backToTop?.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* MellowMum Vision & Mission Parallax */

document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".mm-vm-parallax");
    const background = document.querySelector(".mm-vm-parallax-bg");

    if (!section || !background) return;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let ticking = false;

    function updateParallax() {
        ticking = false;

        if (reduceMotion.matches) {
            background.style.transform = "translate3d(0, 0, 0)";
            return;
        }

        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.bottom < 0 || rect.top > viewportHeight) return;

        const distance = (viewportHeight - rect.top) * 0.12;

        background.style.transform =
            `translate3d(0, ${distance}px, 0)`;
    }

    function requestParallaxUpdate() {
        if (ticking) return;

        ticking = true;
        window.requestAnimationFrame(updateParallax);
    }

    window.addEventListener("scroll", requestParallaxUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestParallaxUpdate);

    if (reduceMotion.addEventListener) {
        reduceMotion.addEventListener("change", requestParallaxUpdate);
    }

    updateParallax();
});

/* MellowMum FAQ Accordion */

document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".mm-about-faq-item");

    faqItems.forEach(function (item) {
        const question = item.querySelector(".mm-about-faq-question");
        const icon = item.querySelector(".mm-about-faq-toggle i");

        question.addEventListener("click", function () {
            const wasOpen = item.classList.contains("active");

            /* Close all FAQ items */
            faqItems.forEach(function (faqItem) {
                faqItem.classList.remove("active");

                const faqButton = faqItem.querySelector(
                    ".mm-about-faq-question"
                );
                const faqIcon = faqItem.querySelector(
                    ".mm-about-faq-toggle i"
                );

                faqButton.setAttribute("aria-expanded", "false");
                faqIcon.classList.remove("fa-minus");
                faqIcon.classList.add("fa-plus");
            });

            /* Open clicked item if it was closed */
            if (!wasOpen) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");

                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            }
        });
    });
});

/* MellowMum Contact Form - Frontend Validation */

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("mmContactForm");
    const status = document.getElementById("mmContactFormStatus");

    if (!form || !status) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        status.textContent =
            "Your form is valid. Connect a backend or form service to send your message.";
        status.style.background = "#F8EAE8";
        status.style.color = "#49304F";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const html = document.documentElement;

    const themeToggle = document.getElementById("shopThemeToggle");
    const rtlToggle = document.getElementById("shopRtlToggle");
    const menuToggle = document.getElementById("mobileMenuToggle");
    const mainNav = document.getElementById("mainNav");

    const grid = document.getElementById("productGrid");
    const cards = Array.from(grid.querySelectorAll(".product-card"));
    const search = document.getElementById("productSearch");
    const sortSelect = document.getElementById("sortSelect");
    const resultCount = document.getElementById("resultCount");
    const activeFilters = document.getElementById("activeFilters");
    const activeFilterCount = document.getElementById("activeFilterCount");

    const priceRange = document.getElementById("priceRange");
    const priceMaxLabel = document.getElementById("priceMaxLabel");

    const filterPanel = document.getElementById("filterPanel");
    const filterBackdrop = document.getElementById("filterBackdrop");
    const filterOpen = document.getElementById("filterOpen");
    const filterClose = document.getElementById("filterClose");
    const applyFilters = document.getElementById("applyFilters");

    const clearAll = document.getElementById("clearAll");
    const emptyClear = document.getElementById("emptyClear");
    const emptyState = document.getElementById("emptyState");

    const bagCount = document.getElementById("bagCount");
    const toast = document.getElementById("shopToast");

    let bag = 0;
    let toastTimer;

    /* Safe localStorage helpers */
    function safeGet(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function safeSet(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) { }
    }

    /* Dark mode */
    function applyTheme(dark) {
        html.classList.toggle("dark-mode", dark);

        if (themeToggle) {
            themeToggle.innerHTML = dark
                ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
                : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';

            themeToggle.setAttribute(
                "aria-label",
                dark ? "Switch to light mode" : "Switch to dark mode"
            );

            themeToggle.title = dark
                ? "Switch to light mode"
                : "Switch to dark mode";
        }
    }

    const savedTheme = safeGet("mellowmum-theme");

    applyTheme(
        savedTheme
            ? savedTheme === "dark"
            : window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    themeToggle?.addEventListener("click", function () {
        const dark = !html.classList.contains("dark-mode");

        applyTheme(dark);
        safeSet("mellowmum-theme", dark ? "dark" : "light");
    });

    /* RTL mode */
    function applyDirection(rtl) {
        html.setAttribute("dir", rtl ? "rtl" : "ltr");

        if (rtlToggle) {
            rtlToggle.setAttribute("aria-pressed", String(rtl));
            rtlToggle.title = rtl
                ? "Switch to LTR layout"
                : "Switch to RTL layout";
        }
    }

    applyDirection(safeGet("mellowmum-rtl") === "true");

    rtlToggle?.addEventListener("click", function () {
        const rtl = html.getAttribute("dir") !== "rtl";

        applyDirection(rtl);
        safeSet("mellowmum-rtl", String(rtl));
    });

    /* Mobile navigation */
    menuToggle?.addEventListener("click", function () {
        const open = mainNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute(
            "aria-label",
            open ? "Close navigation" : "Open navigation"
        );

        menuToggle.innerHTML = open
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    mainNav?.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mainNav.classList.remove("open");
            menuToggle?.setAttribute("aria-expanded", "false");

            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    });

    /* Read selected filters */
    function selected(name) {
        return Array.from(
            document.querySelectorAll(
                'input[name="' + name + '"]:checked'
            )
        ).map(function (input) {
            return input.value;
        });
    }

    function money(value) {
        return Number(value).toLocaleString("en-IN");
    }

    function currentFilters() {
        return {
            categories: selected("category"),
            stages: selected("stage"),
            sizes: selected("size"),
            maxPrice: Number(priceRange.value),
            query: search.value.trim().toLowerCase()
        };
    }

    /* Decide whether a product matches the filters */
    function matches(card, filters) {
        const categories = (card.dataset.category || "").split(",");
        const stages = (card.dataset.stage || "").split(",");
        const sizes = (card.dataset.sizes || "").split(",");

        const searchable = (
            card.dataset.name + " " +
            card.dataset.category + " " +
            card.querySelector(".product-category").textContent
        ).toLowerCase();

        const categoryMatch =
            !filters.categories.length ||
            filters.categories.some(function (category) {
                return categories.includes(category);
            });

        const stageMatch =
            !filters.stages.length ||
            filters.stages.some(function (stage) {
                return stages.includes(stage);
            });

        const sizeMatch =
            !filters.sizes.length ||
            filters.sizes.some(function (size) {
                return sizes.includes(size);
            });

        const priceMatch =
            Number(card.dataset.price) <= filters.maxPrice;

        const searchMatch =
            !filters.query || searchable.includes(filters.query);

        return categoryMatch && stageMatch && sizeMatch &&
            priceMatch && searchMatch;
    }

    /* Show selected filters as removable chips */
    function renderChips(filters) {
        activeFilters.innerHTML = "";

        const entries = [];

        filters.categories.forEach(function (value) {
            entries.push({
                label: value,
                name: "category",
                value: value
            });
        });

        filters.stages.forEach(function (value) {
            entries.push({
                label: value,
                name: "stage",
                value: value
            });
        });

        filters.sizes.forEach(function (value) {
            entries.push({
                label: "Size " + value,
                name: "size",
                value: value
            });
        });

        if (filters.maxPrice < 3999) {
            entries.push({
                label: "Up to ₹" + money(filters.maxPrice),
                name: "price",
                value: "price"
            });
        }

        entries.forEach(function (entry) {
            const chip = document.createElement("span");
            chip.className = "filter-chip";

            const label = document.createElement("span");
            label.textContent = entry.label;

            const remove = document.createElement("button");
            remove.type = "button";
            remove.setAttribute(
                "aria-label",
                "Remove " + entry.label + " filter"
            );
            remove.innerHTML = '<i class="fa-solid fa-xmark"></i>';

            remove.addEventListener("click", function () {
                if (entry.name === "price") {
                    priceRange.value = 3999;
                    priceMaxLabel.textContent = "3,999";
                } else {
                    document
                        .querySelectorAll('input[name="' + entry.name + '"]')
                        .forEach(function (input) {
                            if (input.value === entry.value) {
                                input.checked = false;
                            }
                        });
                }

                renderProducts();
            });

            chip.append(label, remove);
            activeFilters.appendChild(chip);
        });

        const count =
            filters.categories.length +
            filters.stages.length +
            filters.sizes.length +
            (filters.maxPrice < 3999 ? 1 : 0);

        activeFilterCount.textContent = String(count);
    }

    /* Filter and sort product cards */
    function renderProducts() {
        const filters = currentFilters();

        const visible = cards.filter(function (card) {
            return matches(card, filters);
        });

        const mode = sortSelect.value;

        visible.sort(function (a, b) {
            if (mode === "price-low") {
                return Number(a.dataset.price) - Number(b.dataset.price);
            }

            if (mode === "price-high") {
                return Number(b.dataset.price) - Number(a.dataset.price);
            }

            if (mode === "newest") {
                return Number(b.dataset.date) - Number(a.dataset.date);
            }

            return Number(b.dataset.popular) - Number(a.dataset.popular);
        });

        cards.forEach(function (card) {
            card.hidden = true;
        });

        visible.forEach(function (card) {
            card.hidden = false;
            grid.insertBefore(card, emptyState);
        });

        emptyState.hidden = visible.length !== 0;

        resultCount.textContent =
            visible.length === cards.length
                ? "Showing all " + visible.length + " products"
                : "Showing " + visible.length + " of " + cards.length + " products";

        renderChips(filters);
    }

    /* Update products when filters change */
    document
        .querySelectorAll('.filter-panel input[type="checkbox"]')
        .forEach(function (input) {
            input.addEventListener("change", renderProducts);
        });

    search.addEventListener("input", renderProducts);
    sortSelect.addEventListener("change", renderProducts);

    priceRange.addEventListener("input", function () {
        priceMaxLabel.textContent = money(priceRange.value);
        renderProducts();
    });

    /* Clear individual filter groups */
    document.querySelectorAll("[data-clear]").forEach(function (button) {
        button.addEventListener("click", function () {
            const group = button.dataset.clear;

            if (group === "price") {
                priceRange.value = 3999;
                priceMaxLabel.textContent = "3,999";
            } else {
                document
                    .querySelectorAll('input[name="' + group + '"]')
                    .forEach(function (input) {
                        input.checked = false;
                    });
            }

            renderProducts();
        });
    });

    /* Clear every filter */
    function clearFilters() {
        document
            .querySelectorAll('.filter-panel input[type="checkbox"]')
            .forEach(function (input) {
                input.checked = false;
            });

        priceRange.value = 3999;
        priceMaxLabel.textContent = "3,999";
        search.value = "";
        sortSelect.value = "popular";

        renderProducts();
    }

    clearAll.addEventListener("click", clearFilters);
    emptyClear.addEventListener("click", clearFilters);

    /* Mobile filter drawer */
    function openFilters() {
        filterPanel.classList.add("open");
        filterBackdrop.classList.add("show");
        document.body.style.overflow = "hidden";
        filterOpen.setAttribute("aria-expanded", "true");
        filterClose.focus();
    }

    function closeFilters() {
        filterPanel.classList.remove("open");
        filterBackdrop.classList.remove("show");
        document.body.style.overflow = "";
        filterOpen.setAttribute("aria-expanded", "false");
        filterOpen.focus();
    }

    filterOpen.addEventListener("click", openFilters);
    filterClose.addEventListener("click", closeFilters);
    filterBackdrop.addEventListener("click", closeFilters);
    applyFilters.addEventListener("click", closeFilters);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && filterPanel.classList.contains("open")) {
            closeFilters();
        }
    });

    /* Category cards apply matching category filter */
    document.querySelectorAll(".category-card").forEach(function (button) {
        button.addEventListener("click", function () {
            const value = button.dataset.category;

            document
                .querySelectorAll('input[name="category"]')
                .forEach(function (input) {
                    input.checked = input.value === value;
                });

            renderProducts();

            document.getElementById("shop-products").scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    /* Toast messages */
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 2600);
    }

    /* Wishlist demo */
    document.querySelectorAll(".wishlist-button").forEach(function (button) {
        button.addEventListener("click", function () {
            const liked = button.classList.toggle("is-liked");

            button.innerHTML = liked
                ? '<i class="fa-solid fa-heart"></i>'
                : '<i class="fa-regular fa-heart"></i>';

            button.setAttribute("aria-pressed", String(liked));

            const name = button.closest(".product-card").dataset.name;

            showToast(
                liked
                    ? name + " added to your wishlist"
                    : name + " removed from your wishlist"
            );
        });
    });

    /* Shopping bag demo */
    document.querySelectorAll("[data-add]").forEach(function (button) {
        button.addEventListener("click", function () {
            bag += 1;
            bagCount.textContent = String(bag);

            document.getElementById("bagButton").setAttribute(
                "aria-label",
                "Shopping bag, " + bag + " items"
            );

            const product = button.closest(".product-card").dataset.name;
            showToast(product + " added to your bag");
        });
    });

    document.getElementById("bagButton").addEventListener("click", function () {
        showToast(
            "Your bag has " + bag +
            (bag === 1 ? " item" : " items") +
            ". Checkout needs a store backend."
        );
    });

    /* Newsletter demo */
    document.getElementById("newsletterForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("newsletterEmail");

        if (!email.checkValidity()) {
            email.reportValidity();
            return;
        }

        document.getElementById("newsletterStatus").textContent =
            "Thanks for joining MellowMum! Connect a newsletter service to save subscriptions.";

        email.value = "";
    });

    /* Footer year and initial render */
    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

    renderProducts();
});


/* SECTION 2: MEASUREMENT UNIT SWITCH */
(() => {
    const section = document.querySelector(".sg-measure-section");

    if (!section) return;

    const unitButtons = section.querySelectorAll(".sg-measure-unit-btn");
    const values = section.querySelectorAll(".sg-measure-example strong");

    function setMeasurementUnit(unit) {
        unitButtons.forEach((button) => {
            const isActive = button.dataset.unit === unit;

            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        values.forEach((value) => {
            value.textContent =
                unit === "in" ? value.dataset.in : value.dataset.cm;
        });
    }

    unitButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setMeasurementUnit(button.dataset.unit);
        });
    });
})();



/* SECTION 3: SIZE CHART CM / INCHES SWITCH */
(() => {
    const section = document.querySelector(".sg-chart-section");
    if (!section) return;

    const buttons = section.querySelectorAll("[data-chart-unit]");
    const cells = section.querySelectorAll("tbody td[data-cm][data-in]");

    function updateChart(unit) {
        buttons.forEach((button) => {
            const active = button.dataset.chartUnit === unit;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        cells.forEach((cell) => {
            cell.textContent = unit === "in" ? cell.dataset.in : cell.dataset.cm;
        });
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            updateChart(button.dataset.chartUnit);
        });
    });
})();

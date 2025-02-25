document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const resultContainer = document.getElementById("result-container");
    const summaryContainer = document.getElementById("summary-container");
    const tabResult = document.getElementById("tab-result");
    const tabSummary = document.getElementById("tab-summary");
    const tabWikipedia = document.getElementById("tab-wikipedia");
    const tabs = document.getElementById("tabs");
    const backToTopButton = document.getElementById("back-to-top");

    // Correction de l'icône du mode sombre/clair
    function updateThemeIcon() {
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    }

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    updateThemeIcon();

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        updateThemeIcon();
    });

    // Gestion des recherches
    function searchWiki() {
        const query = searchInput.value.trim();
        if (query === "") return;

        fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                resultContainer.innerHTML = `<p>${data.extract || "Aucune information trouvée."}</p>`;
                tabs.classList.remove("hidden");
            })
            .catch(() => {
                resultContainer.innerHTML = "<p>Erreur lors de la récupération des données.</p>";
            });

        tabResult.classList.add("active");
        tabSummary.classList.remove("active");
        tabWikipedia.classList.remove("active");
        resultContainer.classList.remove("hidden");
        summaryContainer.classList.add("hidden");
    }

    searchButton.addEventListener("click", searchWiki);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") searchWiki();
    });

    // Gestion des onglets
    tabResult.addEventListener("click", () => {
        tabResult.classList.add("active");
        tabSummary.classList.remove("active");
        tabWikipedia.classList.remove("active");
        resultContainer.classList.remove("hidden");
        summaryContainer.classList.add("hidden");
    });

    tabSummary.addEventListener("click", () => {
        tabSummary.classList.add("active");
        tabResult.classList.remove("active");
        tabWikipedia.classList.remove("active");
        resultContainer.classList.add("hidden");
        summaryContainer.classList.remove("hidden");
    });

    tabWikipedia.addEventListener("click", () => {
        window.open(`https://fr.wikipedia.org/wiki/${encodeURIComponent(searchInput.value)}`, "_blank");
    });

    // Bouton retour en haut
    window.addEventListener("scroll", () => {
        backToTopButton.classList.toggle("show", window.scrollY > 200);
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// Fonction mode sombre/clair
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
});

// Fonction de recherche
function searchWiki() {
    const query = document.getElementById("search").value.trim();
    if (query === "") return;

    const url = `https://fr.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(query)}&format=json&origin=*`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById("results");
            const summaryDiv = document.getElementById("summary");
            const tabs = document.getElementById("tabs");

            if (data.parse) {
                resultsDiv.innerHTML = data.parse.text["*"];
                summaryDiv.style.display = "none";
                resultsDiv.style.display = "block";
                tabs.style.display = "flex";

                document.getElementById("result-tab").classList.add("active");
                document.getElementById("summary-tab").classList.remove("active");
                document.getElementById("wikipedia-tab").classList.remove("active");

            } else {
                resultsDiv.innerHTML = "<p>Aucun résultat trouvé.</p>";
                summaryDiv.style.display = "none";
                tabs.style.display = "none";
            }
        })
        .catch(() => {
            document.getElementById("results").innerHTML = "<p>Erreur lors de la récupération des données.</p>";
        });
}

// Événements de recherche
document.getElementById("search-button").addEventListener("click", searchWiki);
document.getElementById("search").addEventListener("keypress", function (event) {
    if (event.key === "Enter") searchWiki();
});

// Onglets
document.getElementById("result-tab").addEventListener("click", () => {
    document.getElementById("results").style.display = "block";
    document.getElementById("summary").style.display = "none";
    document.getElementById("result-tab").classList.add("active");
    document.getElementById("summary-tab").classList.remove("active");
    document.getElementById("wikipedia-tab").classList.remove("active");
});

document.getElementById("summary-tab").addEventListener("click", () => {
    document.getElementById("results").style.display = "none";
    document.getElementById("summary").style.display = "block";
    document.getElementById("result-tab").classList.remove("active");
    document.getElementById("summary-tab").classList.add("active");
    document.getElementById("wikipedia-tab").classList.remove("active");
});

document.getElementById("wikipedia-tab").addEventListener("click", () => {
    const query = document.getElementById("search").value.trim();
    if (query === "") return;
    window.open(`https://fr.wikipedia.org/wiki/${encodeURIComponent(query)}`, "_blank");
});

// Mode sombre/clair
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
});

// Fonction de recherche
function searchWiki() {
    let query = document.getElementById("search").value.trim();
    if (query === "") return;

    let url = `https://fr.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(query)}&format=json&origin=*`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";

            if (data.parse) {
                let content = data.parse.text["*"];
                let tempDiv = document.createElement("div");
                tempDiv.innerHTML = content;

                tempDiv.querySelectorAll(".infobox, .navbox, .metadata, .reference").forEach(el => el.remove());

                let result = document.createElement("div");
                result.innerHTML = tempDiv.innerHTML;

                resultsDiv.appendChild(result);
                resultsDiv.style.display = "block";

                document.getElementById("tabs").style.display = "flex";
                document.getElementById("result-tab").classList.add("active");
                document.getElementById("summary-tab").classList.remove("active");
                document.getElementById("wikipedia-tab").classList.remove("active");

                // Réinitialisation de l'onglet résumé
                document.getElementById("summary").style.display = "none";
            } else {
                resultsDiv.innerHTML = "<p>Aucun résultat trouvé.</p>";
                document.getElementById("tabs").style.display = "none";
            }
        })
        .catch(() => {
            document.getElementById("results").innerHTML = "<p>Erreur lors de la récupération des données.</p>";
        });
}

// Événements de recherche
document.getElementById("search-button").addEventListener("click", searchWiki);
document.getElementById("search").addEventListener("keypress", function(event) {
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
    let query = document.getElementById("search").value.trim();
    if (query === "") return;
    window.open(`https://fr.wikipedia.org/wiki/${encodeURIComponent(query)}`, "_blank");
});

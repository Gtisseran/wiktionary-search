// Mode sombre/clair
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Recherche Wikipedia
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

                document.getElementById("wiki-link").href = `https://fr.wikipedia.org/wiki/${encodeURIComponent(query)}`;
                document.getElementById("wiki-link").style.display = "inline";

                document.getElementById("tabs").style.display = "flex";
                document.getElementById("result-tab").classList.add("active");
            } else {
                resultsDiv.innerHTML = "<p>Aucun résultat trouvé.</p>";
            }
        })
        .catch(() => {
            document.getElementById("results").innerHTML = "<p>Erreur lors de la récupération des données.</p>";
        });
}

// Écouteurs d'événements
document.getElementById("search-button").addEventListener("click", searchWiki);
document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") searchWiki();
});

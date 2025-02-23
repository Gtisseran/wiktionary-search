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

                tempDiv.querySelectorAll(".infobox, .navbox, .metadata, .reference, .mw-editsection").forEach(el => el.remove());

                tempDiv.querySelectorAll("a").forEach(link => {
                    if (link.href.includes("/wiki/")) {
                        link.href = "https://fr.wikipedia.org" + link.getAttribute("href");
                        link.target = "_blank";
                    }
                });

                let result = document.createElement("div");
                result.classList.add("result");
                result.innerHTML = `<div>${tempDiv.innerHTML}</div>`;

                resultsDiv.appendChild(result);
                resultsDiv.style.display = "block";

                // Afficher le lien vers Wikipédia
                let wikiLink = document.getElementById("wiki-link");
                wikiLink.href = `https://fr.wikipedia.org/wiki/${encodeURIComponent(query)}`;
                wikiLink.style.display = "inline";

                // Déplacer la barre de recherche en haut
                document.getElementById("search-box").classList.add("search-move");
            } else {
                resultsDiv.innerHTML = "<p>Aucun résultat trouvé.</p>";
            }
        })
        .catch(error => {
            document.getElementById("results").innerHTML = "<p>Erreur lors de la récupération des données.</p>";
        });
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        searchWiki();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

window.onload = function() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
};

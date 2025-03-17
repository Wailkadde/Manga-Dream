const mangaListDiv = document.getElementById("mangaList");

fetch("https://api.mangadex.org/manga?limit=10")
    .then(response => response.json())
    .then(data => {
        data.data.forEach(manga => {
            const mangaElement = document.createElement("div");
            mangaElement.className = "manga-item";
            mangaElement.innerHTML = `
                <img src="https://uploads.mangadex.org/covers/${manga.id}/.jpg" alt="${manga.attributes.title.en}" />
                <p>${manga.attributes.title.en}</p>
            `;
            mangaElement.onclick = () => {
                window.location.href = `details.html?id=${manga.id}`;
            };
            mangaListDiv.appendChild(mangaElement);
        });
    })
    .catch(error => console.error("حدث خطأ:", error));

function searchManga() {
    const query = document.getElementById("searchBox").value;
    if (!query) return;

    mangaListDiv.innerHTML = "جاري البحث...";
    fetch(`https://api.mangadex.org/manga?title=${query}`)
        .then(response => response.json())
        .then(data => {
            mangaListDiv.innerHTML = "";
            data.data.forEach(manga => {
                const mangaElement = document.createElement("div");
                mangaElement.className = "manga-item";
                mangaElement.innerHTML = `
                    <img src="https://uploads.mangadex.org/covers/${manga.id}/.jpg" alt="${manga.attributes.title.en}" />
                    <p>${manga.attributes.title.en}</p>
                `;
                mangaElement.onclick = () => {
                    window.location.href = `details.html?id=${manga.id}`;
                };
                mangaListDiv.appendChild(mangaElement);
            });
        })
        .catch(error => console.error("حدث خطأ:", error));
}
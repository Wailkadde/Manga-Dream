document.addEventListener("DOMContentLoaded", function () {
    const mangaListContainer = document.querySelector(".manga-list");

    async function fetchMangaList() {
        try {
            let response = await fetch("https://api.mangadex.org/manga?limit=10");
            let data = await response.json();
            displayMangaList(data.data);
        } catch (error) {
            console.error("خطأ في جلب البيانات:", error);
        }
    }

    function displayMangaList(mangaArray) {
        mangaListContainer.innerHTML = ""; // مسح المحتوى القديم
        mangaArray.forEach(manga => {
            const mangaCard = document.createElement("div");
            mangaCard.classList.add("manga-card");

            const mangaImage = document.createElement("img");
            if (manga.relationships.length > 0) {
                const coverId = manga.relationships.find(rel => rel.type === "cover_art")?.id;
                if (coverId) {
                    mangaImage.src = `https://uploads.mangadex.org/covers/${manga.id}/${coverId}.jpg.256.jpg`;
                } else {
                    mangaImage.src = "https://via.placeholder.com/180x250"; // صورة افتراضية
                }
            } else {
                mangaImage.src = "https://via.placeholder.com/180x250"; // صورة افتراضية
            }

            const mangaTitle = document.createElement("div");
            mangaTitle.classList.add("manga-title");
            mangaTitle.textContent = manga.attributes.title.en || "عنوان غير متوفر";

            mangaCard.appendChild(mangaImage);
            mangaCard.appendChild(mangaTitle);
            mangaListContainer.appendChild(mangaCard);
        });
    }

    fetchMangaList();
});

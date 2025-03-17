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
        mangaArray.forEach(async manga => {
            const mangaCard = document.createElement("div");
            mangaCard.classList.add("manga-card");

            const mangaImage = document.createElement("img");
            let coverUrl = "https://via.placeholder.com/180x250"; // صورة افتراضية

            // البحث عن الغلاف
            const coverRel = manga.relationships.find(rel => rel.type === "cover_art");
            if (coverRel) {
                try {
                    const coverResponse = await fetch(`https://api.mangadex.org/cover/${coverRel.id}`);
                    const coverData = await coverResponse.json();
                    coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverData.data.attributes.fileName}.256.jpg`;
                } catch (err) {
                    console.error("فشل تحميل الغلاف:", err);
                }
            }

            mangaImage.src = coverUrl;

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

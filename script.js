document.addEventListener("DOMContentLoaded", function () {
    const mangaListContainer = document.querySelector(".manga-list");

    async function fetchMangaList() {
        try {
            let response = await fetch("https://api.mangadex.org/manga?limit=10");
            let data = await response.json();
            console.log("بيانات المانغا:", data); // فحص البيانات
            displayMangaList(data.data);
        } catch (error) {
            console.error("خطأ في جلب البيانات:", error);
            mangaListContainer.innerHTML = "<p>فشل تحميل المانغا. تأكد من اتصالك بالإنترنت أو جرب لاحقًا.</p>";
        }
    }

    async function getCoverUrl(manga) {
        let coverRel = manga.relationships.find(rel => rel.type === "cover_art");
        if (!coverRel) return "https://via.placeholder.com/180x250"; // صورة افتراضية
        
        try {
            let coverResponse = await fetch(`https://api.mangadex.org/cover/${coverRel.id}`);
            let coverData = await coverResponse.json();
            return `https://uploads.mangadex.org/covers/${manga.id}/${coverData.data.attributes.fileName}.256.jpg`;
        } catch (error) {
            console.error("خطأ في تحميل الغلاف:", error);
            return "https://via.placeholder.com/180x250"; // صورة افتراضية
        }
    }

    async function displayMangaList(mangaArray) {
        mangaListContainer.innerHTML = ""; // مسح المحتوى القديم
        for (const manga of mangaArray) {
            const mangaCard = document.createElement("div");
            mangaCard.classList.add("manga-card");

            const mangaImage = document.createElement("img");
            mangaImage.src = await getCoverUrl(manga);

            const mangaTitle = document.createElement("div");
            mangaTitle.classList.add("manga-title");
            mangaTitle.textContent = manga.attributes.title.en || "عنوان غير متوفر";

            mangaCard.appendChild(mangaImage);
            mangaCard.appendChild(mangaTitle);
            mangaListContainer.appendChild(mangaCard);
        }
    }

    fetchMangaList();
});

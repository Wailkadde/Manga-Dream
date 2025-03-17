document.addEventListener("DOMContentLoaded", fetchMangaList);

async function fetchMangaList() {
    try {
        let response = await fetch("https://api.jikan.moe/v4/top/manga");
        let data = await response.json();
        console.log("بيانات المانغا:", data); // تأكد من أن البيانات تُعرض في الكونسول
        displayMangaList(data.data);
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        document.getElementById("manga-list").innerHTML = "<p>فشل تحميل المانغا.</p>";
    }
}

function displayMangaList(mangaArray) {
    let mangaListContainer = document.getElementById("manga-list");
    mangaListContainer.innerHTML = ""; // تنظيف المحتوى القديم

    mangaArray.forEach(manga => {
        let mangaCard = document.createElement("div");
        mangaCard.classList.add("manga-card");

        let mangaImage = document.createElement("img");
        mangaImage.src = manga.images.jpg.image_url;
        mangaImage.alt = manga.title;

        let mangaTitle = document.createElement("h3");
        mangaTitle.textContent = manga.title;

        let mangaRating = document.createElement("p");
        mangaRating.textContent = `⭐ التقييم: ${manga.score || "غير متوفر"}`;

        mangaCard.appendChild(mangaImage);
        mangaCard.appendChild(mangaTitle);
        mangaCard.appendChild(mangaRating);

        mangaListContainer.appendChild(mangaCard);
    });
}

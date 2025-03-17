const mangaListDiv = document.getElementById("mangaList");

// جلب قائمة المانغا وعرضها
fetch("https://api.mangadex.org/manga?limit=10&includes[]=cover_art")
    .then(response => response.json())
    .then(data => {
        mangaListDiv.innerHTML = ""; // مسح المحتوى السابق
        if (!data.data || data.data.length === 0) {
            mangaListDiv.innerHTML = "<p>❌ لم يتم العثور على أي مانغا!</p>";
            return;
        }

        data.data.forEach(manga => {
            const mangaElement = document.createElement("div");
            mangaElement.className = "manga-item";

            // الحصول على صورة الغلاف
            const cover = manga.relationships.find(rel => rel.type === "cover_art");
            const coverUrl = cover
                ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}.256.jpg`
                : "https://via.placeholder.com/150";

            mangaElement.innerHTML = `
                <img src="${coverUrl}" alt="${manga.attributes.title.en}" />
                <p>${manga.attributes.title.en || "بدون عنوان"}</p>
            `;
            mangaElement.onclick = () => {
                window.location.href = `details.html?id=${manga.id}`;
            };
            mangaListDiv.appendChild(mangaElement);
        });
    })
    .catch(error => {
        mangaListDiv.innerHTML = "<p>❌ حدث خطأ أثناء تحميل المانغا!</p>";
        console.error("خطأ في جلب المانغا:", error);
    });

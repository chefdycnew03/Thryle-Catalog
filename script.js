console.log("Products file loaded:", window.products);

const screenshotBtn = document.getElementById("screenshotBtn");
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");
const categories = document.querySelectorAll(".category");

searchInput.addEventListener("keyup", function () {
    const searchValue = searchInput.value.toLowerCase().trim();

    categories.forEach(function (category) {
        const categoryName = category.querySelector("h2").innerText.toLowerCase();
        const categoryCards = category.querySelectorAll(".card");

        let hasVisibleProduct = false;

        categoryCards.forEach(function (card) {
            const productText = card.innerText.toLowerCase();
            const searchableText = productText + " " + categoryName;

            if (searchableText.includes(searchValue)) {
                card.style.display = "block";
                hasVisibleProduct = true;
            } else {
                card.style.display = "none";
            }
        });

        category.style.display = hasVisibleProduct || searchValue === "" ? "block" : "none";
    });
});

const productImages = document.querySelectorAll(".card img");
const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const closeViewer = document.querySelector(".close-viewer");

const viewerTitle = document.getElementById("viewerTitle");
const viewerCode = document.getElementById("viewerCode");
const viewerSize = document.getElementById("viewerSize");
const viewerColor = document.getElementById("viewerColor");
const viewerFit = document.getElementById("viewerFit");
const viewerPrice = document.getElementById("viewerPrice");
const viewerStatus = document.getElementById("viewerStatus");

productImages.forEach(function(image, index){
    image.addEventListener("click", function(){
        const card = image.closest(".card");
        const category = image.closest(".category");
        const categoryName = category ? category.id : "ITEM";

        const title = card.querySelector("h3").innerText;
        const sizeText = card.querySelector(".info p").innerText.replace("Size :", "").trim();
        const price = card.querySelector(".price").innerText;
        const status = card.querySelector(".status").innerText;

        const codePrefix = categoryName.substring(0, 3).toUpperCase();
        const codeNumber = String(index + 1).padStart(3, "0");

        viewerImage.src = image.src;
        viewerTitle.innerText = title;

        viewerCode.innerText = "Code : " + (card.dataset.code || codePrefix + codeNumber);
        viewerSize.innerText = "Size : " + (card.dataset.size || sizeText || "Available size");
        viewerColor.innerText = "Color : " + (card.dataset.color || "Please check photo");
        viewerFit.innerText = "Fit : " + (card.dataset.fit || "Regular / Comfortable fit");

        viewerPrice.innerText = price;
        viewerStatus.innerText = status;

        imageViewer.classList.add("active");
    });
});

function closeImageViewer(){
    imageViewer.classList.remove("active");
}

closeViewer.addEventListener("click", closeImageViewer);

imageViewer.addEventListener("click", function(e){
    if(e.target === imageViewer){
        closeImageViewer();
    }
});

document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
        closeImageViewer();
    }
});

screenshotBtn.addEventListener("click", function(){
    imageViewer.classList.add("screenshot-mode");

    alert("Screenshot Mamsh then send via Whatsapp");

    setTimeout(function(){
        imageViewer.classList.remove("screenshot-mode");
    }, 5000);
});

const currentCategory = document.getElementById("currentCategory");
const navLinks = document.querySelectorAll(".categories-nav a");

navLinks.forEach(function(link){
    link.addEventListener("click", function(){
        if(currentCategory){
            currentCategory.innerText = link.innerText.toUpperCase();
        }
    });
});

function createProductCard(product) {
    return `
        <div class="card"
            data-code="${product.code}"
            data-size="${product.size}"
            data-color="${product.color}"
            data-fit="${product.fit}">

            <span class="badge">${product.badge}</span>

            <img src="${product.image}" loading="lazy">

            <div class="info">
                <h3>${product.name}</h3>

                <p>Size : ${product.size}</p>

                <p class="price">${product.price}</p>

                <p class="status">${product.status}</p>
            </div>

        </div>
    `;
}

const coordsContainer = document.getElementById("coordsProducts");

if (coordsContainer) {

    products.forEach(product => {

        if (product.category === "Coords") {

            coordsContainer.innerHTML += createProductCard(product);

        }

    });

}
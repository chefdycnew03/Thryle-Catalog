console.log("Products file loaded:", window.products);

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

productImages.forEach(function(image, index){
    image.addEventListener("click", function(){
        const card = image.closest(".card");
        const category = image.closest(".category");
        const categoryName = category ? category.id : "ITEM";

        const title = card.querySelector("h3").innerText;
        const firstInfoText = card.querySelector(".info p:not(.price)");
        const sizeText = firstInfoText ? firstInfoText.innerText.replace("Size :", "").trim() : "";
        const price = card.querySelector(".price").innerText;

        const codePrefix = categoryName.substring(0, 3).toUpperCase();
        const codeNumber = String(index + 1).padStart(3, "0");

        viewerImage.src = image.src;
        viewerTitle.innerText = title;

        viewerCode.innerText = "Code : " + (card.dataset.code || codePrefix + codeNumber);
       const beautyCategory = "Beauty";
const simpleCategories = ["Perfumes", "Accessories", "Food"];

if (categoryName === beautyCategory) {
    viewerSize.innerText = "Description : " + (card.dataset.description || "Please check item details");
    viewerColor.innerText = "Quantity : " + (card.dataset.quantity || "Please check item");

    viewerFit.innerText = "";

    viewerSize.style.display = "block";
    viewerColor.style.display = "block";
    viewerFit.style.display = "none";

} else if (simpleCategories.includes(categoryName)) {
    viewerSize.innerText = "Quantity : " + (card.dataset.quantity || "Please check item");

    viewerColor.innerText = "";
    viewerFit.innerText = "";

    viewerSize.style.display = "block";
    viewerColor.style.display = "none";
    viewerFit.style.display = "none";

} else {
    viewerSize.innerText = "Size : " + (card.dataset.size || sizeText || "Available size");
    viewerColor.innerText = "Color : " + (card.dataset.color || "Please check photo");
    viewerFit.innerText = "Fit : " + (card.dataset.fit || "Regular / Comfortable fit");

    viewerSize.style.display = "block";
    viewerColor.style.display = "block";
    viewerFit.style.display = "block";
}

        viewerPrice.innerText = price;

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

const logoButton = document.getElementById("logoButton");
const socialPopup = document.getElementById("socialPopup");
const closeSocial = document.querySelector(".close-social");

if (logoButton && socialPopup && closeSocial) {
    logoButton.addEventListener("click", function () {
        socialPopup.classList.add("active");
    });

    closeSocial.addEventListener("click", function () {
        socialPopup.classList.remove("active");
    });

    socialPopup.addEventListener("click", function (e) {
        if (e.target === socialPopup) {
            socialPopup.classList.remove("active");
        }
    });
}
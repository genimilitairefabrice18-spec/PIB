console.log("script chargé");
const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ===================================
// GESTION DES FILTRES EN CASCADE (Catégorie -> Marque -> Modèle -> Couleur)
// ===================================

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("categorySelect");
const brandSelect = document.getElementById("brandSelect");
const modelSelect = document.getElementById("modelSelect");
const colorSelect = document.getElementById("colorSelect");
const productCards = document.querySelectorAll(".product-card");

if (categorySelect && brandSelect && modelSelect) {

    // 1. Mettre à jour la liste des Marques selon la Catégorie choisie
    function updateBrandOptions() {
        const selectedCat = categorySelect.value;
        const brands = new Set();

        productCards.forEach(card => {
            const cardCat = card.dataset.category;
            const cardBrand = card.dataset.brand;

            if ((selectedCat === "all" || cardCat === selectedCat) && cardBrand) {
                brands.add(cardBrand);
            }
        });

        brandSelect.innerHTML = '<option value="all">Toutes les marques</option>';
        brands.forEach(brand => {
            const option = document.createElement("option");
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });

        updateModelOptions();
    }

    // 2. Mettre à jour la liste des Modèles selon Catégorie ET Marque
    function updateModelOptions() {
        const selectedCat = categorySelect.value;
        const selectedBrand = brandSelect.value;
        const models = new Set();

        productCards.forEach(card => {
            const cardCat = card.dataset.category;
            const cardBrand = card.dataset.brand;
            const cardModel = card.dataset.model;

            const matchCat = (selectedCat === "all" || cardCat === selectedCat);
            const matchBrand = (selectedBrand === "all" || cardBrand === selectedBrand);

            if (matchCat && matchBrand && cardModel) {
                models.add(cardModel);
            }
        });

        modelSelect.innerHTML = '<option value="all">Tous les modèles</option>';
        models.forEach(model => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });

        updateColorOptions();
    }

    // 3. Mettre à jour la liste des Couleurs
    function updateColorOptions() {
        if (!colorSelect) {
            filterProducts();
            return;
        }

        const selectedCat = categorySelect.value;
        const selectedBrand = brandSelect.value;
        const selectedModel = modelSelect.value;
        const colors = new Set();

        productCards.forEach(card => {
            const cardCat = card.dataset.category;
            const cardBrand = card.dataset.brand;
            const cardModel = card.dataset.model;
            const cardColor = card.dataset.color;

            const matchCat = (selectedCat === "all" || cardCat === selectedCat);
            const matchBrand = (selectedBrand === "all" || cardBrand === selectedBrand);
            const matchModel = (selectedModel === "all" || cardModel === selectedModel);

            if (matchCat && matchBrand && matchModel && cardColor) {
                colors.add(cardColor);
            }
        });

        colorSelect.innerHTML = '<option value="all">Toutes les couleurs</option>';
        colors.forEach(color => {
            const option = document.createElement("option");
            option.value = color;
            option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
            colorSelect.appendChild(option);
        });

        filterProducts();
    }

    // 4. Filtrer les produits affichés sur la page
    function filterProducts() {
        const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
        const selectedCat = categorySelect.value;
        const selectedBrand = brandSelect.value;
        const selectedModel = modelSelect.value;
        const selectedColor = colorSelect ? colorSelect.value : "all";

        productCards.forEach(card => {
            const name = card.dataset.name ? card.dataset.name.toLowerCase() : "";
            const category = card.dataset.category || "";
            const brand = card.dataset.brand || "";
            const model = card.dataset.model || "";
            const color = card.dataset.color || "";

            const matchesSearch = name.includes(searchValue);
            const matchesCat = (selectedCat === "all" || category === selectedCat);
            const matchesBrand = (selectedBrand === "all" || brand === selectedBrand);
            const matchesModel = (selectedModel === "all" || model === selectedModel);
            const matchesColor = (selectedColor === "all" || color === selectedColor);

            if (matchesSearch && matchesCat && matchesBrand && matchesModel && matchesColor) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Écouteurs d'événements
    categorySelect.addEventListener("change", updateBrandOptions);
    brandSelect.addEventListener("change", updateModelOptions);
    modelSelect.addEventListener("change", updateColorOptions);
    
    if (colorSelect) {
        colorSelect.addEventListener("change", filterProducts);
    }

    if (searchInput) {
        searchInput.addEventListener("keyup", filterProducts);
    }

    updateBrandOptions();
}

// Gestion de l'envoi vers WhatsApp (Formulaire Contact)
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const telephone = "22676747511"; 

        const texte = `Bonjour PRAT INFOR BURKINA,%0A%0A` +
                      `*Nom :* ${encodeURIComponent(nom)}%0A` +
                      `*Email :* ${encodeURIComponent(email)}%0A` +
                      `*Message :* ${encodeURIComponent(message)}`;

        window.open(`https://wa.me/${telephone}?text=${texte}`, '_blank');
    });
}

// Fonction d'ouverture/fermeture du menu mobile
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    const menuBtn = document.getElementById("menuBtn");
    
    if (navMenu) {
        navMenu.classList.toggle("active");
        
        if (navMenu.classList.contains("active")) {
            menuBtn.innerHTML = "✕";
        } else {
            menuBtn.innerHTML = "☰";
        }
    }
}
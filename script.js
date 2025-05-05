// Produktdaten (könnten später von einer API kommen)
const products = [
    {
        name: "Schokoladenkuchen",
        image: "chocolate-cake.jpg",
        price: "25 €"
    },
    {
        name: "Brownies",
        image: "brownies.jpg",
        price: "15 €"
    },
    {
        name: "Erdbeer-Torte",
        image: "strawberry-cake.jpg",
        price: "28 €"
    },
    {
        name: "Zitronen-Muffins",
        image: "lemon-muffins.jpg",
        price: "12 €"
    },
    // ... weitere Produkte
];

// Produkte anzeigen
function displayProducts(productList) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    if (productList.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center;">Keine Produkte gefunden.</p>`;
        return;
    }
    grid.innerHTML = productList.map(product => `
        <article class="product-card" tabindex="0" aria-label="${product.name}">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        </article>
    `).join('');
}

// Suchfunktion (live, case-insensitive)
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', e => {
        const searchTerm = e.target.value.trim().toLowerCase();
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filtered);
    });
}

// Initiale Anzeige
displayProducts(products);

// Smooth Scroll für interne Links (mit Fallback)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.focus({ preventScroll: true });
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll-Animation für Sections
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Kontaktformular: Simple Validierung und Feedback
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
        const feedback = form.querySelector('.form-feedback');

        // Einfache Validierung
        if (!name || !email || !message) {
            feedback.textContent = "Bitte alle Felder ausfüllen.";
            feedback.style.color = "var(--accent)";
            return;
        }
        // E-Mail-Format prüfen
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            feedback.textContent = "Bitte eine gültige E-Mail-Adresse eingeben.";
            feedback.style.color = "var(--accent)";
            return;
        }
        // Erfolgsmeldung
        feedback.textContent = "Vielen Dank für Ihre Nachricht!";
        feedback.style.color = "var(--primary)";
        form.reset();
    });
} 
// ============================================
// DERECHOS SIMPLES - SCRIPTS
// ============================================

// Datos de artículos (esto puede expandirse fácilmente)
const articlesData = [
    {
        id: 1,
        title: "Qué pasa si no pagas una multa en España",
        slug: "no-pagar-multa",
        category: "multas",
        excerpt: "Descubre las consecuencias reales: embargos, antecedentes, incremento de deuda y qué hacer si no tienes dinero.",
        icon: "🚗",
        url: "blog/no-pagar-multa.html",
        date: "2026-04-17"
    },
    {
        id: 2,
        title: "Cómo saber si te han despedido de forma ilegal",
        slug: "despido-improcedente",
        category: "laboral",
        excerpt: "Señales claras de un despido injustificado, qué documentos guardar y cuáles son tus opciones legales.",
        icon: "💼",
        url: "blog/despido-improcedente.html",
        date: "2026-04-17"
    },
    {
        id: 3,
        title: "Qué derechos tienes como inquilino en España",
        slug: "derechos-inquilino",
        category: "alquiler",
        excerpt: "Fianzas, subidas de precio, reparaciones y cómo protegerte de abusos del propietario.",
        icon: "🏠",
        url: "blog/derechos-inquilino.html",
        date: "2026-04-17"
    },
    {
        id: 4,
        title: "Primer contrato de trabajo: qué debes saber antes de firmar",
        slug: "primer-contrato-trabajo",
        category: "laboral",
        excerpt: "Prácticas, contratos temporales, salario mínimo y qué preguntar antes de firmar tu primer empleo.",
        icon: "📄",
        url: "blog/primer-contrato-trabajo.html",
        date: "2026-04-17"
    },
    {
        id: 5,
        title: "Cómo protegerte de un desahucio en España",
        slug: "desahucio-evitar",
        category: "alquiler",
        excerpt: "Tus derechos durante un desahucio, procedimiento legal y cómo defenderte si tu casero quiere echarte.",
        icon: "⚖️",
        url: "blog/desahucio-evitar.html",
        date: "2026-04-17"
    }
];

// ============================================
// FUNCIONES DE BÚSQUEDA Y FILTRADO
// ============================================

function initBlogPage() {
    const articlesList = document.getElementById('articles-list');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!articlesList) return; // No estamos en la página de blog

    let currentFilter = 'all';

    // Función para renderizar artículos
    function renderArticles(filter = 'all', searchTerm = '') {
        articlesList.innerHTML = '';

        let filteredArticles = articlesData;

        // Filtrar por categoría
        if (filter !== 'all') {
            filteredArticles = filteredArticles.filter(article => article.category === filter);
        }

        // Filtrar por búsqueda
        if (searchTerm) {
            searchTerm = searchTerm.toLowerCase();
            filteredArticles = filteredArticles.filter(article =>
                article.title.toLowerCase().includes(searchTerm) ||
                article.excerpt.toLowerCase().includes(searchTerm) ||
                article.category.toLowerCase().includes(searchTerm)
            );
        }

        // Renderizar
        if (filteredArticles.length === 0) {
            articlesList.innerHTML = '<p style="text-align: center; color: #7F8C8D; padding: 2rem;">No se encontraron artículos.</p>';
            return;
        }

        filteredArticles.forEach(article => {
            const articleEl = document.createElement('article');
            articleEl.className = 'article-preview';
            articleEl.innerHTML = `
                <span class="category-badge">${getCategoryLabel(article.category)}</span>
                <h3><a href="${article.url}">${article.title}</a></h3>
                <p>${article.excerpt}</p>
                <a href="${article.url}" class="read-more">Leer artículo →</a>
            `;
            articlesList.appendChild(articleEl);
        });
    }

    // Categoría con label
    function getCategoryLabel(category) {
        const labels = {
            'laboral': '💼 Trabajo',
            'multas': '🚗 Multas',
            'alquiler': '🏠 Alquiler',
            'contratacion': '📄 Contratación'
        };
        return labels[category] || category;
    }

    // Event listeners para filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderArticles(currentFilter, searchInput.value);
        });
    });

    // Event listener para búsqueda (con debounce)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            renderArticles(currentFilter, this.value);
        }, 300);
    });

    // Renderizar artículos iniciales
    renderArticles();
}

// ============================================
// CATEGORÍA DESDE URL
// ============================================

function getFilterFromURL() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    if (category) {
        const filterBtn = document.querySelector(`[data-filter="${category}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initBlogPage();
    getFilterFromURL();

    // Suavizar scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ============================================
// FUNCIONALIDADES ADICIONALES
// ============================================

// Tracking de navegación (opcional, para Analytics)
function trackPageView() {
    // Aquí puedes conectar Google Analytics, Plausible, etc.
    console.log('Page view:', window.location.pathname);
}

// Función para copiar al portapapeles (útil para plantillas)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// ============================================
// VALIDACIÓN DE FORMULARIOS (FUTURA)
// ============================================

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí va validación personalizada
            console.log('Formulario enviado');
        });
    });
}

trackPageView();

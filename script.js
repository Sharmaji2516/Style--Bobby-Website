// Style @ Bobby - Mobile Showroom Logic

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const menuBtn = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const searchInput = document.getElementById('searchInput');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const productGrid = document.getElementById('productGrid');
    const productCards = document.querySelectorAll('.product-card');
    const sortBtn = document.getElementById('sortBtn');
    const filterBtn = document.getElementById('filterBtn');

    // --- Sidebar Toggle Logic ---
    if (menuBtn && sidebar && overlay) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // --- Search Logic ---
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            productCards.forEach(card => {
                const name = card.getAttribute('data-name').toLowerCase();
                if (name.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- Category Filter Logic ---
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.getAttribute('data-category');
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Sort Logic ---
    if (sortBtn) {
        sortBtn.addEventListener('click', () => {
            const cardsArray = Array.from(productCards);
            cardsArray.sort((a, b) => {
                return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
            });
            productGrid.innerHTML = '';
            cardsArray.forEach(card => productGrid.appendChild(card));
        });
    }

    // --- Product Click Feedback (Alert & WhatsApp) ---
    productGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card) {
            const name = card.getAttribute('data-name');
            const stock = card.getAttribute('data-stock');
            const sizes = card.getAttribute('data-sizes');
            
            if (stock === 'out') {
                alert(`SORRY!\n${name} is currently OUT OF STOCK.\n\nWe will restock soon. Visit @Style Bobby for more options.`);
            } else {
                const message = `Hi Style @ Bobby, I am interested in "${name}" (Sizes: ${sizes}). Is it available in store?`;
                const encodedMsg = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/7597901057?text=${encodedMsg}`;
                
                const confirmed = confirm(`${name}\nStatus: AVAILABLE\nAvailable Sizes: ${sizes}\n\nVisit @Style Bobby to try it on!\n\nWould you like to check availability on WhatsApp?`);
                
                if (confirmed) {
                    window.open(whatsappUrl, '_blank');
                }
            }
        }
    });

    // --- Balloon Animation Logic ---
    const balloonContainer = document.getElementById('balloonContainer');
    const colors = ['#ff3f6c', '#ff905a', '#ffce3d', '#42b983', '#3498db'];

    if (balloonContainer) {
        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            const xPos = Math.random() * 100;
            const size = 25 + Math.random() * 20;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const duration = 6 + Math.random() * 6;
            balloon.style.left = `${xPos}%`;
            balloon.style.width = `${size}px`;
            balloon.style.height = `${size * 1.2}px`;
            balloon.style.backgroundColor = color;
            balloon.style.animationDuration = `${duration}s`;
            balloonContainer.appendChild(balloon);
            setTimeout(() => { balloon.remove(); }, duration * 1000);
        }
        setInterval(createBalloon, 4000);
        for(let i=0; i<3; i++) createBalloon();
    }
});

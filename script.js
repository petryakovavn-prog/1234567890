// ========== ГАЛЕРЕЯ: ЛАЙКИ, СЧЁТЧИКИ, ФИЛЬТРЫ, ПЕРЕКЛЮЧЕНИЕ ВИДА (ПР3) ==========
document.addEventListener('DOMContentLoaded', () => {
    // Элементы DOM
    const galleryGrid = document.getElementById('image-gallery');
    const imageCounterSpan = document.getElementById('image-counter');
    const totalLikesSpan = document.getElementById('total-likes');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');

    let totalLikes = 0;

    // Подсчёт общего количества карточек (изображений)
    function updateImageCount() {
        const cards = document.querySelectorAll('.image-card');
        imageCounterSpan.textContent = cards.length;
    }

    // Обновление отображения общего числа лайков
    function updateTotalLikesDisplay() {
        totalLikesSpan.textContent = totalLikes;
    }

    // Инициализация лайков для всех кнопок
    function initLikes() {
        const likeBtns = document.querySelectorAll('.like-btn');
        likeBtns.forEach(btn => {
            // Снимаем старые обработчики, чтобы не дублировать
            btn.removeEventListener('click', handleLike);
            btn.addEventListener('click', handleLike);
            // Сброс внутреннего счётчика (на случай повторной инициализации)
            const countSpan = btn.querySelector('.like-count');
            if (countSpan && !btn.hasAttribute('data-likes-initialized')) {
                countSpan.textContent = '0';
                btn.setAttribute('data-likes-initialized', 'true');
            }
        });
    }

    // Обработчик клика по лайку
    function handleLike(e) {
        e.stopPropagation();
        const btn = e.currentTarget;
        const countSpan = btn.querySelector('.like-count');
        let current = parseInt(countSpan.textContent) || 0;
        const isLiked = btn.classList.contains('liked');

        if (!isLiked) {
            current++;
            totalLikes++;
            btn.classList.add('liked');
            btn.querySelector('i').classList.remove('far');
            btn.querySelector('i').classList.add('fas');
        } else {
            current--;
            totalLikes--;
            btn.classList.remove('liked');
            btn.querySelector('i').classList.remove('fas');
            btn.querySelector('i').classList.add('far');
        }
        countSpan.textContent = current;
        updateTotalLikesDisplay();
        // Мини-анимация
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
    }

    // Фильтрация карточек по категории
    function filterGallery(category) {
        const cards = document.querySelectorAll('.image-card');
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.style.display = ''; // показать
            } else {
                card.style.display = 'none';
            }
        });
        // Счётчик изображений обновлять не нужно, он показывает общее количество, а не видимых
        // (по заданию: подсчёт количества изображений — общее число)
    }

    // Переключение вида (сетка / список)
    function setView(view) {
        if (view === 'grid') {
            galleryGrid.classList.remove('list-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        } else {
            galleryGrid.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        }
    }

    // Навесить обработчики на кнопки фильтров
    function initFilters() {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');
                filterGallery(filterValue);
                // Обновить активный класс
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // Переключение вида
    function initViewToggle() {
        if (gridViewBtn && listViewBtn) {
            gridViewBtn.addEventListener('click', () => setView('grid'));
            listViewBtn.addEventListener('click', () => setView('list'));
        }
    }

    // Запуск всех инициализаций
    updateImageCount();
    initLikes();
    initFilters();
    initViewToggle();
    updateTotalLikesDisplay();

    // Если карточки будут добавлены динамически (у нас статика), можно повторно вызвать initLikes, но в данной реализации всё уже есть.
    console.log('Галерея загружена, лайки и фильтры работают');
});
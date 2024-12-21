// Получаем элементы
const timeline = document.querySelector('.timeline');
const addEventButton = document.getElementById('addEventButton');
let eventCounter = 0;

// Функция для создания нового события
function createEvent() {
    // Инкрементируем счетчик событий
    eventCounter++;

    // Создаем новое событие
    const event = document.createElement('div');
    event.classList.add('event');
    event.textContent = `Событие ${eventCounter}`;
    
    // Генерируем случайную позицию для события на ленте времени
    const randomPosition = Math.random() * 80; // Позиция от 0% до 80%
    event.style.left = `${randomPosition}%`;
    
    // Генерируем случайную ширину для события (от 5% до 20%)
    const randomWidth = 5 + Math.random() * 15;
    event.style.width = `${randomWidth}%`;

    // Добавляем обработчик для перетаскивания события
    addDragEventListener(event);

    // Добавляем событие на ленту времени
    timeline.appendChild(event);
}

// Функция для добавления обработки перетаскивания события
function addDragEventListener(eventElement) {
    let isDragging = false;
    let startX;

    // Начало перетаскивания
    eventElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX; // Сохраняем начальную позицию
    });

    // Перетаскивание
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            constX = e.clientX - startX; // Разница в движении мыши
            const newLeft = Math.max(0, Math.min(100, parseFloat(eventElement.style.left || 0) + (X / timeline.offsetWidth) * 100));
            eventElement.style.left = `${newLeft}%`; // Перемещаем событие
            startX = e.clientX; // Обновляем начальную позицию
        }
    });

    // Завершение перетаскивания
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Обработчик нажатия на кнопку "Добавить событие"
addEventButton.addEventListener('click', createEvent);

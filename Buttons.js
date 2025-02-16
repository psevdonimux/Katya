class Buttons {
    day = new Date().getDay();
    lastClickedButton = null; 

  setTextBoldAndUnderlined(button) {
    if (this.lastClickedButton) {
            this.lastClickedButton.style.textDecoration = 'none';
        }

        // Запоминаем текущую нажатую кнопку
        this.lastClickedButton = button;

        // Получаем день, связанный с текущей кнопкой
        const buttonDay = parseInt(button.getAttribute('data-day'));
        
        // Получаем все кнопки
        const buttons = document.querySelectorAll('.button');

        // Применяем жирное начертание для текущего дня и обычное для остальных
        buttons.forEach((btn) => {
            const btnDay = parseInt(btn.getAttribute('data-day'));
            if (btnDay === this.day) {
                btn.style.fontWeight = 'bold';  // Жирный шрифт для сегодняшней даты
            } else {
                btn.style.fontWeight = 'normal';  // Обычный шрифт для других дней
            }
        });

        // Подчёркиваем нажатую кнопку
        button.style.textDecoration = 'underline';

        // Вызываем метод для отображения событий для выбранной даты
        this.displayEvents(buttonDay);
    }

    // Метод для отображения событий на выбранную дату
    displayEvents(day) {
        console.log(`Displaying events for day: ${day}`);
        // Здесь можно добавить код для отображения событий на выбранную дату
    }
}

// Пример использования
const dateSelector = new DateSelector(16); // Предположим, что сегодня 16 число
document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('click', () => {
        dateSelector.setTextBoldAndUnderlined(button);
    });
});
  }
  
  displayEvents(day = -1) {
            const millisecondsInDay = 24 * 60 * 60 * 1000;
            const startOfDay = new Date().setHours(0, 0, 0, 0);
        const timeline = document.querySelector('.timeline');
        const timelineWidth = timeline.offsetWidth;
        const existingEvents = timeline.querySelectorAll('.event');
        existingEvents.forEach(event => event.remove());
        const currentDay = day == -1 ? new Date().getDay() : day;
        eventsByDay[currentDay].forEach(event => {
          const eventElement = document.createElement('div');
          eventElement.classList.add('event');
          eventElement.classList.add(event.type);
          eventElement.style.left = ((((new Date(event.time)) - startOfDay) / millisecondsInDay) * timelineWidth) + 'px';                               
          eventElement.style.width = ((event.duration / millisecondsInDay) * timelineWidth) + 'px';
          eventElement.textContent = event.label;
          timeline.appendChild(eventElement);
        });
      }
  
  scrollToRedLine() {
    const movingLine = document.getElementById('movingLine');
    const scrollButton = document.getElementById('scroll');
    function scroll() {
      if (movingLine) {
        movingLine.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    };
    window.onload = function() {
      scroll();
    };
    scrollButton.onclick = function() {
        scroll();
    };
  }
}

const but = new Buttons();
but.displayEvents();
but.scrollToRedLine();
window.addEventListener('load', function () {
  but.setTextBoldAndUnderlined();
});

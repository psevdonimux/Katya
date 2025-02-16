class Buttons {
    day = new Date().getDay();
    lastClickedButton = null;
    buttonDay = parseInt(button.getAttribute('data-day'));

    BoldAndUnderlined(element, font, decoration) {
    element.style.fontWeight = font;
    element.style.textDecoration = decoration;
  }

  setTextBoldAndUnderlined() {
  buttons.forEach(button => {
    // Сброс всех стилей для кнопок
    button.style.textDecoration = 'none';
    button.style.fontWeight = '100';

    // Установить жирный стиль для кнопки с текущим днем
    if (this.buttonDay === this.day) {
      button.style.fontWeight = '1000';
    }

    // Установить подчеркивание для последней кликнутой кнопки
    if (this.lastClickedButton === button) {
      button.style.textDecoration = 'underline';
    }
  });
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    this.displayEvents(this.buttonDay);

    // Убрать стили у предыдущей кнопки, если она была
    if (this.lastClickedButton && this.lastClickedButton !== button) {
      this.lastClickedButton.style.fontWeight = '100';
      this.lastClickedButton.style.textDecoration = 'none';
    }

    // Установить стили для новой кнопки
    this.lastClickedButton = button;
    if (this.buttonDay === this.day) {
      button.style.fontWeight = '1000';
      button.style.textDecoration = 'underline';
    } else {
      button.style.fontWeight = '100';
      button.style.textDecoration = 'none';
    }

    // Вызываем setTextBoldAndUnderlined для обновления всех кнопок
    this.setTextBoldAndUnderlined();
  });
});
  
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

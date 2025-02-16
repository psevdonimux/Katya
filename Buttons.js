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
          button.style.textDecoration = 'none';
          button.style.fontWeight = '100';
          if (this.buttonDay === this.day) {
            button.style.fontWeight = '1000';
          }
          if (this.lastClickedButton === button) {
            button.style.textDecoration = 'underline';
          }
        });
      button.addEventListener('click', () => {
          if (this.lastClickedButton !== button) {
            if (this.lastClickedButton) {
                BoldAndUnderlined(this.lastClickedButton, '100', 'none')
            }
            this.lastClickedButton = button;
          }
          if (this.buttonDay === this.day) {
              BoldAndUnderlined(button, '1000', 'underline')
          } else {
              BoldAndUnderlined(button, '100', 'none')
          }
          setTextBoldAndUnderlined();
          this.displayEvents(buttonDay);
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

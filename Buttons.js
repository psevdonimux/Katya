class Buttons {
    day = new Date().getDay();
    lastClickedButton = null;
    buttons = document.querySelectorAll('.button');
    BoldAndUnderlined(element, font, decoration) {
        element.style.fontWeight = font;
        element.style.textDecoration = decoration;
  }
  setTextBoldAndUnderlined() {
      this.buttons.forEach(button => {
          const buttonDay = parseInt(button.getAttribute('data-day'));
          if (this.lastClickedButton === button) {
              this.BoldAndUnderlined(button, buttonDay === this.day ? '1000' : '100', 'underline');
          } else {
              this.BoldAndUnderlined(button, buttonDay === this.day ? '1000' : '100', 'none');
          }
          button.addEventListener('click', () => {
              this.displayEvents(buttonDay);
              if (this.lastClickedButton !== button) {
                  if (this.lastClickedButton) {
                      this.BoldAndUnderlined(this.lastClickedButton, '100', 'none');
                  }
                  this.lastClickedButton = button;
              }
              button.style.fontWeight = buttonDay === this.day ? '1000' : '100';
              button.style.textDecoration = buttonDay === this.day ? 'underline' : 'none'
              this.setTextBoldAndUnderlined()
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

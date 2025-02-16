class Buttons {
    day = new Date().getDay();
    lastClickedButton = null; 

  setTextBoldAndUnderlined(button) {
    const buttons = document.querySelectorAll('.button');
       buttons.forEach(button => {
           button.addEventListener('click', () => {
    if (this.lastClickedButton) {
            this.lastClickedButton.style.textDecoration = 'none';
        }
        this.lastClickedButton = button;
        const buttonDay = parseInt(button.getAttribute('data-day'));
        const buttons = document.querySelectorAll('.button');
        buttons.forEach((btn) => {
            if (buttonDay === this.day) {
                btn.style.fontWeight = '1000';
            } else {
                btn.style.fontWeight = '100';
            }
        });
       }
       }
        button.style.textDecoration = 'underline';
        this.displayEvents(buttonDay);
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

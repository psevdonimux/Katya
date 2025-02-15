class Buttons {
  
    day = new Date().getDay();
    lastClickedButton = null; 

  setTextBoldAndUnderlined(element, font, decoration) {
    element.style.fontWeight = font;
    element.style.textDecoration = decoration;
  }
  updateFontWeightAndTextDecoration() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      const buttonDay = parseInt(button.getAttribute('data-day'));
      this.setTextBoldAndUnderlined(button, '100', 'none');
      if (buttonDay === this.day) {
        button.style.fontWeight = '1000';
      }
      if (this.lastClickedButton === button) {
        button.style.textDecoration = 'underline';
      }
      button.onclick = () => {
        if (this.lastClickedButton !== button) {
          if (this.lastClickedButton) {
            this.setTextBoldAndUnderlined(this.lastClickedButton, '100', 'none');
          }
          this.lastClickedButton = button;
        }
        if (buttonDay === this.day) {
          this.setTextBoldAndUnderlined(button, '1000', 'underline');
        } else {
          this.setTextBoldAndUnderlined(button, '100', 'underline');
        }
      };
    });
    displayEvents(data-day);
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
function handleResize() {
        displayEvents();
      }
window.addEventListener('resize', handleResize);
      displayEvents();

}
const but = new Buttons();
window.addEventListener('load', function () {
  but.updateFontWeightAndTextDecoration();
});

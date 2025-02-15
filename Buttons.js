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
  }
}
const but = new Buttons();
window.addEventListener('load', function () {
  but.updateFontWeightAndTextDecoration();
});

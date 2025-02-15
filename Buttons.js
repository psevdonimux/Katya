class buttonss {
      day = new Date().getDay();
      buttonDay = parseInt(button.getAttribute('data-day'));
      setTextBoldAndUnderlined(element, font, decoration) {
            element.style.fontWeight = font;
            element.style.textDecoration = decoration;
      }
      
      updateFontWeightAndTextDecoration() {
            const button = document.querySelectorAll('.button');
            let lastClickedButton = null;
                  buttons.forEach(button => {
                        this.setTextBoldAndUnderlined(button, '100', 'none');
                        if (this.buttonDay === this.day) {
                              button.style.fontWeight = '1000';
                        }
                        if (lastClickedButton === button) {
                              button.style.textDecoration = 'underline';
                        }
                        button.addEventListener('click', () => {
                        if (lastClickedButton !== button) {
                              if (lastClickedButton) {
                                    this.setTextBoldAndUnderlined(lastClickedButton, '100', 'none');
                              }
                              lastClickedButton = button;
                        }
                        if (this.buttonDay === this.day) {
                              this.setTextBoldAndUnderlined(button, '1000', 'underline');
                        } else {
                              this.setTextBoldAndUnderlined(button, '100', 'none');
                        }
                  });
                  });
            updateFontWeightAndTextDecoration();
      }
}
window.addEventListener('load', updateFontWeightAndTextDecoration);

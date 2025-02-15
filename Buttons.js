class buttons {
      day = new Date().getDay();
      buttonDay = parseInt(button.getAttribute('data-day'));
      setTextBoldAndUnderlined(element, font, decoration) {
            element.style.fontWeight = font;
            element.style.textDecoration = decoration;
      }
      
      changingButtonStates() {
            const buttons = document.querySelectorAll('.button');
            let lastClickedButton = null;
            function updateFontWeightAndTextDecoration() {
                  buttons.forEach(button => {
                        setTextBoldAndUnderlined(button, '100', 'none')
                        if (buttonDay === day) {
                              button.style.fontWeight = '1000';
                        }
                        if (lastClickedButton === button) {
                              button.style.textDecoration = 'underline';
                        }
                        button.addEventListener('click', () => {
                        if (lastClickedButton !== button) {
                              if (lastClickedButton) {
                                    setTextBoldAndUnderlined(lastClickedButton, '100', 'none')
                              }
                              lastClickedButton = button;
                        }
                        if (buttonDay === day) {
                              setTextBoldAndUnderlined(button, '1000', 'underline')
                        } else {
                              setTextBoldAndUnderlined(button, '100', 'none')
                        }
                        updateFontWeightAndTextDecoration();
                  });
                  });
            }
      }
}
window.addEventListener('load', updateFontWeightAndTextDecoration);

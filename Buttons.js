class buttons {
      changeButtonStyle () {
            buttons = document.querySelectorAll('.button');
            lastClickedButton = null;
            function updateFontWeightAndTextDecoration() {
                  const day = new Date().getDay();
                  buttons.forEach(button => {
                        const buttonDay = parseInt(button.getAttribute('data-day'));
                        button.style.textDecoration = 'none';
                        button.style.fontWeight = '100';
                        if (buttonDay === day) {
                              button.style.fontWeight = '1000';
                        }
                        if (lastClickedButton === button) {
                              button.style.textDecoration = 'underline';
                        }
                  });
            }
            buttons.forEach(button => {
                  button.addEventListener('click', () => {
                        if (lastClickedButton !== button) {
                              if (lastClickedButton) {
                                    lastClickedButton.style.fontWeight = '100';
                                    lastClickedButton.style.textDecoration = 'none';
                              }
                              lastClickedButton = button;
                        }
                        const day = new Date().getDay();
                        const buttonDay = parseInt(button.getAttribute('data-day'));
                        if (buttonDay === day) {
                              button.style.fontWeight = '1000';
                              button.style.textDecoration = 'underline';
                        } else {
                              button.style.fontWeight = '100';
                              button.style.textDecoration = 'none';
                        }
                        updateFontWeightAndTextDecoration();
                  });
            });
            window.addEventListener('load', updateFontWeightAndTextDecoration);
      }
}

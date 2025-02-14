class timeLine {
      stepMinutes = 10;
      stepHours = 60;
      timeZoneOffset = -5;
      otherTimeZoneOffset = -7;
      timeline = document.getElementById('timeline');
      millisecondsInDay = 24 * 60 * 60 * 1000;
      startOfDay = new Date().setHours(0, 0, 0, 0);
      createTimeMarkers() {
function renderTimeMarkers() {
        const existingMarkers = document.querySelectorAll('.marker, .hour-marker, .hour-label, .hour-label-other');
        existingMarkers.forEach(marker => marker.remove());
        const width = this.timeline.offsetWidth;            
        const totalSteps = (24 * 60) / this.stepMinutes;
        for (let i = 0; i <= totalSteps; i++) {
          const marker = document.createElement('div');
          marker.classList.add('marker');
          marker.style.left = (i * (width / totalSteps)) + 'px';
          this.timeline.appendChild(marker);
        }
        for (let i = 0; i <= 24; i++) {
          const hourMarker = document.createElement('div');
          hourMarker.classList.add('hour-marker');
          const position = (i * (width / 24));
          hourMarker.style.left = `${position}px`;
          const hourLabel = document.createElement('div');
          hourLabel.classList.add('hour-label');
          hourLabel.textContent = `${i < 10 ? '0' : ''}${i}:00`;
          if (window.innerWidth > window.innerHeight) {
            hourLabel.style.left = `${position - 21.5}px`;
          } else {
            hourLabel.style.left = `${position - 17.5}px`;
          }
          const hourLabelOther = document.createElement('div');
          hourLabelOther.classList.add('hour-label-other');
          const adjustedHour = (i + (this.otherTimeZoneOffset - this.timeZoneOffset) + 24) % 24;
          hourLabelOther.textContent = `${adjustedHour < 10 ? '0' : ''}${adjustedHour}:00`;
          if (window.innerWidth > window.innerHeight) {
            hourLabelOther.style.left = `${position - 21.5}px`;
          } else {
            hourLabelOther.style.left = `${position - 17.5}px`;
          }
          this.timeline.appendChild(hourMarker);
          this.timeline.appendChild(hourLabel);
          this.timeline.appendChild(hourLabelOther);
        }
      }
window.addEventListener('resize', function() {
        renderTimeMarkers();
      });
renderTimeMarkers();
      }
      
      createRedLine() {
const movingLine = document.getElementById('movingLine');
      function updateMovingLines() {
        const now = new Date();
        const localTime = new Date(now.toLocaleString('en-US', { timeZone: `Etc/GMT${this.timeZoneOffset >= 0 ? '+' : '-'}${Math.abs(this.timeZoneOffset)}`}));
        const otherTime = new Date(now.toLocaleString('en-US', { timeZone: `Etc/GMT${this.otherTimeZoneOffset >= 0 ? '+' : '-'}${Math.abs(this.otherTimeZoneOffset)}` }));
        const startOfDayLocal = new Date(localTime).setHours(0, 0, 0, 0);           
        movingLine.style.left = (((localTime - startOfDayLocal) / this.millisecondsInDay) * (document.querySelector('.timeline').offsetWidth)) + 'px';
      }
function handleResize() {
        updateMovingLines();
      }
window.addEventListener('resize', handleResize);
window.addEventListener('resize', function() {
        updateMovingLines();
      });
setInterval(updateMovingLines, 1000);
      updateMovingLines();
      }
}

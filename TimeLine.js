class TimeLine {
  constructor() {
    this.stepMinutes = 10;
    this.stepHours = 60;
    this.timeZoneOffset = -5;
    this.otherTimeZoneOffset = -7;
    this.timeline = document.getElementById('timeline');
    this.millisecondsInDay = 24 * 60 * 60 * 1000;
    this.startOfDay = new Date().setHours(0, 0, 0, 0);
    this.width = 0; // Для хранения ширины таймлайна

    this.renderTimeMarkers = this.renderTimeMarkers.bind(this);
    this.updateMovingLines = this.updateMovingLines.bind(this);
  }

  init() {
    this.createTimeMarkers();
    this.createRedLine();
    window.addEventListener('resize', this.renderTimeMarkers);
    this.renderTimeMarkers(); // Начальный рендер
  }

  renderTimeMarkers() {
    const existingMarkers = document.querySelectorAll('.marker, .hour-marker, .hour-label, .hour-label-other');
    existingMarkers.forEach(marker => marker.remove());

    this.width = this.timeline.offsetWidth; // Обновляем ширину

    const totalSteps = (24 * 60) / this.stepMinutes;
    this.createMarkers(totalSteps);
    this.createHourLabels();
  }

  createMarkers(totalSteps) {
    for (let i = 0; i <= totalSteps; i++) {
      const marker = document.createElement('div');
      marker.classList.add('marker');
      marker.style.left = (i * (this.width / totalSteps)) + 'px';
      this.timeline.appendChild(marker);
    }
  }

  createHourLabels() {
    for (let i = 0; i <= 24; i++) {
      const hourMarker = document.createElement('div');
      hourMarker.classList.add('hour-marker');
      const position = (i * (this.width / 24));
      hourMarker.style.left = `${position}px`;

      const hourLabel = this.createHourLabel(i, position);
      const hourLabelOther = this.createHourLabelOther(i, position);

      this.timeline.appendChild(hourMarker);
      this.timeline.appendChild(hourLabel);
      this.timeline.appendChild(hourLabelOther);
    }
  }

  createHourLabel(i, position) {
    const hourLabel = document.createElement('div');
    hourLabel.classList.add('hour-label');
    hourLabel.textContent = `${i < 10 ? '0' : ''}${i}:00`;

    const offset = window.innerWidth > window.innerHeight ? 21.5 : 17.5;
    hourLabel.style.left = `${position - offset}px`;

    return hourLabel;
  }

  createHourLabelOther(i, position) {
    const hourLabelOther = document.createElement('div');
    hourLabelOther.classList.add('hour-label-other');

    const adjustedHour = (i + (this.otherTimeZoneOffset - this.timeZoneOffset) + 24) % 24;
    hourLabelOther.textContent = `${adjustedHour < 10 ? '0' : ''}${adjustedHour}:00`;

    const offset = window.innerWidth > window.innerHeight ? 21.5 : 17.5;
    hourLabelOther.style.left = `${position - offset}px`;

    return hourLabelOther;
  }

  createRedLine() {
    const movingLine = document.getElementById('movingLine');
    this.updateMovingLines(movingLine);

    // Используем requestAnimationFrame для плавных обновлений
    setInterval(() => this.updateMovingLines(movingLine), 1000);
  }

  updateMovingLines(movingLine) {
    const now = new Date();
    const localTime = new Date(now.toLocaleString('en-US', { timeZone: `Etc/GMT${this.timeZoneOffset >= 0 ? '+' : '-'}${Math.abs(this.timeZoneOffset)}` }));
    const startOfDayLocal = new Date(localTime).setHours(0, 0, 0, 0);

    movingLine.style.left = (((localTime - startOfDayLocal) / this.millisecondsInDay) * this.width) + 'px';
  }
}

// Инициализация таймлайна
const timeline = new TimeLine();
timeline.init();

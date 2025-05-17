const range = document.getElementById('range');

const charactersCount = document.querySelector('.number');

range.addEventListener('input', function () {
  const value = (this.value - this.min) / (this.max - this.min) * 100;
  this.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${value}%, #08070B  ${value}%, #08070B 100%)`;
  charactersCount.textContent = this.value;
});



function resetAll() {
    range.value = '10';
}


addEventListener('DOMContentLoaded', resetAll)
const range = document.getElementById('range');
const charactersCount = document.querySelector('.number');
const copiedBtn = document.querySelector('.copied__img');
const copiedText = document.querySelector('.copied');
const passwordField = document.getElementById('password'); 
let rangeWord = 10;

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

const sets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:',.<>?/"
};

range.addEventListener('input', function () {
  const value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${value}%, #08070B ${value}%, #08070B 100%)`;
  charactersCount.textContent = this.value;
  rangeWord = parseInt(this.value);
});

copiedBtn.addEventListener('click', () => {
  copiedText.style.display = 'block';
  navigator.clipboard.writeText(passwordField.value);
});

function getSelectedCharacterSets() {
  let count = 0;
  let selected = "";
  let selectedTypes = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked && sets[checkbox.id]) {
      count++;
      selected += sets[checkbox.id];
      selectedTypes.push(checkbox.id);
    }
  });

  return { selected, count, selectedTypes };
}

function passwordIsCorrect(password, selectedTypes) {
  return selectedTypes.every(type =>
    [...password].some(char => sets[type].includes(char))
  );
}

function createPassword() {
  const { selected: charset, count: numOption, selectedTypes } = getSelectedCharacterSets();
  if (!charset) {
    passwordField.value = "";
    return;
  }

  let generatedPassword = "";
  let maxAttempts = 100;
  let attempt = 0;

  do {
    generatedPassword = "";
    for (let i = 0; i < rangeWord; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    attempt++;
    if (attempt > maxAttempts) {
      passwordField.value = "";
      return;
    }
  } while (!passwordIsCorrect(generatedPassword, selectedTypes));

  // Actualizar las barras de fortaleza
  const grade = document.querySelector('.grade');
  const whatGrade = {
    1: 'LOW',
    2: 'LOW',
    3: 'MEDIUM',
    4: 'HIGH'
  }
  let options = numOption;
  if (rangeWord < 6) {
      options = 2;
    } else if (rangeWord < 8) {options = 3}
  document.querySelectorAll('.bar').forEach((bar, index) => {
    
    if (index < options) {
      bar.classList.add('bar--yellow');
    } else {
      bar.classList.remove('bar--yellow');
    }
  });
  grade.textContent = whatGrade[options];

  passwordField.value = shuffleString(generatedPassword);
}

// Esta funcion es del algoritmo de Fisher–Yates
function shuffleString(str) {
  const array = [...str]; 
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array.join(''); 
}


function resetAll() {
  range.value = '10';
  charactersCount.textContent = '10';
  copiedText.style.display = 'none';
  passwordField.value = '';
  checkboxes.forEach(cb => cb.checked = false);
  document.querySelectorAll('.bar').forEach(bar => bar.classList.remove('bar--yellow'));
}

document.addEventListener('DOMContentLoaded', resetAll);
document.getElementById('generateBtn').addEventListener('click', createPassword);

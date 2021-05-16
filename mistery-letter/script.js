const newLetterButton = document.getElementById('criar-carta');
const inputLetter = document.getElementById('carta-texto');
const outputLetter = document.getElementById('carta-gerada');
const wordNumbers = document.getElementById('carta-contador');

function generatesRandomClasses() {
  const classes = [
    'newspaper',
    'magazine1',
    'magazine2',
    'medium',
    'big',
    'reallybig',
    'rotateleft',
    'rotateright',
    'skewleft',
    'skewright',
  ];
  const randomClasses = Math.floor(Math.random() * classes.length, 0);
  return classes[randomClasses];
}

function generateLetter() {
  newLetterButton.addEventListener('click', () => {
    outputLetter.innerHTML = '';
    if (inputLetter.value === '' || inputLetter.value === ' ' || inputLetter.value === null) {
      outputLetter.innerText = 'Por favor, digite o conteúdo da carta.';
    } else {
      const arrayString = inputLetter.value.split(' ');
      wordNumbers.innerText = `${arrayString.length}`;
      for (let index = 0; index < arrayString.length; index += 1) {
        const spanWord = document.createElement('span');
        spanWord.innerHTML = `${arrayString[index]}`;
        spanWord.classList.add(generatesRandomClasses());
        outputLetter.appendChild(spanWord);
      }
    }
  });
}
generateLetter();

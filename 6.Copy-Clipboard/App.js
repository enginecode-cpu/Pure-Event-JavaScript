const text = document.querySelector('.content h2');
const popup = document.querySelector('.popup');

text.addEventListener('click', () => {
  popup.classList.add('active');
  copyToClipboard();
});

popup.addEventListener('animationend', () => {
  popup.classList.remove('active');
});

function copyToClipboard() {
  const textArea = document.createElement('textarea');
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'absolute';
  textArea.value = text.innerText;

  document.body.appendChild(textArea);
  textArea.select();

  document.execCommand('copy');

  document.body.removeChild(textArea);
}
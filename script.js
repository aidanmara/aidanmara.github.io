function changeTheme(custom) {
  var htmlElement = document.getElementsByTagName('html')[0];
  var currentTheme = htmlElement.getAttribute('data-theme');

  switch (custom) {
    case 'redbull':
      console.log(custom)
      htmlElement.setAttribute('data-theme', 'rb');
      break;
    case 'mocha':
      htmlElement.setAttribute('data-theme', 'coffeeshop');
      break;
    case 'curuba elderflower':
      htmlElement.setAttribute('data-theme', 'curuba');
      break;
    case 'chaewon':
      window.open('https://youtu.be/PWkr21OGj1A', '_blank');
      break;
    default:
      if (currentTheme === "light") {
        htmlElement.setAttribute('data-theme', 'dark');
      } else {
        htmlElement.setAttribute('data-theme', 'light');
      }
  }
}

function changeThemeFromTextarea() {
  var custom = document.getElementById('secret-code').value;
  changeTheme(custom);
}




document.addEventListener("mousemove", function(event) {
  const bars = document.querySelectorAll('.seperator-bar');

  bars.forEach(bar => {
    const speed = 1
    const x = (window.innerWidth - event.pageX * speed) / 150;
    const y = (window.innerHeight - event.pageY * speed) / 150;

    bar.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

window.addEventListener("DOMContentLoaded", function(event) {
  const htmlElement = document.documentElement;
  const toggleButton = document.querySelector('.toggle-button input');


  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlElement.setAttribute('data-theme', 'dark');
    toggleButton.checked = true;

  } else {
    htmlElement.setAttribute('data-theme', 'light');
    toggleButton.checked = false;
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.setAttribute('data-theme', 'light');
    }
  });
});

let clickCounter = 0;

function clicky() {
  clickCounter++;

  if (clickCounter == 5) {
    const content = document.querySelector('.content-container');

    var div = document.createElement('div');
    div.className = 'hello';

    var textarea = document.createElement('textarea');
    textarea.className = 'hidden-terminal';
    textarea.id = 'secret-code';
    textarea.textContent = 'enter secret code';

    var anchor = document.createElement('a');
    anchor.className = 'bx bxs-chevron-left';
    anchor.href = '#';
    anchor.setAttribute('onclick', 'changeThemeFromTextarea()');

    div.appendChild(textarea);
    div.appendChild(anchor);

    content.appendChild(div);

  }

};
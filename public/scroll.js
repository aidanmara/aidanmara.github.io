
function scrollToBio() {
  $('html, body').animate({
    scrollTop: $(".bio").offset().top
  }, {
    duration: 800, // Adjust the duration as needed
    easing: 'easeInOutCubic' // You can use other easing functions or define a custom one
  });
}


function scrollToProjects() {
  $('html, body').animate({
    scrollTop: $(".projects").offset().top
  }, {
    duration: 500, // Adjust the duration as needed
    easing: 'easeInOutCubic' // You can use other easing functions or define a custom one
  });
}

function scrollToSkills() {
  $('html, body').animate({
    scrollTop: $(".skills").offset().top
  }, {
    duration: 500,
    easing: 'easeInOutCubic' // You can use other easing functions or define a custom one
  });
}

//Bezier
$.easing.easeInOutCubic = function(x, t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
};


$(document).ready(function() {
  const targetBio = $(".bio").get(0);
  const targetProjects = $(".projects").get(0);
  const targetSkills = $(".skills").get(0);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.25
  };

  const observerBio = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const scrollbar = document.querySelectorAll('.bar-item');
      if (entry.isIntersecting) {
        scrollbar[0].classList.add('active-bar');
        scrollbar[0].firstElementChild.style.color = "var(--text)";
        scrollbar[0].firstElementChild.style.fontSize = "x-large";
      } else {
        scrollbar[0].classList.remove('active-bar');
        scrollbar[0].firstElementChild.style.color = "var(--secondary)";
        scrollbar[0].firstElementChild.style.fontSize = "large";
      }
    });
  }, options);

  const observerProjects = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const scrollbar = document.querySelectorAll('.bar-item');
      if (entry.isIntersecting) {
        scrollbar[1].classList.add('active-bar');
        scrollbar[1].firstElementChild.style.color = "var(--text)";
        scrollbar[1].firstElementChild.style.fontSize = "x-large";
        
      } else {
        scrollbar[1].classList.remove('active-bar');
        scrollbar[1].firstElementChild.style.color = "var(--secondary)";
        scrollbar[1].firstElementChild.style.fontSize = "large";
      }
    });
  }, options);

  const observerSkills = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const scrollbar = document.querySelectorAll('.bar-item');
      if (entry.isIntersecting) {
        scrollbar[2].classList.add('active-bar');
        scrollbar[2].firstElementChild.style.color = "var(--text)";
        scrollbar[2].firstElementChild.style.fontSize = "x-large";
      } else {
        scrollbar[2].classList.remove('active-bar');
        scrollbar[2].firstElementChild.style.color = "var(--secondary)";
        scrollbar[2].firstElementChild.style.fontSize = "large";
      }
    });
  }, options);

  observerBio.observe(targetBio);
  observerProjects.observe(targetProjects);
  observerSkills.observe(targetSkills);
});


const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');

btn.addEventListener('click', navToggle);

function navToggle() {
  btn.classList.toggle('open');
  overlay.classList.toggle('overlay-show');
  document.body.classList.toggle('stop-scrolling');
  menu.classList.toggle('show-menu');
}

function countUp() {
  counters.forEach((counter) => {
    counter.innerText = '0';

    const updateCounter = () => {
      // get count target
      const target = parseInt(counter.getAttribute('data-target'));
      // get current counter value
      const c = parseInt(counter.innerText);
      // create an increment
      const increment = target / 100;
      // if counter is less than target, add increment
      if (c < target) {
        counter.innerText = `${Math.ceil(c + increment)}`;
        setTimeout(updateCounter, target > 10 ? 25 : 75);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

function countDown() {
  counters.forEach((counter) => {
    const updateCounter = () => {
      // get count target
      const target = 0;
      // get current counter value
      const c = parseInt(counter.innerText);
      // create an decrement
      const decrement = c / 100;
      // if counter is greater than target, substract decrement
      if (c > target) {
        counter.innerText = `${Math.floor(c - decrement)}`;
        setTimeout(updateCounter, target > 10 ? 25 : 75);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

const options = {
  rootMargin: '0px',
  threshold: window.innerWidth > 600 ? 0.5 : 0.2,
};

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      entry.isIntersecting ? countUp() : countDown();
    }),
  options
);
const point = document.querySelector('.stats');
observer.observe(point);

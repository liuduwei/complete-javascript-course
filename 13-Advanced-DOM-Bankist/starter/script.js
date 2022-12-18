'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// cookie
const cookie = document.createElement('div');
cookie.classList.add('cookie-message');
cookie.innerHTML =
  'we use cookie to improve functionality and analytics. <button class="btn btn--close--cookie">i got it</button>';
header.append(cookie);
const closeBtn = document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    cookie.remove();
    // cookie.parentElement.removeChild(cookie);
  });

cookie.style.width = '120%';
cookie.style.background = '#37383d';

console.log(getComputedStyle(cookie)['height']);
cookie.style.height =
  Number.parseFloat(getComputedStyle(cookie)['height']) + 30 + 'px';

// scroll smooth
const scrollButton = document.querySelector('.btn--scroll-to');
const scrollSection = document.querySelector('#section--1');

scrollButton.addEventListener('click', function (e) {
  const scrollCoop = scrollSection.getBoundingClientRect();
  console.log(scrollCoop);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll x/y', window.pageXOffset, window.pageYOffset);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo({
  //   left: scrollCoop.left + window.pageXOffset,
  //   top: scrollCoop.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  scrollSection.scrollIntoView({ behavior: 'smooth' });
});

// scroll smooth nav
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// event delegation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// build tab

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const contents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const click = e.target.closest('.operations__tab');
  // console.log(click);

  if (!click) return;
  tabs.forEach(function (el) {
    el.classList.remove('operations__tab--active');
  });
  click.classList.add('operations__tab--active');

  // content
  contents.forEach(function (el) {
    el.classList.remove('operations__content--active');
  });

  const dataTab = click.getAttribute('data-tab');
  document
    .querySelector(`.operations__content--${dataTab}`)
    .classList.add('operations__content--active');
});

// build nav fade
const handlerMouseover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const click = e.target;
    const sliblings = nav.querySelectorAll('.nav__link');
    const btn = nav.querySelector('.nav__link--btn');
    const logo = nav.querySelector('img');

    sliblings.forEach(el => (el.style.opacity = el !== click ? this : 1));
    btn.style.opacity = this;
    logo.style.opacity = this;
  }
};
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', handlerMouseover.bind(0.5));

nav.addEventListener('mouseout', handlerMouseover.bind(1));

// sticky nav

const stickyFuc = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyFuc, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});
headerObserver.observe(header);

// section revealing
// const sectionRevealing = function (entries) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove('section--hidden');
//   sectionObserve.unobserve(entry.target);
// };
// const sectionObserve = new IntersectionObserver(sectionRevealing, {
//   root: null,
//   threshold: 0.15,
// });
// const allSections = document.querySelectorAll('.section');

// allSections.forEach(section => {
//   sectionObserve.observe(section);
//   section.classList.add('section--hidden');
// });

// lazy loadimg
const imgLazyLoder = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  console.log(entry.target.dataset);
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (e) {
    e.target.classList.remove('lazy-img');
  });
};
const imgLazy = document.querySelectorAll('img[data-src]');
const imgObserver = new IntersectionObserver(imgLazyLoder, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgLazy.forEach(function (img) {
  imgObserver.observe(img);
});

//slider
const slider = function () {
  let currentSlide = 0;
  const sliders = document.querySelectorAll('.slide');
  const btnPrev = document.querySelector('.slider__btn--left');
  const btnNext = document.querySelector('.slider__btn--right');
  const slideMax = 4;
  const dotContainer = document.querySelector('.dots');

  // Functions
  const goToSlide = function (slide) {
    sliders.forEach(function (el, i) {
      el.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };

  const slideNext = function () {
    if (currentSlide === slideMax - 1) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const slidePrev = function () {
    if (currentSlide === 0) currentSlide = slideMax - 1;
    else currentSlide--;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const createDot = function () {
    sliders.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(e => e.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = function () {
    goToSlide(0);
    createDot();
    activeDot(0);

    btnNext.addEventListener('click', slideNext);
    btnPrev.addEventListener('click', slidePrev);
    document.addEventListener('keydown', function (e) {
      console.log(e);
      e.key === 'ArrowRight' && slideNext();
      e.key === 'ArrowLeft' && slidePrev();
    });

    dotContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activeDot(currentSlide);
      }
    });
  };
  init();
};
slider();

////////////////////////////////////////////////

// * select element
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// const section = document.getElementById('section--1');

// const allButton = document.getElementsByTagName('button');
// console.log(document.getElementsByClassName('btn'));

// * select downwards(childeren)
// const h1 = document.querySelector('h1');
// console.log(h1.childElementCount);
// console.log(h1.children);
// console.log(h1.childNodes);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);
// console.log(h1.lastChild);
// console.log(h1.firstChild);

// * select upwards(parent)
// console.log(h1.parentElement);
// console.log(h1.parentNode);

// h1.closest('.header').style.background = 'red';
// h1.closest('h1').style.backgroundColor = 'blue';
// * select sliblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.scale = 0.5;
//   }
// });

// * create
// .insertAdjecentHtml('afterbegin', html);
// const cookie = document.createElement('div');
// cookie.classList.add('cookie-message');
// cookie.innerHTML =
//   'we use cookie to improve functionality and analytics. <button class="btn btn--close--cookie">i got it</button>';
// header.append(cookie);
// header.before(cookie);
// header.after(cookie);

// * styles

// document.documentElement.style.setProperty('--color-primary', 'red');

// * attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.getAttribute('src')); //href
// console.log(logo.designer); //
// console.log(logo.className);

// * Non-stander
// console.log(logo.designer); //undefined
// console.log(logo.getAttribute('designer'));

// * Data-attribute
// console.log(logo.dataset.versionNumber);

// * clases
// cookie.classList.remove('a');
// cookie.classList.add('a');
// cookie.classList.toggle('a');
// cookie.classList.contains('a');

// Don't use
// cookie.className = 'a'

// * event
// const h1 = document.querySelector('h1');
// const alert1 = function () {
//   alert('1');
// };
// h1.addEventListener('mouseenter', alert1);

// * propagation

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// console.log(randomInt(0, 255));
// const randomRgb = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// const nav = document.querySelector('.nav');
// const navLinks = document.querySelector('.nav__links');
// const navLink = document.querySelector('.nav__link');

// navLink.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomRgb();
//   console.log(e.target, e.currentTarget);
// });
// navLinks.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomRgb();
//   console.log(e.target, e.currentTarget);

// e.stopPropagation();
// });
// nav.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomRgb();
//   console.log(e.target, e.currentTarget);
// });

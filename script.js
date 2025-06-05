'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
///////////////////////////////////////
// Modal window

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
///////////////////////////////////////////////////////
//------------------------Page Navigation----------------
//Note: selecting all nav link will create a node list
// hence why the forEach loop
//Note: not good to target every single el,
// if there's a 1000 elements we would be repeating it 1000 times hindering performance
/*
document.querySelectorAll('.nav__link').forEach(link =>
  link.addEventListener('click', function (e) {
    e.preventDefault();
    this.style.backgroundColor = randomColor();

    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
);
*/
//Instead target the parent of the links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Notes: Essentially e.target = the button pressed
  if (e.target.classList.contains('nav__link')) {
    //contains() does not need ' . ' before class name
    e.target.style.backgroundColor = '#5ec576';
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//-------------------Smooth Scrolling---------------------
btnScrollTo.addEventListener('click', function (e) {
  const s1coordinates = section1.getBoundingClientRect();

  console.log(s1coordinates);
  //coordinates of the 'Learn more' relative to viewport
  console.log(e.target.getBoundingClientRect());

  //current scroll position (look at scroll bar)
  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

  //heigh and width of viewport
  console.log(
    'height/width',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // Scrolling
  // old way
  // window.scrollTo({
  //   left: s1coordinates.left + window.scrollX,
  //   top: s1coordinates.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});
//---------------Cookies pop up--------------------------
const header = document.querySelector('header');

//Creating cookie message
const message = document.createElement('div');
message.classList.add('cookie-message');

//Creating button
message.innerHTML =
  'We use cookies to stalk you, you silly Goblin! >...< <button class = "btn btn--close--cookie">Got if!</button>';

//adds on top
//header.prepend(message);
header.append(message);

//deleting button
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//------------- Random color for Nav buttons---------------
//rgb(255, 255, 255)
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1));

const randomColor = () =>
  `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(
    0,
    255
  )})`;
/*
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  //e.stopPropagation(); //not a good practice
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
*/

//Operations
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  //Guard close - doesn't run code after it if return null
  if (!clicked) return;
  //Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  //Active tab
  clicked.classList.add('operations__tab--active');
  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//--------------------------NAV-TABS FOCUS MOUSE HOVER---------------------
const nav = document.querySelector('nav')

function changeLinkOpacity(e, opacity){
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) {
        el.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    })
  } 
}

nav.addEventListener('mouseover', e => changeLinkOpacity(e, 0.5));

nav.addEventListener('mouseout', e => changeLinkOpacity(e, 1));

//-----------------------------STICKY NAVBAR-------------------------------- 
const s1coordinates = section1.getBoundingClientRect();

window.addEventListener('scroll', function(){
  if(this.window.scrollY > s1coordinates.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
})

// ///Lecture 2 - Styles
// message.style.backgroundColor = '#090909';
// message.style.width = '120%';

// console.log(message.style.color);
// console.log(message.style.width);
// console.log(message.style.height);

// console.log(getComputedStyle(message).height);
// console.log(getComputedStyle(message).color);

// //convert height(string) to number then add 45px
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 45 + 'px';
// console.log(getComputedStyle(message).height);

// //CSS variables
// document.documentElement.style.setProperty('--color-primary', 'burlywood');

// //Attributes -> href, alt, src...
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'New logo alt';

// //non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer')); //returns relative version
// logo.setAttribute('company', 'Bankist');

//DOM TRAVERSING

import slickSlider from './slick-silder.js';

slickSlider();

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const menuToggle = $('.menu-toggle-btn');
const sidebar = $('.sidebar');
const sidebarCloseBtn = $('.sidebar__close-btn');
const bodyEl = document.body;
const gotoTopBtn = $('.goto-top-btn');
const homeSection = $('#home .row .col-lg-8 h1');
const animateEls = $$('.animate');

// sidebar slide in 
menuToggle.onclick = () => {
    sidebar.classList.add('slide-in');
}

// sidebar slide out
sidebarCloseBtn.onclick = () => {
    sidebar.classList.remove('slide-in');
};

bodyEl.onclick = (e) => {
    const sidebarEl = e.target.closest('.sidebar');
    const menuBtn = e.target.closest('.menu-toggle-btn');

    if(!sidebarEl && !menuBtn) {
        sidebar.classList.remove('slide-in');
    }
}

// check if an elemant is in viewport 

var checkInViewPort = (el) => {
    const screenHeight = window.innerHeight;
    const elRectDimension = el.getClientRects();

    if(!(elRectDimension[0].bottom < -20 || elRectDimension[0].top > screenHeight + 20)) {
        el.classList.add('start');
    }else {
        el.classList.remove('start');
    }

};

// handle scroll events

function scrollEvents() {
    Array.from(animateEls).forEach((el, i) => {
        checkInViewPort(el);
    });

    window.onscroll = () => {
        const scrollTop = document.documentElement.scrollTop || window.scrollY;
        const clientRect = homeSection.getBoundingClientRect();
        
        if(scrollTop > 80) {
            menuToggle.style.backgroundColor = 'black';
        }else{
            menuToggle.style.backgroundColor = 'transparent';
        }
    
        if(clientRect.bottom < 0) {
            gotoTopBtn.classList.add('show');
        }else {
            gotoTopBtn.classList.remove('show'); 
        }

        Array.from(animateEls).forEach((el, i) => {
            checkInViewPort(el);
        });
    }

    
    
  
}

scrollEvents();


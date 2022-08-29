import slickSlider from './slick-silder.js';
import validate from './formValidate.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const menuToggle = $('.menu-toggle-btn');
const sidebar = $('.sidebar');
const sidebarCloseBtn = $('.sidebar__close-btn');
const bodyEl = document.body;
const gotoTopBtn = $('.goto-top-btn');
const homeSection = $('#home .row .col-lg-8 h1');
const animateEls = $$('.animate');
// const imageshow = $('.image');
const root = document.documentElement;

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

// check if an element is in viewport and add "start" class if in

var checkInViewPort = (el) => {
    const screenHeight = window.innerHeight;
    const elRectDimension = el.getClientRects();

    if(!(elRectDimension[0].bottom < -10 || elRectDimension[0].top > screenHeight + 10)) {
        return true;
    }else {
        return false;
    }
};

function numberCounting(selectors, step = 100) {
    const numbers = $$(selectors);

    numbers.forEach((el) => {
        const value = el.getAttribute('count-value');
        const runStep = Math.ceil(value / step);
        let speed = 0;

        var interval = setInterval(() => {
            speed+=runStep;
            if(speed >= value){
                speed = value;
                clearInterval(interval);
            }

            el.textContent = speed;
        },10);

    });
}

// handle scroll events

function scrollEvents() {
    const numberWrapper = $('.number-wrapper');

    Array.from(animateEls).forEach((el) => {
        if(checkInViewPort(el)){
            el.classList.add('start');
        }else {
            el.classList.remove('start');
        }
    });

    //number counter
    const counterObserver = new IntersectionObserver((entries, observer) => {
        if(!entries) return;
        else{
            numberCounting('.number', 250);
        }
    }, {
        root: null,
        threshold: 0.5
    })

    counterObserver.observe(numberWrapper);

    window.onscroll = () => {
        const scrollTop = document.documentElement.scrollTop || window.scrollY;
        const clientRect = homeSection.getBoundingClientRect();
        const image  = $('.image');
        image.classList.remove('show');
        
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
            if(checkInViewPort(el)){
                el.classList.add('start');
            }else {
                el.classList.remove('start');
            }
        });
    }
}

function imageFeature(){
    const imgOverlay = $$('#works .gallery .row .col-md-12 .img-overlay');
    const image  = $('.image');
    const imgWrapper = $(".image .img-wrapper");
    const currentImg = $('.counter .current');
    const totalImgs = $('.counter .total');
    var startPos = null;
    var currentPos = null;
    var walk = null;
    var currentIndex;
    var isHoving = false;

    function setImage(index){
        let currentSource = imgOverlay[currentIndex].parentElement.querySelector('img').src;
        let imgOverlayDes = imgOverlay[currentIndex].querySelector('.over-lay-des h3').textContent;
        let imageDes = image.querySelector('.img-des h1');
        totalImgs.textContent = imgOverlay.length;
        currentImg.textContent = index + 1;
        imageDes.textContent = imgOverlayDes;
        image.querySelector('.img-wrapper').style.backgroundImage = `url("${currentSource}")`;
    }

    //slide to right with animation
    function slideRight(walk) {
        root.style.setProperty("--startPosLeft", walk + "px");
        currentIndex++;
        currentIndex > imgOverlay.length - 1 ? currentIndex = 0 : currentIndex;
        
        image.querySelector('.img-wrapper').style.animation = 'slide-out-left ease .7s forwards';
        setTimeout(() => {
            image.querySelector('.img-wrapper').style.animation = 'slide-right ease .7s';
            setImage(currentIndex);
            currentPos = null;
            walk = null;
        },500);
    }

    //slide to left with animation
    function slideLeft(walk) {
        root.style.setProperty("--startPosRight", walk + "px");
        currentIndex--;
        currentIndex < 0 ? currentIndex =  imgOverlay.length - 1: currentIndex;

        image.querySelector('.img-wrapper').style.animation = 'slide-out-right ease .7s forwards';
        setTimeout(() => {
            image.querySelector('.img-wrapper').style.animation = 'slide-left ease .7s';
            setImage(currentIndex);
            currentPos = null;
            walk = null;
        },500);
    }

    //catch the image overlay click event
    imgOverlay.forEach(function (img, index) {
        img.onclick = function (e){
            currentIndex = index;
            image.classList.add('show');
            setImage(currentIndex);
        }
    });

    //handle image show click event
    image.onclick = function(e) {
        const img = e.target.closest('.img-wrapper');
        const description = e.target.closest('.img-des');
        const nextBtn = e.target.closest('.next-img');
        const prevBtn = e.target.closest('.prev-img');
       
        if(!img && !nextBtn && !prevBtn && !description){
            image.classList.remove('show');
            imgWrapper.style.transform = `translateX(0px)`;
            if(isHoving) {
                isHoving = false;
            }
        }else if(nextBtn){
            root.style.setProperty("--startPosRight", 0);
            currentIndex++;
            currentIndex > imgOverlay.length - 1 ? currentIndex = 0 : currentIndex;
            image.querySelector('.img-wrapper').style.animation = 'slide-out-right ease .7s forwards';
            nextBtn.disabled = true;

            setTimeout(() => {
                image.querySelector('.img-wrapper').style.animation = 'slide-left ease .7s';
                setImage(currentIndex);
                nextBtn.disabled = false;
            },500);
           
        }else if(prevBtn){
            root.style.setProperty("--startPosLeft", 0);
            currentIndex--;
            currentIndex < 0 ? currentIndex =  imgOverlay.length - 1: currentIndex;
            image.querySelector('.img-wrapper').style.animation = 'slide-out-left ease .7s forwards';
            setTimeout(() => {
                image.querySelector('.img-wrapper').style.animation = 'slide-right ease .7s';
                setImage(currentIndex);
            },500);
        }
    }
   
    imgWrapper.onmousedown = (e) => {
        isHoving = true;
        startPos = e.pageX;
    };

    imgWrapper.onmouseleave = (e) => {
        isHoving = false;
        imgWrapper.style.transform = `translateX(0px)`;
        walk = null;
        currentPos = null;
    }

    image.onmouseup = () => {
        isHoving = false;
        imgWrapper.style.transform = `translateX(0px)`;
    };

    imgWrapper.ondblclick = (e) => {
        e.preventDefault();
    }

    imgWrapper.onmousemove = (e) => {
        if(isHoving){
            currentPos = e.pageX;
            walk = currentPos - startPos;
            imgWrapper.style.transform = `translateX(${walk}px)`;
    
            imgWrapper.onmouseup = () => {
                isHoving = false;
                let screenWidth = Number(window.innerWidth);
                if(Math.abs(walk) > 250 && screenWidth > 992) {
                    if(walk > 0){
                        slideLeft(walk);
                    }else {
                        slideRight(walk);
                    }
                }else if (Math.abs(walk) > 90 && screenWidth < 992 && screenWidth > 767) {
                    console.log(walk)
                    if(walk > 0){
                        slideLeft(walk);
                    }else {
                        slideRight(walk);
                    }
                }else if (Math.abs(walk) > 45 && screenWidth < 767){
                    if(walk > 0){
                        slideLeft(walk);
                    }else {
                        slideRight(walk);
                    }
                }else {
                    imgWrapper.style.transform = `translateX(0px)`;
                }
            }
        }
    }
}

slickSlider();
scrollEvents();
imageFeature();
var formValidated = new validate('#contactForm');
// formValidated.onSubmit = function(data){
//     console.log(data);
// }
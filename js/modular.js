'use strict';

const scrollDownBtnList = document.querySelectorAll('header .btn-scroll-down');

for(var i = 0; i < scrollDownBtnList.length; i++) {

    scrollDownBtnList[i].addEventListener('click', _ => { 
    
        const navHeight = document.querySelector('body nav').clientHeight;
        
        console.log(navHeight);
        const scrollTopPosition = document.querySelector('body main section').offsetTop - navHeight;
        console.log(scrollTopPosition);
    
        document.querySelector('main').scrollTo({top: scrollTopPosition, left: 0, behavior: 'smooth'}); });
}

const imageContainerEl = document.querySelector('header .image-container');


document.querySelector('header .showcase-counter div:first-child').classList.add('active');

window.setTimeout(function() {

    const elList = document.querySelectorAll('.preload');
    for(var i = 0; i < elList.length; i++) {
        elList[i].classList.remove('preload');
    }

window.setInterval(function() {

    let element = document.querySelector('header .image-container .image:last-child');   
    let start, previousTimeStamp;

    function step(timestamp) {
        if (start === undefined)
            start = timestamp;
        
        document.querySelector('header .showcase-counter div.active')?.classList.remove('active');

        const elapsed = timestamp - start;

        if (previousTimeStamp !== timestamp) {
            const count = (100 - Math.min(0.05 * elapsed, 100)) / 100;
            element.style.opacity = count;
        }

        if (elapsed < 2000) { 

            previousTimeStamp = timestamp
            window.requestAnimationFrame(step);

        } else {
        
            element.remove();
            element.style.opacity = 1;
            imageContainerEl.prepend(element);



            let currentEl = document.querySelector('header .image-container .image:last-child');
            let index = currentEl.dataset.index;
            document.querySelector('header .showcase-counter div[data-index="' + index + '"]').classList.add('active');
        }
    }

    window.requestAnimationFrame(step);

}, 15000);

}, 2000);



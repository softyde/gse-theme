'use strict';

let animationRunning = false;

function showNext() {

    if (animationRunning) return;
    
    animationRunning = true;

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
            
            animationRunning = false;
        }
    }

    window.requestAnimationFrame(step);
}

function showPrev() {

    if (animationRunning) return;
    
    animationRunning = true;

    let element = document.querySelector('header .image-container .image:first-child');   
    let start, previousTimeStamp;

    element.remove();
    element.style.opacity = 0;
    imageContainerEl.append(element);

    function step(timestamp) {
        if (start === undefined)
            start = timestamp;
        
        document.querySelector('header .showcase-counter div.active')?.classList.remove('active');

        const elapsed = timestamp - start;

        if (previousTimeStamp !== timestamp) {
            const count = 1 - (100 - Math.min(0.05 * elapsed, 100)) / 100;
            element.style.opacity = count;
        }

        if (elapsed < 2000) { 

            previousTimeStamp = timestamp
            window.requestAnimationFrame(step);

        } else {
        
            let currentEl = document.querySelector('header .image-container .image:last-child');
            let index = currentEl.dataset.index;
            document.querySelector('header .showcase-counter div[data-index="' + index + '"]').classList.add('active');
            
            animationRunning = false;
        }
    }

    window.requestAnimationFrame(step);
}


const scrollDownBtnList = document.querySelectorAll('header .btn-scroll-down');

for(let i = 0; i < scrollDownBtnList.length; i++) {

    scrollDownBtnList[i].addEventListener('click', _ => { 
    
        const navHeight = document.querySelector('body nav').clientHeight;
        
        const scrollTopPosition = document.querySelector('body main section').offsetTop - navHeight;
    
        document.querySelector('main').scrollTo({top: scrollTopPosition, left: 0, behavior: 'smooth'}); });
}





const imageContainerEl = document.querySelector('header .image-container');


document.querySelector('header .showcase-counter div:first-child').classList.add('active');

window.setTimeout(function() {

    const elList = document.querySelectorAll('.preload');
    for(var i = 0; i < elList.length; i++) {
        elList[i].classList.remove('preload');
    }
    
    const moveBtnList = document.querySelectorAll('header .btn-move');
    for(let i = 0; i < moveBtnList.length; i++) {
        const el = moveBtnList[i];

        if (el.classList.contains('next')) el.addEventListener('click', _ => { showNext(); });
        if (el.classList.contains('prev')) el.addEventListener('click', _ => { showPrev(); });        
    }

    window.setInterval(function() {
    
        showNext();

    }, 15000);

}, 2000);

//---

window.setInterval(_ => {

    const containerList = document.querySelectorAll('.article-container .image-container');
    for(let i = 0; i < containerList.length; i++) {
    
        const container = containerList[i];
        const list = container.querySelector('.inner-container');
        
        const width = container.clientWidth;
        const innerWidth = list.clientWidth;

        const items = parseInt(container.dataset.items, 10);
        const imgWidth = innerWidth / items; 

        let current = parseInt(container.dataset.current, 10);
        let direction = container.dataset.dir;
   
        switch(direction) {
        case 'up':
            current += 1;
            if(current >= items - 1) {
                direction = 'down';
            }
            break;
        case 'down':
            current -= 1;
            if(current <= 0) {
                direction = 'up';
            }
            break;
        }
   
   
        const currentP = list.offsetLeft;

        if ((currentP + (current * imgWidth) < 0) || (currentP + ((current + 1) * imgWidth) >= width)) {
        
            let m1 = width - innerWidth;
        
            let p = -(current * imgWidth);
            let position = Math.min(Math.max(m1, p), 0);  
           
            list.style.left = `${position}px`;
        }
        
        const l = list.querySelectorAll('.image'); 
        for(let j = 0; j < l.length; j++) l[j].classList.toggle('active', j == current);
    
        container.dataset.current = current;
        container.dataset.dir = direction;        
    }

}, 4000);

const list = document.querySelectorAll('.article-container .image-container .inner-container .image:first-child');
for(let i = 0; i < list.length; i++) list[i].classList.add('active');

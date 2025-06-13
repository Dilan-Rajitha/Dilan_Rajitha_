'use strict';

const nav = document.querySelector('.mobile-nav');
const navMenuBtn = document.querySelector('.nav-menu-btn');
const navCloseBtn = document.querySelector('.nav-close-btn');

const navToggleFunc = function () { nav.classList.toggle('active'); }

navMenuBtn.addEventListener('click', navToggleFunc);
navCloseBtn.addEventListener('click', navToggleFunc);

/* Changing color themes */

const themeBtn = document.querySelectorAll('.theme-btn');

for(let i = 0; i < themeBtn.length; i++){
    
    themeBtn[i].addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');

        for(let i = 0; i < themeBtn.length; i++){
            themeBtn[i].classList.toggle('light');
            themeBtn[i].classList.toggle('dark');
        }
    })
}



  /* -------------------------------------------------------------------------
     begin Scroll Down Button
   * ------------------------------------------------------------------------- */
(function() {
  'use strict';

  var btnScrollDown = document.querySelector('#scroll_down');

  function scrollDown() {
    var windowCoords = document.documentElement.clientHeight;
    (function scroll() {
      if (window.pageYOffset < windowCoords) {
        window.scrollBy(0, 10);
        setTimeout(scroll, 0);
      }
      if (window.pageYOffset > windowCoords) {
        window.scrollTo(0, windowCoords);
      }
    })();
  }

  btnScrollDown.addEventListener('click', scrollDown);
})();
  /* -------------------------------------------------------------------------
     end Scroll Down Button
   * ------------------------------------------------------------------------- */




       /* -------------------------------------------------------------------------
     begin About part
   * ------------------------------------------------------------------------- */
     document.addEventListener('DOMContentLoaded', function () {
    // Timeline filtering
    const timelineTypes = document.querySelectorAll('.timeline-type');
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineTypes.forEach(type => {
        type.addEventListener('click', function () {
            // Remove active class from all types
            timelineTypes.forEach(t => t.classList.remove('active'));

            // Add active class to clicked type
            this.classList.add('active');

            const filterValue = this.dataset.filter;

            // Filter timeline items
            timelineItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.type === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = item.classList.contains('left') ?
                        'translateX(-50px)' : 'translateX(50px)';
                }
            });
        });
    });

    // Timeline animations on scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('left') ?
            'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.5s ease-out';
        observer.observe(item);
    });

    // Initialize timeline filter with Education
    const educationFilter = document.querySelector('[data-filter="education"]');
    if (educationFilter) {
        educationFilter.click();
    }
});

       /* -------------------------------------------------------------------------
     begin About part end
   * ------------------------------------------------------------------------- */

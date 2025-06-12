'use strict';
/* ^^^
* Viewport Height Correction
*
* @link https://www.npmjs.com/package/postcss-viewport-height-correction
* ========================================================================== */

function setViewportProperty() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}

window.addEventListener('resize', setViewportProperty);
setViewportProperty(); // Call the fuction for initialisation

/* ^^^
* Полифил для NodeList.forEach(), на случай если забыл про IE 11
*
* @link https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
* ========================================================================== */

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
/* ^^^
* JQUERY Actions
* ========================================================================== */
// $(function() {
// $.exists = (selector) => $(selector).length > 0;


let html = document.documentElement;
let body = document.body;
let scrollbarWidht = window.innerWidth - body.clientWidth;
let isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
let click;
isMobile == true ? click = 'touchend' : click = 'click';
window.addEventListener('resize', () => {
  isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  isMobile == true ? click = 'touchend' : click = 'click';
});

function headerSetClass() {
  document.addEventListener('scroll', function () {
    if (html.scrollTop > 0) {
      document.querySelector('.header').classList.add('scrolled');
    } else {
      document.querySelector('.header').classList.remove('scrolled');
    }
  });
}

headerSetClass();
let accordionTitle = document.querySelectorAll('.js-accordion-title');
accordionTitle.forEach(item => {
  let parent = item.closest('.js-accordion');
  let body = parent.querySelector('.js-accordion-body');
  let bodyIn = parent.querySelector('.accordion__body-in');
  item.addEventListener('click', function () {
    let minHeight = bodyIn.offsetHeight;
    parent.classList.toggle('is-opened');

    if (parent.classList.contains('is-opened')) {
      body.style.minHeight = minHeight + 'px';
    } else {
      body.style.minHeight = 0;
    }
  });
}); // ;(function(){
//     $('.js-modal-trigger').on('click', function(evt){
//         evt.preventDefault();
//         var $this = $(this);
//         if($this.hasClass('js-close')) {
//            $this.closest('.b-modal').removeClass('opened')
//            closingForm();
//         }
//         else {
//             var url = $this.attr('href').replace('#','');
//             $('.b-modal').filter('[data-modal='+url+']').addClass('opened')
//             disableHtmlScroll();
//             addGutter();
//         }
//     });
//     $('.b-modal').on('click tap', function (event) {
//         if ($(event.target).closest('.b-modal__container').length) return;
//         $(this).removeClass('opened')
//         closingForm();
//     });
//     $(document).on('keydown', function(evt){
//         if (evt.keyCode == 27) {
//             $('.b-modal').removeClass('opened')
//             closingForm();
//         }
//     });
//     function addGutter() {
//         if(!isMobile) {
//             $(document.documentElement).css({'padding-right': 17});
//         }
//     }
//     function removeGutter() {
//         if(!isMobile) {
//             $(document.documentElement).css({'padding-right': 0});
//         }
//     }
//     function closingForm() {
//         setTimeout(function(){
//             enableHtmlScroll();
//             removeGutter()
//         }, 500)
//     }
// })();

Fancybox.bind("[data-fancybox]", {// Your custom options
});
setDelay('.brands', '.brands__item', 4);

function videos() {
  let videoContainers = document.querySelectorAll('.js-video');
  videoContainers.forEach(item => {
    item.addEventListener('click', function (evt) {
      document.querySelectorAll('.js-player').forEach(player => {
        player.pause();
      });
      let url = this.dataset.url;
      let video = item.querySelector('video');

      if (url) {
        let _this = this;

        let modalId = this.dataset.modalTarget;
        html.querySelector('.video-modal__content').innerHTML = `


                      <video width="1160" height="480" controls playsinline>


                          <source src="${url}" type="video/mp4">


                      </video>


                  `;
        let player = html.querySelector('.video-modal__content video');
        openModal('[data-modal-id="' + modalId + '"]');
        player.load();
        player.addEventListener('loadeddata', function () {
          setTimeout(function () {
            document.querySelector('[data-modal-id="video"]').querySelector('video').play();
          }, 300);
        });
      }
    });
  });
}

videos();

function carousel() {
  let container = document.querySelectorAll('.js-carousel');
  container.forEach(function (item) {
    let totalItems = item.querySelectorAll('.swiper-slide');
    let itemsLength = item.querySelector('.ttl');
    let slider = item.querySelector('.swiper');
    let prev = item.querySelector('.swiper-button-prev');
    let next = item.querySelector('.swiper-button-next');
    let offer = item.querySelector('.js-current');
    let preView;
    let swiperHeight = item.dataset.swiperheight;

    if (swiperHeight && window.matchMedia("(max-width: 992px)").matches) {
      swiperHeight = true;
    } else {
      swiperHeight = false;
    }

    if (item.classList.contains('simple')) {
      preView = 1;
    } else {
      preView = 'auto';
    }

    let carousel = new Swiper(slider, {
      speed: 500,
      autoHeight: swiperHeight,
      slidesPerView: preView,
      slidesPerGroup: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination"
      },
      navigation: {
        nextEl: next,
        prevEl: prev
      },
      breakpoints: {
        0: {
          spaceBetween: 10
        },
        575: {
          spaceBetween: 10,
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        768: {
          spaceBetween: 30,
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        992: {
          spaceBetween: 30,
          slidesPerView: 3,
          slidesPerGroup: 2
        },
        1200: {
          spaceBetween: 40,
          slidesPerView: 3,
          slidesPerGroup: 2
        }
      },
      on: {
        init: function init() {
          var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

          if (paginationLength < 9) {
            offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
            itemsLength.innerHTML = '/0' + paginationLength;
          } else {
            offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
            itemsLength.innerHTML = paginationLength;
          }
        },
        slideChange: function slideChange() {
          var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

          if (paginationLength < 9) {
            offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
          } else {
            offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
          }
        },
        resize: function resize() {
          var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

          if (this.activeIndex < 9) {
            offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
            itemsLength.innerHTML = '/0' + paginationLength;
          } else {
            offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
            itemsLength.innerHTML = paginationLength;
          }

          if (carousel.isLocked) {
            item.classList.add('swiper-is-locked');
          } else {
            item.classList.remove('swiper-is-locked');
          }
        }
      }
    });
  });
}

;

function carouselStaff() {
  let container = document.querySelectorAll('.js-carousel-staff');
  container.forEach(function (item) {
    let totalItems = item.querySelectorAll('.swiper-slide');
    let itemsLength = item.querySelector('.ttl');
    let slider = item.querySelector('.swiper');
    let prev = item.querySelector('.swiper-button-prev');
    let next = item.querySelector('.swiper-button-next');
    let offer = item.querySelector('.js-current');
    let preView;

    if (item.classList.contains('simple')) {
      preView = 1;
    } else {
      preView = 'auto';
    }

    let carousel = new Swiper(slider, {
      speed: 500,
      slidesPerView: preView,
      slidesPerGroup: 1,
      spaceBetween: 40,
      pagination: {
        el: ".swiper-pagination"
      },
      navigation: {
        nextEl: next,
        prevEl: prev
      },
      breakpoints: {
        0: {
          spaceBetween: 40
        },
        575: {
          spaceBetween: 40,
          slidesPerView: 2,
          slidesPerGroup: 1
        },
        768: {
          spaceBetween: 40,
          slidesPerView: 3,
          slidesPerGroup: 2
        },
        1200: {
          spaceBetween: 40,
          slidesPerView: 4,
          slidesPerGroup: 2
        }
      },
      on: {
        init: function init() {
          var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

          if (paginationLength < 9) {
            offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
            itemsLength.innerHTML = '/0' + paginationLength;
          } else {
            offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
            itemsLength.innerHTML = '/' + paginationLength;
          }
        },
        slideChange: function slideChange() {
          var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

          if (paginationLength < 9) {
            offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
          } else {
            offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
          }
        },
        resize: function resize() {
          var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

          if (this.activeIndex < 9) {
            offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
            itemsLength.innerHTML = '/0' + paginationLength;
          } else {
            offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
            itemsLength.innerHTML = '/' + paginationLength;
          }
        }
      }
    });
  });
}

;

function carouselBeforeAfter() {
  let container = document.querySelectorAll('.js-carousel-before-after');
  container.forEach(function (item) {
    let totalItems = item.querySelectorAll('.swiper-slide');
    let itemsLength = item.querySelector('.ttl');
    let slider = item.querySelector('.swiper');
    let prev = item.querySelector('.swiper-button-prev');
    let next = item.querySelector('.swiper-button-next');
    let offer = item.querySelector('.js-current');
    let preView;

    if (item.classList.contains('simple')) {
      preView = 1;
    } else {
      preView = 'auto';
    }

    let carousel = new Swiper(slider, {
      speed: 500,
      slidesPerView: preView,
      slidesPerGroup: 1,
      spaceBetween: 40,
      pagination: {
        el: ".swiper-pagination"
      },
      navigation: {
        nextEl: next,
        prevEl: prev
      },
      breakpoints: {
        0: {
          spaceBetween: 10
        },
        575: {
          spaceBetween: 20,
          slidesPerView: preView,
          slidesPerGroup: 1
        },
        768: {
          spaceBetween: 40,
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        1200: {
          spaceBetween: 40,
          slidesPerView: 2,
          slidesPerGroup: 2
        }
      },
      on: {
        init: function init() {
          var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

          if (paginationLength < 9) {
            offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
            itemsLength.innerHTML = '/0' + paginationLength;
          } else {
            offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
            itemsLength.innerHTML = '/' + paginationLength;
          }
        },
        slideChange: function slideChange() {
          var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

          if (paginationLength < 9) {
            offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
          } else {
            offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
          }
        },
        resize: function resize() {
          var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

          if (this.activeIndex < 9) {
            offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
            itemsLength.innerHTML = '/0' + paginationLength;
          } else {
            offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
            itemsLength.innerHTML = '/' + paginationLength;
          }
        }
      }
    });
  });
}

;
carouselBeforeAfter();
carousel();
carouselStaff();
setDelay('.carousel', '.carousel__item');
setDelay('.categories', '.categories__item');

if (document.querySelector('.js-copy-btn')) {
  document.querySelector('.js-copy-btn').addEventListener('click', function () {
    let text = document.querySelector('.js-copy-text').dataset.copytext;
    this.closest('.contacts-main__item-body--address').classList.add('show-tooltip');
    setTimeout(function () {
      document.querySelector('.contacts-main__item-body--address').classList.remove('show-tooltip');
    }, 1500);
    myFunction(text);
  });
}

function myFunction(elem) {
  var copyText = document.createElement("input");
  copyText.setAttribute('value', elem);
  body.append(copyText);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  copyText.remove();
}

setDelay('.contacts', '.contacts__item', 3); // function switcher() {

let switchers = document.querySelectorAll('.js-switcher');
switchers.forEach(switcher => {
  switcher.addEventListener('click', function () {
    let dType = this.dataset.type;
    let dPlaceholder = this.dataset.placeholder;
    let changeable = this.closest('form').querySelector('.js-changeable');
    changeable.setAttribute('type', dType);
    changeable.setAttribute('name', dPlaceholder);
    changeable.setAttribute('placeholder', dPlaceholder);
  });
}); // };
// switcher();
// const videoPlayers = document.querySelectorAll('.js-player');

Object.defineProperty(HTMLMediaElement.prototype, 'isPlaying', {
  get: function () {
    return !this.paused && !this.ended && this.readyState > 2;
  }
}); // videoPlayers.forEach((video) => {
//     const videoContainer = video.closest('.c-video');
//     const play = videoContainer.querySelector('.c-video__play');
//     video.addEventListener(click, function(){
//     // play.addEventListener('click', function(){
//         // setTimeout(function(){
//             videoPlayers.forEach((videos) => {
//                 if (videos.isPlaying) {
//                     // videos.pause();
//                 }
//             })
//             // if(this.isPlaying) {
//             //     this.pause()
//             //     console.log(333)
//             // } else {
//             //     this.play()
//             // }
//             // if (video.paused) {
//             //     console.log('Video is playing');
//             //     video.play();
//             // } else {
//             //     console.log('Video is paused');
//             // }
//             if(!video.closest('.c-video').classList.contains('is-clicked')) {
//                 if (video.getAttributeNames()[2] != 'controls') {
//                     video.setAttribute('controls', '');
//                     video.setAttribute('autoplay', '');
//                 }
//             }
//             video.addEventListener('play', () => {
//                 videoContainer.classList.add('is-playing')
//             });
//             video.addEventListener('pause', () => {
//                 videoContainer.classList.remove('is-playing')
//             });
//             video.addEventListener('ended', () => {
//                 videoContainer.classList.remove('is-playing')
//             });
//             video.addEventListener('seeking', () => {
//                 videoContainer.classList.add('is-playing')
//             });
//             video.addEventListener('seeked', () => {
//                 videoContainer.classList.add('is-playing')
//             });
//             video.closest('.c-video').classList.add('is-clicked')
//             // video.play()
//             // setTimeout(function(){
//                 // if (video.isPlaying) {
//                 //     video.pause();
//                 //     console.log('Video is playing');
//                 // } else {
//                 //     video.play();
//                 //     console.log('Video is paused');
//                 // }
//             // }, 300)
//             // if (video.paused) {
//             //     console.log('Video is playing');
//             //     // video.play();
//             // } else {
//             //     console.log('Video is paused');
//             // }
//         // })
//     });
// });

let videoPlayers = document.querySelectorAll('.js-player');
videoPlayers.forEach(video => {
  video.addEventListener('play', () => {
    videoPlayers.forEach(otherVideo => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });
  });
});
videoPlayers.forEach(video => {
  video.addEventListener(click, () => {
    video.addEventListener('play', () => {
      video.closest('.c-video').classList.add('is-playing');
    });
    video.addEventListener('pause', () => {
      video.closest('.c-video').classList.remove('is-playing');
    });
    video.addEventListener('ended', () => {
      video.closest('.c-video').classList.remove('is-playing');
    });
    video.addEventListener('seeking', () => {
      video.closest('.c-video').classList.add('is-playing');
    });
    video.addEventListener('seeked', () => {
      video.closest('.c-video').classList.add('is-playing');
    });

    if (!video.closest('.c-video').classList.contains('is-clicked')) {
      if (video.getAttributeNames()[2] != 'controls') {
        video.setAttribute('controls', '');
        video.closest('.c-video').classList.add('is-clicked');
        setTimeout(function () {
          video.play();
        }, 50);
      }
    } // else if (video.closest('.c-video').classList.contains('is-clicked')) {
    //     if (video.paused) {
    //         video.play();
    //     } else {
    //         video.pause();
    //     }
    // }

  });
});

if (document.querySelector('.main-title')) {
  setTimeout(function () {
    document.querySelector('.main-title').classList.add('in-viewport');
  }, 100);
}

function mobileSidebarCall() {
  let menuTrigger = document.querySelectorAll('.js-menu-trigger');
  let mobileSidebar = document.querySelector('.mobile-sidebar');
  menuTrigger.forEach(function (item) {
    item.addEventListener('click', function () {
      mobileSidebar.classList.toggle('is-opened');

      if (mobileSidebar.classList.contains('is-opened')) {
        disableHtmlScroll();
      } else {
        enableHtmlScroll();
      }
    });
  });
  mobileSidebar.addEventListener('click', function (evt) {
    if (evt.target.closest('.mobile-sidebar__container')) return;
    mobileSidebar.classList.remove('is-opened');
    enableHtmlScroll();
  });
}

;
mobileSidebarCall();

function disableHtmlScroll() {
  // if (/iPod|iPad|iPhone/i.test(navigator.userAgent)) {
  //     body.classList.add('overflow-hidden');
  // } else {
  //     body.classList.remove('overflow-hidden');
  //     html.classList.add('overflow-hidden');
  // }
  addBodyGutter();
  html.classList.add('overflow-hidden');
}

function enableHtmlScroll() {
  html.classList.remove('overflow-hidden');
  removeBodyGutter();
}

function addBodyGutter() {
  if (scrollbarWidht > 0) {
    body.style.paddingRight = scrollbarWidht + 'px';
    document.querySelector('.header__in').style.paddingRight = scrollbarWidht + 'px';
  }
}

function removeBodyGutter() {
  if (scrollbarWidht > 0) {
    body.style.paddingRight = 0;
    document.querySelector('.header__in').style.paddingRight = 0;
  }
}

disableHtmlScroll();
enableHtmlScroll();

function menuItemOpen() {
  let menuItem = document.querySelectorAll('.has-children');
  menuItem.forEach(item => {
    item.addEventListener('click', function () {
      if (isMobile) {
        event.preventDefault();
      }

      this.classList.toggle('is-opened');
    });
  });
}

;
menuItemOpen();
setDelay('.mosaic', '.mosaic__item', 2);

(function (window) {
  'use strict';

  function enableScrollBehaviorPolyfill() {
    window.removeEventListener('scroll', enableScrollBehaviorPolyfill);

    if (!'scrollBehavior' in document.documentElement.style) {
      let script = document.createElement('script');
      script.setAttribute('async', true);
      script.setAttribute('src', site_defers.smoothscroll);
      document.body.appendChild(script);
    }
  }

  window.addEventListener('scroll', enableScrollBehaviorPolyfill);
  let btn = document.getElementById('back_to');
  let classes = {
    visible: 'page-scroller--visible',
    inMemory: 'page-scroller--in-memory'
  };
  let tmpY = 0;
  let viewY = 100;
  let inMemory = false;
  /**
       * Native scrollTo with callback
       * @param offset - offset to scroll to
       * @param callback - callback function
       */

  function scrollTo(offset, callback) {
    const fixedOffset = offset.toFixed();

    const onScroll = function () {
      if (window.pageYOffset.toFixed() === fixedOffset) {
        window.removeEventListener('scroll', onScroll);
        callback();
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }

  function resetScroll() {
    setTimeout(() => {
      if (window.pageYOffset > viewY) {
        btn.classList.add(classes.visible);
      } else if (!btn.classList.contains(classes.inMemory)) {
        btn.classList.remove(classes.visible);
      }
    }, 100);

    if (!inMemory) {
      tmpY = 0;
      btn.classList.remove(classes.inMemory);
    }

    inMemory = false;
  }

  function addResetScroll() {
    window.addEventListener('scroll', resetScroll);
  }

  function removeResetScroll() {
    window.removeEventListener('scroll', resetScroll);
  }

  addResetScroll();

  let onClick = function () {
    removeResetScroll();

    if (window.pageYOffset > 0 && tmpY === 0) {
      inMemory = true;
      tmpY = window.pageYOffset;
      btn.classList.add(classes.inMemory);
      scrollTo(0, () => {
        addResetScroll();
      });
    } else {
      btn.classList.remove(classes.inMemory);
      scrollTo(tmpY, () => {
        tmpY = 0;
        addResetScroll();
      });
    }
  };

  btn.addEventListener('click', onClick);
})(window);

let tabs = document.querySelectorAll('.js-tabs');
tabs.forEach(item => {
  let titles = item.querySelectorAll('.js-tab-title');
  let bodys = item.querySelectorAll('.js-tab-body');
  let all = item.querySelectorAll('[data-index]');
  titles.forEach(function (title) {
    title.addEventListener('click', function (evt) {
      evt.preventDefault();
      let index = parseInt(title.dataset.index);
      all.forEach(elem => {
        elem.classList.remove('is-active');
        elem.removeAttribute('style');
      });
      this.closest('.reviews').classList.add('clicked');
      this.classList.add('is-active');
      fadeIn(bodys[index], 500, 'block');
    });
  });
});

const fadeOut = (el, timeout) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;
  setTimeout(() => {
    el.style.display = 'none';
  }, timeout);
};

const fadeIn = (el, timeout, display) => {
  el.style.opacity = 0;
  el.style.display = display || 'block';
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
  }, 10);
};

if (document.querySelector('.route-build')) {
  document.querySelector('.js-apple-route').addEventListener('click', function (evt) {
    if (!this.classList.contains('is-active')) {
      evt.preventDefault();

      var _this = this;

      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var coords = _this.dataset.coords;

        _this.setAttribute('href', 'http://maps.apple.com/?saddr=' + lat + ',' + lng + '&daddr=' + coords + '');

        setTimeout(function () {
          window.open('http://maps.apple.com/?saddr=' + lat + ',' + lng + '&daddr=' + coords + ''); // window.location = 'http://maps.apple.com/?saddr=' + lat + ',' + lng + '&daddr=' + coords + '', '_blank';
        }, 200);
      });

      _this.classList.add('is-active');
    }
  });
}

setDelay('.tile', '.tile__item', 3);
setDelay('.tile2', '.tile2__item', 4);

function timeOfActivity(selector) {
  const start = new Date();
  const end = new Date(2015, 8, 1, 0, 0, 0);
  const diffMilliseconds = end.getTime() - start.getTime();
  const diffSeconds = diffMilliseconds / 1000;
  const diffMinutes = diffSeconds / 60;
  const diffHours = diffMinutes / 60;
  const diffDays = diffHours / 24 / 365;
  document.querySelectorAll(selector).forEach(el => {
    el.innerHTML = Math.trunc(-diffDays);
  });
}

;
timeOfActivity('.js-activity');

function createModal() {
  let videoModal = document.createElement('div');
  videoModal.setAttribute('class', 'video-modal');
  videoModal.setAttribute('data-modal-id', 'video');
  videoModal.innerHTML = `


          <div class="video-modal__in">


              <button type="button" data-modal-close="" class="video-modal__close">


            <span class="svg-icon svg-icon--close" aria-hidden="true">


              <svg class="svg-icon__link">


                <use xlink:href="#close"></use>


              </svg>


            </span>


          </button>


              <div class="video-modal__content">


  


              </div>


          </div>


      `;
  body.append(videoModal);
}

function openModal(selector) {
  document.querySelector(selector).classList.add('is-open');
  disableHtmlScroll();
}

function closeModal(selector) {
  const modal = document.querySelector(selector).closest('[data-modal-id]');
  modal.classList.remove('is-open');
  setTimeout(function () {
    modal.querySelector('.video-modal__content').innerHTML = '';
    enableHtmlScroll();
  }, 500);
}

document.addEventListener('click', function () {
  if (event.target.closest('.video-modal__content, .js-video')) return;

  if (event.target.classList.contains('video-modal__close')) {
    closeModal('[data-modal-close]');
  }

  closeModal('[data-modal-close]');
});

if (document.querySelectorAll('[data-modal-target="video"]')) {
  createModal();
}

function setDelay(selectors, childrens, iteration) {
  selectors = document.querySelectorAll(selectors);
  let delay = 0;
  selectors.forEach(function (parent) {
    let items = parent.querySelectorAll(childrens);
    items.forEach((el, i) => {
      if (iteration) {
        el.classList.add('js-block');

        if (i % iteration === 0) {
          delay = 0;
        }

        el.style.animationDelay = delay + 'ms';
        delay += 150;
      } else {
        el.style.animationDelay = delay + 'ms';
        delay += 150;
      }
    });
    delay = 0;
  });
}

function isVisible(row, container, offset) {
  if (!offset) {
    offset = 150;
  }

  var elementTop = row.getBoundingClientRect().top + offset,
      elementHeight = row.clientHeight,
      containerTop = container.scrollY,
      containerHeight = container.innerHeight; // if(row.classList.contains('js-block')) {
  // return elementTop - containerTop - window.innerHeight <= 0 && elementTop - containerTop - containerHeight + elementHeight > 0;

  return elementTop - containerHeight < 0; // } else {
  //   return elementTop - containerHeight < 0 && elementTop + elementHeight - containerHeight > 0;
  // }
}

selectorsInViewPort();

function ultimateLineWrapperMachine3000(node) {
  const paragraphContent = node.innerHTML.replace(/^\s+|\s+$/gm, ''); // Удаляем лишние пробелы получившиеся из-за форматирования html

  const paragrapthWrappedWords = paragraphContent.replace(/(\S+)/g, '<span class="word">$1</span>'); // Оборачиваем все слова вместе с символами

  node.innerHTML = paragrapthWrappedWords;
  const wrappedWords = document.getElementsByClassName('word');
  const arrayOfWordNodes = Object.keys(wrappedWords).map(k => wrappedWords[k]);
  let currLineTop = 0;
  let finalHTML = '';
  arrayOfWordNodes.forEach((node, index) => {
    const nodeTop = node.offsetTop;
    finalHTML += '' + (index !== 0 && currLineTop !== nodeTop ? '</span></span>' : ' ') + (index === 0 || currLineTop !== nodeTop ? '<span class="line"><span>' : '') + node.innerHTML;
    currLineTop = nodeTop;
  });
  node.innerHTML = finalHTML.trim();
}

document.fonts.ready.then(() => {
  // setTimeout(function(){
  if (window.matchMedia("(min-width: 992px)").matches) {
    for (const node of document.getElementsByClassName('text-splitter')) {
      ultimateLineWrapperMachine3000(node);
    }
  }

  document.querySelectorAll('.text-splitter').forEach(item => {
    let line = item.querySelectorAll('.line span');
    let delay = 0;
    line.forEach(child => {
      child.style.animationDelay = delay + 'ms';
      delay += 150;
    });
  }); // }, 100)
});

function selectorsInViewPort() {
  let blocks = document.querySelectorAll('.js-block');

  function setClass() {
    blocks.forEach(function (block) {
      let offset = parseInt(block.dataset.offset);

      if (isVisible(block, window, offset)) {
        setTimeout(function () {
          block.classList.add('in-viewport');
        });
      }
    });
  }

  ;
  setClass();
  document.addEventListener('scroll', function () {
    setClass();
  });
}

; // });
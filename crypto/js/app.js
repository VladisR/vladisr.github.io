'use strict';
/* ^^^
* Viewport Height Correction
*
* @link https://www.npmjs.com/package/postcss-viewport-height-correction
* ========================================================================== */

function setViewportProperty() {
  var vh = window.innerHeight * 0.01;
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


$(function () {
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  var isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
      isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  $(window).on('resize', function () {
    isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  });
  $('table').wrap('<div class="table-wrapper"></div>');

  if ($('.app.home').length) {
    var introHeight = 900;
  } else {
    var introHeight = 300;
  }

  var headerFlag = 1;
  var headerFlag2 = 1;
  $(document).on('scroll load', function () {
    if ($(window).width() > 992) {
      if ($(document).scrollTop() >= introHeight && headerFlag == 1) {
        $('.app-header__content').addClass('hide');
        setTimeout(function () {
          $('.app-header__content').removeClass('hide');
          $('.app-header__content').addClass('fixed');
        }, 300);
        headerFlag = 2;
      } else if ($(document).scrollTop() < introHeight && headerFlag == 2) {
        $('.app-header__content').addClass('hide');
        setTimeout(function () {
          $('.app-header__content').removeClass('hide fixed');
        }, 100);
        headerFlag = 1;
      }
    }
  });
  $('.js-accordion-title').on('click', function () {
    $(this).closest('.js-accordion-parent').toggleClass('opened').find('.js-accordion-body').stop().slideToggle(250);
  });
  ;

  (function () {
    $('.js-modal-trigger').on('click', function (evt) {
      evt.preventDefault();
      var $this = $(this);

      if ($this.hasClass('js-close')) {
        $this.closest('.b-modal').removeClass('opened');
        closingForm();
      } else {
        var url = $this.attr('href').replace('#', '');
        $('.b-modal').filter('[data-modal=' + url + ']').addClass('opened');
        disableHtmlScroll();
        addGutter();
      }
    });
    $('.b-modal').on('click tap', function (event) {
      if ($(event.target).closest('.b-modal__container').length) return;
      $(this).removeClass('opened');
      closingForm();
    });
    $(document).on('keydown', function (evt) {
      if (evt.keyCode == 27) {
        $('.b-modal').removeClass('opened');
        closingForm();
      }
    });

    function addGutter() {
      if (!isMobile) {
        $(document.documentElement).css({
          'padding-right': 17
        });
      }
    }

    function removeGutter() {
      if (!isMobile) {
        $(document.documentElement).css({
          'padding-right': 0
        });
      }
    }

    function closingForm() {
      setTimeout(function () {
        enableHtmlScroll();
        removeGutter();
      }, 500);
    }
  })();

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  $('.js-video').each(function () {
    var $this = $(this);
    if ($this.find('video').length) return;
    var href = $this.find('> a').attr('href');

    if (href.indexOf('youtube') > -1 || href.indexOf('youtu.be') > -1) {
      var videoId = $(this).find('> a').attr('href');
      var videoId = youtube_parser(videoId);
      var hasBGImage = $(this).find('a').css('background-image') !== 'none';
      var poster = '//img.youtube.com/vi/' + videoId + '/hq720.jpg';

      if (!hasBGImage) {
        // $(this).find('> a').css('background-image', 'url(' + poster + ')');
        $(this).find('> a').append('<img loading="lazy" width="770" height="480" src="' + poster + '" alt="">');
      }
    }
  });
  $('.js-video > a').on('click', function (event) {
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href');

    if (href.indexOf('youtube') > -1 || href.indexOf('youtu.be') > -1) {
      var videoId = youtube_parser(href);
      $this.closest('.js-video').append('<iframe width="100%" height="100%" frameborder="0" src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    } else {
      $this.closest('.js-video').append('<video class=".popup-gcontent"  controls="controls" autoplay><source src="' + href + '" type="video/ogg"><source src="' + href + '" type="video/mp4"><source src="video/duel.webm" type="video/webm"></video>');
    }

    $this.hide();
  });

  function carouselSlider() {
    var carouselSlider = new Swiper('.js-carousel', {
      autoHeight: false,
      loop: false,
      lazy: true,
      slidesPerView: 4,
      slidesPerGroup: 2,
      spaceBetween: 0,
      freeMode: true,
      speed: 500,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        540: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        970: {
          slidesPerView: 3,
          spaceBetween: 3
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  }

  ;
  carouselSlider();

  if ($.exists('.js-swiper')) {
    var setIndent = function setIndent() {
      var container = $('.js-swiper-content');
      var sOffset = $('.js-swiper-parent').position().left;

      if ($(window).width() > 1200) {
        container.css({
          'margin-left': -sOffset,
          'margin-right': -sOffset,
          'padding-left': sOffset,
          'padding-right': sOffset
        });
      } else {
        container.removeAttr('style');
      }
    };

    setIndent();
    $(window).on('resize', setIndent);
  }

  function ratingSlider() {
    var ratingSlider = new Swiper('.js-swiper', {
      autoHeight: false,
      loop: false,
      lazy: true,
      slidesPerView: 4,
      slidesPerGroup: 3,
      spaceBetween: 0,
      freeMode: true,
      speed: 500,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15
        },
        540: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        970: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 10
        }
      }
    });
    $('.js-swiper').each(function () {
      $(this).find('.swiper-controls').appendTo($(this).closest('.js-swiper-parent'));
    });
  }

  ;
  ratingSlider();
  $('.main-menu li').each(function () {
    if ($(this).children('ul').length) {
      $(this).addClass('has-child');

      if ($(this).closest('.main-menu').hasClass('js-mn')) {
        $(this).find('>a').append('<span class="m-tgl"><span class="svg-icon svg-icon--arr-d" aria-hidden="true"><svg class="svg-icon__link"><use xlink:href="#arr-d"></use></svg></span></span>');
      } else {
        $(this).find('>a').append('<span class="m-tgl"></span>');
      }
    }
  });
  $('.m-tgl').on('click', function (evt) {
    evt.preventDefault();
    $(this).closest('li').toggleClass('is-opened').find('>ul').stop().slideToggle(200);
  });
  $('.js-menu').on('click', function () {
    $('.mobile-sidebar').toggleClass('opened');

    if ($('.mobile-sidebar').hasClass('opened')) {
      disableHtmlScroll();
    } else {
      enableHtmlScroll();
    }
  });

  function disableHtmlScroll() {
    if (/iPod|iPad|iPhone/i.test(navigator.userAgent)) {
      $('body').addClass('overflow-hidden');
    } else {
      $('body').removeClass('overflow-hidden');
      $(document.documentElement).addClass('overflow-hidden');
    }
  }

  function enableHtmlScroll() {
    $('body').removeClass('overflow-hidden');
    $(document.documentElement).removeClass('overflow-hidden');
  }

  $('.mobile-sidebar').on('click tap', function (event) {
    if ($(event.target).closest('.mobile-sidebar__container').length) return;
    $('.mobile-sidebar').removeClass('opened');
    enableHtmlScroll();
  });

  (function (window) {
    'use strict';

    if ($.exists('#back_to')) {
      var enableScrollBehaviorPolyfill = function enableScrollBehaviorPolyfill() {
        window.removeEventListener('scroll', enableScrollBehaviorPolyfill);

        if (!'scrollBehavior' in document.documentElement.style) {
          var script = document.createElement('script');
          script.setAttribute('async', true);
          script.setAttribute('src', site_defers.smoothscroll);
          document.body.appendChild(script);
        }
      };

      /**
         * Native scrollTo with callback
         * @param offset - offset to scroll to
         * @param callback - callback function
         */
      var scrollTo = function scrollTo(offset, callback) {
        var fixedOffset = offset.toFixed();

        var onScroll = function onScroll() {
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
      };

      var resetScroll = function resetScroll() {
        setTimeout(function () {
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
      };

      var addResetScroll = function addResetScroll() {
        window.addEventListener('scroll', resetScroll);
      };

      var removeResetScroll = function removeResetScroll() {
        window.removeEventListener('scroll', resetScroll);
      };

      window.addEventListener('scroll', enableScrollBehaviorPolyfill);
      var btn = document.getElementById('back_to');
      var classes = {
        visible: 'page-scroller--visible',
        inMemory: 'page-scroller--in-memory'
      };
      var tmpY = 0;
      var viewY = 100;
      var inMemory = false;
      addResetScroll();

      var onClick = function onClick() {
        removeResetScroll();

        if (window.pageYOffset > 0 && tmpY === 0) {
          inMemory = true;
          tmpY = window.pageYOffset;
          btn.classList.add(classes.inMemory);
          scrollTo(0, function () {
            addResetScroll();
          });
        } else {
          btn.classList.remove(classes.inMemory);
          scrollTo(tmpY, function () {
            tmpY = 0;
            addResetScroll();
          });
        }
      };

      btn.addEventListener('click', onClick);
    }
  })(window);

  $(document).on('scroll resize', function () {
    var docSroll = $(document).scrollTop();
    var footerT = $('.app-footer').offset().top;
    var winHeight = $(window).height();
    var fp = docSroll - (footerT - winHeight) - ($('.page-scroller').height() - isMobile ? -10 : 10);

    if (fp >= 0) {
      $('.page-scroller').addClass('absolute').css({
        // 'bottom': $('.app-footer').innerHeight() - ($('.page-scroller').height() / 2)
        'bottom': -($('.page-scroller').height() / 2)
      });
    } else {
      $('.page-scroller').removeClass('absolute').removeAttr('style');
    }
  });
  $('.js-search-trigger').on('click', function () {
    $(this).closest('.search').toggleClass('opened').find('input').focus();
    $('.header').toggleClass('hide-menu');
  });
  $(document).on('click', function (event) {
    if ($(event.target).closest(".search").length) return;
    $('.search').removeClass('opened');
    $('.header').removeClass('hide-menu');
  });
  $('.vote input').on('click', function () {
    var $this = $(this);
    var parent = $this.closest('.js-vote');
    var progress = parent.find('.vote__item-progressbar');
    parent.addClass('success');
    progress.each(function () {
      $(this).css({
        'width': $(this).data('percent') + '%'
      });
    });
  });

  if ($.exists('.marquee-wrapper')) {
    var _setIndent = function _setIndent() {
      var container = $('.marquee-wrapper');
      container.addClass('start');
      container.removeAttr('style');
      var sOffset = container.offset().left;

      if ($(window).width() > 992 && sOffset > 0) {
        container.css({
          'margin-left': -sOffset,
          'margin-right': -sOffset + -300 // 'padding-left': sOffset,
          // 'padding-right': sOffset + 300,

        });
      } else {
        container.removeAttr('style');
      }
    };

    _setIndent();

    $(window).on('resize', _setIndent);
  }

  if ($(window).width() <= 768) {
    var durationSpeed = 4000;
  } else {
    var durationSpeed = 11000;
  } // setTimeout(function(){
  //   $('.marquee').marquee({
  //     duplicated: true,
  //     gap: 150,
  //     duration: durationSpeed,
  //     startVisible: true
  //   });
  // },  1000);


  if ($('.sticky-sidebar').length) {
    // setTimeout(function(){
    var sidebar = new StickySidebar('.sticky-sidebar', {
      topSpacing: 130,
      bottomSpacing: 30,
      resizeSensor: true,
      containerSelector: '.content-box__col--content',
      innerWrapperSelector: '.sidebar__inner',
      minWidth: 992
    }); // }, 1000)
  }
});
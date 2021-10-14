(function ($) {
  "use strict";

  /*------------------------------------
	// Header
	------------------------------------*/
  // Fixed header
  $(window).on("scroll", function () {
    if ($("header").hasClass("sticky-on")) {
      let stickyPlaceHolder = $("#sticky-placeholder"),
        menu = $("#navbar-wrap"),
        menuH = menu.outerHeight(),
        topbarH = $("#topbar-wrap").outerHeight() || 0,
        targrtScroll = topbarH,
        header = $("header");
      if ($(window).scrollTop() > 400) {
        header.addClass("sticky");
        stickyPlaceHolder.height(menuH);
      } else {
        header.removeClass("sticky");
        stickyPlaceHolder.height(0); 
      }
    }
  });

  // humburger
  $(".humburger").on("click", function () {
    $(".humburger").toggleClass("active");
  });

  /*-------------------------------------
    Mobile Menu Toggle
    -------------------------------------*/
  $(".sidebarBtn").on("click", function (e) {
    e.preventDefault();
    if ($(".rt-slide-nav").is(":visible")) {
      $(".rt-slide-nav").slideUp();
      $("body").removeClass("slidemenuon");
    } else {
      $(".rt-slide-nav").slideDown();
      $("body").addClass("slidemenuon");
    }
  });

  /*-------------------------------------
    Mobile Menu Dropdown
    -------------------------------------*/
  let rtMobileMenu = $(".offscreen-navigation .menu");

  if (rtMobileMenu.length) {
    rtMobileMenu.children("li").addClass("menu-item-parent");
    rtMobileMenu.find(".menu-item-has-children > a").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("opened");
      let n = $(this).next(".sub-menu"),
        s = $(this).closest(".menu-item-parent").find(".sub-menu");
      rtMobileMenu
        .find(".sub-menu")
        .not(s)
        .slideUp(250)
        .prev("a")
        .removeClass("opened"),
        n.slideToggle(250);
    });
    rtMobileMenu
      .find(".menu-item:not(.menu-item-has-children) > a")
      .on("click", function (e) {
        $(".rt-slide-nav").slideUp();
        $("body").removeClass("slidemenuon");
      });
  }

  /*---------------------------------------
  // rt-slider-style-1
  ----------------------------------------*/
  $(".rt-slider-style-1").each(function (i) {
    let rtSliderStyle1 = $(this).get(0);
    let prev = $(this).parents(".rt-slide-wrap").find(".btn-prev").get(0);
    let next = $(this).parents(".rt-slide-wrap").find(".btn-next").get(0);

    new Swiper(rtSliderStyle1, {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      slideToClickedSlide: true,
      autoplay: {
        delay: 4000,
      },
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      speed: 800,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1600: {
          slidesPerView: 5,
        },
      },
    });
  });


  /*-----------------------------------
  // counter up
  ----------------------------------*/
  let counter = true;
  $(".counter-appear").appear();
  $(".counter-appear").on("appear", function () {
    if (counter) {
      // with skill bar
      $(".skill-per").each(function () {
        let $this = $(this);
        let per = $this.attr("data-per");
        $this.css("width", per + "%");
        $({ animatedValue: 0 }).animate(
          { animatedValue: per },
          {
            duration: 1000,
            step: function () {
              $this.attr("data-per", Math.floor(this.animatedValue) + "%");
            },
            complete: function () {
              $this.attr("data-per", Math.floor(this.animatedValue) + "%");
            },
          }
        );
      });
      counter = false;
    }
  });

  /*-------------------------------------
  //Contact Form initiating
  -------------------------------------*/
  let contactForm = $(".rt-contact-form");
  if (contactForm.length) {
    contactForm.each(function () {
      let innerContactForm = $(this);
      innerContactForm.validator().on("submit", function (e) {
        let $this = $(this),
          $target = innerContactForm.find(".form-response");
        if (e.isDefaultPrevented()) {
          $target.html(
            "<div class='alert alert-danger'><p>Please select all required field.</p></div>"
          );
        } else {
          $.ajax({
            url: "php/mailer.php",
            type: "POST",
            data: innerContactForm.serialize(),
            beforeSend: function () {
              $target.html(
                "<div class='alert alert-info'><p>Loading ...</p></div>"
              );
            },
            success: function (response) {
              if (response == "success") {
                $this[0].reset();
                $target.html(
                  "<div class='alert alert-success'><p>Message has been sent successfully.</p></div>"
                );
              } else {
                res = JSON.parse(response);
                if (res.message.length) {
                  let messages = null;
                  res.message.forEach(function (message) {
                    messages += "<p>" + message + "</p>";
                  });
                  $target.html(
                    "<div class='alert alert-success'><p>" +
                      messages +
                      "</p></div>"
                  );
                }
              }
            },
            error: function () {
              $target.html(
                "<div class='alert alert-success'><p>Error !!!</p></div>"
              );
            },
          });
          return false;
        }
      });
    });
  }

  /*=======================================
  //  Custom btn
  ========================================*/

  let rtCsFilteBtn = $(".rt-cs-filter-btn");

  if (rtCsFilteBtn) {
    $(rtCsFilteBtn).on("click", function () {
      $(this).toggleClass("active");
    });
  }
  /*=======================================
  //  Isotope initialization
  ========================================*/
  let rtIsotopeWrap1 = $(".rt-isotope-wrap-1");
  if (rtIsotopeWrap1.length > 0) {
    let $isotope;
    let blogGallerIso = $(
      ".rt-isotope-container-1",
      rtIsotopeWrap1
    ).imagesLoaded(function () {
      $isotope = $(".rt-isotope-container-1", rtIsotopeWrap1).isotope({
        filter: "*",
        transitionDuration: "1s",
        hiddenStyle: {
          opacity: 0,
          transform: "scale(0.001)",
        },
        visibleStyle: {
          transform: "scale(1)",
          opacity: 1,
        },
      });
    });
    rtIsotopeWrap1.find(".rt-isotope-menu-1").on("click", "a", function () {
      let $this = $(this);
      $this.parent(".rt-isotope-menu-1").find("a").removeClass("current");
      $this.addClass("current");
      let selector = $this.attr("data-filter");
      $isotope.isotope({
        filter: selector,
      });
      return false;
    });
  }

  /*-------------------------------------
     Input Quantity Up & Down activation code
     -------------------------------------*/
  $("#quantity-holder,#quantity-holder2")
    .on("click", ".quantity-plus", function () {
      let $holder = $(this).parents(".quantity-holder");
      let $target = $holder.find("input.quantity-input");
      let $quantity = parseInt($target.val(), 10);
      if ($.isNumeric($quantity) && $quantity > 0) {
        $quantity = $quantity + 1;
        $target.val($quantity);
      } else {
        $target.val($quantity);
      }
    })
    .on("click", ".quantity-minus", function () {
      let $holder = $(this).parents(".quantity-holder");
      let $target = $holder.find("input.quantity-input");
      let $quantity = parseInt($target.val(), 10);
      if ($.isNumeric($quantity) && $quantity >= 2) {
        $quantity = $quantity - 1;
        $target.val($quantity);
      } else {
        $target.val(1);
      }
    });

  /*================================== start Utilities ========================================*/
  /*----------------------------------
  //TweenMax Mouse Effect
  -----------------------------------*/
  $(".motion-effects-wrap").mousemove(function (e) {
    parallaxIt(e, ".motion-effects1", -100);
    parallaxIt(e, ".motion-effects2", -200);
    parallaxIt(e, ".motion-effects3", 100);
    parallaxIt(e, ".motion-effects4", 200);
    parallaxIt(e, ".motion-effects5", -50);
    parallaxIt(e, ".motion-effects6", 50);
  });
  function parallaxIt(e, target_class, movement) {
    let $wrap = $(e.target).parents(".motion-effects-wrap");
    if (!$wrap.length) return;
    let $target = $wrap.find(target_class);
    let relX = e.pageX - $wrap.offset().left;
    let relY = e.pageY - $wrap.offset().top;
    TweenMax.to($target, 1, {
      x: ((relX - $wrap.width() / 2) / $wrap.width()) * movement,
      y: ((relY - $wrap.height() / 2) / $wrap.height()) * movement,
    });
  }

  /*-------------------------------------
    Theia Side Bar
    -------------------------------------*/
  if (typeof $.fn.theiaStickySidebar !== "undefined") {
    $(".sticky-coloum-wrap .sticky-coloum-item").theiaStickySidebar({
      additionalMarginTop: 130,
    });
  }
  /*-------------------------------------
	// Read more button
	------------------------------------*/
  $(".rt-read-more").hover(
    function () {
      $(this).removeClass("qodef-button-animation-out");
    },
    function () {
      $(this).addClass("qodef-button-animation-out");
    }
  );

  /*------------------------------------
  //  Offcanvas Menu activation code
  -----------------------------------*/
  $("#wrapper").on("click", ".offcanvas-menu-btn", function (e) {
    e.preventDefault();
    let $this = $(this),
      wrapper = $(this).parents("body").find(">#wrapper"),
      wrapMask = $("<div />").addClass("offcanvas-mask"),
      offCancas = $("#offcanvas-wrap"),
      position = offCancas.data("position") || "left";

    if ($this.hasClass("menu-status-open")) {
      wrapper.addClass("open").append(wrapMask);
      $this.removeClass("menu-status-open").addClass("menu-status-close");
      offCancas.css({
        transform: "translateX(0)",
      });
    } else {
      removeOffcanvas();
    }

    function removeOffcanvas() {
      wrapper.removeClass("open").find("> .offcanvas-mask").remove();
      $this.removeClass("menu-status-close").addClass("menu-status-open");
      if (position === "left") {
        offCancas.css({
          transform: "translateX(-105%)",
        });
      } else {
        offCancas.css({
          transform: "translateX(105%)",
        });
      }
    }
    $(".offcanvas-mask, .offcanvas-close").on("click", function () {
      removeOffcanvas();
    });

    return false;
  });

  /*-------------------------------------
  //	Offcanvas cart  activation code
  -------------------------------------*/
  $("#wrapper").on("click", ".cart-menu-btn", function (e) {
    e.preventDefault();
    let $this = $(this),
      wrapper = $(this).parents("body").find(">#wrapper"),
      wrapMask = $("<div />").addClass("offcanvas-mask"),
      offCancas = $("#cart-wrap"),
      position = offCancas.data("position") || "left";

    if ($this.hasClass("menu-open-btn")) {
      wrapper.addClass("open-cart").append(wrapMask);
      offCancas.css({
        transform: "translateX(0)",
      });
    } else {
      removeOffcanvas();
    }

    function removeOffcanvas() {
      wrapper.removeClass("open-cart").find("> .offcanvas-mask").remove();
      if (position === "left") {
        offCancas.css({
          transform: "translateX(-105%)",
        });
      } else {
        offCancas.css({
          transform: "translateX(105%)",
        });
      }
    }
    $(".offcanvas-mask, .offcanvas-close").on("click", function () {
      removeOffcanvas();
    });

    return false;
  });

  /*-----------------------------------
  //	Jquery Serch Box
  -----------------------------------*/
  $('a[href="#template-search"]').on("click", function (event) {
    event.preventDefault();
    let target = $("#template-search");
    target.addClass("open");
    setTimeout(function () {
      target.find("input").focus();
    }, 600);
    return false;
  });

  $("#template-search, #template-search button.close").on(
    "click keyup",
    function (event) {
      if (
        event.target === this ||
        event.target.className === "close" ||
        event.keyCode === 27
      ) {
        $(this).removeClass("open");
      }
    }
  );

  /*------------------------------
  // Tooltip
  ------------------------------*/
  $(function () {
    $('[data-bs-toggle="tooltip"]').tooltip({
      offset: [0, 5],
    });
  });

  /*-------------------------------
   //  WOW
  -------------------------------*/
  let wow = new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: false,
    live: true,
    scrollContainer: null,
  });
  wow.init();

  /*-------------------------------
   //  Back to Top
  -------------------------------*/
  const backToTop = document.getElementById("back-to-top");
  window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    if (backToTop != null) {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    }
  }
  if (backToTop != null) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
  }

  /*-------------------------------------
    Window Load and Resize
    -------------------------------------*/
  $(window).on("load", function () {
    // Page Preloader
    let preloader = $("#preloader");
    preloader &&
      $("#preloader").fadeOut("slow", function () {
        $(this).remove();
      });

    // video pop up
    let videoPopUp = $(".play-btn");
    if (videoPopUp.length) {
      videoPopUp.magnificPopup({
        type: "iframe",
        iframe: {
          markup:
            '<div class="mfp-iframe-scaler">' +
            '<div class="mfp-close"></div>' +
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            "</div>",
          patterns: {
            youtube: {
              index: "youtube.com/",
              id: "v=",
              src: "https://www.youtube.com/embed/%id%?autoplay=1",
            },
            vimeo: {
              index: "vimeo.com/",
              id: "/",
              src: "//player.vimeo.com/video/%id%?autoplay=1",
            },
            gmaps: {
              index: "//maps.google.",
              src: "%id%&output=embed",
            },
          },
          srcAction: "iframe_src",
        },
      });
    }
  });

  /*-----------------------------------
	 // Section background image 
	----------------------------------*/
  imageFunction();

  function imageFunction() {
    $("[data-bg-image]").each(function () {
      let img = $(this).data("bg-image");
      $(this).css({
        backgroundImage: "url(" + img + ")",
      });
    });
  }
  /*================================== end Utilities ========================================*/

  /*--------------------------------
  // currentYear
  -------------------------------*/
  let currentYear = document.getElementById("currentYear");
  if (currentYear) {
    let date = new Date();
    let currYear = date.getFullYear();
    currentYear.innerText = currYear;
  }
})(jQuery);

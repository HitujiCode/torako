"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // ページトップへ戻る
  var topBtn = document.querySelector('.js-pageTop');
  if (topBtn) {
    topBtn.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ctaボタン
  var cta = document.querySelector(".js-cta");
  var mv = document.querySelector(".mv");
  var thumbnail = document.querySelector(".thumbnail");
  if (cta && mv && thumbnail) {
    var ctaPosition = function ctaPosition() {
      var scrollPosition = window.scrollY;
      var windowHeight = window.innerHeight;
      var mvBottom = mv.getBoundingClientRect().top + mv.offsetHeight + scrollPosition;
      var thumbnailBottom = thumbnail.getBoundingClientRect().top + thumbnail.offsetHeight + scrollPosition;
      var combinedBottom = Math.max(mvBottom, thumbnailBottom);
      if (scrollPosition + windowHeight > combinedBottom) {
        cta.style.display = "flex";
        cta.style.opacity = 1;
        cta.style.transition = "opacity 0.5s";
      } else {
        cta.style.opacity = 0;
        cta.style.transition = "opacity 0.5s";
        setTimeout(function () {
          cta.style.display = "none";
        }, 500);
      }
    };
    cta.style.display = "none";
    window.addEventListener("scroll", ctaPosition);
    ctaPosition();
  }

  // ハンバーガーメニュー
  var hamburger = document.querySelector(".js-hamburger");
  var drawer = document.querySelector(".js-drawer");
  var header = document.querySelector(".js-header");
  var logo = document.querySelector(".js-logo");
  var outer = document.querySelector(".outer");
  if (hamburger && drawer && header && logo && outer) {
    hamburger.addEventListener("click", function () {
      var scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (drawer.classList.contains("is-open")) {
        header.style.width = "";
        drawer.style.width = "";
        document.body.classList.remove("is-noscroll");
        outer.classList.remove("is-noscroll");
        logo.classList.remove("is-open");
      } else {
        var headerWidth = header.offsetWidth;
        header.style.width = "calc(100% - ".concat(scrollBarWidth, "px)");
        drawer.style.width = "calc(100% - ".concat(scrollBarWidth, "px)");
        document.body.classList.add("is-noscroll");
        outer.classList.add("is-noscroll");
        setTimeout(function () {
          logo.classList.add("is-open");
        }, 500);
      }
      hamburger.classList.toggle("is-open");
      drawer.classList.toggle("is-open");
    });
    drawer.addEventListener("click", function () {
      document.body.classList.remove("is-noscroll");
      outer.classList.remove("is-noscroll");
      header.style.width = "";
      drawer.style.width = "";
      hamburger.classList.remove("is-open");
      drawer.classList.remove("is-open");
      logo.classList.remove("is-open");
    });
    var drawerLinks = drawer.querySelectorAll("a[href]");
    drawerLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("is-noscroll");
        outer.classList.remove("is-noscroll");
        header.style.width = "";
        drawer.style.width = "";
        hamburger.classList.remove("is-open");
        drawer.classList.remove("is-open");
        logo.classList.remove("is-open");
      });
    });
  }

  // MVスライダー
  setTimeout(function () {
    new Swiper('.js-mv-swiper', {
      loop: true,
      effect: 'fade',
      speed: 3000,
      autoplay: {
        delay: 1500
      }
    });
  }, 3000);

  // サムネイルスライダー
  new Swiper('.js-thumbnail', {
    loop: true,
    speed: 2000,
    slidesPerView: "auto",
    autoplay: {
      delay: 1500,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    on: {
      init: function init() {
        document.querySelector('.thumbnail').classList.add('initialized');
      }
    }
  });

  // アニメーション
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.head, .head-1line, [class*="head--"], .head__line, .head__text, .head-1line__text').forEach(function (element) {
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      onEnter: function onEnter() {
        element.classList.add('js-slideIn');
      }
    });
  });
  var fadeInElements = gsap.utils.toArray('.js-fadeIn');
  fadeInElements.forEach(function (fadeInElement) {
    gsap.fromTo(fadeInElement, {
      autoAlpha: 0,
      y: 30,
      opacity: 0
    }, {
      autoAlpha: 1,
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: fadeInElement,
        start: 'top bottom'
      }
    });
  });
  var fadeInElements2 = gsap.utils.toArray('.js-fadeIn2');
  fadeInElements2.forEach(function (fadeInElement2, index) {
    gsap.fromTo(fadeInElement2, {
      autoAlpha: 0,
      y: 30,
      opacity: 0
    }, {
      autoAlpha: 1,
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: index * 0.2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: fadeInElement2,
        start: 'top bottom'
      }
    });
  });
  var fadeIn3 = document.querySelectorAll(".js-fadeIn3");
  fadeIn3.forEach(function (fadeInParent) {
    var fadeInItems = fadeInParent.querySelectorAll("li");
    fadeInItems.forEach(function (fadeInItem, index) {
      gsap.fromTo(fadeInItem, {
        y: 30,
        autoAlpha: 0,
        opacity: 0
      }, {
        y: 0,
        autoAlpha: 1,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: fadeInItem,
          start: "top bottom"
        }
      });
    });
  });

  // スムーススクロールを初期化する関数
  var initializeSmoothScroll = function initializeSmoothScroll() {
    document.addEventListener("click", handleClick, {
      capture: true
    });
  };

  // 指定された要素にスクロールする関数
  var scrollToTarget = function scrollToTarget(element) {
    var isPrefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var scrollBehavior = isPrefersReduced ? "instant" : "smooth";
    element.scrollIntoView({
      behavior: scrollBehavior,
      inline: "end"
    });
  };

  // 指定された要素にフォーカスを合わせる関数
  var focusTarget = function focusTarget(element) {
    element.focus({
      preventScroll: true
    });
    if (document.activeElement !== element) {
      element.setAttribute("tabindex", "-1");
      element.focus({
        preventScroll: true
      });
    }
  };

  // クリックイベントを処理する関数
  var handleClick = function handleClick(event) {
    if (event.button !== 0) return;
    var currentLink = event.target.closest('a[href*="#"]');
    if (!currentLink) return;
    var hash = currentLink.hash;
    if (!hash || currentLink.getAttribute("role") === "tab" || currentLink.getAttribute("role") === "button" || currentLink.getAttribute("data-smooth-scroll") === "disabled") return;
    var target = document.getElementById(decodeURIComponent(hash.slice(1))) || hash === "#top" && document.body;
    if (target) {
      event.preventDefault();
      scrollToTarget(target);
      focusTarget(target);
      if (!(hash === "#top")) {
        history.pushState({}, "", hash);
      }
    }
  };

  // スムーススクロールを初期化
  initializeSmoothScroll();
});
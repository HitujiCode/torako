"use strict";

window.addEventListener('load', function () {
  gsap.registerPlugin(ScrollTrigger);
  var hasVisited = sessionStorage.getItem('access');
  if (!hasVisited) {
    sessionStorage.setItem('access', '0');
    document.body.classList.add("is-fixed");
    var tl = gsap.timeline({
      onComplete: function onComplete() {
        var loadingElement = document.querySelector(".js-loading");
        if (loadingElement) loadingElement.remove();
        document.body.classList.remove("is-fixed");
      }
    });

    // ローディングロゴのフェードインアニメーション
    tl.fromTo(".loading__logo", {
      opacity: 0,
      transform: 'translate(-50%, calc(-50% + 100px))'
    }, {
      opacity: 1,
      transform: 'translate(-50%, -50%)',
      duration: 0.8
    });

    // ローディング画面全体のフェードアウト
    tl.to(".js-loading", {
      delay: 0.4,
      duration: 0.8,
      autoAlpha: 0
    });

    // js-catch要素のアニメーション
    tl.to(".js-catch", {
      duration: 1,
      delay: -0.2,
      ease: "power1.inOut",
      keyframes: [{
        rotate: 0
      }, {
        rotate: 10,
        duration: 0.5
      }, {
        rotate: -10,
        duration: 0.5
      }, {
        rotate: 0,
        duration: 0.5
      }]
    });
  } else {
    // 初回以外の処理
    var loadingElement = document.querySelector(".js-loading");
    var loadingLogoElement = document.querySelector(".loading__logo");
    if (loadingElement) loadingElement.remove();
    if (loadingLogoElement) loadingLogoElement.remove();
    gsap.to(".js-catch", {
      duration: 1,
      ease: "power1.inOut",
      keyframes: [{
        rotate: 0
      }, {
        rotate: 10,
        duration: 0.5
      }, {
        rotate: -10,
        duration: 0.5
      }, {
        rotate: 0,
        duration: 0.5
      }]
    });
  }
});
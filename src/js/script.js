jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  // ローディング
  $(window).on('load', function () {
    gsap.registerPlugin(ScrollTrigger);

    const hasVisited = sessionStorage.getItem('access');

    if (!hasVisited) {
      sessionStorage.setItem('access', '0');
      $("body").addClass("is-fixed");

      const tl = gsap.timeline({
        onComplete: function () {
          $(".js-loading").remove();
          $("body").removeClass("is-fixed");
        }
      });

      // ローディングロゴのフェードインアニメーション
      tl.fromTo(".loading__logo",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power1.inOut" }
      );

      // ローディング画面全体のフェードアウト
      tl.to(".js-loading", {
        delay: 0.3,
        duration: 1,
        autoAlpha: 0
      });

      // js-catch要素のアニメーション
      tl.to(".js-catch", {
        duration: 1,
        delay: -0.2,
        ease: "power1.inOut",
        keyframes: [
          { rotate: 0 },
          { rotate: 10, duration: 0.5 },
          { rotate: -10, duration: 0.5 },
          { rotate: 0, duration: 0.5 }
        ]
      });
    } else {
      // 初回以外の処理
      $(".js-loading").remove();
      $(".loading__logo").remove();
      gsap.to(".js-catch", {
        duration: 1,
        ease: "power1.inOut",
        keyframes: [
          { rotate: 0 },
          { rotate: 10, duration: 0.5 },
          { rotate: -10, duration: 0.5 },
          { rotate: 0, duration: 0.5 }
        ]
      });
    }
  });

  // ctaボタン
  $(document).ready(function () {
    const cta = $(".js-cta");
    const mv = $(".mv");
    const thumbnail = $(".thumbnail");
    cta.hide();

    function ctaPosition() {
      const scrollPosition = $(window).scrollTop();
      const windowHeight = $(window).height();
      const mvBottom = mv.offset().top + mv.outerHeight();
      const thumbnailBottom = thumbnail.offset().top + thumbnail.outerHeight();
      const combinedBottom = Math.max(mvBottom, thumbnailBottom);

      if (scrollPosition + windowHeight > combinedBottom) {
        cta.fadeIn();
      } else {
        cta.fadeOut();
      }
    }

    $(window).on('scroll', ctaPosition);
    // 初期状態のチェック
    ctaPosition();
  });

  // ハンバーガーメニュー
  $(function () {
    $(".js-hamburger").click(function () {
      $(this).toggleClass("is-open");
      $(".js-drawer").toggleClass("is-open");
      $("body").toggleClass("is-noscroll");
      $(".outer").toggleClass("is-noscroll");
      if ($(".js-drawer").hasClass("is-open")) {
        setTimeout(function () {
          $(".js-logo").addClass("is-open");
        }, 500); // 0.5秒後にクラスを追加
      } else {
        $(".js-logo").removeClass("is-open");
      }
    });

    // ドロワーナビのaタグをクリックで閉じる
    $(".js-drawer, .js-drawer a[href]").on("click", function () {
      $(".js-hamburger").removeClass("is-open");
      $(".js-drawer").removeClass("is-open");
      $(".js-logo").removeClass("is-open");
      $("body").removeClass("is-noscroll");
      $(".outer").removeClass("is-noscroll");
    });
  });

  // MVスライダー
  const mv_swiper = new Swiper('.js-mv-swiper', {
    loop: true,
    effect: 'fade',
    speed: 3000,
    autoplay: {
      delay: 1500,
    }
  });

  // サムネイルスライダー
  const swiper = new Swiper('.js-thumbnail', {
    loop: true,
    speed: 1500,
    slidesPerView: "auto",
    autoplay: {
      delay: 1500,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});

// アニメーション
document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  // スライドインの処理
  document.querySelectorAll('.head, .head-1line, [class*="head--"], .head__line, .head__text, .head-1line__text').forEach(element => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      onEnter: () => {
        element.classList.add('js-slideIn');
      }
    });
  });

  // フェードインの処理
  let fadeInElements = gsap.utils.toArray('.js-fadeIn');
  fadeInElements.forEach((fadeInElement) => {
    gsap.fromTo(
      fadeInElement,
      {
        autoAlpha: 0,
        y: 20,
        opacity: 0,
      },
      {
        autoAlpha: 1,
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: fadeInElement,
          start: 'top bottom',
        }
      }
    );
  });

  // フェードイン2の処理
  let fadeInElements2 = gsap.utils.toArray('.js-fadeIn2');
  fadeInElements2.forEach((fadeInElement2, index) => {
    gsap.fromTo(
      fadeInElement2,
      {
        autoAlpha: 0,
        y: 20,
        opacity: 0,
      },
      {
        autoAlpha: 1,
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: index * 0.2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: fadeInElement2,
          start: 'top bottom',
        }
      }
    );
  });

  // フェードイン3の処理
  let fadeIn3 = document.querySelectorAll(".js-fadeIn3");
  fadeIn3.forEach((fadeInParent) => {
    let fadeInItems = fadeInParent.querySelectorAll("li");
    fadeInItems.forEach((fadeInItem, index) => {
      gsap.fromTo(
        fadeInItem,
        {
          y: 20,
          autoAlpha: 0,
          opacity: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          opacity: 1,
          duration: 0.7,
          delay: index * 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: fadeInItem,
            start: "top bottom",
          },
        }
      );
    });
  });
});

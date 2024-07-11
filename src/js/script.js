
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
    const mv = $(".mv"); // mv要素を指定
    const thumbnail = $(".thumbnail"); // サムネイル要素を指定
    cta.hide();

    function ctaPosition() {
      const scrollPosition = $(window).scrollTop();
      const windowHeight = $(window).height();
      const mvBottom = mv.offset().top + mv.outerHeight();
      const thumbnailBottom = thumbnail.offset().top + thumbnail.outerHeight();
      const combinedBottom = Math.max(mvBottom, thumbnailBottom); // 両方の下端の位置を取得

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
    });
  });

  // MVスライダー
  const mv_swiper = new Swiper('.js-mv-swiper', {
    loop: true,
    effect: 'fade',
    speed: 2000,

    breakpoints: {
      768: {
      },
    },
  });

  // スライダー
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


// スライドイン
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
});

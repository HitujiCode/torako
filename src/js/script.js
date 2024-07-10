
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  // // ローディング
  // logoの表示
  // $(window).on('load', function () {
  //   $(".js-loading").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
  //   $(".loading__logo").delay(1300).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
  // });

  // ctaボタン
  $(document).ready(function () {
    const cta = $(".js-cta");
    cta.hide();

    function ctaPosition() {
      const scrollPosition = $(window).scrollTop();

      if (scrollPosition > 70) {
        cta.fadeIn();
      } else {
        cta.fadeOut();
      }
    }

    $(window).on('scroll', ctaPosition);
  });


  // ハンバーガーメニュー
  $(function () {
    $(".js-hamburger").click(function () {
      $(this).toggleClass("is-open");
      $(".js-drawer").toggleClass("is-open");
      if ($(".js-drawer").hasClass("is-open")) {
        setTimeout(function () {
          $(".js-logo").addClass("is-open");
        }, 500); // 0.5秒後にクラスを追加
      } else {
        $(".js-logo").removeClass("is-open");
      }
    });

    // ドロワーナビのaタグをクリックで閉じる
    $(".js-drawer a[href]").on("click", function () {
      $(".js-hamburger").removeClass("is-open");
      $(".js-drawer").removeClass("is-open");
      $(".js-logo").removeClass("is-open");
    });

    // resizeイベント
    $(window).on('resize', function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        $(".js-hamburger").removeClass("is-open");
        $(".js-drawer").removeClass("is-open");
        $(".js-logo").removeClass("is-open");
      }
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

  // .head要素に対する処理
  document.querySelectorAll('.head, [class*="head--"]').forEach(head => {
    ScrollTrigger.create({
      trigger: head,
      start: 'top bottom',
      onEnter: () => {
        head.classList.add('js-slideIn');
      }
    });
  });

  // .head__line要素に対する処理
  document.querySelectorAll('.head__line').forEach(line => {
    ScrollTrigger.create({
      trigger: line,
      start: 'top bottom',
      onEnter: () => {
        line.classList.add('js-slideIn');
      }
    });
  });

  // .head__text要素に対する処理
  document.querySelectorAll('.head__text').forEach(text => {
    ScrollTrigger.create({
      trigger: text,
      start: 'top bottom',
      onEnter: () => {
        text.classList.add('js-slideIn');
      }
    });
  });
});


// ローディング
$(window).on('load', function () {
  gsap.registerPlugin(ScrollTrigger);

  // セッションストレージをチェック
  const hasVisited = sessionStorage.getItem('hasVisited');

  if (!hasVisited) {
    // 初回訪問時の処理
    sessionStorage.setItem('hasVisited', 'true');

    // .js-loadingと.loading__logoを表示する
    $(".js-loading").css('display', 'block');

    const tl = gsap.timeline({
      onComplete: function () {
        $(".js-loading").remove();
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

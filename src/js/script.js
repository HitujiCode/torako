jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  // ページトップへ戻る
  const topBtn = $('.js-pageTop');

  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
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
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      if ($(".js-drawer").hasClass("is-open")) {
        // ドロワーメニューが開かれている場合
        $(".js-header").css("width", "");
        $(".js-drawer").css("width", "");
        $("body").removeClass("is-noscroll");
        $(".outer").removeClass("is-noscroll");
        $(".js-logo").removeClass("is-open");
      } else {
        // ドロワーメニューが閉じられている場合
        const headerWidth = $(".js-header").outerWidth();
        $(".js-header").css("width", `calc(100% - ${scrollBarWidth}px)`);
        $(".js-drawer").css("width", `calc(100% - ${scrollBarWidth}px)`);
        $("body").addClass("is-noscroll");
        $(".outer").addClass("is-noscroll");
        setTimeout(function () {
          $(".js-logo").addClass("is-open");
        }, 500); // 0.5秒後にクラスを追加
      }

      $(this).toggleClass("is-open");
      $(".js-drawer").toggleClass("is-open");
    });

    // ドロワーナビのaタグをクリックで閉じる
    $(".js-drawer, .js-drawer a[href]").on("click", function () {
      $("body").removeClass("is-noscroll");
      $(".outer").removeClass("is-noscroll");
      $(".js-header").css("width", "");
      $(".js-drawer").css("width", "");
      $(".js-hamburger").removeClass("is-open");
      $(".js-drawer").removeClass("is-open");
      $(".js-logo").removeClass("is-open");
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
      disableOnInteraction: false,
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
        y: 30,
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
        y: 30,
        opacity: 0,
      },
      {
        autoAlpha: 1,
        y: 0,
        opacity: 1,
        duration: 0.6,
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
          y: 30,
          autoAlpha: 0,
          opacity: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.2,
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

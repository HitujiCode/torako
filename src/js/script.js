
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

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
    // centeredSlides: true,
    // autoplay: { // 自動再生
    //   delay: 1000, // 1秒後に次のスライド
    //   disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
    // },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

});

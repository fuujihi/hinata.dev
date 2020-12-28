// ページトップ
$(function() {
  let $offset = $('#nav').offset(),
      navHeight = $('#nav').outerHeight();
  $(window).scroll(function () {
    if( $(window).scrollTop() > $offset.top) {
      $('#nav').addClass('fixedNav');
      $('body').css('padding-top', navHeight);
      $('#page_top').stop().animate({'right': '50px'}, 300);
    } else {
      $('#nav').removeClass('fixedNav');
      $('body').css('padding-top', 0);
      $('#page_top').stop().animate({'right': '-50px'}, 300);
    }
  });
});
$('#page_top').click(function () {
    $('body, html').animate({ scrollTop: 0 }, 500);
    return false;
});

// ヘッダースムーススクロール
$(function() {
   $('a[href^="#"]').click(function(){
    let href = $(this).attr('href');
    let target = $(href == '#' || href === '' ? 'html' : href);
    let position = target.offset().top-100;
    $('html,body').animate({scrollTop : position}, 500);
  });
});

// マーカー
$(window).scroll(function (){
  $('.marker-animation').each(function(){
    let position = $(this).offset().top;
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();

    if (scroll > position - windowHeight) $(this).addClass('active');
  });
});

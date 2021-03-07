$(function () {
    const age = getAge();
    $('#age').text(age);

    // ページトップ
    let navHeight = $('#nav').outerHeight(true);
    let offset = $('#nav').offset().top;
    $(window).resize(function() {
        offset = $('#nav').offset().top;
    }, false );
    $(window).scroll(function () {
        if ($(window).scrollTop() > offset) {
            $('#nav').addClass('fixedNav');
            if (!$('#dummy').length) $('body').prepend('<div id="dummy" style="margin-top:5vw"></div>')
        } else {
            $('#nav').removeClass('fixedNav');
            if ($('#dummy').length) $('#dummy').remove();
            offset = $('#nav').offset().top;
        }
    });

    // ヘッダースムーススクロール
    $('a[href^="#"]').click(function () {
        let href = $(this).attr('href');
        let target = $(href == '#' || href === '' ? 'html' : href);
        let position = target.offset().top - 100;
        $('html,body').animate({
            scrollTop: position
        }, 500);
    });

    let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDarkOS = window.matchMedia('(prefers-color-scheme: dark)');

    const changeThema = function(isDarkOS) {
        if (isDarkOS.matches) document.documentElement.setAttribute('theme', 'dark');
        else document.documentElement.setAttribute('theme', 'light');
        isDark = isDarkOS.matches;
        changeThemaIcon(isDark);
    }
    isDarkOS.addListener(changeThema);

    if (localStorage.theme) {
        document.documentElement.setAttribute('theme', localStorage.theme);
        isDark = localStorage.theme == 'dark' ? true : false;
        changeThemaIcon(isDark, false);
    }

    $('#thema').click(function () {
        if (isDark) document.documentElement.setAttribute('theme', 'light');
        else document.documentElement.setAttribute('theme', 'dark');
        isDark = !isDark;
        changeThemaIcon(isDark);
    });

});

// マーカー
$(window).scroll(function () {
    $('.marker-animation').each(function () {
        let position = $(this).offset().top;
        let scroll = $(window).scrollTop();
        let windowHeight = $(window).height();
        if (scroll > position - windowHeight) $(this).addClass('active');
    });
});

function getAge() {
    const birthday = '20030906';
    let today = new Date();
    let tdate = (today.getFullYear() * 10000) + ((today.getMonth() + 1) * 100) + today.getDate();
    return Math.floor((tdate - birthday) / 10000);
}

function changeThemaIcon(isDark, saveLocalStFlg=true) {
    if (isDark) $("#thema").html('<i class="fas fa-moon"></i>');
    else $("#thema").html('<i class="far fa-moon"></i>');
    if (saveLocalStFlg) {
        localStorage.theme = isDark ? 'dark' : 'light';
    }
}

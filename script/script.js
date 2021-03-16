$(function () {
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
            if ($('#dummy').length) {
                window.scrollTo(0, $('#nav').offset().top);
                $('#dummy').remove();
            }
            offset = $('#nav').offset().top;
        }
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
    } else {
        changeThemaIcon(isDark)
    }

    $('#thema').click(function () {
        if (isDark) document.documentElement.setAttribute('theme', 'light');
        else document.documentElement.setAttribute('theme', 'dark');
        isDark = !isDark;
        changeThemaIcon(isDark);
    });

});

function changeThemaIcon(isDark, saveLocalStFlg=true) {
    if (isDark) $("#thema").html('<i class="fas fa-moon"></i>');
    else $("#thema").html('<i class="far fa-moon"></i>');
    if (saveLocalStFlg) {
        localStorage.theme = isDark ? 'dark' : 'light';
    }
}

$(function () {
    var $w = $(window),
        $b = $('body'),
        $sectionSlides = $('#section-slides');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        FastClick.attach(document.body);
        $b.addClass('mobile');
        var iscroll_options = {};
        if (/Android/i.test(navigator.userAgent)) {
            iscroll_options['click'] = true;
        }
    }
    if ($sectionSlides.length) {
        $w.scrollTop(0);
        $b.addClass('show-resume');
        $sectionSlides.addClass('first');
        $sectionSlides.find('.dots a').eq(0).addClass('active');
        $sectionSlides.find('.slides .slide').eq(0).addClass('active');

        sectionSlide = new showSlide('#section-slides');
        $(document).on('mousewheel', function (event) {
            sectionSlide.slide(event.deltaY);
        }).on('keydown', function (e) {
            if (e.keyCode == 38) {
                if ($w.scrollTop() == 0)
                    sectionSlide.prev();
            }
            else if (e.keyCode == 40) {
                sectionSlide.next();
            }
            if ($b.hasClass('show-resume') && (e.keyCode == 38 || e.keyCode == 40)) {
                disable_event(e);
            }
        })
    }
});

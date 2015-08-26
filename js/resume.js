$(function() {
    var $w = $(window),
        $b = $('body'),
        $promo_slides = $('#promo_slides'),
        navScroll;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        FastClick.attach(document.body);
        $b.addClass('mobile');
        adjust_promo_slides();
        $w.on('orientationchange', function() {
            adjust_promo_slides()
        });
        var iscroll_options = {};
        if (/Android/i.test(navigator.userAgent)) {
            iscroll_options['click'] = true;
        }
        navScroll = new IScroll('#menu_navigation_holder', iscroll_options);
    }
    if ($promo_slides.length) {
        $w.scrollTop(0);
        $b.addClass('show_promo');
        $promo_slides.addClass('first');
        $promo_slides.find('.dots a').eq(0).addClass('active');
        $promo_slides.find('.slides .slide').eq(0).addClass('active');
        promo_slide = new PromoSlide('#promo_slides');
        $(document).on('mousewheel', function(event) {
            promo_slide.slide(event.deltaY);
        }).on('keydown', function(e) {
            if (e.keyCode == 38) {
                if ($w.scrollTop() == 0)
                    promo_slide.prev();
            } else if (e.keyCode == 40) {
                promo_slide.next();
            }
            if ($b.hasClass('show_promo') && (e.keyCode == 38 || e.keyCode == 40)) {
                disable_event(e);
            }
        })
    }
    $(document).on('click', '#menu_btn', function(e) {
        e.preventDefault();
        $b.addClass('show_nav');
        if (typeof navScroll !== 'undefined') {
            navScroll.refresh();
        }
    }).on('click', '#menu_navigation .close', function(e) {
        e.preventDefault();
        $b.removeClass('show_nav')
    }).on('click', '#go_top', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: '0px'
        })
    });

    function adjust_promo_slides() {
        $b.removeClass('portrait landscape');
        if (window.innerHeight > window.innerWidth) {
            $b.addClass('portrait');
        } else {
            $b.addClass('landscape');
        }
    }

    function disable_event(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }
    $(document).on('scroll', function() {
        $('.flip-image').each(function() {
            var e = $(this);
            var n = 150;
            var offset = $(window).scrollTop() + $(window).height();
            var pos = e.offset().top;
            var delay = randomNumber(1000, 500);
            if (!navigator.userAgent.match(/(iPod|iPad|iPhone|Android)/)) {
                if (offset > pos + n) {
                    setTimeout(function() {
                        e.addClass('animated');
                    }, delay);
                } else if (offset < pos + 25) {
                    e.removeClass('animated');
                }
            } else {
                e.addClass('animated');
            }
        });
        $('.flip-image').hover(function() {
            $('.overlay', this).css('opacity', '0');
        }, function() {
            $('.overlay', this).css('opacity', '0.65');
        });
        if ($(window).scrollTop() > 1) {
            $('.view-scroll').css('opacity', '1');
            $('.overlay-scroll').css('opacity', '0.65');
        } else {
            $('.view-scroll').css('opacity', '0');
            $('.overlay-scroll').css('opacity', '0');
        }
    });
    $('.icon-down').click(function() {
        var pos = $('.main_section').find('section:first');
        var offset = 40;
        if ($(window).width() > 769)
            offset = 79;
        $('html, body').animate({
            scrollTop: $(pos).offset().top - offset
        }, 1000);
    });

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    $(".social").click(function(e) {
        e.preventDefault();
        var href = $(e.target).attr('href');
        var width = 550,
            height = 400,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            url = this.href,
            args = 'status=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
        window.open(href, "Share", args);
    });
    var dropdowns = $(".dropdown");
    dropdowns.find("dt").click(function() {
        dropdowns.find("dd ul").hide();
        $(this).next().children().toggle();
    });
    dropdowns.find("dd ul li a").click(function() {
        var leSpan = $(this).parents(".dropdown").find("dt a span");
        var subjectInput = $(this).parents(".field").find("input[name='subject']");
        $(this).parents(".dropdown").find('dd a').each(function() {
            $(this).removeClass('selected');
        });
        leSpan.html($(this).html());
        subjectInput.val($(this).html());
        if ($(this).hasClass('default')) {
            leSpan.removeClass('selected')
        } else {
            leSpan.addClass('selected');
            $(this).addClass('selected');
        }
        $(this).parents("ul").hide();
    });
    $(document).bind('click', function(e) {
        if (!$(e.target).parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
    });
    $(document).ready(function() {
        if ($('#contact form').length > 0 && $('#contact form').hasClass('submitted') && window.ga) {
            ga('send', 'pageview', '/contact/submitted');
        }
    });
});
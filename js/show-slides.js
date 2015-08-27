function showSlide(holder) {
    var _this = this,
        $w = $(window),
        $b = $('body'),
        $sectionSlides = $(holder),
        $slides_holder = $sectionSlides.find('.slides'),
        $slides = $slides_holder.find('.slide'),
        $nav = $sectionSlides.find('.slides-nav'),
        $dots = $nav.find('.dots a'),
        $nav_prev = $nav.find('.prev'),
        $nav_next = $nav.find('.next'),
        diff = 0,
        animated_slides = false,
        $current,
        pos,
        size,
        startY = 0,
        one_touch = false,
        tags_skip = ['A'];
    set_variables();
    function run(val) {
        if (!animated_slides && $w.scrollTop() == 0) {
            set_variables();
            diff += val;
            if (Math.abs(diff) % 3 == 0 && diff != 0) {
                if (diff > 0 && pos != 0) {
                    show_slide($current.index() - 1);
                } else if (diff < 0 && $b.hasClass('show-resume')) {
                    show_slide($current.index() + 1);
                }
                diff = 0;
            }
        }
    }

    function callback() {
        $dots.removeClass('active').eq(pos).addClass('active');
        if (pos == 0) {
            $sectionSlides.addClass('first');
        } else {
            if ($sectionSlides.hasClass('first'))
                $sectionSlides.removeClass('first');
        }
        animated_slides = false;
    }

    function show_slide(i) {
        if (!animated_slides && i != pos) {
            set_variables();
            var $_slide = $slides.eq(i);
            if (i > pos && pos >= 0) {
                animated_slides = true;
                if (i == size) {
                    $sectionSlides.slideUp(800, function () {
                        $slides.removeClass('active');
                        $b.removeClass('show-resume');
                        pos = -1;
                        callback();
                    });
                }
                else {
                    $_slide.addClass('under').show();
                    $current.slideUp(800, function () {
                        $(this).removeClass('active');
                        $_slide.addClass('active').removeClass('under');
                        pos = $_slide.index();
                        callback();
                    });
                }
            }
            else if (i < pos) {
                $b.addClass('show-resume');
                if (pos > 0) {
                    animated_slides = true;
                    $_slide.addClass('over').hide().slideDown(800, function () {
                        $current.removeClass('active');
                        $_slide.removeClass('over').addClass('active');
                        pos = $_slide.index();
                        callback();
                    });
                }
                else if (pos == -1) {
                    animated_slides = true;
                    $slides.last().addClass('active');
                    $sectionSlides.slideDown(800, function () {
                        pos = size - 1;
                        callback();
                    });
                }
            }
        }
    }

    function set_variables() {
        $current = $slides_holder.find('.slide.active');
        pos = $current.index('.slide');
        size = $sectionSlides.find('.slide').length;
    }

    $dots.on('click touchstart', function (e) {
        e.preventDefault();
        var $this = $(this), i = $this.index();
        if (!$this.hasClass('active')) {
            show_slide(i);
        }
    });
    $nav_prev.on('click touchstart', function (e) {
        e.preventDefault();
        show_slide(pos - 1);
    });
    $nav_next.on('click touchstart', function (e) {
        e.preventDefault();
        show_slide(pos + 1);
    });
    _this.slide = function (val) {
        run(val);
    };
    _this.prev = function () {
        show_slide(pos - 1);
    };
    _this.next = function () {
        show_slide(pos + 1);
    };
    function not_click(e) {
        return (indexOf.call(tags_skip, e.target.tagName) == -1 || !$(e.target).closest('a').length);
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.addEventListener('touchstart', function (e) {
            var touchobj = e.changedTouches[0];
            startY = parseInt(touchobj.clientY);
            if ($b.hasClass('show-resume') && e.touches.length == 1) {
                if ($(e.target).closest(holder).length || $(e.target).closest('header').length) {
                    if (not_click(e)) {
                        e.preventDefault();
                        one_touch = true;
                    }
                }
            }
        }, false);
        document.addEventListener('touchmove', function (e) {
            var touchobj = e.changedTouches[0];
            var dist = parseInt(touchobj.clientY) - startY;
            if ($b.hasClass('show-resume') && e.touches.length == 1) {
                if ($(e.target).closest(holder).length || $(e.target).closest('header').length) {
                    if (not_click(e)) {
                        e.preventDefault();
                        if (Math.abs(dist) > 30 && one_touch) {
                            one_touch = false;
                            if (dist > 0) {
                                sectionSlide.prev();
                            }
                            else {
                                sectionSlide.next();
                            }
                        }
                    }
                }
            }
            if (window.scrollY <= 0 && !$b.hasClass('show-resume') && dist > 20) {
                _this.prev();
            }
        }, false);
        document.addEventListener('touchend', function (e) {
            var touchobj = e.changedTouches[0];
            startY = parseInt(touchobj.clientY);
            if ($b.hasClass('show-resume') && e.touches.length == 1) {
                if ($(e.target).closest(holder).length || $(e.target).closest('header').length) {
                    if (not_click(e)) {
                        e.preventDefault();
                        one_touch = false;
                    }
                }
            }
        }, false);
    }
    var indexOf = function (needle) {
        if (typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function (needle) {
                var i = -1, index = -1;
                for (i = 0; i < this.length; i++) {
                    if (this[i] === needle) {
                        index = i;
                        break;
                    }
                }
                return index;
            };
        }
        return indexOf.call(this, needle);
    };
}
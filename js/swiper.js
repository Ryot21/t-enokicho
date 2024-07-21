        // 施工例スライダー
        const buildSwiper = new Swiper(".swiper-Build", {
            effect: 'slide',
            mousewheel: {
                invert: false,
            },
            centeredSlides: true,
            slidesPerView: 1,
            fadeEffect: {crossFade: true,},
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                waitForTransition: true,
            },
            grabCursor: true,
            followFinger: false,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: '.swiper-Fview .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {slidesPerView: 3,},
                980: {slidesPerView: 3,},
            }
        });
        // 動画スライダー
        const videoSwiper = new Swiper(".swiper-Video", {
            effect: 'slide',
            mousewheel: {
                invert: false,
            },
            centeredSlides: true,
            slidesPerView: 1,
            fadeEffect: {crossFade: true,},
            loop: true,
            // speed: 3000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                waitForTransition: true,
            },
            grabCursor: true,
            followFinger: false,
            breakpoints: {
                768: {slidesPerView: 3,},
                980: {slidesPerView: 3,},
            },
            on: {
                //スライダー遷移時（ドキュメント内の全動画を一時停止にする）
                transitionStart: function(){
                    var videos = document.querySelectorAll('video');
                    Array.prototype.forEach.call(videos, function(video){
                        video.pause();
                    });
                },
                //スライダー遷移完了後（アクティブスライドの動画を再生する）
                transitionEnd: function(){
                    var activeIndex = this.activeIndex;
                    var activeSlide = document.getElementsByClassName('swiper-slide')[activeIndex];
                    var activeSlideVideo = activeSlide.getElementsByTagName('video')[0];
                    activeSlideVideo.play();
                },
            },
        });


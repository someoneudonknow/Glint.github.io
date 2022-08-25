function slickSlider(){
    $(document).ready(function(){
        $('.carousel-list').slick({
            infinite: true,
            dots: true,
            slidesToShow: 6,
            slidesToScroll: 2,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        infinite: true,
                        dots: true,
                        slidesToShow: 5,
                        slidesToScroll: 2,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        infinite: true,
                        dots: true,
                        slidesToShow: 4,
                        slidesToScroll: 2,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        infinite: true,
                        dots: true,
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        infinite: true,
                        dots: true,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                },
            ]
        });

        $('.feedback-content').slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true,
            arrows: true,
            // autoplay: true,
            // autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        dots: true,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        adaptiveHeight: true,
                        arrows: false,
                    }
                }
            ]
          });
                  
    });
}

export default slickSlider;
import '../styles/index.scss';

var slick = $(".wrap-slider-news__slider-container").slick({
    infinite: true,
    slidesToShow: 4,
    dots: false,
    arrows:false,
    responsive: [
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
        },
    ]
});


$(".wrap-slider-news__button-icon").on("click" , function(){
    if ($(this).children().hasClass("fa-angle-left")){
        slick.slick("slickPrev");
    }else{
        slick.slick("slickNext");
    }
});

$(".wrap-slider-news__slider-item-container").on("click",function(){
    var id = $(this).attr("data-id");
    $(".wrap-slider-news__news-detail-container").hide();
    $(".wrap-slider-news__news-detail-container[data-id='" + id +"'] ").show();
})
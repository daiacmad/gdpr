import '../styles/index.scss';

var slick = $(".wrap-slider-news__slider-container").slick({
    infinite: false,
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

$(".wrap-slider-news__slider-image-container , .wrap-slider-news__slider-description").on("click",function(){
    var id = $(this).attr("data-id");
    $(".wrap-slider-news__news-detail-container").hide();
    $(".wrap-slider-news__news-detail-container[data-id='" + id +"'] ").show();
    
    //active item
    $(".wrap-slider-news__slider-item-container").removeClass("active");
    $(this).closest(".wrap-slider-news__slider-item-container").addClass("active");
})
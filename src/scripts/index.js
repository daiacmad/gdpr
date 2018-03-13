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

var pageNumber = 1;
var isLoading = false;
slick.on("beforeChange", function (event, slick, currentSlide, nextSlide){
    if ( (slick.currentSlide + slick.options.slidesToShow) == slick.slideCount - 1 && isLoading == false){
        isLoading = true;
        $.ajax({
            url: pathUrlApi + "?pag=" + pageNumber,
            method: "GET",
            dataType: "json",
            success: function(res){
                console.log(res);
                for(var i = 0 ; i < res.data.items.length ; i++){
                    var item = res.data.items[i];
                    $(".wrap-slider-news__slider-container").slick("slickAdd", 
                        templateSlider(
                            item.id,
                            item.image, 
                            item.created_date, 
                            item.title));
                    
                    $("#loopArticle").append(
                        templateArticle(
                            item.id, 
                            item.title, 
                            item.created_date, 
                            item.description))
                }
                isLoading = false;
                pageNumber++;
                
            },
        });
    }
});


$(".wrap-slider-news__button-icon").on("click" , function(){
    if ($(this).children().hasClass("fa-angle-left")){
        slick.slick("slickPrev");
    }else{
        slick.slick("slickNext");
    }
});

$(".wrap-slider-news__slider-container").on("click",".wrap-slider-news__slider-image-container , .wrap-slider-news__slider-description",function(){
    var id = $(this).attr("data-id");
    $(".wrap-slider-news__news-detail-container").hide();
    // $(".wrap-slider-news__news-detail-container[data-id='" + id +"'] ").show();
    $("#articleModal .modal-body").html($(".wrap-slider-news__news-detail-container[data-id='" + id + "'] ").html())
    $("#articleModal").modal("show")
    //active item
    $(".wrap-slider-news__slider-item-container").removeClass("active");
    $(this).closest(".wrap-slider-news__slider-item-container").addClass("active");
})


function templateSlider(id , imageName , date, title){
    var fullurlImage = imageName;
    return `<div class='wrap-slider-news__slider-item col-xs-12'>
                <div class='wrap-slider-news__slider-item-container'>
                    <div class='wrap-slider-news__slider-image-container' data-id='${id}' >
                        <img class='wrap-slider-news__slider-image' src='${fullurlImage}' />
                    </div>
                    <div class='wrap-slider-news__slider-content'>
                        <div class='wrap-slider-news__slider-date'>
                            <i class='fa fa-calendar-o'></i> ${date}
                        </div>
                        <div class='wrap-slider-news__slider-description' data-id='${id}' >
                            ${title}
                        </div>
                    </div>
                </div>
            </div>`
}

function templateArticle(id, title, date, body){
    return `<div class='col-xs-12 wrap-slider-news__news-detail-container' data-id='${id}'>
                <div class='wrap-slider-news__news-detail-title'>
                    ${title}
                </div>
                <div class='wrap-slider-news__news-detail-date'>
                    <i class='fa fa-calendar-o'></i> ${date}
                </div>
                <div class='wrap-slider-news__news-detail-content'>
                    ${body}
                </div>
            </div >`
}
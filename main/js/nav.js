$("#leftside-navigation .sub-menu > a").click(function (e) {
    $("#leftside-navigation ul ul").slideUp();
    $(this).next().is(":visible") || $(this).next().slideDown();
    // $(this).toggleClass("arrow");
    e.stopPropagation();
    console.log();
    $("#arrow").toggleClass( "arrow-up" );
    $("#arrow").toggleClass( "arrow-down" );
});

$("#leftside-navigation .sub-menu > a").trigger("click");

let scrollTo = function (idDestination) {
    document.getElementById(idDestination).scrollIntoView({behavior: 'smooth'})
};
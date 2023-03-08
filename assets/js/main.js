$(document).ready(function () {
    let target = $('#teste2')
    $('.jq').click(function () {
        $('html').animate({
            scrollTop:target.offset().top
        },1000)
    })
})
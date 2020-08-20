$('#sideCollapseButton').click(function(){
    $('body').toggleClass('sideHided');
    $('.main-content .section__content').toggleClass('sideHided');
    $('#sideCollapseButton').toggleClass('rotated');
});
var $grid = $('.activities-list').isotope({
    // options
    });
    // filter items on button click
    $('.filter-buttons').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
    });

    $(document).ready(function(){
        $grid.isotope({ filter: '*' });
    });
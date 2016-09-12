(function() {
    var body = $('body');
    $('.nav.nav-pills').append('<li><a class="weeksMenu" href="#weeks">Weeks</a></li>');
    
    var weeksContainer = $('<week-games>Loading games...</week-games>');
    $('.container > .row:eq(2)').after(weeksContainer);
    weeksContainer.hide();

    function showWeeksMenu(){
        $('.container > .row:eq(1)').hide();
        $('.container > .row:eq(2)').hide();
        weeksContainer.show();

        $('.nav.nav-pills li').removeClass('active');
        $('.nav.nav-pills li:eq(2)').addClass('active');
    }

    if(location.hash.indexOf("weeks") !== -1) {
        showWeeksMenu();
    }

    $('.weeksMenu').click(showWeeksMenu);
})();
$(function(){
    $("#btn-new-inquiry").on('click', function(){
        // $("#inquiry-list-wrapper").toggleClass("hidden");
        // $("#new-inquiry-wrapper").toggleClass("hidden");
        $(this).parents("#container").find(".wrapper").toggleClass("hidden");
    });
    
    $(".btn-cancel").on('click', function(){
        $(this).parents("#container").find(".wrapper").toggleClass("hidden");
    });
});
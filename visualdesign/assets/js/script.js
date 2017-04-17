$(function(){
    
    $("#appointment-breadcrumb a").on('click', function(){
        return false;
    })
    
    $("#btn-new-inquiry").on('click', function(){
        // $("#inquiry-list-wrapper").toggleClass("hidden");
        // $("#new-inquiry-wrapper").toggleClass("hidden");
        $(this).parents("#inquiry").find(".wrapper").toggleClass("hidden");
    });
    
    $("#btn-new-appointment").on('click', function(){
        // $("#inquiry-list-wrapper").toggleClass("hidden");
        // $("#new-inquiry-wrapper").toggleClass("hidden");
        $(this).parents("#appointments").find(".wrapper").toggleClass("hidden");
    });
    
    
    $(".btn-cancel").on('click', function(){
        $("#appointment-list-wrapper").toggleClass("hidden");
        $("#new-appointment-wrapper").toggleClass("hidden");
    });
    
    $("#new-inquiry-btn-cancel").on('click', function(){
        $("#new-inquiry-wrapper").toggleClass("hidden");
        $("#inquiry-list-wrapper").toggleClass("hidden");
    });
    
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href") // activated tab
      // $("#inquiry-list-wrapper").toggleClass("hidden");
      // $("#new-inquiry-wrapper").toggleClass("hidden");
    });
    
    $("#summary-btn-back").on('click', function(){
        $('#appointment-breadcrumb a[href="#doctor-details"]').tab('show');
    });
    
    $("#doctor-btn-next").on('click', function(){
        $('#appointment-breadcrumb a[href="#appointment-summary"]').tab('show');
    });    
    
    $("#patient-btn-next").on('click', function(){
        $('#appointment-breadcrumb a[href="#doctor-details"]').tab('show');
    });
    
    $("#doctor-btn-back").on('click', function(){
        $('#appointment-breadcrumb a[href="#patient-details"]').tab('show');
    });
    
    $('.input-daterange').datepicker({
    });    
    
    $('#btn-doctor-calendar').datepicker({
    });
});
$(function(){
    
    $("#appointment-breadcrumb a").on('click', function(){
        return false;
    })
    
    $("#btn-new-inquiry").on('click', function(){
        // $("#inquiry-list-wrapper").toggleClass("hidden");
        // $("#new-inquiry-wrapper").toggleClass("hidden");
        $(this).parents("#inquiry").find(".wrapper").toggleClass("hidden");
        $("#form-new-inquiry")[0].reset();
    });
    
    $("#btn-new-appointment").on('click', function(){
        // $("#inquiry-list-wrapper").toggleClass("hidden");
        // $("#new-inquiry-wrapper").toggleClass("hidden");
        $(this).parents("#appointments").find(".wrapper").toggleClass("hidden");
        $('#form-appointments')[0].reset();
        $('#appointment-breadcrumb a[href="#patient-details"]').tab('show'); 
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
        
        $.getJSON( "ajax/data.json", function( data ) {
            console.log(data);
        });
    });
    
    $("#doctor-btn-back").on('click', function(){
        $('#appointment-breadcrumb a[href="#patient-details"]').tab('show');
    });
    
    $('.input-daterange').datepicker({
    });    
    
    $('#btn-doctor-calendar').datepicker({
    }).on("changeDate", function(e){
        console.log(e.timeStamp);
        var t = e.timeStamp;
        $.ajax({
          type: "POST",
          url: "http://local.sagar.sutar.in/api.php",
          data: {
              timeStamp: t
          },
          success: function(data) {
            console.log("returnedData", data);
          }
        });
    });
    
    /* devesh save inquiry start*/
    $('#save-inquiry').on('click', function(e){
        var personName = $("#personName").val();
        var contactNumber = $("#contactNumber").val();
        var personArea = $("#personArea").val();
        var hospital = $("#hospital").val();
        var doctor = $("#doctor").val();
        var inquiryDetails = $("#inquiryDetails").val();
        var followUpRequired = $("#followUpRequired").val();
        $ajax({
            type: "POST",
            url: "",
            data: {
                personName: personName,
                contactNumber: contactNumber,
                personArea: personArea,
                hospital: hospital,
                doctor: doctor,
                inquiryDetails: inquiryDetails,
                followUpRequired: followUpRequired
            },
            success: function(data) {
                console.log("returnedData", data);
            }
        });
    });
    /* devesh save inquiry end*/
});
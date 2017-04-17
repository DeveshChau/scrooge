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
            console.log(data.hospitalID);
            $("#hospitalName").val(data.hospitalName);
            $("#hospitalName").attr("data-hospitalID", data.hospitalID);

            var doctors = [];
            for (var i = 0; i < data.doctors.length; i++) {
                doctors.push( "<option id='" + data.doctors[i].doctorID + "'>" + data.doctors[i].doctorName + "  (" + data.doctors[i].speciality + ")" + "</option>" );
            }

            $("#doctorName").html(doctors.join(""));
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
});
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

    $("#doctor-btn-next").on('click', function()  {
      var $tab = $("#new-appointment-wrapper .tab-pane:visible");

      var valid = true;
      $('input, select', $tab).each(function(i, v) {
          $(this).trigger('focusout');
      });

      valid = $tab.find(".has-error").length == 0 ? true : false;

      if(!valid) {
         return;
      }
      $('#appointment-breadcrumb a[href="#appointment-summary"]').tab('show');
    });

    var validator = $("#form-appointments").validator();
    $("#patient-btn-next").on('click', function(){
        var $tab = $("#new-appointment-wrapper .tab-pane:visible");

        var valid = true;
        $('input, select', $tab).each(function(i, v) {
            $(this).trigger('focusout');
        });

        valid = $tab.find(".has-error").length == 0 ? true : false;

        if(!valid) {
           return;
        }

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
        // $.ajax({
        //   type: "POST",
        //   url: "http://local.sagar.sutar.in/api.php",
        //   data: {
        //       timeStamp: t
        //   },
        //   success: function(data) {
        //     console.log("returnedData", data);
        //   }
        // });
    });


    $('#saveInquiry').on('click', function(){
        var data = $("#form-new-inquiry").serializeArray();
        var dataOject = objectifyForm(data);
        $.ajax({
            type: "POST",
            url: "",
            data: dataOject,
            success: function(data) {
            console.log("returnedData", data);
          }
        });
    });

    $('#summary-btn-save').on('click', function(){
        var data = $("#form-appointments").serializeArray();
        var dataOject = objectifyForm(data);
        $.ajax({
            type: "POST",
            url: "",
            data: dataOject,
            success: function(data) {
            console.log("returnedData", data);
          }
        });
    });

    function objectifyForm(formArray) {//serialize data function

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        console.log(returnArray);
        return returnArray;
    }

});

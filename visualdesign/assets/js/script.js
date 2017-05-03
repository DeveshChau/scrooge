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


    $("#new-appointment-wrapper .btn-cancel").on('click', function(){
        $("#appointment-list-wrapper").toggleClass("hidden");
        $("#new-appointment-wrapper").toggleClass("hidden");
        $("#wrapper-doctor-slots-table").html("");
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
      var isTimeSlotSelected = $("#wrapper-doctor-slots-table input[type=radio][name=slot_radio]").is(':checked');
      if(isTimeSlotSelected) {
        $("#err-msg-time-slot").hide();
        $("#err-msg-time-slot").parents(".form-group").removeClass("has-error has-danger");
      }else {
        $("#err-msg-time-slot").show();
        $("#err-msg-time-slot").parents(".form-group").addClass("has-error has-danger");
      }
      valid = valid && isTimeSlotSelected;
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
      format:"dd-mm-yyyy"
    }).on("changeDate", function(e){
        console.log(e.timeStamp);
        var d = e.date;
        var date = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        $.ajax({
          type: "POST",
          url: "http://dev.sutar.in/scrooge/api/show_timetable.php",
          data: {
              date: date
          },
          success: function(data) {
            console.log(data);
            $("#wrapper-doctor-slots-table").html(data);
            var $table = $("#wrapper-doctor-slots-table table");
            $table.addClass("table table-striped table-hover");
            var $radios = $('input[type="radio"][name="slot_radio"]');
            $table.find("tr").click(function() {
              $table.find("tr").removeClass("selected-slot");
              $(this).find("input[type=radio][name=slot_radio]").prop("checked", true);
              $(this).addClass("selected-slot");
              $("#err-msg-time-slot").hide();
              $("#err-msg-time-slot").parents(".form-group").removeClass("has-error has-danger");
            });
          }
        });
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

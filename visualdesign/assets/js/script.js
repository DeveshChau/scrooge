$(function(){

    $("#appointment-breadcrumb a").on('click', function(){
        return false;
    })

    // $("#btn-new-inquiry").on('click', function(){
    //     // $("#inquiry-list-wrapper").toggleClass("hidden");
    //     // $("#new-inquiry-wrapper").toggleClass("hidden");
    //     $(this).parents("#inquiry").find(".wrapper").toggleClass("hidden");
    //     $("#form-new-inquiry")[0].reset();
    // });
    //
    // $("#btn-new-appointment").on('click', function(){
    //     // $("#inquiry-list-wrapper").toggleClass("hidden");
    //     // $("#new-inquiry-wrapper").toggleClass("hidden");
    //     $(this).parents("#appointments").find(".wrapper").toggleClass("hidden");
    //     $('#form-appointments')[0].reset();
    //     $('#appointment-breadcrumb a[href="#patient-details"]').tab('show');
    // });


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
      // valid = valid && isTimeSlotSelected;
      if(!valid) {
         return;
      }
      $('#appointment-breadcrumb a[href="#appointment-summary"]').tab('show');

      var $app_form = $("#form-appointments");
      $("#summary_patient_name").html($app_form.find("#Patient_Name").val());
      $("#summary_patient_contact").html($app_form.find("#Patient_Contact").val());
      $("#summary_patient_email").html($app_form.find("#Patient_Email").val());
      $("#summary_patient_city").html($app_form.find("#Patient_City").val());
      $("#summary_patient_area").html($app_form.find("#Patient_Area").val());
      $("#summary_appoinment_reason").html($app_form.find("#Appointment_Reason").val());
      $("#summary_patient_notes").html($app_form.find("#notes").val());
      $("#summary_hospital_name").html($app_form.find("#Hospital_Name").val());
      $("#summary_doctor_name").html($app_form.find("#Doctor_Name").val());
      $("#summary_doctor_speciality").html($app_form.find("#Doctor_Name").val());

      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var appointment_time = $("#btn-doctor-calendar input").val() + ", " + days[apt_day] + ", " + $("[name=slot_radio]:checked").parent().next().html();
      $("#summary_appointment").html(appointment_time);
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

    var apt_day = "";
    $('#btn-doctor-calendar').datepicker({
      format:"dd-mm-yyyy"
    }).on("changeDate", function(e){
        console.log(e.timeStamp);
        var d = e.date;
        apt_day = d.getDay();
        var date = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        $.ajax({
          type: "POST",
          url: "http://technologyfor.in/innovation/api/show_timetable.php",
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
            url: "http://technologyfor.in/innovation/api/save_inquiry.php",
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
            url: "http://technologyfor.in/innovation/api/save_appointment.php",
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

    $.get("http://technologyfor.in/innovation/api/get_numbers.php", function(data){

        $("#Patient_Contact_Inquiry").typeahead({
          // source:["9823127828", "8087244978", "80872449888", "8087888978"],
          source: data,
          afterSelect: function(number) {
            // var data = [{"Patient_Name":"Roshan Kedar","Patient_Contact":"7709845504","Patient_City":"Pune","Patient_Area":"Baner","Patient_Email":"rosblog3@gmail.com"}];
            // var patientDetails = data[0];
            // $("#Patient_Name_Inquiry").val(patientDetails.Patient_Name);
            // $("#Patient_Area_Inquiry").val(patientDetails.Patient_Area);
            // $("#Patient_City_Inquiry").val(patientDetails.Patient_City);
            $.ajax({
                type: "POST",
                url: "http://technologyfor.in/innovation/autofill.php",
                data: {
                  ContactStartsWith: number
                },
                success: function(data) {
                  var patientDetails = data[0];
                  $("#Patient_Name_Inquiry").val(patientDetails.Patient_Name);
                  $("#Patient_Area_Inquiry").val(patientDetails.Patient_Area);
                  $("#Patient_City_Inquiry").val(patientDetails.Patient_City);
                }
            });
          }
        });

      $("#Patient_Contact").typeahead({
        source: data,
        afterSelect: function(number) {
          $.ajax({
              type: "POST",
              url: "http://technologyfor.in/innovation/autofill.php",
              data: {
                ContactStartsWith: number
              },
              success: function(data) {
                var patientDetails = data[0];
                $("#Patient_Name").val(patientDetails.Patient_Name);
                $("#Patient_Area").val(patientDetails.Patient_Area);
                $("#Patient_City").val(patientDetails.Patient_City);
                $("#Patient_Email").val(patientDetails.Patient_City);
              }
          });
        }
      });
    },'json');


    // $("#Patient_Contact").typeahead({ source:["9823127828", "8087244978", "80872449888", "8087888978"] });
});

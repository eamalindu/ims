$(document).ready(function () {
    $(".chosen-inquiry").chosen({width: '100%'});
    $("#schedulesCourse").chosen({width: '25%'});
    $('#inquiryTime').daterangepicker({
        "minDate": new Date(),
        "singleDatePicker": true,
        "timePicker": true,
        "timePicker24Hour": true,
        "autoApply": true,
        "linkedCalendars": false,
        "showCustomRangeLabel": false,
        "drops": "up",
        "locale": {
            "format": "YYYY-MM-DD [at] HH:mm"
        }
    });

});
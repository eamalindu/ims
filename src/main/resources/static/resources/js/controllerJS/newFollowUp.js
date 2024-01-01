window.addEventListener('load', () => {

    newFollowUp = {};

    //external libraries initialization
    $('#inquiryFollowUpTime').daterangepicker({
        "minDate": new Date(),
        "singleDatePicker": true,
        "timePicker": true,
        "timePicker24Hour": true,
        "autoApply": true,
        "linkedCalendars": false,
        "showCustomRangeLabel": false,
        "drops": "up",
        "locale": {
            "format": "YYYY-MM-DD HH:mm"
        }
    });
    //initializing daterangepicker in inquiry sheet
    $('#inquirySheetNextFollowUp').daterangepicker({
        "minDate": new Date(),
        "singleDatePicker": true,
        "timePicker": true,
        "timePicker24Hour": true,
        "autoApply": true,
        "linkedCalendars": false,
        "showCustomRangeLabel": false,
        "drops": "up",
        "locale": {
            "format": "YYYY-MM-DD HH:mm"

        }
    });

    //when apply is clicked data will validate and bind to the editedInquiry object
    $('#inquirySheetNextFollowUp').on('apply.daterangepicker',function (){
        inputDateTimeValidator(this,'^20[0-9]{2}[-][0-9]{2}[-][0-9]{2}[ ][0-9]{2}[:][0-9]{2}$','editedInquiry','contactTime')
    });

    //validation for chosen select (for inquiry follow-up)
    $("#inquiryFollowUpType").chosen().change(function () {
        $("#inquiryFollowUpType_chosen .chosen-single").addClass('select-validated');
    });

});

const newFollowUpSubmit = () => {
    //temp fix
    //newFollowUp.inquiryId= document.querySelector('#inquirySheetId').innerText;
    newFollowUp.inquiryId = currentInquiry;
    console.log('New Follow Up Added', newFollowUp);

    //check for form errors
    const errors = checkFollowupFormErrors();

    if (errors == '') {
        //this means there are no any errors
        //get user confirmation
        showCustomConfirm('Are You Sure?<br><small>You are about to add a Follow-up to the Inquiry <strong>#' + currentInquiry.inquiryNumber + '</strong></small>',function (result){

            if (result){
                //pass data to backend
                let postServerResponse;

                $.ajax("/followup",{
                    type:"POST",
                    async:false,
                    contentType: "application/json",
                    data: JSON.stringify(newFollowUp),
                    success: function (data) {
                        console.log("success " + data);
                        postServerResponse = data;

                    },
                    error: function (resOb) {
                        console.log("Error " + resOb);
                        postServerResponse = resOb;

                    }
                });
                //check the postServerResponse value
                if (postServerResponse === 'OK') {

                    //this means data successfully passed to the backend
                    //show an alert to user
                    showCustomModal("Follow Up Successfully Added!", "success");
                    resetFollowupForm()
                    //refresh the table
                    //null the newFollowup Object
                    newFollowUp = {};
                    offCanvasInquirySheetCloseButton.click();

                    //refreshing the tables
                    //getting the document name
                    const documentTitleArray = document.title.split(" | ");
                    const documentTitle = documentTitleArray[0];

                    if (documentTitle == "Dashboard") {
                        refreshInquiryPoolTable();
                        //refreshInquiryScheduleTable();
                        refreshDashboardWidgets()
                    } else if (documentTitle == "Inquiries") {
                        refreshInquiriesTable();
                    } else if (documentTitle == "Reports-All") {
                        refreshReportAllTable();

                    } else {
                        console.log("Error");
                    }


                } else {
                    //this means there was a problem with the query
                    //shows an error alert to the user
                    showCustomModal("Operation Failed!" + postServerResponse, "error");
                }

            }
            else{
                showCustomModal("Operation Cancelled!", 'info');
            }
        });



    } else {
        //there are errors
        //display them to the user using external-ModalFunction()
        showCustomModal(errors, 'warning')
    }


}


const checkFollowupFormErrors = () => {
    let errors = '';

    if (newFollowUp.inquiryId == null) {
        errors = errors + 'Inquiry is Required<br>';
    }
    if (newFollowUp.type == null) {
        errors = errors + 'Type is Required<br>';
    }
    if (newFollowUp.content == null) {
        errors = errors + 'Content is Required<br>';
    }
    if (newFollowUp.feeling == null) {
        errors = errors + 'Feeling is Required<br>';
    }
    if (newFollowUp.confirmed == null) {
        errors = errors + 'Confirmed is Required<br>';
    }
    if (newFollowUp.nextFollowup == null) {
        errors = errors + 'Contact Time is Required<br>';
    }
    return errors;
}

const resetFollowupForm = ()=>{
    //reset the form
    frmNewFollowup.reset();
    $("#inquiryFollowUpType_chosen .chosen-single").removeClass('select-validated');
    inquiryFollowUpType.classList.remove('is-valid');

    //set default option chosen
    setTimeout(function () {
        $('select').val('').trigger('chosen:updated');
    }, 0);
    //remove validations
    //reset all the inputs validation using their common class name (newFollowupInputs)
    inputs = document.querySelectorAll('.newFollowupInputs');
    inputs.forEach(function (input) {
        // Remove inline styles
        input.style = '';
        //remove bootstrap validation classes
        input.classList.remove('is-valid');
    });
    //close the offCanvas
    offCanvasInquirySheetCloseButton.click();
}
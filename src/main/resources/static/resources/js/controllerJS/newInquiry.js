window.addEventListener('load', () => {

    resetInquiryForm();

    // newInquiry = {};
    //
    // //dynamic select start
    //
    // //dynamic select for courses
    // courses = ajaxGetRequest("/course/findall");
    // fillSelectOptions(inquiryCourse, 'Please Select a Course', courses, 'name')
    //
    // //dynamic select for sources
    // sources = ajaxGetRequest("/source/findall")
    // fillSelectOptions(inquirySource, 'Please Select a Source', sources, 'name')
    //
    // //dynamic select end

    //external libraries initialization
    $(".chosen-inquiry").chosen({width: '100%'});
    $(".chosen-inquiry-ID").chosen({width: '50%'});
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
            "format": "YYYY-MM-DD HH:mm"
        }
    });

    //validation chosen select (for new inquiry)
    $("#inquirySource").chosen().change(function () {
        $("#inquirySource_chosen .chosen-single").addClass('select-validated');
    });
    $("#inquiryCourse").chosen().change(function () {
        $("#inquiryCourse_chosen .chosen-single").addClass('select-validated');
    });
    // $("#inquiryIdOption").chosen().change(function () {
    //     $("#inquiryIdOption_chosen .chosen-single").addClass('select-validated');
    // });

    //external libraries initialization end
});

//new inquiry submit start

const newInquirySubmit = () => {
    console.log('New Inquiry Added', newInquiry);

    //check for form errors
    //calling checkFormErrors()
    const errors = checkFormErrors();

    if (errors === '') {

        //this means there are no any errors
        //user confirmation is needed (will add later)
        showCustomConfirm("You are about to add a New inquiry<br>Are You Sure?", function (result) {
            if (result) {
                //passing the data to backend
                //if the data is successfully passed to the database it will set the value of the postServerResponse to "OK"
                let postServerResponse;

                $.ajax("/Inquiry", {
                    type: "POST", async: false, // set the async option to false to wait for the response
                    contentType: "application/json", data: JSON.stringify(newInquiry), success: function (data) {
                        console.log("success " + data);
                        postServerResponse = data;

                    }, error: function (resOb) {
                        console.log("Error " + resOb);
                        postServerResponse = resOb;

                    }
                });
                //check the postServerResponse value
                if (postServerResponse === 'OK') {

                    //this means data successfully passed to the backend
                    //show an alert to user
                    showCustomModal("Inquiry Successfully Added!", "success");

                    resetInquiryForm();

                    //trigger offcanvas button
                    offCanvasInquiryCloseButton.click();

                    //needs to refresh all the tables in the dashboard

                        refreshInquiryPoolTable();
                        refreshDashboardWidgets();
                        //refreshInquiryScheduleTable();




                } else {
                    //this means there was a problem with the query
                    //shows an error alert to the user
                    showCustomModal("Operation Failed!" + postServerResponse, "error");
                }

            } else {
                showCustomModal("Operation Cancelled!", "info");
            }
        });


    } else {
        //there are errors
        //display them to the user using external-ModalFunction()
        showCustomModal(errors, 'warning')
    }
}

const checkFormErrors = () => {
    let errors = '';

    if (newInquiry.sourceId == null) {
        errors = errors + 'Source is Required<br>';
        $("#inquirySource_chosen .chosen-single").addClass('select-invalidated');
        inquirySource.classList.add('is-invalid');
    }
    if (newInquiry.courseId == null) {
        errors = errors + 'Course is Required<br>';
        $("#inquiryCourse_chosen .chosen-single").addClass('select-invalidated');
        inquiryCourse.classList.add('is-invalid');
    }
    if (newInquiry.firstName == null) {
        errors = errors + 'First Name is Required<br>';
        //testing code add this all to required feilds
        inquiryFirstName.style.borderColor = 'red';
        inquiryFirstName.classList.add('is-invalid');
    }
    if (newInquiry.lastName == null) {
        errors = errors + 'Last Name is Required<br>';
        inquiryLastName.style.borderColor = 'red';
        inquiryLastName.classList.add('is-invalid');
    }
    if (newInquiry.primaryMobileNumber == null) {
        errors = errors + 'Mobile Number is Required<br>';
        inquiryMobileNumber.style.borderColor = 'red';
        inquiryMobileNumber.classList.add('is-invalid');

    }
    if (newInquiry.idType == null) {
        errors = errors + 'ID Type is Required<br>';
        // $("#inquiryIdOption_chosen .chosen-single").addClass('select-invalidated');
        // inquiryIdOption.classList.add('is-invalid');

    }
    if (newInquiry.idValue == null) {
        errors = errors + 'ID Value is Required<br>';
        inquiryID.style.borderColor = 'red';
        inquiryID.classList.add('is-invalid');
    }
    if (newInquiry.contactTime == null) {
        errors = errors + 'Contact Time is Required<br>';
        inquiryTime.style.borderColor = 'red';
        inquiryTime.classList.add('is-invalid');

    }
    if (newInquiry.description == null) {
        errors = errors + 'Description is Required<br>';
        inquiryDescription.style.borderColor = 'red';
        inquiryDescription.classList.add('is-invalid');
    }

    return errors;
}

const resetInquiryForm = () => {
    //after a successful creation from needs to be resettled and all the validations should be removed
    //off-canvas is also can be minimized (ask about it)

    //remove validated class from chosen
    $("#inquirySource_chosen .chosen-single").removeClass('select-validated');
    $("#inquiryCourse_chosen .chosen-single").removeClass('select-validated');
    //$("#inquiryIdOption_chosen .chosen-single").removeClass('select-validated');
    $("#inquirySource_chosen .chosen-single").removeClass('select-invalidated');
    $("#inquiryCourse_chosen .chosen-single").removeClass('select-invalidated');
    //$("#inquiryIdOption_chosen .chosen-single").removeClass('select-invalidated');
    inquirySource.classList.remove('is-valid');
    inquiryCourse.classList.remove('is-valid');
    //inquiryIdOption.classList.remove('is-valid');
    inquirySource.classList.remove('is-invalid');
    inquiryCourse.classList.remove('is-invalid');
    //inquiryIdOption.classList.remove('is-invalid');

    //disable addtional mobile number
    inquiryAdditionalMobileNumber.disabled = true;

    //set default option chosen
    setTimeout(function () {
        $('#inquirySource').val('').trigger('chosen:updated');
        $('#inquiryCourse').val('').trigger('chosen:updated');
        //$('#inquiryIdOption').val('').trigger('chosen:updated');

    }, 0);

    //reset form values
    document.getElementById('frmNewInquiry').reset();

    //reset all the inputs validation using their common class name (newInquiryInputs)
    inputs = document.querySelectorAll('.newInquiryInputs');
    inputs.forEach(function (input) {
        // Remove inline styles
        input.style = '';
        //remove bootstrap validation classes
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
    });

    //reset the newInquiry object
    newInquiry = {};
    newInquiry.idType = 'NIC';

    //refill selects
    //dynamic select for courses
    courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(inquiryCourse, 'Please Select a Course', courses, 'name')

    //dynamic select for sources
    sources = ajaxGetRequest("/source/findall")
    fillSelectOptions(inquirySource, 'Please Select a Source', sources, 'name')

}
window.addEventListener('load', () => {

    //refresh table
    refreshInquiriesTable();

    //hide the update button
    btnInquirySheetUpdate.style.display = 'none';

    //dynamic select start
    courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(inquirySearchCourse, ' ', courses, 'name');

    sources = ajaxGetRequest("/source/findall")
    fillSelectOptions(inquirySearchSource, ' ', sources, 'name')

    counsellors = ajaxGetRequest("/Employee/getActiveCounsellors")
    fillSelectOptions(inquirySearchCounsellor, ' ', counsellors, 'fullName')

    //need to add counsellors also (db not implemented yet)
    //dynamic select end


    //external libraries initialization
    $(".chosen-inquiry-search").chosen({width: '190px'});
    $('#inquirySearchDateRange').daterangepicker({
        "locale": {
            "format": "YYYY-MM-DD", //"separator": " to "
        }
    });

    //reset chosen select using jquery
    $('#btn-reset').on('click', function () {
        $("#inquirySearchSource_chosen .chosen-single").removeClass('bg-light');
        $("#inquirySearchCourse_chosen .chosen-single").removeClass('bg-light');
        $("#inquirySearchCounsellor_chosen .chosen-single").removeClass('bg-light');
        setTimeout(function () {
            $('.chosen-inquiry-search').val('').trigger('chosen:updated');
        }, 0);
        refreshInquiriesTable();
    });

    $("#inquirySearchSource").chosen().change(function () {
        $("#inquirySearchSource_chosen .chosen-single").addClass('bg-light');
    });
    $("#inquirySearchCourse").chosen().change(function () {
        $("#inquirySearchCourse_chosen .chosen-single").addClass('bg-light');
    });
    $("#inquirySearchCounsellor").chosen().change(function () {
        $("#inquirySearchCounsellor_chosen .chosen-single").addClass('bg-light');
    });

});


const refreshInquiriesTable = () => {

    //get data with ajax and database
    inquiriesWithFollowUps = ajaxGetRequest("/Inquiry/findall");

    displayPropertyList = [{property: getInquiryId, dataType: 'function'}, {
        property: getSource,
        dataType: 'function'
    }, {property: getCourse, dataType: 'function'}, {
        property: 'firstName',
        dataType: 'text'
    }, {property: 'primaryMobileNumber', dataType: 'text'}, {
        property: 'addedBy',
        dataType: 'text'
    }, {property: getInquiryStatus, dataType: 'function'}

    ];

    fillDataIntoTable(tblInquiry, inquiriesWithFollowUps, displayPropertyList, rowView, 'offCanvasInquirySheet');

    if (inquiriesWithFollowUps.length !== 0) {
        dataTableInquiry = new DataTable('#tblInquiry');
    }

}

const getInquiryId = (ob) => {
    return ob.inquiryNumber;

}
const getSource = (ob) => {
    return ob.sourceId.name;
};

const getCourse = (ob) => {
    return ob.courseId.code;
}

const getInquiryStatus = (ob) => {

    if (ob.inquiryStatusId.name === "New Inquiry") {
        return '<span class="badge rounded-0" style="background: #3FB618">New Inquiry</span>';
    } else if (ob.inquiryStatusId.name === "Processing") {
        return '<span class="badge rounded-0" style="background: #ea8a1e">Processing</span>';
    } else if (ob.inquiryStatusId.name === "Registered") {
        return '<span class="badge rounded-0" style="background: #a81dd6">Registered</span>';
    } else if (ob.inquiryStatusId.name === "Completed") {
        return '<span class="badge rounded-0" style="background: #1eadea">Completed</span>';
    } else {
        return '<span class="badge rounded-0" style="background: #000">Dropped</span>';
    }


}


const rowView = (ob, rowIndex) => {

    //hide the update button
    btnInquirySheetUpdate.style.display = 'none';

    $('#collapseFollowUp').collapse('hide');
    //show follow and drop button
    collapseFollowUpButton.classList.remove('d-none');
    btnInquirySheetDelete.classList.remove('d-none');
    btnInquirySheetEdit.classList.remove('d-none');
    extraInformationForInquiry.classList.add('d-none')

    //set inquirySheetCode
    inquirySheetCode.innerText = ob.inquiryNumber;
    currentStatus.innerText = ob.inquiryStatusId.name;

    if (ob.inquiryStatusId.name === "New Inquiry") {
        inquirySheetCode.classList.add('text-success');

        inquirySheetCode.classList.remove('text-warning');
        inquirySheetCode.classList.remove('text-purple');
        inquirySheetCode.classList.remove('text-info');

    } else if (ob.inquiryStatusId.name === "Processing") {
        inquirySheetCode.classList.add('text-warning');

        inquirySheetCode.classList.remove('text-success');
        inquirySheetCode.classList.remove('text-purple');
        inquirySheetCode.classList.remove('text-info');

    } else if (ob.inquiryStatusId.name === "Registered") {
        inquirySheetCode.classList.add('text-purple');

        inquirySheetCode.classList.remove('text-warning');
        inquirySheetCode.classList.remove('text-success');
        inquirySheetCode.classList.remove('text-info');

        //hide the update button
        btnInquirySheetUpdate.style.display = 'none';
        btnInquirySheetDelete.style.display = 'none';
        //show follow and drop button
        collapseFollowUpButton.classList.add('d-none');
        btnInquirySheetDelete.classList.add('d-none');
        btnInquirySheetEdit.classList.add('d-none');

        extraInformationForInquiry.classList.remove('d-none')
    } else if (ob.inquiryStatusId.name === "Completed") {
        inquirySheetCode.classList.add('text-info');

        inquirySheetCode.classList.remove('text-warning');
        inquirySheetCode.classList.remove('text-purple');
        inquirySheetCode.classList.remove('text-success');

        //hide the update button
        btnInquirySheetUpdate.style.display = 'none';
        //show follow and drop button
        collapseFollowUpButton.classList.add('d-none');
        btnInquirySheetDelete.classList.add('d-none');
        btnInquirySheetEdit.classList.add('d-none');

        extraInformationForInquiry.classList.remove('d-none')


    } else {
        collapseFollowUpButton.classList.add('d-none');
        btnInquirySheetDelete.classList.add('d-none');
        btnInquirySheetEdit.classList.add('d-none');
        inquirySheetCode.classList.remove('text-warning');
        inquirySheetCode.classList.remove('text-success');
        inquirySheetCode.classList.remove('text-purple');
        inquirySheetCode.classList.remove('text-info');
        extraInformationForInquiry.classList.remove('d-none')
    }

    //reset followup form
    resetFollowupForm()
    // //close the collapse
    // collapseFollowUpButton.click();

    //make all the inputs readonly and remove inline styles
    inputs = document.querySelectorAll('.inquirySheetInputs');
    inputs.forEach(function (input) {
        input.setAttribute('disabled', 'true');
        input.style = '';
        input.classList.remove('is-valid');

    });

    //inquirySheetId.innerText = getInquiryId(ob);

    //document.querySelector('#inquirySheetCourse').value = ob.inquiryId.courseId.code;
    //document.querySelector('#inquirySheetSource').value = ob.inquiryId.sourceId.name;

    const courses = ajaxGetRequest("/course/findall");
    const sources = ajaxGetRequest("/source/findall");
    fillSelectOptions(inquirySheetSource, 'Please Select a Source', sources, 'name', ob.sourceId.name);
    fillSelectOptions(inquirySheetCourse, 'Please Select a Course', courses, 'name', ob.courseId.name);


    //inquirySheetIdType.value = ob.idType;
    inquirySheetFirstName.value = ob.firstName;
    inquirySheetLastName.value = ob.lastName;
    inquirySheetPrimaryMobile.value = ob.primaryMobileNumber;

    //email is an optional value therefore it might contain null as the value
    //instead of displaying nothing, we can use if condition to set a value

    if (ob.email !== null) {
        inquirySheetEmail.value = ob.email;
        inquirySheetEmail.classList.remove('text-muted');

    } else {
        inquirySheetEmail.value = '-- Not Provided --';
        inquirySheetEmail.classList.add('text-muted');
    }

    if (ob.secondaryMobileNumber !== null) {
        inquirySheetSecondaryMobile.value = ob.secondaryMobileNumber;
        inquirySheetSecondaryMobile.classList.remove('text-muted');

    } else {
        inquirySheetSecondaryMobile.value = '-- Not Provided --';
        inquirySheetSecondaryMobile.classList.add('text-muted');
    }

    inquirySheetIdValue.value = ob.idValue;

    //showing date and time with iSO Standarad
    inquirySheetNextFollowUp.value = (ob.contactTime).replace('T', ' ');
    inquirySheetDescription.value = ob.description;

    const [addedDate, addedTime] = ob.timeStamp.split("T");
    inquirySheetAddedDate.innerText = addedDate;
    inquirySheetAddedTime.innerText = addedTime;
    inquirySheetAddedBy.innerText = ob.addedBy;

    currentInquiry = ob;

    //get all the followups for the particular inquiry
    followups = ajaxGetRequest("/followup/getById/" + ob.id);
    showFollowupCard(followups, followupsList);

    //catch old inquiry and new inquiry
    oldInquiry = JSON.parse(JSON.stringify(currentInquiry));
    editedInquiry = JSON.parse(JSON.stringify(currentInquiry));

    console.log("old inquiry 👇")
    console.log(oldInquiry)
    console.log("edited inquiry 👇")
    console.log(editedInquiry)

}
const inquiryEdit = () => {
    //getting the toast from its ID
    var myToastEl = document.getElementById('myToast');
    var myToast = new bootstrap.Toast(myToastEl);
    //Displaying toast
    myToast.show();
    //hide the toast after 5s
    setTimeout(function () {
        myToast.hide();
    }, 5000);
    //remove the attribute readonly to make inputs accept the user input values
    //give a border color to inputs indicate that the input's values are ready to be edited
    inputs = document.querySelectorAll('.inquirySheetInputs');

    //remove the disabled attribute from the select
    //give a border color to indicate that select can be now edited

    inputs.forEach(function (input) {
        input.removeAttribute('disabled');
        input.setAttribute('style', 'border:1px solid #0DCAF0!important;background-color:rgba(13,202,240,0.2);');
    });

    //display the update button once the edit button is clicked
    btnInquirySheetUpdate.style.display = 'block';


}
const inquiryUpdate = () => {

    const errors = checkInquiryUpdateErrors();

    if (errors === '') {

        let updates = checkForInquiryUpdates();

        if (updates === "") {
            showCustomModal("No changes Detected!", "info")
        } else {
            showCustomConfirm("You are About to Update this Inquiry<br><br>Following Changes Detected!<br/><br/><small>" + updates + "</small><br>Are You Sure?", function (result) {

                if (result) {
                    let postServerResponse;
                    $.ajax("/Inquiry", {
                        type: "PUT",
                        async: false,
                        contentType: "application/json",
                        data: JSON.stringify(editedInquiry),
                        success: function (data) {
                            console.log("success " + data);
                            postServerResponse = data;
                        },
                        error: function (resOb) {
                            console.log("Error " + resOb);
                            postServerResponse = resOb;
                        }
                    });
                    //if data passed successfully
                    //show a success alert
                    if (postServerResponse === "OK") {

                        showCustomModal("Inquiry Successfully Updated!", "success")
                        //close the offCanvas and refresh the table
                        offCanvasInquirySheetCloseButton.click();
                        refreshInquiriesTable();

                    }

                        //if data passed unsuccessfully
                    //show an error alert
                    else {
                        showCustomModal("Operation Failed! <br> Inquiry Record Not Updated! " + postServerResponse, "error")
                    }

                } else {
                    showCustomModal("Operation Cancelled!", "info")
                }

            });
        }

    } else {
        showCustomModal(errors, 'warning');
    }
}

const checkForInquiryUpdates = () => {

    let updates = '';

    if (editedInquiry.firstName !== oldInquiry.firstName) {
        updates = updates + "First Name was changed to <span class='text-purple'>" + editedInquiry.firstName + "</span><br>";
    }
    if (editedInquiry.lastName !== oldInquiry.lastName) {
        updates = updates + "Last Name was changed to <span class='text-purple'>" + editedInquiry.lastName + "</span><br>";
    }
    if (editedInquiry.primaryMobileNumber !== oldInquiry.primaryMobileNumber) {
        updates = updates + "Phone Number was changed to <span class='text-purple'>" + editedInquiry.primaryMobileNumber + "</span><br>";
    }
    if (editedInquiry.email !== oldInquiry.email) {
        updates = updates + "Email was changed to <span class='text-lowercase text-purple'>" + editedInquiry.email + "</span><br>";
    }
    if (editedInquiry.secondaryMobileNumber !== oldInquiry.secondaryMobileNumber) {
        updates = updates + "Optional Phone Number was changed to <span class='text-purple'>" + editedInquiry.secondaryMobileNumber + "</span><br>";
    }
    if (editedInquiry.idType !== oldInquiry.idType) {
        updates = updates + "ID Type was changed to <span class='text-purple'>" + editedInquiry.idType + "</span><br>";
    }
    if (editedInquiry.idValue !== oldInquiry.idValue) {
        updates = updates + "ID Value was changed to <span class='text-purple'>" + editedInquiry.idValue + "</span><br>";
    }
    if (editedInquiry.description !== oldInquiry.description) {
        updates = updates + "Description was changed to <span class='text-purple'>" + editedInquiry.description + "</span><br>";
    }
    if (editedInquiry.contactTime !== oldInquiry.contactTime) {
        updates = updates + "Contact Time was changed to <span class='text-purple'>" + editedInquiry.contactTime.replace('T', ' ').slice(0, -8);
        +"</span><br>";
    }
    if (editedInquiry.courseId.name !== oldInquiry.courseId.name) {
        updates = updates + "Course was changed to <span class='text-purple'>" + editedInquiry.courseId.name + "</span><br>";
    }
    if (editedInquiry.sourceId.name !== oldInquiry.sourceId.name) {
        updates = updates + "Source was changed to <span class='text-purple'>" + editedInquiry.sourceId.name + "</span><br>";
    }


    return updates;
}

const checkInquiryUpdateErrors = () => {
    let errors = '';

    if (editedInquiry.sourceId == null) {
        errors = errors + 'Source is Required<br>';
    }
    if (editedInquiry.courseId == null) {
        errors = errors + 'Course is Required<br>';
    }
    if (editedInquiry.firstName == null) {
        errors = errors + 'First Name is Required<br>';
    }
    if (editedInquiry.lastName == null) {
        errors = errors + 'Last Name is Required<br>';
    }
    if (editedInquiry.primaryMobileNumber == null) {
        errors = errors + 'Mobile Number is Required<br>';

    }
    if (editedInquiry.idType == null) {
        errors = errors + 'ID Type is Required<br>';

    }
    if (editedInquiry.idValue == null) {
        errors = errors + 'ID Value is Required<br>';

    }
    if (editedInquiry.contactTime == null) {
        errors = errors + 'Contact Time is Required<br>';
    }
    if (editedInquiry.description == null) {
        errors = errors + 'Description is Required<br>';
    }

    return errors;
}

const inquiryDelete = () => {
//get user confirmation
    showCustomConfirm("You are About to <b>Delete</b> this Inquiry<br><br>Inquiry Code: <span class='text-purple'>" + oldInquiry.inquiryNumber + "</span><br><br>Are You Sure?", function (result) {
        if (result) {
            //pass the record to backend
            //receive the server response
            let serviceResponse = ajaxHttpRequest("/Inquiry", "DELETE", oldInquiry);
            if (serviceResponse === "OK") {
                //show user the response
                showCustomModal("Inquiry Successfully Deleted!", "success");
                //close the offCanvas sheet
                offCanvasInquirySheetCloseButton.click();
                //refresh table
                refreshInquiriesTable();
            } else {
                showCustomModal("Operation Failed!" + serviceResponse, "error");
            }


        } else {
            showCustomModal("Operation Cancelled!", "info");
        }

    });
}

const searchInquiry = () => {
    const [startDate, endDate] = inquirySearchDateRange.value.split(' - ');
    if(inquirySearchSource.value!=''&&inquirySearchCourse.value!=''&&inquirySearchCounsellor.value!='') {
        const sourceID = JSON.parse(inquirySearchSource.value).id;
        const courseID = JSON.parse(inquirySearchCourse.value).id;
        const addedBy = JSON.parse(inquirySearchCounsellor.value).callingName;
        const input = inquirySearchID.value;

        const url = `/Inquiry/searchInquiry?startDate=${startDate}&endDate=${endDate}&sourceID=${sourceID}&courseID=${courseID}&addedBy=${addedBy}&input=${input}`
        const searchResultInquiry = ajaxGetRequest(url)

        fillDataIntoTable(tblInquiry, searchResultInquiry, displayPropertyList, rowView, 'offCanvasInquirySheet');

    }
    else{

        showCustomModal("Please Select All the Fields to Search", "warning");
    }
}
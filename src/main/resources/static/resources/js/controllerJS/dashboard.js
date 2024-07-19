window.addEventListener('load', () => {

    //calling refreshInquiryPoolTable function
    refreshInquiryPoolTable();

    //hide the update button
    btnInquirySheetUpdate.style.display = 'none';

    //make the selects dynamic for inquiry sheet
    courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(inquirySheetCourse, 'Please Select a Course', courses,'name');
    sources = ajaxGetRequest("/source/findall")
    fillSelectOptions(inquirySheetSource, 'Please Select a Source', sources,'name');

    refreshDashboardWidgets();


});


//refresh inquiryPool table start
const refreshInquiryPoolTable = () => {

    //get data from the database with ajax
    newInquiries = ajaxGetRequest("/Inquiry/newInquiry");
    displayPropertyListForInquiryPool = [
        {property: 'inquiryNumber', dataType: 'text'}, {
        property: getCourse, dataType: 'function'
    }, {property: getSource, dataType: 'function'}, {property: getFullName, dataType: 'function'}];

    fillDataIntoTable(tblInquiryPool, newInquiries, displayPropertyListForInquiryPool, rowView,'offCanvasInquirySheet');

    //initiate dataTable only if inquires are available
    if(newInquiries.length>0){
        $('#tblInquiryPool').dataTable({
            "info": false
        });
    }

    //testing code start

    scheduledInquiries = ajaxGetRequest("/Inquiry/getInquiriesWithFollowUpsToday")

    displayPropertyListForScheduledPool = [{property: 'inquiryNumber', dataType: 'text'}, {
        property: getCourse, dataType: 'function'
    }, {property: getSource, dataType: 'function'}, {property: getFullName, dataType: 'function'}];
    fillDataIntoTable(tblScheduledPool, scheduledInquiries, displayPropertyListForScheduledPool, rowView,'offCanvasInquirySheet');

    //initiate dataTable only if inquires are available
    if(scheduledInquiries.length>0){
        $('#tblScheduledPool').dataTable({
            "info": false
        });
    }

//testing code end

}

const getCourse = (ob) => {
    return ob.courseId.code;
}

const getSource = (ob) => {
    switch (ob.sourceId.name) {
        case "Cold Calling":
            return "<i class=\"fa-solid fa-table\"></i>";
            break;

        case "Facebook":
            return "<i class=\"fa-brands fa-facebook-f\"></i>";
            break;

        case "Leaflets":
            return "<i class=\"fa-solid fa-note-sticky\"></i>";
            break;

        case "Letter Campaign":
            return "<i class=\"fa-solid fa-envelope\"></i>";
            break;

        case "Personal Contact":
            return "<i class=\"fa-solid fa-person\"></i>";
            break;

        case "Phone Call":
            return "<i class=\"fa-solid fa-phone\"></i>";
            break;

        case "Seminar":
            return "<i class=\"fa-solid fa-person-chalkboard\"></i>";
            break;

        case "SMS Campaign":
            return "<i class=\"fa-solid fa-comment-sms\"></i>";
            break;

        case "Walk In":
            return "<i class=\"fa-solid fa-person-walking\"></i>";
            break;

        case "WhatsApp":
            return "<i class=\"fa-brands fa-whatsapp\"></i>";
            break;
    }

}

const getFullName = (ob) => {
    firstName = ob.firstName;
    lastName = ob.lastName;

    return firstName + " " + lastName;

}
const rowView = (ob, Index) => {
    //hide the update button
    btnInquirySheetUpdate.style.display = 'none';

    //make all the inputs readonly and remove inline styles
    inputs = document.querySelectorAll('.inquirySheetInputs');
    inputs.forEach(function (input) {
        input.setAttribute('disabled', 'true');
        input.style = '';
        //remove bootstrap validation classes
        input.classList.remove('is-valid');
    });

    //select the appropriate option as selected
    //inquirySheetSource.options[ob.sourceId.id].selected = true;
    fillSelectOptions(inquirySheetSource,'Please Select a Source',sources,'name',ob.sourceId.name)
    fillSelectOptions(inquirySheetCourse,'Please Select a Course',courses,'name',ob.courseId.name)

    inquirySheetCode.innerText = ob.inquiryNumber;

    if (ob.inquiryStatusId.name === "New Inquiry") {
        inquirySheetCode.classList.add('text-success');
        inquirySheetCode.classList.remove('text-warning');


    } else {
        inquirySheetCode.classList.add('text-warning');
        inquirySheetCode.classList.remove('text-sucess');

    }

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
    inquirySheetNextFollowUp.value = (ob.contactTime).replace('T', ' ').slice(0, -3);
    inquirySheetDescription.value = ob.description;

    //set info section
    const [addedDate, addedTime] = ob.timeStamp.split("T");
    inquirySheetAddedDate.innerText = addedDate;
    inquirySheetAddedTime.innerText = addedTime;
    inquirySheetAddedBy.innerText = ob.addedBy;

    //set id type
    inquirySheetIdType.value = ob.idType;

    currentInquiry = ob;
    //get all the followups for the particular inquiry
    followups = ajaxGetRequest("/followup/getById/"+ob.id);
    showFollowupCard(followups,followupsList);


}
//refresh inquiryPool table end

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

    //catch old inquiry and new inquiry
    oldInquiry = JSON.parse(JSON.stringify(currentInquiry));
    editedInquiry = JSON.parse(JSON.stringify(currentInquiry));

    console.log("old inquiry 👇")
    console.log(oldInquiry)
    console.log("edited inquiry 👇")
    console.log(editedInquiry)
    console.log("new inquiry 👇")
    console.log(newInquiry)

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
                refreshInquiryPoolTable();
                refreshDashboardWidgets();
            } else {
                showCustomModal("Operation Failed!" + serviceResponse, "error");
            }


        } else {
            showCustomModal("Operation Cancelled!", "info");
        }

    });

}

const inquiryUpdate = () => {

    const errors = checkInquiryUpdateErrors();

    if (errors === '') {

        let updates = checkForInquiryUpdates();

        if (updates === "") {
            showCustomModal("No changes Detected!", "info")
        } else {
            showCustomConfirm("You are About to Update this Inquiry<br><br>Following Changes Detected!<br/><br/><small>" + updates+"</small><br>Are You Sure?", function (result){

                if(result){
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
                    if(postServerResponse === "OK"){

                        showCustomModal("Inquiry Successfully Updated!","success")
                        //close the offCanvas and refresh the table
                        offCanvasInquirySheetCloseButton.click();
                        refreshInquiryPoolTable();

                    }

                    //if data passed unsuccessfully
                    //show an error alert
                    else
                    {
                        showCustomModal("Operation Failed! <br> Inquiry Record Not Updated! "+postServerResponse,"error")
                    }

                }
                else{
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
        updates = updates + "Contact Time was changed to <span class='text-purple'>" + editedInquiry.contactTime.replace('T', ' ').slice(0, -8); + "</span><br>";
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

const showSchedulePool=()=>{
    SchedulePool.classList.remove('d-none');
}
const showNewPool=()=>{
    newPool.classList.remove('d-none');
}

const refreshDashboardWidgets=()=>{
    //get start date and end date of the current month using moment js
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    //getting new inquiry count
    newInquiryCount = ajaxGetRequest("/Inquiry/newinquirycount")
    textNewInquiryCount.innerText = newInquiryCount;
    textScheduledInquiryCount.innerText = scheduledInquiries.length;
    //getting registered inquiries this month for the logged user
    registeredInquiries = ajaxGetRequest("/Inquiry/registeredInquiriesThisMonth/"+startDate+"/"+endDate);
    textRegisteredInquiryCount.innerText = registeredInquiries.length;


}

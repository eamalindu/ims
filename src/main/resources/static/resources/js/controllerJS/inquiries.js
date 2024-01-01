window.addEventListener('load', () => {

    //refresh table
    refreshInquiriesTable();

    //hide the update button
    btnInquirySheetUpdate.style.display = 'none';

    //dynamic select start
    courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(inquirySearchCourse,'Please Select a Course',courses,'name');

    sources = ajaxGetRequest("/source/findall")
    fillSelectOptions(inquirySearchSource,'Please Select a Source',sources,'name')

    //need to add counsellors also (db not implemented yet)
    //dynamic select end


    //external libraries initialization
    $(".chosen-inquiry-search").chosen({width: '190px'});
    $('#inquirySearchDateRange').daterangepicker({
        "locale": {
            "format": "YYYY-MM-DD",
            //"separator": " to "
        }
    });

    //reset chosen select using jquery
    $('button[type=reset]').on('click', function () {
        setTimeout(function () {
            $('select').trigger('chosen:updated');
        }, 0);
    });

});


const refreshInquiriesTable = () => {

    //get data with ajax and database
    inquiriesWithFollowUps = ajaxGetRequest("/followup/latestFollowup");

    displayPropertyList = [
        {property: getInquiryId,dataType: 'function'},
        {property: getSource,dataType: 'function'},
        {property: getCourse,dataType: 'function'},
        {property: getFirstName,dataType: 'function'},
        {property: getMobileNumber,dataType: 'function'},
        {property: 'feeling',dataType: 'text'},
        {property: 'confirmed',dataType: 'text'},
        {property: 'addedBy',dataType: 'text'},
        {property: getNextFollowup,dataType: 'function'},
        {property: getInquiryStatus,dataType: 'function'}

    ];

    fillDataIntoTable(tblInquiry,inquiriesWithFollowUps,displayPropertyList,rowView,'offCanvasInquirySheet');

}

const getInquiryId = (ob) =>{
    return ob.inquiryId.inquiryNumber;

}
const getSource = (ob) => {
    return ob.inquiryId.sourceId.name;
};

const getCourse = (ob) =>{
    return ob.inquiryId.courseId.code;
}

const getFirstName = (ob) =>{
    return ob.inquiryId.firstName;
}

const getMobileNumber = (ob) =>{
    return ob.inquiryId.primaryMobileNumber;
}

const getInquiryStatus =(ob) =>{

    return ob.inquiryId.inquiryStatusId.name;
}

const getNextFollowup = (ob)=>{
    return ob.nextFollowup.replace('T', ' ');
}

const rowView = (ob,rowIndex)=>{

    //hide the update button
    btnInquirySheetUpdate.style.display = 'none';

    //make all the inputs readonly and remove inline styles
    inputs = document.querySelectorAll('.inquirySheetInputs');
    inputs.forEach(function (input) {
        input.setAttribute('disabled', 'true');
        input.style = '';
        input.classList.remove('is-valid');

    });

    inquirySheetId.innerText = getInquiryId(ob);

    //document.querySelector('#inquirySheetCourse').value = ob.inquiryId.courseId.code;
    //document.querySelector('#inquirySheetSource').value = ob.inquiryId.sourceId.name;

    fillSelectOptions(inquirySheetSource,'Please Select a Source',sources,'name',ob.inquiryId.sourceId.name);
    fillSelectOptions(inquirySheetCourse,'Please Select a Course',courses,'name',ob.inquiryId.courseId.name);

    inquirySheetFirstName.value = ob.inquiryId.firstName;
    inquirySheetLastName.value = ob.inquiryId.lastName;
    inquirySheetPrimaryMobile.value = ob.inquiryId.primaryMobileNumber;

    //email is an optional value therefore it might contain null as the value
    //instead of displaying nothing, we can use if condition to set a value

    if(ob.inquiryId.email!==null){
        inquirySheetEmail.value = ob.inquiryId.email;
        inquirySheetEmail.classList.remove('text-muted');

    }
    else
    {
        inquirySheetEmail.value = '-- Not Provided --';
        inquirySheetEmail.classList.add('text-muted');
    }

    if(ob.inquiryId.secondaryMobileNumber !== null){
        inquirySheetSecondaryMobile.value =ob.inquiryId.secondaryMobileNumber ;
        inquirySheetSecondaryMobile.classList.remove('text-muted');

    }else{
        inquirySheetSecondaryMobile.value = '-- Not Provided --';
        inquirySheetSecondaryMobile.classList.add('text-muted');
    }

    inquirySheetIdValue.value = ob.inquiryId.idValue;

    //showing date and time with iSO Standarad
    inquirySheetNextFollowUp.value = (ob.inquiryId.contactTime).replace('T', ' ');
    inquirySheetDescription.value = ob.inquiryId.description;

    const [addedDate, addedTime] = ob.inquiryId.timeStamp.split("T");
    inquirySheetAddedDate.innerText = addedDate;
    inquirySheetAddedTime.innerText = addedTime;
    inquirySheetAddedBy.innerText = ob.inquiryId.addedBy;

    currentInquiry = ob.inquiryId;

}
const inquiryEdit = () => {
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
                    $.ajax("/inquiry", {
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
                        refreshTable();

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

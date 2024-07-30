window.addEventListener('load',()=>{
    refreshCommissionRateTable();
    resetCommissionRateForm();

    //validation for commission rate
    $("#commissionRateCourse").chosen().change(function () {
        $("#commissionRateCourse_chosen .chosen-single").addClass('select-validated');
    });

});

const  refreshCommissionRateTable = ()=>{

    const commissionRates = ajaxGetRequest("/CommissionRate/findAll");
    const displayPropertyListForCommissionRate = [
        {property:getCourseName,dataType:'function'},
        {property:getFullPaymentRate,dataType:'function'},
        {property:getPartPaymentRate,dataType:'function'},
        {property:getTimeStamp,dataType:'function'},
        {property:'addedBy',dataType:'text'},
    ];
    fillDataIntoTable(tblCommissionRate,commissionRates,displayPropertyListForCommissionRate,rowView,'offCanvasCommissionRateSheet');

    if(commissionRates.length!==0){
        $('#tblCommissionRate').DataTable();
    }

}

const resetCommissionRateForm = ()=>{

    //remove validated class from chosen
    $("#commissionRateCourse_chosen .chosen-single").removeClass('select-validated');
    $("#commissionRateCourse_chosen .chosen-single").removeClass('select-invalidated');
    commissionRateCourse.classList.remove('is-valid');
    commissionRateCourse.classList.remove('is-invalid');

    //set default option chosen
    setTimeout(function () {
        $('#commissionRateCourse').val('').trigger('chosen:updated');

    }, 0);

    document.getElementById('frmNewCommissionRate').reset();

    //reset all the inputs validation using their common class name (newInquiryInputs)
    inputs = document.querySelectorAll('.newCommissionRateInputs');
    inputs.forEach(function (input) {
        // Remove inline styles
        input.style = '';
        //remove bootstrap validation classes
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
    });

    newCommissionRate={};


    courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(commissionRateCourse,' ',courses,'name')

    //initialize chosen select
    $('#commissionRateCourse').chosen({width: '100%'});
}

const getCourseName = (ob)=>{
    return ob.courseID.name;
}

const getTimeStamp = (ob)=>{
    return ob.timestamp.replace("T"," ").slice(0, -3);
}

const getFullPaymentRate = (ob)=>{
    return "Rs. "+ob.fullPaymentRate.toLocaleString('en-US',{minimumFractionDigits: 2});
}

const getPartPaymentRate = (ob)=>{
    return "Rs. "+ob.partPaymentRate.toLocaleString('en-US',{minimumFractionDigits: 2});
}

const rowView = (ob)=>{
    //hide the update button
    btnCommissionSheetUpdate.style.display = 'none';

    //make all the inputs readonly and remove inline styles
    inputs = document.querySelectorAll('.commissionSheetInputs');
    inputs.forEach(function (input) {
        input.setAttribute('disabled', 'true');
        input.style = '';
        //remove bootstrap validation classes
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
    });

    //refill the select
    fillSelectOptions(commissionRateSheetCourse,'Please Select a Source',courses,'name',ob.courseID.name)
    //setting data
    commissionRateSheetAddedBy.value = ob.addedBy;
    commissionRateSheetFull.value = ob.fullPaymentRate;
    commissionRateSheetPart.value = ob.partPaymentRate;
    commissionRateSheetDate.value = ob.timestamp.replace("T"," ").slice(0, -3);
    //catch old commissionRate and new commissionRate
    oldCommissionRate = JSON.parse(JSON.stringify(ob));
    editedCommissionRate = JSON.parse(JSON.stringify(ob));

}

const newCommissionRateSubmit = ()=>{
//calling the checkBatchFormErrors function and catching the return value to errors variable
    let errors = checkCommissionRateFormErrors(newCommissionRate);
    //check the errors variable is null
    //if it's empty that means all the required inputs are filled
    if (errors === '') {
        //get a user confirmation using external customConfirm js
        showCustomConfirm("You are about to add a New Commission Rate<br>Are You Sure?", function (result) {
            if (result) {
                //if the user confirmation is "yes" call the ajaxHttpRequest to pass the data to backend via ajax
                //catch the return value from the backend and save it in the serviceResponse variable
                let serviceResponse = ajaxHttpRequest("/CommissionRate", 'POST', newCommissionRate);
                //check the serviceResponse value is "OK"
                if (serviceResponse === "OK") {
                    //this means data successfully passed to the backend
                    //show an alert to user
                    showCustomModal("Commission Rate Successfully Added!", "success");
                    //close the offcanvas sheet
                    offCanvasCommissionRateCloseButton.click();
                    //refresh the table
                    refreshCommissionRateTable();
                    //refresh the form
                    resetCommissionRateForm();
                } else {
                    //this means there was a problem with the query
                    //shows an error alert to the user
                    showCustomModal("Operation Failed!" + serviceResponse, "error");
                }
            }
                //will execute this block if the user confirmation is "no"
            //show user an alert
            else {
                showCustomModal("Operation Cancelled!", "info");
            }
        });
    } else {
        //there are errors
        //display them to the user using external-ModalFunction()
        showCustomModal(errors, 'warning');

    }

}

const checkCommissionRateFormErrors = (object)=>{
    let errors = '';

    if (object.courseID == null) {
        errors = errors + 'Course is Required<br>';
        $("#commissionRateCourse_chosen .chosen-single").addClass('select-invalidated');
        commissionRateCourse.classList.add('is-invalid');
    }
    if(object.fullPaymentRate == null){
        errors = errors + 'Full Payment Rate is Required<br>';
        commissionRateFullPayment.classList.add('is-invalid');

    }
    if(object.partPaymentRate == null){
        errors = errors + 'Part Payment Rate is Required<br>';
        commissionRatePartPayment.classList.add('is-invalid');

    }

    return errors;

}

const commissionRateEdit = ()=>{
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
    inputs = document.querySelectorAll('.commissionSheetInputs');

    //remove the disabled attribute from the select
    //give a border color to indicate that select can be now edited

    inputs.forEach(function (input) {
        input.removeAttribute('disabled');
        input.setAttribute('style', 'border:1px solid #0DCAF0!important;background-color:rgba(13,202,240,0.2);');
    });

    //display the update button once the edit button is clicked
    btnCommissionSheetUpdate.style.display = 'block';
}

const commissionRateUpdate =()=>{
    const errors = checkCommissionRateFormErrors(editedCommissionRate);

    if (errors === '') {

        let updates = checkForCommissionRateUpdates();

        if (updates === "") {
            showCustomModal("No changes Detected!", "info")
        } else {
            showCustomConfirm("You are About to Update this Commission Rate<br><br>Following Changes Detected!<br/><br/><small>" + updates+"</small><br>Are You Sure?", function (result){

                if(result){
                    const ServerResponse = ajaxHttpRequest("/CommissionRate","PUT",editedCommissionRate)
                    //if data passed successfully
                    //show a success alert
                    if(ServerResponse === "OK"){

                        showCustomModal("Commission Rate Successfully Updated!","success")
                        //close the offCanvas and refresh the table
                        offCanvasCommissionRateSheetCloseButton.click();
                        refreshCommissionRateTable();

                    }

                        //if data passed unsuccessfully
                    //show an error alert
                    else
                    {
                        showCustomModal("Operation Failed! <br> Commission Rate Record Not Updated! "+ServerResponse,"error")
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

const checkForCommissionRateUpdates =()=>{
    let updates = '';

    if (editedCommissionRate.courseID.name !== oldCommissionRate.courseID.name) {
        updates = updates + "Course was changed to <span class='text-purple'>" + editedCommissionRate.courseID.name + "</span><br>";
    }
    if (editedCommissionRate.fullPaymentRate !== oldCommissionRate.fullPaymentRate) {
        updates = updates + "Full Payment Rate was changed to <span class='text-purple'>" + editedCommissionRate.fullPaymentRate + "</span><br>";
    }
    if (editedCommissionRate.partPaymentRate !== oldCommissionRate.partPaymentRate) {
        updates = updates + "Part Payment Rate to <span class='text-purple'>" + editedCommissionRate.partPaymentRate + "</span><br>";
    }

    return updates;
}
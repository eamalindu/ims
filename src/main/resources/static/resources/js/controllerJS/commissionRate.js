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
    fillDataIntoTable(tblCommissionRate,commissionRates,displayPropertyListForCommissionRate,rowView,'offCanvasCommissionRate');

    if(commissionRates.length!==0){
        $('#tblCommissionRate').DataTable();
    }

}

const resetCommissionRateForm = ()=>{
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
    return ob.timestamp.replace("T"," ");
}

const getFullPaymentRate = (ob)=>{
    return "Rs. "+ob.fullPaymentRate.toLocaleString('en-US',{minimumFractionDigits: 2});
}

const getPartPaymentRate = (ob)=>{
    return "Rs. "+ob.partPaymentRate.toLocaleString('en-US',{minimumFractionDigits: 2});
}

const rowView = (ob)=>{

}

const newCommissionRateSubmit = ()=>{
//calling the checkBatchFormErrors function and catching the return value to errors variable
    let errors = checkCommissionRateFormErrors(newCommissionRate);
    //check the errors variable is null
    //if it's empty that means all the required inputs are filled
    if (errors === '') {
        //get a user confirmation using external customConfirm js
        showCustomConfirm("You are about to add a New Batch<br>Are You Sure?", function (result) {
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
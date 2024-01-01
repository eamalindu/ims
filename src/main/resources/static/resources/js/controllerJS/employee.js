window.addEventListener('load',()=>{

    refreshEmployeeTable()
    resetEmployeeForm()

    //hide the update btn
    btnEmployeeSheetUpdate.style.display = 'none';

    //initializing 3rd party libraries
    $('#employeeDOB').daterangepicker({
        "maxDate": new Date(),
        "singleDatePicker": true,
        "timePicker": false,
        "timePicker24Hour": true,
        "autoApply": true,
        "linkedCalendars": false,
        "showCustomRangeLabel": false,
        "drops": "up",
        "locale": {
            "format": "YYYY-MM-DD"
        }
    });
    $('#employeeSheetDOB').daterangepicker({
        "maxDate": new Date(),
        "singleDatePicker": true,
        "timePicker": false,
        "timePicker24Hour": true,
        "autoApply": true,
        "linkedCalendars": false,
        "showCustomRangeLabel": false,
        "drops": "up",
        "locale": {
            "format": "YYYY-MM-DD"
        }
    });

    $('#employeeDesignation').chosen({width: '100%'});
    $('#employeeCivilStatus').chosen({width: '100%'});
    $('#employeeStatus').chosen({width: '100%'});
    $('#employeeHighestEducation').chosen({width:'100%'});

    //when apply is clicked data will validate and bind to the editedInquiry object
    $('#employeeSheetDOB').on('apply.daterangepicker',function (){
        inputTextValidator(this,'^20[0-9]{2}[-][0-9]{2}[-][0-9]{2}$','editedEmployee','dob')
    });

    //validation chosen select (for new employee)
    $("#employeeCivilStatus").chosen().change(function () {
        $("#employeeCivilStatus_chosen .chosen-single").addClass('select-validated');
    });
    $("#employeeDesignation").chosen().change(function () {
        $("#employeeDesignation_chosen .chosen-single").addClass('select-validated');
    });
    $("#employeeStatus").chosen().change(function () {
        $("#employeeStatus_chosen .chosen-single").addClass('select-validated');
    });
    $("#employeeHighestEducation").chosen().change(function () {
        $("#employeeHighestEducation_chosen .chosen-single").addClass('select-validated');
    });
})

const refreshEmployeeTable = ()=>{
    employees = ajaxGetRequest("/employee/findall");
    displayPropertyListForEmployee = [
        {property:'employeeID',dataType:'text'},
        {property:'fullName',dataType:'text'},
        {property:'nic',dataType:'text'},
        {property:'email',dataType:'text'},
        {property:'mobileNumber',dataType:'text'},
        {property:getDesignationName,dataType:'function'},
        {property:getEmployeeStatus,dataType:'function'},
        {property:getUserAccountStatus,dataType:'function'},
    ];

    fillDataIntoTable(tblEmployee,employees,displayPropertyListForEmployee,rowView,'offCanvasEmployeeSheet')

}

const getDesignationName = (ob)=>{

    return ob.designationID.designation;
}
const getEmployeeStatus = (ob)=>{
    if(ob.employeeStatusID.status=="Working"){
        return '<i class="fa-solid fa-user-check text-success bg-custom-white p-2 rounded-circle" title="Employee Working"></i>';
    }
    if(ob.employeeStatusID.status=="Suspended"){
        return '<i class="fa-solid fa-user-slash text-warning bg-custom-white p-2 rounded-circle" title="Employee Suspended"></i>';
    }
    if(ob.employeeStatusID.status=="Resigned"){
        return '<i class="fa-solid fa-user-xmark fa-solid fa-user-xmark text-danger bg-custom-white p-2 rounded-circle" title="Employee Resigned"></i>';
    }

}

const getUserAccountStatus = (ob)=>{
    return '<i class="fa fa-xmark-circle text-danger fs-3"></i>';
}

const rowView=(ob,index) =>{

    inputs = document.querySelectorAll('.employeeSheetInputs');

    //remove the disabled attribute from the select
    //give a border color to indicate that select can be now edited

    inputs.forEach(function (input) {
        input.setAttribute('disabled', 'true');
        input.style = '';
        //remove bootstrap validation classes
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
    });

    employeeSheetCallingNameText.classList.remove('text-muted');
    employeeSheetCallingNameText.classList.remove('text-warning');
    employeeSheetCallingNameText.classList.remove('text-danger');

    //hide the update btn
    btnEmployeeSheetUpdate.style.display = 'none';

    employeeSheetFullName.value = ob.fullName;
    employeeSheetCallingName.value = ob.callingName;
    employeeSheetNIC.value =ob.nic;
    employeeSheetDOB.value =ob.dob;

    //setting gender
    if(ob.gender=="Male"){
        employeeSheetGenderMale.checked = true;
    }
    else{
        employeeSheetGenderFemale.checked = true;
    }

    employeeSheetEmail.value=ob.email;
    employeeSheetMobile.value = ob.mobileNumber;

    //setting optional values
    if (ob.landNumber !== null) {
        employeeSheetLand.value = ob.landNumber;
        employeeSheetLand.classList.remove('text-muted');

    } else {
        employeeSheetLand.value = '-- Not Provided --';
        employeeSheetLand.classList.add('text-muted');
    }
    employeeSheetAddress.value = ob.address;

    employeeSheetCivilStatus.value = ob.civilStatus;

    //select the appropriate option as selected
    fillSelectOptions(employeeSheetDesignation, 'Please Select a Designation', designations, 'designation',ob.designationID.designation)
    fillSelectOptions(employeeSheetEmployeeStatus, 'Please Select a Status', Status, 'status',ob.employeeStatusID.status)

//setting optional values
    if (ob.note !== null) {
        employeeSheetNote.value = ob.note;
        employeeSheetNote.classList.remove('text-muted');

    } else {
        employeeSheetNote.value = '-- Not Provided --';
        employeeSheetNote.classList.add('text-muted');
    }

    employeeSheetHighestEducation.value = ob.highestEducationalQualification;

    employeeSheetEmpIDText.innerText = ob.employeeID;

    const [joinedDate, joinedTime] =ob.added_timestamp.split("T");
    employeeSheetJoinedDateText.innerText = joinedDate;

    employeeSheetCallingNameText.innerText = ob.callingName;

    if(ob.employeeStatusID.status=="Working") {
        employeeSheetCallingNameText.classList.add('text-success');
    }
    else if (ob.employeeStatusID.status=="Suspended"){
        employeeSheetCallingNameText.classList.add('text-warning');
    }
    else{
        employeeSheetCallingNameText.classList.add('text-danger');
    }

    //catch old Employee and new Employee
    oldEmployee = JSON.parse(JSON.stringify(ob));
    editedEmployee = JSON.parse(JSON.stringify(ob));
}
const employeeEdit = () => {

    //display the update button once the edit button is clicked
    btnEmployeeSheetUpdate.style.display = 'block';

    //remove the attribute readonly to make inputs accept the user input values
    //give a border color to inputs indicate that the input's values are ready to be edited
    inputs = document.querySelectorAll('.employeeSheetInputs');

    //remove the disabled attribute from the select
    //give a border color to indicate that select can be now edited

    inputs.forEach(function (input) {
        input.removeAttribute('disabled');
        input.setAttribute('style', 'border:1px solid #0DCAF0!important;background-color:rgba(13,202,240,0.2);');
    });

}

const newEmployeeSubmit=()=>{
    console.log(newEmployee);

    const errors = checkEmployeeFormErrors(newEmployee)

    if(errors===''){
        //this means there are no any errors
        //user confirmation is needed (will add later)
        showCustomConfirm("You are about to add a New Employee<br>Are You Sure?", function (result) {
            if (result) {
                //passing the data to backend
                //if the data is successfully passed to the database it will set the value of the postServerResponse to "OK"
                let postServerResponse;
                $.ajax("/employee", {
                    type: "POST",
                    async: false, // set the async option false to wait for the response
                    contentType: "application/json",
                    data: JSON.stringify(newEmployee),
                    success: function (data) {
                        console.log("success " + data);
                        postServerResponse = data;

                    }, error: function (resOb) {
                        console.log("Error " + resOb);
                        postServerResponse = resOb;

                    }
                });
                if (postServerResponse === 'OK') {

                    //this means data successfully passed to the backend
                    //show an alert to user
                    showCustomModal("Employee Successfully Added!", "success");

                    //trigger offcanvas button
                    offCanvasEmployeeCloseButton.click();

                    //needs to refresh all the tables in the employee
                    refreshEmployeeTable();
                    resetEmployeeForm();


                } else {
                    //this means there was a problem with the query
                    //shows an error alert to the user
                    showCustomModal("Operation Failed!" + postServerResponse, "error");
                }

            } else {
                showCustomModal("Operation Cancelled!", "info");
            }
        });
    }
    else{
        //there are errors
        //display them to the user using external-ModalFunction()
        showCustomModal(errors, 'warning');
    }
}

const employeeUpdate = ()=>{
    console.log(oldEmployee)
    console.log(editedEmployee)

    //check required values
    const errors = checkEmployeeFormErrors(editedEmployee);
    if (errors === '') {

        //check for updates
        let updates = checkForEmployeeUpdate();

        if(updates===''){
            showCustomModal("No changes Detected!", "info");
        }
        else{
            showCustomConfirm("You are About to Update this Employee<br><br>Following Changes Detected!<br/><br/><small>" + updates+"</small><br>Are You Sure?", function (result){

                if(result){
                    //database ajax code
                    let postServerResponse;
                    $.ajax("/employee", {
                        type: "PUT",
                        async: false,
                        contentType: "application/json",
                        data: JSON.stringify(editedEmployee),
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

                        showCustomModal("Employee Successfully Updated!","success")
                        //close the offCanvas and refresh the table
                        offCanvasEmployeeSheetCloseButton.click();
                        refreshEmployeeTable();

                    }

                        //if data passed unsuccessfully
                    //show an error alert
                    else
                    {
                        showCustomModal("Operation Failed! <br> Employee Record Not Updated! "+postServerResponse,"error")
                    }
                }
                else{
                    showCustomModal("Operation Cancelled!", "info");
                }
            });

        }
    }
    else{
        showCustomModal(errors, 'warning');
    }

}

const checkEmployeeFormErrors = (employeeObject)=>{
    let errors = '';

    if(employeeObject.fullName==null){
        errors = errors +'Full Name is Required<br>';
    }
    if(employeeObject.nic==null){
        errors = errors +'NIC is Required<br>';
    }
    if(employeeObject.dob==null){
        errors = errors +'Date of Birth is Required<br>';
    }
    if(employeeObject.email==null){
        errors = errors +'Email is Required<br>';
    }
    if(employeeObject.mobileNumber==null){
        errors = errors +'Mobile Number is Required<br>';
    }
    if(employeeObject.address==null){
        errors = errors +'Address is Required<br>';
    }
    if(employeeObject.civilStatus==null){
        errors = errors +'Civil Status is Required<br>';
    }
    if(employeeObject.designationID==null){
        errors = errors +'Designation is Required<br>';
    }
    if(employeeObject.employeeStatusID==null){
        errors = errors +'Employee Status is Required<br>';
    }
    if(employeeObject.gender==null){
        errors = errors +'Gender is Required<br>';
    }
    if(employeeObject.callingName==null){
        errors = errors +'Calling Name is Required<br>';
    }
    if(employeeObject.photoPath==null){
        errors = errors +'Profile Photo is Required<br>';
    }
    if(employeeObject.highestEducationalQualification==null){
        errors = errors +'Highest Educational Qualification is Required<br>';
    }

    return errors;
}

//function to compare the old and edited employee values and return the updated/changed values
const checkForEmployeeUpdate = ()=>{
    let updates = '';

    if (editedEmployee.fullName !== oldEmployee.fullName) {
        updates = updates + "Full Name was changed to <span class='text-purple'>" + editedEmployee.fullName + "</span><br>";
    }
    if (editedEmployee.nic !== oldEmployee.nic) {
        updates = updates + "NIC was changed to <span class='text-purple'>" + editedEmployee.nic + "</span><br>";
    }
    if (editedEmployee.dob !== oldEmployee.dob) {
        updates = updates + "DOB was changed to <span class='text-purple'>" + editedEmployee.dob + "</span><br>";
    }
    if (editedEmployee.email !== oldEmployee.email) {
        updates = updates + "Email was changed to <span class='text-purple'>" + editedEmployee.email + "</span><br>";
    }
    if (editedEmployee.mobileNumber !== oldEmployee.mobileNumber) {
        updates = updates + "Mobile Number was changed to <span class='text-purple'>" + editedEmployee.mobileNumber + "</span><br>";
    }
    if (editedEmployee.landNumber !== oldEmployee.landNumber) {
        updates = updates + "Land Number was changed to <span class='text-purple'>" + editedEmployee.landNumber + "</span><br>";
    }
    if (editedEmployee.address !== oldEmployee.address) {
        updates = updates + "Address was changed to <span class='text-purple'>" + editedEmployee.address + "</span><br>";
    }
    if (editedEmployee.highestEducationalQualification !== oldEmployee.highestEducationalQualification) {
        updates = updates + "Qualification was changed to <span class='text-purple'>" + editedEmployee.highestEducationalQualification + "</span><br>";
    }
    if (editedEmployee.civilStatus !== oldEmployee.civilStatus) {
        updates = updates + "Civil Status was changed to <span class='text-purple'>" + editedEmployee.civilStatus + "</span><br>";
    }
    if (editedEmployee.designationID.designation !== oldEmployee.designationID.designation) {
        updates = updates + "Designation was changed to <span class='text-purple'>" + editedEmployee.designationID.designation + "</span><br>";
    }
    if (editedEmployee.employeeStatusID.status !== oldEmployee.employeeStatusID.status) {
        updates = updates + "Employee Status was changed to <span class='text-purple'>" + editedEmployee.employeeStatusID.status + "</span><br>";
    }
    if (editedEmployee.note !== oldEmployee.note) {
        updates = updates + "Note was changed to <span class='text-purple'>" + editedEmployee.note + "</span><br>";
    }

    return updates;

}

const resetEmployeeForm = ()=>{

    $("#employeeCivilStatus_chosen .chosen-single").removeClass('select-validated');
    $("#employeeDesignation_chosen .chosen-single").removeClass('select-validated');
    $("#employeeStatus_chosen .chosen-single").removeClass('select-validated');
    $("#employeeHighestEducation_chosen .chosen-single").removeClass('select-validated');
    employeeCivilStatus.classList.remove('is-valid');
    employeeDesignation.classList.remove('is-valid');
    employeeStatus.classList.remove('is-valid');
    employeeHighestEducation.classList.remove('is-valid');

    //set default option chosen
    setTimeout(function () {
        $('select').val('').trigger('chosen:updated');
    }, 0);

    //remove value
    document.getElementById('frmNewEmployee').reset();
    //removing image
    imgProfile.src="";
    imgProfile.classList.remove('bg-success');
    //remove validation
    inputs = document.querySelectorAll('.newEmployeeInputs');
    inputs.forEach(function (input) {
        input.style = '';
        //remove bootstrap validation classes
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
    });
    //new employee object
    newEmployee = {};

    //dynamic select for courses
    Status = ajaxGetRequest("/employeestatus/findall");
    fillSelectOptions(employeeStatus, 'Please Select a Status', Status, 'status')

    //dynamic select for sources
    designations = ajaxGetRequest("/designation/findall")
    fillSelectOptions(employeeDesignation, 'Please Select a Designation', designations, 'designation')
}
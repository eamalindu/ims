window.addEventListener('load', () => {
    //refresh the privilege table
    refreshPrivilegeTable();
    //reset the privilege form
    resetPrivilegeForm()

    //validation chosen select (for new Privilege)
    $("#privilegeRole").chosen().change(function () {
        $("#privilegeRole_chosen .chosen-single").addClass('select-validated');
    });
    $("#privilegeModule").chosen().change(function () {
        $("#privilegeModule_chosen .chosen-single").addClass('select-validated');
    });
});

//creating a function for checkbox validate and binding values to the object
//This function have seven arguments
// 1) elementID -> use 'this' or the html id of the checkbox
// 2) leftDivID -> left DIV html id
// 3) rightDivID -> right DIV html id
// 4) object -> The object that data should bind
// 5) property -> object property
// 6) trueValue-> value to bind if checkbox is checked
// 7) falseValue-> value to bind if checkbox is not checked
//This function is called using onclick event handler
const checkBoxValidator = (elementID,leftDivID,rightDivID,object,property,trueValue,falseValue) => {
    //checking if the checkbox is checked or not
    if (elementID.checked) {
        rightDivID.classList.add('bg-success', 'text-white');
        leftDivID.classList.remove('bg-success', 'text-white');
        window[object][property]=trueValue;
    } else {
        window[object][property]=falseValue;
        rightDivID.classList.remove('bg-success', 'text-white');
        leftDivID.classList.add('bg-success', 'text-white');

    }
}

//creating a function to refresh the privilege table when ever needed
const refreshPrivilegeTable = ()=>{

    //getting current privilege from the database using ajaxGetRequest function and assign the response to the variable privileges
    privileges = ajaxGetRequest("/Privilege/findall");
    //creating a display property list for the privileges
    displayPropertyListForPrivilege = [
        {property:getRoleName,dataType:'function'},
        {property:getModuleName,dataType:'function'},
        {property:getSelect,dataType:'function'},
        {property:getInsert,dataType:'function'},
        {property:getUpdate,dataType:'function'},
        {property:getDelete,dataType:'function'},]

    //calling external common function to fill the data into the table
    fillDataIntoTable(tblPrivilege,privileges,displayPropertyListForPrivilege,rowView,'offcanvasPrivilegeSheet')

}
//since we cant access the Role Name from the privileges directly. creating a function to return the roleID from the privileges object
const getRoleName=(ob)=>{

    return ob.roleID.name;
}
//since we cant access the module Name from the privileges directly. creating a function to return the moduleID from the privileges object
const getModuleName=(ob)=>{

    return ob.moduleID.name;
}
//since the select data type is in boolean we cant show true or false in the table
//crated a function to return Granted and Not Granted based on their value
const getSelect = (ob) => {
  if(ob.selectPrivilege){
      return '<span class="badge rounded-0" style="background: #3FB618">Granted</span>';
  } else {
        return '<span class="badge rounded-0" style="background: #FF0039">Not Granted</span>';
  }
}

//since the insert data type is in boolean we cant show true or false in the table
//crated a function to return Granted and Not Granted based on their value
const getInsert = (ob) => {
    if(ob.insertPrivilege){
        return '<span class="badge rounded-0" style="background: #3FB618">Granted</span>';
    } else {
        return '<span class="badge rounded-0" style="background: #FF0039">Not Granted</span>';
    }
}

//since the update data type is in boolean we cant show true or false in the table
//crated a function to return Granted and Not Granted based on their value
const getUpdate = (ob) => {
    if(ob.updatePrivilege){
        return '<span class="badge rounded-0" style="background: #3FB618">Granted</span>';
    } else {
        return '<span class="badge rounded-0" style="background: #FF0039">Not Granted</span>';
    }
}

//since the delete data type is in boolean we cant show true or false in the table
//crated a function to return Granted and Not Granted based on their value
const getDelete = (ob) => {
    if(ob.deletePrivilege){
        return '<span class="badge rounded-0" style="background: #3FB618">Granted</span>';
    } else {
        return '<span class="badge rounded-0" style="background: #FF0039">Not Granted</span>';
    }
}

//created a function to show to details in an offcanvas
const rowView=(ob,rowIndex)=>{

    //hide the update button
    btnPrivilegeSheetUpdate.style.display='none';

    //add the attribute disabled to make inputs block the user input values
    //remove the edited border colors from the inputs
    inputs = document.querySelectorAll('.privilegeSheetInputs');
    inputs.forEach(function (input) {
        input.setAttribute('disabled', 'true');
        input.style = '';
        //remove bootstrap validation classes
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
    });

    //adding disable attribute from all the checkboxes
    privilegeSheetSelect.disabled = true;
    privilegeSheetInsert.disabled = true;
    privilegeSheetUpdate.disabled = true;
    privilegeSheetDelete.disabled = true;
    //setting object values in to the inputs

    //select the appropriate option as selected
    fillSelectOptions(privilegeSheetRole, 'Please Select a Role', roles, 'name',ob.roleID.name);
    fillSelectOptions(privilegeSheetModule, 'Please Select a Module', modules, 'name',ob.moduleID.name);

    //setting the values for checkboxes
    if(ob.select){
        privilegeSheetSelect.checked=true;
        leftSheetSelect.classList.remove('bg-success', 'text-white');
        rightSheetSelect.classList.add('bg-success', 'text-white');
    }
    else{
        privilegeSheetSelect.checked=false;
        leftSheetSelect.classList.add('bg-success', 'text-white');
        rightSheetSelect.classList.remove('bg-success', 'text-white');
    }

    if(ob.insert){
        privilegeSheetInsert.checked=true;
        leftSheetInsert.classList.remove('bg-success', 'text-white');
        rightSheetInsert.classList.add('bg-success', 'text-white');
    }
    else{
        privilegeSheetInsert.checked=false;
        leftSheetInsert.classList.add('bg-success', 'text-white');
        rightSheetInsert.classList.remove('bg-success', 'text-white');
    }

    if(ob.update){
        privilegeSheetUpdate.checked=true;
        leftSheetUpdate.classList.remove('bg-success', 'text-white');
        rightSheetUpdate.classList.add('bg-success', 'text-white');
    }
    else{
        privilegeSheetUpdate.checked=false;
        leftSheetUpdate.classList.add('bg-success', 'text-white');
        rightSheetUpdate.classList.remove('bg-success', 'text-white');
    }

    if(ob.delete){
        privilegeSheetDelete.checked=true;
        leftSheetDelete.classList.remove('bg-success', 'text-white');
        rightSheetDelete.classList.add('bg-success', 'text-white');
    }
    else{
        privilegeSheetDelete.checked=false;
        leftSheetDelete.classList.add('bg-success', 'text-white');
        rightSheetDelete.classList.remove('bg-success', 'text-white');
    }

}
//creating a function to reset the privilege form when ever needed
const resetPrivilegeForm = ()=> {

    //reset privilege object
    newPrivilege = {}

    //remove validation from chosen select
    $("#privilegeRole_chosen .chosen-single").removeClass('select-validated');
    $("#privilegeModule_chosen .chosen-single").removeClass('select-validated');
    privilegeRole.classList.remove('is-valid');
    privilegeModule.classList.remove('is-valid');

    //set default option chosen
    setTimeout(function () {
        $('select').val('').trigger('chosen:updated');
    }, 0);

    //reset form
    frmNewPrivilege.reset();

    //setting default values and selected div
    checkBoxValidator(this, leftSelect, rightSelect, 'newPrivilege', 'selectPrivilege', true, false);
    checkBoxValidator(this, leftInsert, rightInsert, 'newPrivilege', 'insertPrivilege', true, false);
    checkBoxValidator(this, leftUpdate, rightUpdate, 'newPrivilege', 'updatePrivilege', true, false);
    checkBoxValidator(this, leftDelete, rightDelete, 'newPrivilege', 'deletePrivilege', true, false);

    //dynamic select content handling
    roles = ajaxGetRequest("/role/findall")
    fillSelectOptions(privilegeRole, 'Please Select a Role', roles, 'name');
    modules = ajaxGetRequest("/module/findall")
    fillSelectOptions(privilegeModule, 'Please Select a Module', modules, 'name');

    //initialize the 3rd party libraries (chosen)
    $('#privilegeRole').chosen({width: '100%'});
    $('#privilegeModule').chosen({width: '100%'});
}

//creating a function to edit the privilege form when ever needed
const privilegeEdit=()=>{
    //display the update button once the edit button is clicked
    btnPrivilegeSheetUpdate.style.display = 'block';

    //remove the attribute readonly to make inputs accept the user input values
    //give a border color to inputs indicate that the input's values are ready to be edited
    inputs = document.querySelectorAll('.privilegeSheetInputs');
    inputs.forEach(function (input) {
        input.removeAttribute('disabled');
        input.setAttribute('style', 'border:1px solid #0DCAF0!important;background-color:rgba(13,202,240,0.2);');
    });

    //removing disable attribute from all the checkboxes
    privilegeSheetSelect.disabled = false;
    privilegeSheetInsert.disabled = false;
    privilegeSheetUpdate.disabled = false;
    privilegeSheetDelete.disabled = false;

}

//creating a function to submit the privilege form when ever needed
const newPrivilegeSubmit = ()=>{
    console.log(newPrivilege);

    const errors = checkPrivilegeFormErrors(newPrivilege);

    if(errors===''){
        showCustomConfirm("You are about to add a New Privilege<br>Are You Sure?", function (result) {

            if(result){
                serviceResponse = ajaxHttpRequest("/Privilege",'POST',newPrivilege);

                if(serviceResponse==="OK"){
                    //this means data successfully passed to the backend
                    //show an alert to user
                    showCustomModal("Privilege Successfully Added!", "success");
                    //close the offCanvas sheet
                    offCanvasPrivilegeCloseButton.click();
                    //refresh table and reset form
                    refreshPrivilegeTable();
                    resetPrivilegeForm();
                }
                else{

                    //this means there was a problem with the query
                    //shows an error alert to the user
                    showCustomModal("Operation Failed!" + serviceResponse, "error");
                }

            }
            else{
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

//creating a reusable function to check all the required inputs are filled by checking bound values
//need to pass the object as a parameter
//this function will return if there are any unfilled inputs
const checkPrivilegeFormErrors = (privilegeObject)=>{
    let errors = '';

    if(privilegeObject.roleID==null){
        errors = errors +'Role is Required<br>';
    }
    if(privilegeObject.moduleID==null){
        errors = errors +'Module is Required<br>';
    }

    return errors;
}

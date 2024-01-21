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

const checkBoxValidator = (elementID,leftDivID,rightDivID) => {
    if (elementID.checked) {
        rightDivID.classList.add('bg-success', 'text-white');
        leftDivID.classList.remove('bg-success', 'text-white')
    } else {
        rightDivID.classList.remove('bg-success', 'text-white');
        leftDivID.classList.add('bg-success', 'text-white')
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
  if(ob.select){
      return '<span class="badge rounded-0" style="background: #3FB618">Granted</span>';
  } else {
        return '<span class="badge rounded-0" style="background: #FF0039">Not Granted</span>';
  }
}

//since the insert data type is in boolean we cant show true or false in the table
//crated a function to return Granted and Not Granted based on their value
const getInsert = (ob) => {
    if(ob.insert){
        return '<span class="badge rounded-0" style="background: #3FB618">Granted</span>';
    } else {
        return '<span class="badge rounded-0" style="background: #FF0039">Not Granted</span>';
    }
}

//since the update data type is in boolean we cant show true or false in the table
//crated a function to return Granted and Not Granted based on their value
const getUpdate = (ob) => {
    if(ob.update){
        return '<span class="badge rounded-0" style="background: #3FB618">Granted</span>';
    } else {
        return '<span class="badge rounded-0" style="background: #FF0039">Not Granted</span>';
    }
}

//since the delete data type is in boolean we cant show true or false in the table
//crated a function to return Granted and Not Granted based on their value
const getDelete = (ob) => {
    if(ob.delete){
        return '<span class="badge rounded-0" style="background: #3FB618">Granted</span>';
    } else {
        return '<span class="badge rounded-0" style="background: #FF0039">Not Granted</span>';
    }
}

//created a function to show to details in an offcanvas
const rowView=(ob,rowIndex)=>{

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
    //setting object values in to the inputs

    //select the appropriate option as selected
    fillSelectOptions(privilegeSheetRole, 'Please Select a Role', roles, 'name',ob.roleID.name)
    $('#privilegeSheetRole').chosen({width: '100%'});

}
//creating a function to reset the privilege form when ever needed
const resetPrivilegeForm = ()=>{

    //remove validation from chosen select
    $("#privilegeRole_chosen .chosen-single").removeClass('select-validated');
    $("#privilegeModule_chosen .chosen-single").removeClass('select-validated');

    //newPrivilegeInputs

    //set default option chosen
    setTimeout(function () {
        $('select').val('').trigger('chosen:updated');
    }, 0);

    //reset form
    frmNewPrivilege.reset();

    //test code
    checkBoxValidator(this,leftSelect,rightSelect);
    checkBoxValidator(this,leftInsert,rightInsert);
    checkBoxValidator(this,leftUpdate,rightUpdate);
    checkBoxValidator(this,leftDelete,rightDelete);

    //dynamic select content handling
    roles = ajaxGetRequest("/role/findall")
    fillSelectOptions(privilegeRole, 'Please Select a Role', roles, 'name');

    //initialize the 3rd party libraries (chosen)
    $('#privilegeRole').chosen({width: '100%'});
    $('#privilegeModule').chosen({width: '100%'});

    //reset privilege object
    newPrivilege = {}
}
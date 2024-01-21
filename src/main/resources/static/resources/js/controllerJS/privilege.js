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

const refreshPrivilegeTable = ()=>{

    privileges = ajaxGetRequest("/Privilege/findall");
    displayPropertyListForPrivilege = [
        {property:getRoleName,dataType:'function'},
        {property:getModuleName,dataType:'function'},]

    fillDataIntoTable(tblPrivilege,privileges,displayPropertyListForPrivilege,rowView,'offCanvasPrivilege')

}
//since we cant access the Role Name from the privileges directly. creating a function to return the roleID from the privileges object
const getRoleName=(ob)=>{

    return ob.roleID.name;
}
//since we cant access the module Name from the privileges directly. creating a function to return the moduleID from the privileges object
const getModuleName=(ob)=>{

    return ob.moduleID.name;
}
//created a function to show to details in an offcanvas
const rowView=(ob,rowIndex)=>{

}
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

    //initialize the 3rd party libraries (chosen)
    $('#privilegeRole').chosen({width: '100%'});
    $('#privilegeModule').chosen({width: '100%'});

    //reset privilege object
    newPrivilege = {}
}
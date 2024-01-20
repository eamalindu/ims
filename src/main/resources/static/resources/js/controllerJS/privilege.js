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

    //initialize the 3rd party libraries (chosen)
    $('#privilegeRole').chosen({width: '100%'});
    $('#privilegeModule').chosen({width: '100%'});
}
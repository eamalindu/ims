window.addEventListener('load', () => {
    //refresh the privilege table
    refreshPrivilegeTable();
    //reset the privilege form
    resetPrivilegeForm()

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

const  resetPrivilegeForm = ()=>{


    //initialize the 3rd party libraries (chosen)
    $('#privilegeRole').chosen({width: '100%'});
    $('#privilegeModule').chosen({width: '100%'});
}
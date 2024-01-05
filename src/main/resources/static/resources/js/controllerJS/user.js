window.addEventListener('load',()=>{
    employeesWithoutUserAccounts = ajaxGetRequest("/Employee/GetEmployeesWithoutUserAccount");
    fillSelectOptions(userEmployee, 'Please Select an Employee', employeesWithoutUserAccounts, 'fullName')

    $('#userEmployee').chosen({width:'100%'});
    $('#userRole').chosen({width:'100%',placeholder_text_multiple: "Please Select At Least One Role",min_selected_options:1});

    //validation chosen select (for new employee)
    $("#userEmployee").chosen().change(function () {
        $("#userEmployee_chosen .chosen-single").addClass('select-validated');
    });

    user = {}
    refreshUserTable();
});

const refreshUserTable = ()=>{

    users = ajaxGetRequest("/User/findall");
    displayPropertyListForUser = [
        {property:getEmployeeID,dataType:'function'},
    ];
    fillDataIntoTable(tblUser,users,displayPropertyListForUser,rowView,'offcanvasUserSheet')
}

const getEmployeeID = (ob)=>{
    return ob.employeeID.employeeID;
}

const rowView = (ob,rowIndex)=>{

}

const resetEmployeeForm = ()=>{

}
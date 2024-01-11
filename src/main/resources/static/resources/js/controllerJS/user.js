window.addEventListener('load',()=>{
    employeesWithoutUserAccounts = ajaxGetRequest("/Employee/GetEmployeesWithoutUserAccount");
    fillSelectOptions(userEmployee, 'Please Select an Employee', employeesWithoutUserAccounts, 'fullName')
    roles = ajaxGetRequest("/role/findall")
    fillSelectOptions(userRole, '', roles, 'name')

    $('#userEmployee').chosen({width:'100%'});
    $('#userRole').chosen({width:'100%',placeholder_text_multiple: "Please Select At Least One Role",min_selected_options:1});

    //validation chosen select (for new employee)
    $("#userEmployee").chosen().change(function () {
        $("#userEmployee_chosen .chosen-single").addClass('select-validated');
    });

    //validation for multi select chosen
    $("#userRole").chosen().change(function () {
        $("#userRole_chosen .chosen-choices").addClass('select-validated');
        $("#userRole_chosen .search-choice").addClass('select-validated');
    });

    newUser = {}
    newUser.roles= [];
    refreshUserTable();
});

const refreshUserTable = ()=>{

    users = ajaxGetRequest("/User/findall");
    displayPropertyListForUser = [
        {property:getEmployeeID,dataType:'function'},
        {property:getEmployeeCallingName,dataType:'function'},
        {property:'username',dataType:'text'},
        {property:'email',dataType:'text'},
    ];
    fillDataIntoTable(tblUser,users,displayPropertyListForUser,rowView,'offcanvasUserSheet')
}

const getEmployeeID = (ob)=>{
    return ob.employeeID.employeeID;
}
const getEmployeeCallingName = (ob)=>{
    return ob.employeeID.callingName;
}


const rowView = (ob,rowIndex)=>{

}

const resetEmployeeForm = ()=>{

}

const newUserSubmit = ()=>{

    console.log("new User=>")
    console.log(newUser);
}

const checkPassword=()=>{
    password = userPassword.value;
    confirmPassword= userConfirmPassword.value;

    if(password!=''){

        if(password!=confirmPassword){
            userConfirmPassword.classList.add('is-invalid')
            userConfirmPassword.classList.remove('is-valid')
            userConfirmPassword.style.border = '1px solid red';
            userConfirmPassword.style.color='red';
            userConfirmPassword.style.background = 'white';
            userConfirmPassword.style.paddingRight = '0';

        }
        else{
            userPassword.classList.add('is-valid')
            userConfirmPassword.classList.add('is-valid')
            userPassword.classList.remove('is-invalid')
            userConfirmPassword.classList.remove('is-invalid')
            userPassword.style.border = '1px solid green';
            userPassword.style.color='green';
            userPassword.style.background = 'white';
            userPassword.style.paddingRight = '0';

            userConfirmPassword.style.border = '1px solid green';
            userConfirmPassword.style.color='green';
            userConfirmPassword.style.background = 'white';
            userConfirmPassword.style.paddingRight = '0';

        }

    }
    else{
        userPassword.focus()
        userPassword.classList.add('is-invalid')
    }
}


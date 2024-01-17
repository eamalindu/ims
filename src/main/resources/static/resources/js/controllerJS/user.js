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
        {property:getRoles,dataType:'function'},
        {property:getStatus,dataType:'function'},
    ];
    fillDataIntoTable(tblUser,users,displayPropertyListForUser,rowView,'offcanvasUserSheet')
}

const getEmployeeID = (ob)=>{
    return ob.employeeID.employeeID;
}
const getEmployeeCallingName = (ob)=>{
    return ob.employeeID.callingName;
}
const getRoles = (ob)=>{
    let userRoles ='';
    ob.roles.forEach((element,index)=>{
        if(ob.roles.length-1==index) {
            userRoles = userRoles + element.name;
        }
        else{
            userRoles = userRoles + element.name+", ";
        }
    });

    return userRoles;
}
const getStatus = (ob) => {
    if (ob.status === true) {
        return '<span class="badge rounded-0" style="background: #3FB618">Active</span>';
    } else {
        return '<span class="badge rounded-0" style="background: #FF0039">Inactive</span>'
    }
}

const rowView = (ob,rowIndex)=>{

    userSheetEmail.value = ob.email;
    userSheetEmpNumber.value=ob.employeeID.employeeID;
    userSheetCallingName.value=ob.employeeID.callingName;
    userSheetUsername.value = ob.username;
    //hide the update btn
    btnUserSheetUpdate.style.display = 'none';
    fillMultiSelectOptions(userSheetRole,'',roles,'name',ob.roles)
    $('#userSheetRole').chosen({width:'100%',placeholder_text_multiple: "Please Select At Least One Role",min_selected_options:1});
    $('#userSheetRole').prop('disabled', true).trigger("chosen:updated");

    //catch old User and new User
    oldUser = JSON.parse(JSON.stringify(ob));
    editedUser = JSON.parse(JSON.stringify(ob));
}

const resetUserForm = ()=>{

}

const newUserSubmit = ()=>{

    console.log("new User=>")
    console.log(newUser);

    const errors = checkUserFormErrors(newUser,userPassword,userConfirmPassword);
    if(errors===''){
        showCustomConfirm("You are about to add a New User<br>Are You Sure?", function (result) {
            if (result) {
                serviceResponse = ajaxHttpRequest("/User",'POST',newUser);

                if(serviceResponse==="OK"){

                    //this means data successfully passed to the backend
                    //show an alert to user
                    showCustomModal("User Successfully Added!", "success");
                    offCanvasUserCloseButton.click();
                    refreshUserTable();
                    resetUserForm();
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
const checkUserFormErrors = (userObject,passwordID,confirmPasswordID)=> {
    let errors = '';

    if(userObject.employeeID==null){
        errors = errors +'Employee is Required<br>';
    }
    if(userObject.username==null){
        errors = errors +'Username is Required<br>';
    }
    if(userObject.email==null){
        errors = errors +'Email is Required<br>';
    }
    if(userObject.password==null){
        errors = errors +'Password is Required<br>';
    }
    if(userObject.roles.length===0){
        errors = errors +'Role(s) is Required<br>';
    }
    if(userObject.status==null){
        errors = errors +'Status is Required<br>';
    }

    if(passwordID.value !== confirmPasswordID.value){
        errors =errors +'Passwords Does not Match<br>';
    }

    return errors;
}

const userEdit=()=>{
    //display the update button once the edit button is clicked
    btnUserSheetUpdate.style.display = 'block';
    //remove the attribute readonly to make inputs accept the user input values
    //give a border color to inputs indicate that the input's values are ready to be edited
    inputs = document.querySelectorAll('.userSheetInputs');
    inputs.forEach(function (input) {
        input.removeAttribute('disabled');
        input.setAttribute('style', 'border:1px solid #0DCAF0!important;background-color:rgba(13,202,240,0.2);');
    });
    $('#userSheetRole').prop('disabled', false).trigger("chosen:updated");
    $("#userSheetRole_chosen .chosen-choices").addClass('select-editable');
    $("#userSheetRole_chosen .search-choice").addClass('select-editable');

}

const userUpdate=()=>{
    console.log(oldUser)
    console.log(editedUser)

    const errors = checkUserFormErrors(editedUser,'','');
    if (errors === '') {}
    else{
        showCustomModal(errors, 'warning');
    }
}
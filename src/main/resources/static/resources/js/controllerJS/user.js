window.addEventListener('load',()=>{
    employeesWithoutUserAccounts = ajaxGetRequest("/Employee/GetEmployeesWithoutUserAccount");
    fillSelectOptions(userEmployee, 'Please Select an Employee', employeesWithoutUserAccounts, 'fullName')

    $('#userEmployee').chosen({width:'100%'});
    $('#userRole').chosen({width:'100%',placeholder_text_multiple: "Please Select At Least One Role",min_selected_options:1});


});
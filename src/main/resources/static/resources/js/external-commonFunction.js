//Reusable Component
//this external Common Function can be used for multiple instances
//instead of writing multiple code segments we can minimize the codes by writing a common validator that can be used at any place


//This function will fill the data into select (dropdowns)
//This function has three arguments
//1) elementID -> ID of the select (dropdown)
//2) message -> default Selected Option text
//3) dataList -> option values in an array
//This function is called using window.load event handler
//civilStatusDataList = [{id:1,name:'Single'},{id:2,name:'Married'},{id:3,name:'Divorced'}]
//Example -> fillSelectOptions(civilStatus,'Please Select Your Civil Status',civilStatusDataList);
const fillSelectOptions = (elementID, message, dataList,displayProperty,selectedValue) => {
    const selectElement = elementID;
    selectElement.innerHTML = '';
    if (message !== '') {
        const optionDefault = document.createElement('option');
        optionDefault.innerText = message;
        optionDefault.value = '';
        optionDefault.selected = true;
        optionDefault.disabled = true;
        selectElement.appendChild(optionDefault);
    }

    dataList.forEach(ob => {
        const option = document.createElement('option');
        option.innerText = ob[displayProperty];
        //converting JavaScript values to JSON strings
        option.value = JSON.stringify(ob);
        if(selectedValue==ob[displayProperty]){
            option.selected = "selected";
        }
        selectElement.appendChild(option);
    })


}
//This function will get the data from the database
//This function has only one argument
//1) url -> java mapping (service url)
//This function will return the data as an array

//Example -> ajaxGetRequest("/employee/findall")
const ajaxGetRequest = (url) =>{

    let Response;
    $.ajax(url, {
        async: false,
        type: "Get",
        contentType: "json",
        success: function (data) {
            console.log(data);
            Response = data;
        },
        error: function (resOb) {
            alert("error" + resOb);
            Response = [];
        }

    });
    return Response;

}


//test code to show all the followups when an inquiry object is given
//need to implement a backend service (to get followup details when an inquiry is given)
//need to ask
const showFollowupCard =()=>{
    // Create the main div with the card class and rounded-0 and mb-2 classes
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card rounded-0 mb-2';

    // Create the card body div with rounded-0 class
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body rounded-0';

    // Create the row div
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

}

window.addEventListener("load",()=>{

    const courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(schedulesCourse,' ',courses,'name');
    $("#schedulesCourse").chosen({width: '25%'});

    //get all the active batches (batches that can be used to register student) from the database
    const activeBatches = ajaxGetRequest("/Schedules/activeBatches")

    displayPropertyListForBatches = [{property: getCourseName, dataType: 'function'}, {
        property: 'batchCode', dataType: 'text'
    }, {property: 'commenceDate', dataType: 'text'}, {property: 'endDate', dataType: 'text'}, {
        property: getWeekDay, dataType: 'function'
    }, {property: 'seatCount', dataType: 'text'}, {property: 'description', dataType: 'text'},];

    fillDataIntoTableWithOutAction(tblBatches, activeBatches, displayPropertyListForBatches);

    $('#tblBatches').DataTable();

});
//since we cant access the Course Name from the batches directly. creating a function to return the Course Name from the batches object
const getCourseName = (ob) => {
    return ob.courseID.name;
}

//since the isWeekday data type is in boolean we cant show true or false in the table
//creating a function to return Weekday and Not Weekday based on their value
const getWeekDay = (ob) => {
    if (ob.isWeekday) {
        return "Weekday";
    } else {
        return "Weekend";
    }

}


const logout = ()=>{
    showCustomConfirm("<strong class='text-lowercase'>"+btnProfileName.innerText+"</strong><br/>You are About to Logout from the System<br><br> are you sure?",function (result){

        if(result){
            window.location.assign("/logout");
        }
        else{

        }

    });
}
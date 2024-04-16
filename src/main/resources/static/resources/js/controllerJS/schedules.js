window.addEventListener("load",()=>{

    const courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(schedulesCourse,' ',courses,'name');
    $("#schedulesCourse").chosen({width: '25%'});

    refreshSchedulesTable();

});
//since we cant access the Course Name from the batches directly. creating a function to return the Course Name from the batches object
const getCourseCode = (ob) => {
    return ob.courseID.code;
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

const refreshSchedulesTable=()=>{
    //get all the active batches (batches that can be used to register student) from the database
    const activeBatches = ajaxGetRequest("/Schedules/activeBatches")

    displayPropertyListForBatches = [
        {property: getCourseCode, dataType: 'function'},
        {property: 'batchCode', dataType: 'text'},
        {property: 'description', dataType: 'text'},
        {property: 'commenceDate', dataType: 'text'},
        {property: 'endDate', dataType: 'text'},
        {property: getWeekDay, dataType: 'function'},
        {property: 'seatCount', dataType: 'text'},
        {property: 'seatCount', dataType: 'text'},
        {property: 'seatCount', dataType: 'text'},
    ];

    fillDataIntoTableWithOutAction(tblBatches, activeBatches, displayPropertyListForBatches);

    $('#tblBatches').DataTable();
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
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

const getPayment = (ob)=>{

    return "Rs. "+ob.paymentPlanID.totalFee.toLocaleString('en-US', {minimumFractionDigits: 2}, {maximumFractionDigits: 2});
}

const getSchedule = (ob)=>{

    schduleString = '';
    ob.batchHasDayList.forEach((schedule)=>{
        schduleString += schedule.dayID.name + " [" + schedule.startTime.slice(0, -3) + " - " + schedule.endTime.slice(0, -3) + "]<br>";
    });
    return schduleString;
}

const refreshSchedulesTable=()=>{
    //get all the active batches (batches that can be used to register student) from the database
    const activeBatches = ajaxGetRequest("/Schedules/activeBatches")

    displayPropertyListForBatches = [
        {property: getCourseCode, dataType: 'function'},
        {property: 'batchCode', dataType: 'text'},
        {property: 'description', dataType: 'text'},
        {property: 'commenceDate', dataType: 'text'},
        {property: 'lastRegDate', dataType: 'text'},
        {property: getWeekDay, dataType: 'function'},
        {property: getPayment, dataType: 'function'},
        {property: getSchedule, dataType: 'function'},
        {property: 'seatCountAvailable', dataType: 'text'},
    ];

    fillDataIntoTableWithOutAction(tblBatches, activeBatches, displayPropertyListForBatches);

    if(activeBatches.length>0){
        $('#tblBatches').DataTable();
    }


}


const scheduleSearch = ()=>{
    const searchInput = JSON.parse(schedulesCourse.value);
    const courseID = searchInput.id;
    console.log(courseID)
    if(courseID!=null) {
        const results = ajaxGetRequest("/Schedules/activeBatches/" + courseID);
        fillDataIntoTableWithOutAction(tblBatches, results, displayPropertyListForBatches);
        $('#tblBatches').DataTable();
    }


}

const scheduleSearchReset = ()=>{
    //set default option chosen
    setTimeout(function () {
        $('#schedulesCourse').val('').trigger('chosen:updated');
    }, 0);
    refreshSchedulesTable();
}
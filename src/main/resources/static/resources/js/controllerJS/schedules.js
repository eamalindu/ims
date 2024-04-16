window.addEventListener("load",()=>{

    const courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(schedulesCourse,' ',courses,'name');
    $("#schedulesCourse").chosen({width: '25%'});

    //get all the active batches (batches that can be used to register student) from the database
    const activeBatches = ajaxGetRequest("/Schedules/")

});


const logout = ()=>{
    showCustomConfirm("<strong class='text-lowercase'>"+btnProfileName.innerText+"</strong><br/>You are About to Logout from the System<br><br> are you sure?",function (result){

        if(result){
            window.location.assign("/logout");
        }
        else{

        }

    });
}
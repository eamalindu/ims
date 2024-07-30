window.addEventListener('load',()=>{
    refreshCommissionRateTable();
    resetCommissionRateForm();

});

const  refreshCommissionRateTable = ()=>{

    const commissionRates = ajaxGetRequest("/CommissionRate/findAll");
    const displayPropertyListForCommissionRate = [
        {property:getCourseName,dataType:'function'},
        {property:'fullPaymentRate',dataType:'text'},
        {property:'partPaymentRate',dataType:'text'},
        {property:'timestamp',dataType:'text'},
        {property:'addedBy',dataType:'text'},
    ];
    fillDataIntoTable(tblCommissionRate,commissionRates,displayPropertyListForCommissionRate,rowView,'offCanvasCommissionRate');

    if(commissionRates.length!==0){
        $('#tblCommissionRate').DataTable();
    }

}

const resetCommissionRateForm = ()=>{

}

const getCourseName = (ob)=>{
return ob.courseID.name;
}

const rowView = (ob)=>{

}
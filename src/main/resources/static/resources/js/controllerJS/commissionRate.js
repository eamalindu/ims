window.addEventListener('load',()=>{
    refreshCommissionRateTable();
    resetCommissionRateForm();

});

const  refreshCommissionRateTable = ()=>{

    const commissionRates = ajaxGetRequest("/CommissionRate/findAll");
    const displayPropertyListForCommissionRate = [
        {property:getCourseName,dataType:'function'},
        {property:getFullPaymentRate,dataType:'function'},
        {property:getPartPaymentRate,dataType:'function'},
        {property:getTimeStamp,dataType:'function'},
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

const getTimeStamp = (ob)=>{
    return ob.timestamp.replace("T"," ");
}

const getFullPaymentRate = (ob)=>{
    return "Rs. "+ob.fullPaymentRate.toLocaleString('en-US',{minimumFractionDigits: 2});
}

const getPartPaymentRate = (ob)=>{
    return "Rs. "+ob.partPaymentRate.toLocaleString('en-US',{minimumFractionDigits: 2});
}

const rowView = (ob)=>{

}
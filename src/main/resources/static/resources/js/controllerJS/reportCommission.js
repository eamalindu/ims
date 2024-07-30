window.addEventListener('load',()=> {
    resetReportSearchBar();
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    generateCommissionReport(startDate,endDate);

});


const resetReportSearchBar = ()=>{
    var start = moment().startOf('month');
    var end = moment().endOf('month');

    function cb(start, end) {
        $('#commissionSearchDateRange span').html(start.format('YYYY-MMMM-DD') + ' - ' + end.format('YYYY-MMMM-DD'));
    }

    $('#commissionSearchDateRange').daterangepicker({
        startDate: start, endDate: end, locale: {
            "format": "YYYY-MM-DD",
        }, ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
        }
    }, cb);

    cb(start, end);
}

const generateCommissionReport = (startDate,endDate)=>{
    let commissionTotal = 0;
    const commissions = ajaxGetRequest("/Commission/getCommissionByDateRangeAndPaidTo/"+startDate+"/"+endDate);
    commissions.forEach(commission => {
        commissionTotal += commission.amount;
    });
    commissionTotalText.innerText = "Rs. "+commissionTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    const displayListForCommission = [
        {property: getRegNumber,dataType:'function'},
        {property: getCourse,dataType:'function'},
        {property: getStudent,dataType: 'function'},
        {property: getPaymentMode,dataType: 'function'},
        {property: getAmount,dataType: 'function'},
        {property: getDate,dataType: 'function'},
        {property: getInquiryID,dataType: 'function'},
    ];

    fillDataIntoTableWithOutAction(tblReportCommission,commissions,displayListForCommission);
}

const getRegNumber = (ob)=>{
    return ob.registrationID.registrationNumber;
}

const getCourse = (ob)=>{
    return ob.registrationID.courseID.name;
}
const getStudent = (ob)=>{
    return ob.registrationID.studentID.nameWithInitials;
}
const getPaymentMode = (ob)=>{
    if(ob.isFullPayment){
        return "Full Payment";
    }
    else{
        return "Part Payment"
    }
}

const getAmount = (ob)=>{
    return "Rs. "+ ob.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

const getDate = (ob)=>{
    const [addedDate, addedTime] = ob.timestamp.split("T");
    return addedDate + '<br/><small class="text-muted">' + addedTime + '</small>';
}

const getInquiryID=(ob)=>{
    return ajaxGetRequest("/Inquiry/getInquiryNumberByID/" + ob.inquiryID).inquiryNumber;
}

const getReport = ()=>{
    const [startDate,endDate] = commissionSearchDateRange.value.split(' - ');
    generateCommissionReport(startDate,endDate);
}

const exportData = ()=>{
    showCustomConfirm('You are about to export <span class="text-purple">Commission Report</span> data to an Excel spreadsheet<br><br>Are You Sure?',function (result){
        if(result){

        }
    });
}
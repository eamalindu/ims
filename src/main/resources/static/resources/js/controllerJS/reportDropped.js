window.addEventListener('load',()=> {
    resetReportSearchBar();
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    refreshReportDroppedTable(startDate,endDate);

});

const refreshReportDroppedTable = (startDate,endDate) =>{

    const droppedInquiries = ajaxGetRequest("/Inquiry/getAllInquiriesByDateRangeAndStatus/"+startDate+"/"+endDate+"/"+3);

    const  displayPropertyListForReportDropped = [
        {property: 'inquiryNumber',dataType:'text'},
        {property: getSourceName,dataType: 'function'},
        {property: getCourseName,dataType: 'function'},
        {property: getFullName,dataType: 'function'},
        {property: 'primaryMobileNumber',dataType: 'text'},
        {property: 'addedBy',dataType: 'text'},
        {property: getInquiryStatus,dataType: 'function'},
    ];

    fillDataIntoTableWithOutAction(tblReportsDropped,droppedInquiries,displayPropertyListForReportDropped);

}

const getSourceName=(ob)=>{
    return ob.sourceId.name;

}

const getCourseName=(ob)=>{
    return ob.courseId.code;
}

const getFullName = (ob) => {
    return ob.firstName + " " + ob.lastName;
}

const getInquiryStatus = (ob)=>{

    return ob.inquiryStatusId.name;
}

const resetReportSearchBar = ()=>{
    var start = moment().startOf('month');
    var end = moment().endOf('month');

    function cb(start, end) {
        $('#droppedInquirySearchDateRange span').html(start.format('YYYY-MMMM-DD') + ' - ' + end.format('YYYY-MMMM-DD'));
    }

    $('#droppedInquirySearchDateRange').daterangepicker({
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

const getReport = ()=>{
    const [startDate,endDate] = droppedInquirySearchDateRange.value.split(' - ');
    refreshReportDroppedTable(startDate,endDate);
}

const exportData = ()=>{
    showCustomConfirm('You are about to export <span class="text-purple">Dropped Inquires</span> data to an Excel spreadsheet<br><br>Are You Sure?',function (result){
        if(result){

        }
    });
}
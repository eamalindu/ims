window.addEventListener('load', () => {
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    resetAdminSearchBar(startDate,endDate);
    generateAdminChart(startDate,endDate);
    refreshCommissionTable(startDate,endDate)

})



const resetAdminSearchBar = () => {
    var start = moment().startOf('month');
    var end = moment().endOf('month');

    function cb(start, end) {
        $('#commissionAdminSearchDateRange span').html(start.format('YYYY-MMMM-DD') + ' - ' + end.format('YYYY-MMMM-DD'));
    }

    $('#commissionAdminSearchDateRange').daterangepicker({
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

const generateAdminChart = (startDate ,endDate)=>{
    const counsellors = ajaxGetRequest("/Inquiry/getCounsellors/" + startDate + "/" + endDate);
    let commissions = [];
    let chartData = [];
    counsellors.forEach(counsellor => {
        let commissionTotal = 0;
        let commissions = ajaxGetRequest("/Commission/getCommissionByDateRangeAndCounsellor/"+startDate+"/"+endDate+"/"+counsellor);
        commissions.forEach(commission => {
            commissionTotal += commission.amount;
        });
        chartData.push({name: counsellor, y: commissionTotal});
    });

    console.log(chartData)
    generateChart(chartCommission,'',counsellors,'Amount (Rs.)',[{name:'counsellor',data:chartData,color: {
            linearGradient: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 1
            },
            stops: [
                [0, '#f1c9ec'],
                [1, '#ab84cb']
            ]
        }}]);
}

const getCommission = ()=>{
    const [startDate,endDate] = commissionAdminSearchDateRange.value.split(' - ');
    generateAdminChart(startDate,endDate);
    refreshCommissionTable(startDate,endDate)
}

const refreshCommissionTable=(startDate,endDate)=>{
    const commissions = ajaxGetRequest("/Commission/getCommissionByDateRange/"+startDate+"/"+endDate);

    const displayListForCommission = [
        {property: getRegNumber,dataType:'function'},
        {property: getCourse,dataType:'function'},
        {property: getStudent,dataType: 'function'},
        {property: getPaymentMode,dataType: 'function'},
        {property: getAmount,dataType: 'function'},
        {property: 'paidTo',dataType: 'text'},
        {property: getDate,dataType: 'function'},
        {property: getInquiryID,dataType: 'function'},
    ];

    fillDataIntoTableWithOutAction(tblCommission,commissions,displayListForCommission);

    if(commissions.length!==0){
        $('#tblCommission').dataTable();
    }
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
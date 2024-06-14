window.addEventListener('load',()=>{
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    generatePerformanceChart(startDate,endDate);
    resetSearchBar();
    let commissionTotal = 0;
    const commissions = ajaxGetRequest("/Commission/getCommissionByDateRangeAndPaidTo/"+startDate+"/"+endDate);
    commissions.forEach(commission => {
        commissionTotal += commission.amount;
    });
    commissionTotalText.innerText = "Rs. "+commissionTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
})


const generatePerformanceChart = (startDate,endDate)=>{

    const inquiryStatus = ajaxGetRequest("/InquiryStatus/findall");
    let inquiryStatusNames = [];
    let inquiryCount = [];
    inquiryStatus.forEach(inquiry => {
        inquiryStatusNames.push(inquiry.name);
        inquiryCount.push(ajaxGetRequest("/Inquiry/getInquiryByDateRangeAndStatus/"+startDate+"/"+endDate+"/"+inquiry.name).length);
    })
    console.log(inquiryStatusNames);
    console.log(inquiryCount);

    generateChart(chartPerformance,'',inquiryStatusNames,'Inquiries',[{name:'Inquiry Count',data:inquiryCount,color:'#553772'}]);

    counsellorName.innerText = loggedInEmpName.innerText;

    newInquiryCount.innerText = inquiryCount[0]
    processingCount.innerText = inquiryCount[1]
    registeredCount.innerText = inquiryCount[2]
    droppedCount.innerText = inquiryCount[3]
    completedCount.innerText = inquiryCount[4]

    //calculating total count of inquiries
    let totalInquiryCount = 0;
    inquiryCount.forEach(count => {
        totalInquiryCount += count;
    });
    totalCount.innerText = totalInquiryCount;

    //calculate conversion rate
    conversionRate.innerText = ((inquiryCount[4]/totalInquiryCount)*100).toFixed(2)+'%';


}

const resetSearchBar = ()=>{
    var start = moment();
    var end = moment();

    function cb(start, end) {
        $('#registrationSearchDateRange span').html(start.format('YYYY-MMMM-DD') + ' - ' + end.format('YYYY-MMMM-DD'));
    }

    $('#registrationSearchDateRange').daterangepicker({
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
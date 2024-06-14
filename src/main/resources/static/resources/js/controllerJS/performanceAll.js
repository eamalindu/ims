window.addEventListener('load',()=>{
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    generateAdminChart(startDate,endDate);
    resetAdminSearchBar();

})

const resetAdminSearchBar = ()=>{
    var start = moment().startOf('month');
    var end = moment().endOf('month');

    function cb(start, end) {
        $('#performanceAdminSearchDateRange span').html(start.format('YYYY-MMMM-DD') + ' - ' + end.format('YYYY-MMMM-DD'));
    }

    $('#performanceAdminSearchDateRange').daterangepicker({
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

const generateAdminChart = (startDate,endDate)=>{
    const counsellors = ajaxGetRequest("/Inquiry/getCounsellors/"+startDate+"/"+endDate);
    const inquiryStatus = ajaxGetRequest("/InquiryStatus/findall");
    let inquiryStatusNames = [];
    let inquiryCount = [];
}
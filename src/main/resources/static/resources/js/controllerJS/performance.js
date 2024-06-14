window.addEventListener('load',()=>{
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    generatePerformanceChart(startDate,endDate);
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

}
window.addEventListener('load',()=>{
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    let commissionTotal = 0;
    const commissions = ajaxGetRequest("/Commission/getCommissionByDateRangeAndPaidTo/"+startDate+"/"+endDate);
    commissions.forEach(commission => {
        commissionTotal += commission.amount;
    });
    commissionTotalText.innerText = "Rs. "+commissionTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
})
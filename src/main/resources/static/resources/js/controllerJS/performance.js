window.addEventListener('load',()=>{
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    const commissions = ajaxGetRequest("/Commission/getCommissionByDateRangeAndPaidTo/"+startDate+"/"+endDate);
})
window.addEventListener('load', () => {
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    generateAdminChart(startDate, endDate);
    generateTopCoursesChart(startDate,endDate);
    generateTopSourcesChart(startDate,endDate);
    resetAdminSearchBar();
    performanceTitle.innerHTML ='The following charts are based on Inquiry data collected from '+startDate+' to '+endDate;

})

const resetAdminSearchBar = () => {
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

const generateAdminChart = (startDate, endDate) => {
    const counsellors = ajaxGetRequest("/Inquiry/getCounsellors/" + startDate + "/" + endDate);
    const inquiryStatus = ajaxGetRequest("/InquiryStatus/findall");
    let inquiryStatusNames = [];
    let chartData = [];
    const purpleShades = ['#7d3ac1', '#af4bce', '#db4cb2', '#eb548c', '#ea7369','#f0a58f', '#fceae6', '#DDA0DD', '#EE82EE', '#FF00FF',];

    counsellors.forEach((counsellor, index) => {
        inquiryCount = [];
        inquiryStatus.forEach(inquiry => {
            inquiryStatusNames.push(inquiry.name);
            inquiryCount.push(ajaxGetRequest("/Inquiry/getInquiryByDateRangeAndStatusAndAddedBy/" + startDate + "/" + endDate + "/" + inquiry.name + "/" + counsellor).length);
        })

        // Get color from the array, cycling through the array if there are more counselors than colors
        let color = purpleShades[index % purpleShades.length];

        chartData.push({name: counsellor, data: inquiryCount, color: color});
    });
    generateChart(chartPerformance, '', inquiryStatusNames, 'Inquiries', chartData);

    // refill the table data
    const tbody = tblPerformance.children[1];
    tbody.innerHTML = '';
    if(chartData.length!==0) {
        chartData.forEach(item => {
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdRate = document.createElement('td');
            const tdTotal = document.createElement('td');
            const tdNewInquiry = document.createElement('td');
            const tdProcessing = document.createElement('td');
            const tdRegistered = document.createElement('td');
            const tdDropped = document.createElement('td');
            const tdCompleted = document.createElement('td');

            //setting data for TDs
            tdName.innerText = item.name;

            let totalInquiryCount = 0;
            item.data.forEach(count => {
                totalInquiryCount += count;
            });

            //calculate conversion rate
            if (totalInquiryCount > 0) {
                tdRate.innerText = ((item.data[4] / totalInquiryCount) * 100).toFixed(2) + '%';
            } else {
                tdRate.innerText = '0%';
            }

            tdTotal.innerText = totalInquiryCount;
            tdNewInquiry.innerText = item.data[0]
            tdProcessing.innerText = item.data[1]
            tdRegistered.innerText = item.data[2]
            tdDropped.innerText = item.data[3]
            tdCompleted.innerText = item.data[4]

            //append data
            tr.appendChild(tdName);
            tr.appendChild(tdRate);
            tr.appendChild(tdTotal);
            tr.appendChild(tdNewInquiry);
            tr.appendChild(tdProcessing);
            tr.appendChild(tdRegistered);
            tr.appendChild(tdDropped);
            tr.appendChild(tdCompleted);


            //append the tr to tbody
            tbody.appendChild(tr);
        })
    }
    else{
        const tableTR = document.createElement('tr');
        const  tableTD = document.createElement('td');
        tableTD.colSpan = 8;
        tableTD.innerText = 'No Records Found!';
        tableTR.appendChild(tableTD)
        tbody.appendChild(tableTR);
    }
}

const generateTopCoursesChart = (startDate,endDate)=>{
    const courses = ajaxGetRequest("/course/findall");
    let courseNames = [];
    let inquiryCount = [];

    courses.forEach(course=>{
        courseNames.push(course.code)
        inquiryCount.push(ajaxGetRequest("/Inquiry/getInquiriesByDateRangeAndCourse/"+startDate+"/"+endDate+"/"+course.id).length)
    })

    generateChart(chartCourses,'',courseNames,'Inquiries', [{name: 'Inquiry Count',data: inquiryCount,color: '#1De4bd'}])

}

const generateTopSourcesChart = (startDate,endDate)=>{
    const sources = ajaxGetRequest("/source/findall")
    let charData = [];

    sources.forEach(source=>{
        charData.push({name:source.name,y:ajaxGetRequest("/Inquiry/getInquiriesByDateRangeAndSource/"+startDate+"/"+endDate+"/"+source.id).length})
    })

    const series = [
        { name: 'Resource 1', y: 100 },
        { name: 'Resource 2', y: 150 },
        { name: 'Resource 3', y: 200 },
        { name: 'Resource 4', y: 50 },
        { name: 'Resource 5', y: 75 }
    ];

    generateMonochromePieChart(chartSources, '','Inquiry Count', charData);


}

const getAdminPerformance = ()=>{
    const [startDate,endDate] = performanceAdminSearchDateRange.value.split(' - ');
    generateAdminChart(startDate, endDate);
    generateTopCoursesChart(startDate,endDate);
    generateTopSourcesChart(startDate,endDate);
    performanceTitle.innerHTML ='The following charts are based on Inquiry data collected from '+startDate+' to '+endDate;
}
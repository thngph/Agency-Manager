let xuathangUrl="/api/PhieuXuatHang/" //Lấy số tiền nợ sau mỗi phiếu xuất
let dailyUrl="/api/DaiLy/" //Lấy mã đại lý

async function GetData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        });
        const exam = await response.json();
        return exam;
    } catch (error) {
        console.error(error);
    }
}
async function start() {
    let dailyData=await GetData(dailyUrl);
    let xuathangData=await GetData(xuathangUrl);
    const month=document.querySelector("#month").value
    const year=document.querySelector("#year").value
    handleData(dailyData,xuathangData,month,year)
}
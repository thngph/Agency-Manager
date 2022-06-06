let xuathangUrl="/api/PhieuXuatHang/"
let dailyUrl="/api/DaiLy/"

async function fetchData(url) {
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
    let dailyData=await fetchData(dailyUrl);
    let xuathangData=await fetchData(xuathangUrl);
    const month=document.querySelector("#month").value
    const year=document.querySelector("#year").value

    handleData(dailyData,xuathangData,month,year)
}
function LayThang(date)
{
    var arr = date.split("-")
    return parseInt(arr[1]);
}
function LayNam(date)
{
    var arr = date.split("-")
    return parseInt(arr[0]);
}
function KiemTraNgayTiepNhan(thangbaocao,nambaocao, thangtiepnhan,namtiepnhan)
{
    if(thangtiepnhan>thangbaocao && namtiepnhan >= nambaocao)
        return false
    return true
}
function KiemTraThangLapPhieu(thangbaocao,nambaocao,thanglapphieu,namlapphieu)
{
    if(thanglapphieu==thangbaocao && namlapphieu==nambaocao)
        return true
    return false
}
function handleData(dailyData,xuathangData,month,year)
{
    console.log("Tháng báo cáo: "+month)
    let lengthDaiLy=dailyData.length;
    let lengthXuatHang=xuathangData.length;
    let doanhthutatca=0
    var Chitietphieunhap = 
    {
        madaily : "",
        sophieuxuat : "",
        tonggiatri : "",
        tile : ""
    };
    for(let i=0; i<lengthDaiLy; i++)
    {   
        if(KiemTraNgayTiepNhan(month,year,LayThang(dailyData[i].NgayTiepNhan), LayNam(dailyData[i].NgayTiepNhan))==true)
        {
            let doanhthudaili=0
            let sophieuXuat=0
            for(let j=0; j<lengthXuatHang; j++)
            {
                if(xuathangData[j].MaDaiLy==dailyData[i].MaDaiLy)
                {
                    if(KiemTraThangLapPhieu(month,year,LayThang(xuathangData[j].NgayXuat), LayNam(xuathangData[j].NgayXuat))==true)
                    {
                        {
                            doanhthudaili=doanhthudaili+xuathangData[j].TongTien;
                            sophieuXuat++;
                        }   
                    }
                }
            }
            doanhthutatca=doanhthutatca+doanhthudaili
            // Thêm thuộc tính
            Chitietphieunhap.madaily[i]=dailyData[i]
            console.log(`số ${dailyData[i].MaDaiLy} với ${sophieuXuat} phiếu ${doanhthudaili}`)
        }
    }
    console.log(doanhthutatca)
}
const btn=document.querySelector("#myBtn")
btn.onclick = function()
{
    start()
}
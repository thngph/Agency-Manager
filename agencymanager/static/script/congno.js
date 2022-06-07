let xuathangUrl="/api/PhieuXuatHang/" //Lấy số tiền nợ sau mỗi phiếu xuất
let dailyUrl="/api/DaiLy/" //Lấy mã đại lý
let phieuthuUrl="/api/PhieuThuTien/"
let congnoUrl="/api/BaoCaoCongNo/"

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
function KiemTraThangLapPhieu(thangbaocao,nambaocao,thanglapphieu,namlapphieu)
{
    if(thanglapphieu==thangbaocao && namlapphieu==nambaocao)
        return true
    return false
}
function KiemTraThangTiepNhan(thangbaocao,nambaocao,thangtiepnhan,namtiepnhan)
{
    if((namtiepnhan>nambaocao)||((thangtiepnhan>thangbaocao)&&(namtiepnhan==nambaocao)))
    {
        return false
    }
    return true;
}
async function start() {
    const month=document.querySelector("#month").value
    const year=document.querySelector("#year").value

    let dailyData=await GetData(dailyUrl);
    let xuathangData=await GetData(xuathangUrl);
    let phieuthuData=await GetData(phieuthuUrl);
    let congnoData=await GetData(congnoUrl);
    xuathangData=xuathangData.filter(function(item)
    {
        return KiemTraThangLapPhieu(month,year,LayThang(item.NgayXuat),LayNam(item.NgayXuat))
    })
    dailyData=dailyData.filter(function(item)
    {
        return KiemTraThangTiepNhan(month,year,LayThang(item.NgayTiepNhan),LayNam(item.NgayTiepNhan))
    })
    phieuthuData=phieuthuData.filter(function(item)
    {
        return KiemTraThangLapPhieu(month,year,LayThang(item.NgayThuTien),LayNam(item.NgayThuTien))
    })
    congnoData=congnoData.filter(function(item)
    {
        if(month==1)
        {
            return KiemTraThangLapPhieu(12,year-1,item.Thang,item.Nam)
        }
        else
        {
            return KiemTraThangLapPhieu(month-1,year,item.Thang,item.Nam)
        }

    })
    console.log(dailyData)
    console.log(xuathangData)
    console.log(phieuthuData)
    console.log(congnoData)

    handleData(dailyData,xuathangData,congnoData,phieuthuData)
}
async function handleData(dailyData,xuathangData,congnoData,phieuthuData)
{
    //lọc theo mã đại lý
    //Nợ đầu= Nợ cuối tháng rồi
    //Phát sinh = Tổng tiền nợ mỗi lần xuất
    //Tiền thu= tổng tiền phiếu thu
    //Nợ cuối= Nợ đầu + Phát sinh - Tiền thu
    let report=[]
    dailyData.forEach(function(daily)
    {
        let nodau=0;
        let phatsinh=0;
        let tienthu=0;
        let nocuoi=0;
        congnothangtruoc=congnoData.filter(function()
        {
            return congnoData.MaDaiLy=daily.MaDaiLy
        })
        if(congnothangtruoc.length==0)
        {
            nodau=0
        }
        else
        {
            nodau=congnothangtruoc.NoCuoi;
        }
        xuathangData.forEach(function(xuathang)
        {
            if(xuathang.MaDaiLy==daily.MaDaiLy)
                phatsinh=phatsinh+xuathang.TienNo
        })
        phieuthuData.forEach(function(phieuthu)
        {
            if(phieuthu.MaDaiLy==daily.MaDaiLy)
            {
                tienthu=tienthu+phieuthu.SoTienThu
            }
        })
        report.push(
            {
                Thang: month,
                Nam: year,
                MaDaiLy: daily.MaDaiLy,
                NoDau: nodau,
                NoCuoi: nocuoi,
                PhatSinh: phatsinh,
            }
        )
    })

}

start()
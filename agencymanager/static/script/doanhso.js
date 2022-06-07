let xuathangUrl="/api/PhieuXuatHang/"
let dailyUrl="/api/DaiLy/"

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
// Example POST method implementation:
async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json();
  }
  
//   postData('https://example.com/answer', { answer: 42 })


async function start() {
    let dailyData=await GetData(dailyUrl);
    let xuathangData=await GetData(xuathangUrl);
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
function renderData(Chitietdoanhso,BaoCaoDoanhSo) 
{
    let doanhso=document.querySelector('#tongdoanhthu')
    console.log(doanhso.value)
    let table = document.querySelector('#detail');
    var htmls = Chitietdoanhso.map(function (item) {
        return `
        <tr>
            <td class="tg-oe15">${item.madaily}</td>
            <td class="tg-oe15">${item.sophieuxuat}</td>
            <td class="tg-oe15">${item.doanhthudaili}</td>
            <td class="tg-oe15">${item.tyle}</td>
         </tr>
        `;
      });
    table.innerHTML = htmls.join('');
    console.log(BaoCaoDoanhSo.TongDoanhSo)
    doanhso.value=BaoCaoDoanhSo.TongDoanhSo
}
function handleData(dailyData,xuathangData,month,year)
{
    console.log("Tháng báo cáo: "+month)
    let lengthDaiLy=dailyData.length;
    let lengthXuatHang=xuathangData.length;
    let doanhthutatca=0
    let Chitietdoanhso =[];

    for(let i=0; i<lengthDaiLy; i++)
    {   
        if(KiemTraNgayTiepNhan(month,year,LayThang(dailyData[i].NgayTiepNhan), LayNam(dailyData[i].NgayTiepNhan))==true)
        {
            let doanhthudaili=0
            let sophieuxuat=0
            for(let j=0; j<lengthXuatHang; j++)
            {
                if(xuathangData[j].MaDaiLy==dailyData[i].MaDaiLy)
                {
                    if(KiemTraThangLapPhieu(month,year,LayThang(xuathangData[j].NgayXuat), LayNam(xuathangData[j].NgayXuat))==true)
                    {
                        {
                            doanhthudaili=doanhthudaili+xuathangData[j].TongTien;
                            sophieuxuat++;
                        }   
                    }
                }
            }
            doanhthutatca=doanhthutatca+doanhthudaili
            // Thêm thuộc tính
            Chitietdoanhso.push({
                madaily : dailyData[i].MaDaiLy,
                sophieuxuat : sophieuxuat,
                doanhthudaili : doanhthudaili,
                tyle : 0
            })
            console.log(`số ${dailyData[i].MaDaiLy} với ${sophieuxuat} phiếu ${doanhthudaili}`)
        }
    }
    Chitietdoanhso.forEach(function(item)
    {
        item.tyle=(item.doanhthudaili/doanhthutatca).toFixed(3)
    })
    let BaoCaoDoanhSo={
        Thang: parseInt(month),
        Nam: parseInt(year),
        TongDoanhSo: doanhthutatca,
    }
    console.log(BaoCaoDoanhSo)
    renderData(Chitietdoanhso,BaoCaoDoanhSo)
}

const btn=document.querySelector("#myBtn")
btn.onclick = function()
{
    start()
}
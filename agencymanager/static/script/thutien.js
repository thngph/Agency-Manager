const dailyUrl="/api/DaiLy/" //Lấy mã đại lý
const phieuthuUrl="/api/PhieuThuTien/" //Lấy danh sách phiếu thu
const quidinhUrl='/api/ThamSo/'//Kiểm tra biến Kiểm tra thu-nợ
const btnSearch=document.querySelector('.icon-search')
const searchInput=document.querySelector('#MaDaiLy')
const successMsg=document.querySelector(".text-success")
const errorMsg=document.querySelector(".text-error")
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
async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': document.querySelector('[name="csrfmiddlewaretoken"]').value,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json();
}
async function renderData(daily)
{
    document.querySelector('#MaDaiLy2').value=daily.MaDaiLy
    document.querySelector('#TenDaiLy').value=daily.TenDaiLy
    document.querySelector('#DiaChi').value=daily.DiaChi
    document.querySelector('#Quan').value="Quận " + daily.MaQuan
    document.querySelector('#Email').value=daily.Email
    document.querySelector('#DienThoai').value=daily.DienThoai
    document.querySelector('#TienNo').innerText=daily.SoTienNo
    document.querySelector('#TienConNo').innerText=daily.SoTienNo
}
async function start()
{
    let dailyData=await GetData(dailyUrl);
    let phieuthuData=await GetData(phieuthuUrl);
    let quidinhData=await GetData(quidinhUrl);
    let dateInput=document.querySelector('#NgayThuTien')
    let moneyInput=document.querySelector('#SoTienThu')
    // console.log(dailyData)
    daily=dailyData.filter(function(item)
    {
        return parseInt(item.MaDaiLy)==parseInt(searchInput.value);
    })
    if(daily.length==0)
    {
        errorMsg.classList.remove('hidden')
    }
    else
    {
        errorMsg.classList.add('hidden')
        dateInput.disabled=false
        dateInput.max=new Date().toISOString().split("T")[0];
        moneyInput.disabled=false
        renderData(daily[0])
    }

}
btnSearch.onclick=function()
{
    start()
}

const dailyUrl="/api/DaiLy/" //Lấy mã đại lý
const phieuthuUrl="/api/PhieuThuTien/" //Lấy danh sách phiếu thu
const quidinhUrl='/api/ThamSo/'//Kiểm tra biến Kiểm tra thu-nợ
const btnSearch=document.querySelector('.icon-search')
const btnSave=document.querySelector('#saveBtn')
const searchInput=document.querySelector('#MaDaiLy')
const successMsg=document.querySelector(".text-success")
const errorMsg=document.querySelector(".text-error")
searchInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      btnSearch.click();
    }
});
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
async function PatchData(url, data,id) {
    // Default options are marked with *
    const response = await fetch(url+id+"/", {
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
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
    document.querySelector('#TienNo').value=parseInt(daily.SoTienNo)
    document.querySelector('#TienConNo').value=parseInt(daily.SoTienNo)
}
async function start()
{
    let dailyData=await GetData(dailyUrl);
    let quidinhData=await GetData(quidinhUrl);
    let check=quidinhData[2].GiaTri;
    let dateInput=document.querySelector('#NgayThuTien')
    let tienthuInput=document.querySelector('#SoTienThu')
    let tiennoInput=document.querySelector('#TienNo')
    let tiennoconlaiInput=document.querySelector('#TienConNo')
    let msgCheckMoney=document.querySelector('.text-check-money')
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
        dateInput.value=new Date().toLocaleDateString('en-ca')
        dateInput.max=new Date().toLocaleDateString('en-ca')
        tienthuInput.disabled=false
        renderData(daily[0])
        tienthuInput.oninput=function()
        {
            successMsg.classList.add('hidden')
            tiennoconlaiInput.value=parseInt(tiennoInput.value)-parseInt(tienthuInput.value)
            if(check==1)
            {
                if(parseInt(tiennoconlaiInput.value)<0)
                {
                    msgCheckMoney.classList.remove('hidden')
                    btnSave.disabled=true
                }
                else
                {
                    msgCheckMoney.classList.add('hidden')
                    btnSave.disabled=false
                }
            }
            else
            {
                btnSave.disabled=false
            }
        }
        btnSave.onclick=function()
        {
            let report=
            {
                MaDaiLy : parseInt(daily[0].MaDaiLy),
                NgayThuTien: dateInput.value,
                SoTienThu: parseInt(tienthuInput.value),
            }
            let sotiennoconlai={SoTienNo: parseInt(tiennoconlaiInput.value)}
            postData(phieuthuUrl,report)
            PatchData(dailyUrl,sotiennoconlai,daily[0].MaDaiLy)
            successMsg.classList.remove('hidden')
            tiennoInput.value=tiennoconlaiInput.value;
            tienthuInput.value=0;
        }
    }
}
btnSearch.onclick=function()
{
    start()
}


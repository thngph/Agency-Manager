let xuathangUrl="/api/PhieuXuatHang/" //Lấy số tiền nợ sau mỗi phiếu xuất
let dailyUrl="/api/DaiLy/" //Lấy mã đại lý
let phieuthuUrl="/api/PhieuThuTien/"
let congnoUrl="/api/BaoCaoCongNo/"
const errorMsg=document.querySelector(".text-error")
const successMsg=document.querySelector(".text-success")

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
async function DelData(url, id) {
    // Default options are marked with *
    const response = await fetch(url+id+"/", {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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
    });
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

function renderData(data)
{
    let table = document.querySelector('#detail');
    var htmls = data.map(function (item) {
        return `
        <tr>
            <td class="tg-oe15">${item.MaDaiLy}</td>
            <td class="tg-oe15">${item.NoDau}</td>
            <td class="tg-oe15">${item.PhatSinh}</td>
            <td class="tg-oe15">${item.NoCuoi}</td>
         </tr>
        `;
      });
    table.innerHTML = htmls.join('');
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
    congnothangtruocData=congnoData.filter(function(item)
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
    congnothangnayData=congnoData.filter(function(item)
    {
        return KiemTraThangLapPhieu(month,year,item.Thang,item.Nam)
    })
    console.log(congnothangnayData)
    // console.log(dailyData)
    // console.log(xuathangData)
    // console.log(phieuthuData)
    // console.log(congnoData)
    if(dailyData.length==0)
    {
        errorMsg.classList.remove('hidden')
        successMsg.classList.add('hidden')
        renderData([])
    }
    else
    {
        errorMsg.classList.add('hidden')
        handleData(dailyData,xuathangData,congnothangtruocData,congnothangnayData,phieuthuData,month,year);
    }
}
async function handleData(dailyData,xuathangData,congnothangtruocData,congnothangnayData,phieuthuData,month,year)
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
        congnothangtruoc=congnothangtruocData.filter(function(item)
        {
            // console.log(daily.MaDaiLy)
            // console.log(item.MaDaiLy)
            return item.MaDaiLy==daily.MaDaiLy
        })
        if(congnothangtruoc.length==0)
        {
            nodau=0
        }
        else
        {
            nodau=congnothangtruoc[0].NoCuoi;
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
                Thang: parseInt(month),
                Nam: parseInt(year),
                MaDaiLy: parseInt(daily.MaDaiLy),
                NoDau: parseInt(nodau),
                NoCuoi: parseInt(nodau+nocuoi+phatsinh-tienthu),
                PhatSinh: parseInt(phatsinh)
            }
        )
    })
    renderData(report)
    if(congnothangnayData.length>0)
    {
        congnothangnayData.forEach(function(item)
        {
            DelData(congnoUrl,parseInt(item.MaBaoCaoCongNo))
        })
        report.forEach(function(item)
        {
            postData(congnoUrl,item)
        })
    }
    else
    {
        report.forEach(function(item)
        {
            postData(congnoUrl,item)
        })
    }
    successMsg.classList.remove("hidden")
}
const btn=document.querySelector("#myBtn")
const monthInput=document.querySelector("#month")
const yearInput=document.querySelector("#year")
const today = new Date();
const yearNow=today.getFullYear() 
const monthNow=today.getMonth()+1
monthInput.value=monthNow;
yearInput.value=yearNow
monthInput.oninput=function()
{
    if((monthInput.value<=monthNow && yearInput.value==yearNow)||yearInput.value<yearNow)
    {
        btn.disabled=false;
    }
    else
    {
        btn.disabled=true
    }
}
yearInput.oninput=function()
{
    if((monthInput.value<=monthNow && yearInput.value==yearNow)||(yearInput.value<yearNow))
    {
        btn.disabled=false;
    }
    else
    {
        btn.disabled=true
    }
}
btn.onclick = function()
{
    start()
}
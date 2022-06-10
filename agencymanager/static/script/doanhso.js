let xuathangUrl="/api/PhieuXuatHang/"
let dailyUrl="/api/DaiLy/"
let DSUrl='/api/BaoCaoDoanhSo/'
let CTDSUrl='/api/ChiTietBaoCaoDoanhSo/'
const errorMsg=document.querySelector(".text-error")
const successMsg=document.querySelector(".text-success")
const resultMoneyInput=document.querySelector(".result-money-item")
const resultTitle=document.querySelector(".result-title")
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
//   postData('https://example.com/answer', { answer: 42 })
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
    if((namtiepnhan>nambaocao)||((thangtiepnhan>thangbaocao)&&(namtiepnhan==nambaocao)))
    {
        return false
    }
    return true;
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
    let table = document.querySelector('#detail');
    var htmls = Chitietdoanhso.map(function (item) {
        return `
        <tr>
            <td class="tg-oe15">${item.MaDaiLy}</td>
            <td class="tg-oe15">${item.SoPhieuXuat}</td>
            <td class="tg-oe15">${item.TongGiaTri}</td>
            <td class="tg-oe15">${item.TiLe}</td>
         </tr>
        `;
      });
    table.innerHTML = htmls.join('');
    resultMoneyInput.innerHTML=`<span>Tổng doanh thu: ${BaoCaoDoanhSo.TongDoanhSo} VND </span>`
    resultTitle.innerText=`BÁO CÁO DOANH SỐ THÁNG ${BaoCaoDoanhSo.Thang}-${BaoCaoDoanhSo.Nam}`

    let labels = Chitietdoanhso.map(item => item.MaDaiLy);
    let colors= []
    let mydata = Chitietdoanhso.map(item => item.TiLe);
    console.log(labels)
    for(let i=0;i<Chitietdoanhso.length;i++){
          colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    }
    
      let data = {
        labels: labels,
        datasets: [{
            
          data: mydata,
          
          label: "`BÁO CÁO DOANH SỐ THÁNG ${BaoCaoDoanhSo.Thang}-${BaoCaoDoanhSo.Nam}`",
          backgroundColor: colors,
        }]
      };
    
      let config = {
        type: 'doughnut',
        data: data, 
        options: {
           plugins: {
        }
        }
      };
      let myChart = new Chart(
        document.getElementById('myChart'),
        config);

}
async function start() {
    let dailyData=await GetData(dailyUrl);
    let xuathangData=await GetData(xuathangUrl);
    const month=document.querySelector("#month").value
    const year=document.querySelector("#year").value
    dailyData=dailyData.filter(function(item)
    {
        return KiemTraNgayTiepNhan(month,year,LayThang(item.NgayTiepNhan), LayNam(item.NgayTiepNhan))
    })
    let baocaoData=await GetData(DSUrl)
    let baocaothangnay= baocaoData.filter(function(item)
    {
        return KiemTraThangLapPhieu(month,year,item.Thang,item.Nam)
    })
    if(dailyData.length>0)
    {
        handleData(dailyData,xuathangData,month,year,baocaothangnay)
    }
    else
    {
        errorMsg.classList.remove('hidden')
        successMsg.classList.add('hidden')
        renderData([])
    }
}
async function handleData(dailyData,xuathangData,month,year,baocaothangnay)
{
    let lengthDaiLy=dailyData.length;
    let lengthXuatHang=xuathangData.length;
    let doanhthutatca=0;
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
                MaDaiLy : parseInt(dailyData[i].MaDaiLy),
                SoPhieuXuat : parseInt(sophieuxuat),
                TongGiaTri : parseInt(doanhthudaili),
                TiLe : 0
            })
        }
    }
    Chitietdoanhso.forEach(function(item)
    {
        item.TiLe=(item.TongGiaTri/doanhthutatca).toFixed(3) 
        if (isNaN(item.TiLe)) {
            item.TiLe=0;
        }
    })
    let BaoCaoDoanhSo={    
        Thang: parseInt(month),
        Nam: parseInt(year),
        TongDoanhSo: doanhthutatca,
    }
    renderData(Chitietdoanhso,BaoCaoDoanhSo)
    if(baocaothangnay.length>0)
    {
        baocaothangnay.forEach(function(item)
        {
            DelData(DSUrl,parseInt(item.MaBaoCaoDoanhSo))
        })
        await postData(DSUrl,BaoCaoDoanhSo)
        let DSData=await GetData(DSUrl);
        let BaoCaoCanChon=DSData.filter(function(item)
        {
            return parseInt(item.Thang)==parseInt(month) && parseInt(item.Nam)==parseInt(year);
        })
        Chitietdoanhso.forEach(function(item)
        {
            item.MaBaoCaoDoanhSo=BaoCaoCanChon[0].MaBaoCaoDoanhSo
            postData(CTDSUrl,item)
        })


    }
    else
    {
        await postData(DSUrl,BaoCaoDoanhSo)
        let DSData=await GetData(DSUrl);
        let BaoCaoCanChon=DSData.filter(function(item)
        {
            return parseInt(item.Thang)==parseInt(month) && parseInt(item.Nam)==parseInt(year);
        })
        Chitietdoanhso.forEach(function(item)
        {
            item.MaBaoCaoDoanhSo=BaoCaoCanChon[0].MaBaoCaoDoanhSo
            postData(CTDSUrl,item)
        })
    }
    errorMsg.classList.add('hidden')
    successMsg.classList.remove('hidden')
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
    if (((monthInput.value<=monthNow && yearInput.value==yearNow)||(yearInput.value<yearNow)) &&(monthInput.value>0) && parseInt(monthInput.value)<13 )
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
    if (((monthInput.value<=monthNow && yearInput.value==yearNow)||(yearInput.value<yearNow)) &&(monthInput.value>0) && parseInt(monthInput.value)<13 )
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







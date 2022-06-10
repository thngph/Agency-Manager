const x = document.querySelector("#TenDVT")
const y = document.querySelector("#DVT")
const z = document.querySelector("#DonGia")
const w = document.querySelector("#SoLuongTon")
const mathangInput = document.querySelector("#MatHang")
const soluonginput=document.querySelector("#SoLuong")
const errorMsg=document.querySelector(".text-error")
const successMsg=document.querySelector(".text-success")
const checkmoneyMsg=document.querySelector(".text-check-money")
const tiennoInput=document.querySelector("#TienNo")
const tiennomaxInput=document.querySelector("#TienNoMax")
const saveBtn=document.querySelector(".saveBtn")
const MaPhieuXuatHang=document.querySelector("#MaPhieuXuatHang")

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
async function patchData(url,data,id) {
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
async function start() {
    let data = await fetchData(`http://127.0.0.1:8000/api/MatHang/`);
    let list_to_map = await fetchData(`http://127.0.0.1:8000/api/DVT/`);
    let tigia = await fetchData(`http://127.0.0.1:8000/api/ThamSo/2`)
    mathangInput.oninput=function()
    {
        const dvt = data.filter(item => item.MaMatHang == mathangInput.value)[0];
        const tendvt = list_to_map.filter(item => item.MaDVT == dvt.DVT)[0];
        x.value = tendvt.TenDVT;
        y.value = dvt.DVT;
        z.value = dvt.GiaNhap * parseInt(tigia.GiaTri) / 100;
        w.value = dvt.SoLuongTon;
    }
    const submitbtn = document.getElementById("add")
    soluonginput.oninput=function()
    {
        if((parseInt(soluonginput.value)<=parseInt(w.value))&&parseInt(soluonginput.value)>0)
        {
            errorMsg.classList.add('hidden');
            submitbtn.disabled=false;
        }
        else
        {
            errorMsg.classList.remove('hidden');
            submitbtn.disabled=true;
        }
    }
    const madaily= document.querySelector('#MaDaiLy')
    const tientra= document.querySelector('.money-paid')
    const tongtien=document.querySelector(".money-sum")
    const tiennothem= document.querySelector('.money-remain')
    let daily = await fetchData(`http://127.0.0.1:8000/api/DaiLy/${madaily.value}/`)
    tiennoInput.value=daily.SoTienNo
    const tiennomax = (await fetchData(`http://127.0.0.1:8000/api/LoaiDaiLy/${daily.MaLoaiDaiLy}/`)).SoNoToiDa
    tiennomaxInput.value=tiennomax;
    const tiennohienno=daily.SoTienNo;
    tiennothem.value=parseInt(tongtien.value)-parseInt(tientra.value);
    let tongtienno=0
    tientra.oninput=function()
    {
        tiennothem.value=parseInt(tongtien.value)-parseInt(tientra.value);
        tongtienno=tiennohienno+parseInt(tiennothem.value)
        if((tiennomax<tongtienno))
        {
            successMsg.classList.add('hidden')
            checkmoneyMsg.classList.remove('hidden')
            checkmoneyMsg.innerText=`*Cần trả tối thiểu ${parseInt(tiennohienno)+parseInt(tongtien.value)-parseInt(tiennomax)} để không vượt số nợ tối đa`
            saveBtn.disabled=true
        }
        else if(tientra.value==""||(parseInt(tiennothem.value)<0))
        {
            successMsg.classList.add('hidden')
            checkmoneyMsg.classList.remove('hidden')
            checkmoneyMsg.innerText=`*Nhập tiền không hợp lệ`
            saveBtn.disabled=true
        }
        else
        {
            successMsg.classList.remove('hidden')
            successMsg.innerText=`Có thể lưu phiếu. Số tiền nợ thêm là ${parseInt(tiennothem.value)}`
            checkmoneyMsg.classList.add('hidden')
            saveBtn.disabled=false
            saveBtn.onclick=function()
            {
                patchData('/api/PhieuXuatHang/',{TongTien: parseInt(tongtien.value), TienNo: parseInt(tiennothem.value)},parseInt(MaPhieuXuatHang.value))
                patchData('/api/DaiLy/',{SoTienNo:parseInt(tongtienno)},parseInt(madaily.value))
            }
            
        }
    }
}
start();

const formPost = document.querySelector(".form-post");
saveBtn.addEventListener("click", async function (e) {
    formPost.classList.remove("hidden");});
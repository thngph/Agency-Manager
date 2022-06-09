const dailyUrl="/api/DaiLy/"
const quidinhUrl='/api/ThamSo/'
const successMsg=document.querySelector(".text-success")
const errorMsg=document.querySelector(".text-error")
const btnAdd=document.querySelector('#btn-add')
const districtInput=document.querySelector('#district')
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
async function start()
{
    let dailyData=await GetData(dailyUrl);
    let quidinhData=await GetData(quidinhUrl);
    let check=quidinhData[0].GiaTri;
    districtInput.oninput=function()
    {   
        let dailytrongquan=dailyData.filter(function(item)
        {
            return parseInt(item.MaQuan)==parseInt(districtInput.value)
        })
        if(dailytrongquan.length>=check)
        {
            errorMsg.classList.remove('hidden');
            successMsg.classList.add('hidden');
            btnAdd.disabled=true
            errorMsg.innerText=`Quận ${districtInput.value} không thể tiếp nhận thêm đại lý`
        }
        else
        {
            errorMsg.classList.add('hidden');
            successMsg.classList.remove('hidden');
            btnAdd.disabled=false;
            successMsg.innerText=`Quận đang chứa ${dailytrongquan.length} đại lý, có thể tiếp nhận`
        }
    }
}
start()
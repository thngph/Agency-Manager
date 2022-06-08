let url='/api/ThamSo/'
const numberMax=document.querySelector('#number-max')
const numberUnit=document.querySelector('#number-unit')
const checkDebt=document.querySelector('#checkdebt')
const updateBtn=document.querySelector('#updateBtn')
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
// Example POST method implementation:
async function patchData(url, data, id) {
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
function renderData(data)
{
  let table=document.querySelector('#rule')
  if(parseInt(data[2].GiaTri)==1)
  {
    data[2].GiaTri="True"
  }
  else
  {
    data[2].GiaTri="False"
  }
  let htmls=data.map(function(item)
  {
    return ` <tr>
      <td class="tg-gvcd">${item.TenThamSo}</td>
      <td class="tg-gvcd">${item.GiaTri}</td>
    </tr>`;
  })
  table.innerHTML = htmls.join('');
  numberMax.value=data[0].GiaTri;
  numberUnit.value=data[1].GiaTri;
  if(data[2].GiaTri=="True")
  {
    checkDebt.value=1;
  }
  else
  {
    checkDebt.value=0
  }
}

async function start()
{
  let thamso=await GetData(url)
  renderData(thamso)
  updateBtn.onclick=function()
  {
    thamso[0].GiaTri=parseInt(numberMax.value);
    thamso[1].GiaTri=parseInt(numberUnit.value);
    thamso[2].GiaTri=parseInt(checkDebt.value)
    let id=1;
    thamso.forEach(function(item)
    {
      console.log(thamso[id-1])
      patchData(url,thamso[id-1],id)
      id++
    })
    renderData(thamso)
    successMsg.classList.remove('hidden')
  }
}

start()


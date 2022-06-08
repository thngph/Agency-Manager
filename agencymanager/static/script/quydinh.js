let url='/api/ThamSo/'
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
async function put(url, data) 
{
    // Awaiting fetch which contains method,
    // headers and content-type and body
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
      
    // Awaiting response.json()
    const resData = await response.json();
    // Return response data 
    return resData;
  }

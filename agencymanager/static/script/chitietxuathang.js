function jsFunction(value) {
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
    async function start() {
        let data = await fetchData(`http://127.0.0.1:8000/api/MatHang/`);
        let list_to_map = await fetchData(`http://127.0.0.1:8000/api/DVT/`);
        let tigia = await fetchData(`http://127.0.0.1:8000/api/ThamSo/2`)
        const x = document.querySelector("#TenDVT")
        const y = document.querySelector("#DVT")
        const z = document.querySelector("#DonGia")
        const w = document.querySelector("#SoLuongTon")
        const soluonginput=document.querySelector("#SoLuong")
        const errorMsg=document.querySelector(".text-error")
        const dvt = data.filter(item => item.MaMatHang == value)[0];
        const tendvt = list_to_map.filter(item => item.MaDVT == dvt.DVT)[0];
        x.value = tendvt.TenDVT;
        y.value = dvt.DVT;
        z.value = dvt.GiaNhap * parseInt(tigia.GiaTri) / 100;
        w.value = dvt.SoLuongTon;
        soluonginput.oninput=function()
        {
            if(parseInt(soluonginput.value)>parseInt(w.value))
            {
                errorMsg.classList.remove('hidden')
            }
            else
            {
                errorMsg.classList.add('hidden')
            }
        }
    }
    start();
}
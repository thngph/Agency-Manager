const endpoint = "http://127.0.0.1:8000/api/DaiLy";
const inputDaiLy = document.querySelector("#name");
const inputLoai = document.querySelector("#type");
const inputQuan = document.querySelector("#district");
const btnTraCuu = document.querySelector(".btn-tracuu");
const table = document.querySelector(".table");
const btnSave = document.querySelector("#saveBtn");
const tableChild = document.querySelectorAll(".table-child");
const inputTienNoMin = document.querySelector(".min-money");
const inputTienNoMax = document.querySelector(".max-money");
const formPost = document.querySelector(".form-post");
let updateId = null;
async function getAPI() {
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  return data;
}

async function getSingleDaiLy(id) {
  const response = await fetch(`${endpoint}/${id}/`);
  const data = await response.json();
  return data;
}

async function handleClick() {
  document.querySelectorAll(".table-child").forEach((e) => e.remove());
  const data = await getAPI();

  let newdata1 = [];
  let newdata2 = [];
  let newdata3 = [];
  let newdata4 = [];
  // Loc ma dai ly
  if (inputDaiLy.value != "") {
    newdata1 = data.filter(function (item) {
      return parseInt(item.MaDaiLy) == parseInt(inputDaiLy.value);
    });
  } else {
    newdata1 = data;
  }
  // Loc loai dai ly
  if (inputLoai.value != "0") {
    newdata2 = newdata1.filter(function (item) {
      return parseInt(item.MaLoaiDaiLy) == parseInt(inputLoai.value);
    });
  } else {
    newdata2 = newdata1;
  }
  // Loc quan
  if (inputQuan.value != "0") {
    newdata3 = newdata2.filter(function (item) {
      return parseInt(item.MaQuan) == parseInt(inputQuan.value);
    });
  } else {
    newdata3 = newdata2;
  }
  // Loc so tien no
  if (inputTienNoMin.value != "" && inputTienNoMax.value != "") {
    newdata4 = newdata3.filter(function (item) {
      return (
        parseInt(item.SoTienNo) >= parseInt(inputTienNoMin.value) &&
        parseInt(item.SoTienNo) <= parseInt(inputTienNoMax.value)
      );
    });
  } else {
    newdata4 = newdata3;
  }

  console.log(newData);
  newdata4.map((item) => {
    const template = `
      <tr class="table-child">
      <td class="tg-gvcd">${item.MaDaiLy}</td>
      <!-- Mã Đại Lý -->
      <td class="tg-gvcd">${item.TenDaiLy}</td>
      <!-- Tên Đại Lý -->
      <td class="tg-gvcd">${item.MaLoaiDaiLy}</td>
      <!-- Loại -->
      <td class="tg-gvcd">${item.MaQuan}</td>
      <!-- Quận -->
      <td class="tg-gvcd">${item.DiaChi}</td>
      <!-- Địa chỉ -->
      <td class="tg-gvcd">${item.DienThoai}</td>
      <!-- SĐT -->
      <td class="tg-gvcd">${item.Email}</td>
      <!-- Email -->
      <td class="tg-gvcd">${item.NgayTiepNhan}</td>
      <!-- Ngày tiếp nhận -->
      <td class="tg-gvcd">${item.SoTienNo}</td>
      <!-- Tiền nợ -->
      <td class="tg-gvcd">
      <svg style="width: 36px; display:unset; cursor: pointer;" class="edit-icon" data-id=${item.MaDaiLy}
      xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>

       <svg style="width: 36px; display:unset; cursor: pointer;" class="remove-icon" data-id=${item.MaDaiLy} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
      </td>
      <!-- Thao tác -->
    </tr>
      `;
    table.insertAdjacentHTML("beforeend", template);
  });
}
handleClick();

btnTraCuu.addEventListener("click", handleClick);

// Xử lý Loại đại lý
const type = document.querySelector("#type");
const type2 = document.querySelector("#MaLoaiDaiLy");

async function getAPIType() {
  const response = await fetch("http://127.0.0.1:8000/api/LoaiDaiLy/", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  data.map((item) => {
    const template = `<option value=${item.MaLoaiDaiLy}>${item.TenLoaiDaiLy}</option>`;
    type.insertAdjacentHTML("beforeend", template);
    type2.insertAdjacentHTML("beforeend", template);
  });
}

getAPIType();

// Xử lý Quận

const district = document.querySelector("#district");
const district2 = document.querySelector("#MaQuan");

async function getAPIDistrict() {
  const response = await fetch("http://127.0.0.1:8000/api/Quan/", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  data.map((item) => {
    const template = `<option value=${item.MaQuan}>${item.TenQuan}</option>`;
    district.insertAdjacentHTML("beforeend", template);
    district2.insertAdjacentHTML("beforeend", template);
  });
}

getAPIDistrict();

// Xóa đại lý
async function deleteAPI(id) {
  await fetch(`${endpoint}/${id}/`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": document.querySelector('[name="csrfmiddlewaretoken"]')
        .value,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
}

table.addEventListener("click", async function (e) {
  if (e.target.matches(".remove-icon")) {
    const id = +e.target.dataset.id;
    const result = confirm("Bạn chắc chắn muốn xóa?");
    if (result) await deleteAPI(id);
    await handleClick();
    console.log(id);
  } else if (e.target.matches(".edit-icon")) {
    formPost.classList.remove("hidden");
    const id = +e.target.dataset.id;
    const data = await getSingleDaiLy(id);
    formPost.elements["TenDaiLy"].value = data.TenDaiLy;
    formPost.elements["MaLoaiDaiLy"].value = data.MaLoaiDaiLy;
    formPost.elements["MaQuan"].value = data.MaQuan;
    formPost.elements["DiaChi"].value = data.DiaChi;
    formPost.elements["DienThoai"].value = data.DienThoai;
    formPost.elements["Email"].value = data.Email;
    formPost.elements["NgayTiepNhan"].value = data.NgayTiepNhan;
    formPost.elements["SoTienNo"].value = data.SoTienNo;
    updateId = id;
  }
});

// Chỉnh sửa đại lý

const cancelBtn = document.querySelector(".cancel-button");
cancelBtn.addEventListener("click", () => {
  formPost.classList.add("hidden");
});

formPost.addEventListener("submit", async function (e) {
  e.preventDefault();
  const daily = {
    TenDaiLy: this.elements["TenDaiLy"].value,
    MaLoaiDaiLy: this.elements["MaLoaiDaiLy"].value,
    MaQuan: this.elements["MaQuan"].value,
    DiaChi: this.elements["DiaChi"].value,
    DienThoai: this.elements["DienThoai"].value,
    Email: this.elements["Email"].value,
    NgayTiepNhan: this.elements["NgayTiepNhan"].value,
    SoTienNo: this.elements["SoTienNo"].value,
  };

  if (updateId) await updateDaiLy({ id: updateId, ...daily });
  this.reset();
  await handleClick();
  updateId = null;
  formPost.classList.add("hidden");
});

async function updateDaiLy({
  id,
  TenDaiLy,
  MaLoaiDaiLy,
  MaQuan,
  DiaChi,
  DienThoai,
  Email,
  NgayTiepNhan,
  SoTienNo,
}) {
  await fetch(`${endpoint}/${id}/`, {
    method: "PUT",
    body: JSON.stringify({
      TenDaiLy,
      MaLoaiDaiLy,
      MaQuan,
      DiaChi,
      DienThoai,
      Email,
      NgayTiepNhan,
      SoTienNo,
    }),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": document.querySelector('[name="csrfmiddlewaretoken"]')
        .value,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
}

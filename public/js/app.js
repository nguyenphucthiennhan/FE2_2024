let page = 1;
let perPage = 6;
let products = [];
// show();
loadMore(page, perPage);
const content = document.querySelector(".content");
const bg = document.querySelector(".bg");
const title = document.querySelector("#exampleModalLabel");
const description = document.querySelector(".modal-body");
async function show() {
  products = await getAllProducts();
  products.forEach((e) => {
    content.innerHTML += ` <div class="item">
        <img class="image" onclick="getProductDetails(${e.id})" 
        data-bs-toggle="modal" data-bs-target="#exampleModal" src="public/images/uni.png" alt="">
        <div class="name">${e.name}  
        <div class="btn btn-like btn-danger" onclick="loves(${e.id})">
        <i class="bi bi-heart-fill" id="love${e.id}">${e.loves}</i>
         </div>
         <div class="btn btn-warning">
        <i class="bi bi-eye-fill" id="click${e.id}">${e.clicks}</i>
      </div>
        </div>
      </div>
    </div>`;
  });
  const item = document.querySelectorAll(".item");
  item.forEach((e) => {
    let randomLeft = Math.random() * 100;
    let randomTop = Math.random() * 100;
    let z = Math.random() * 500;
    let bright = 1 - z / 500;
    //  e.style.left = randomLeft < 50 ? `calc(${randomLeft}% + 100px)` : `calc(${randomLeft}% - 100px)`;
    //  e.style.top = randomTop < 50 ? `${randomTop}% ` : `calc(${randomTop}% )`;
    e.style.left = randomLeft + "%";
    e.style.top = randomTop - 5 + "%";
    e.style.transform = `translateZ(${-z}px)`;
    e.style.filter = `brightness(${bright})`;
  });
}
// get all
async function getAllProducts() {
  const url = "app/api/products.php";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
document.querySelector("body").addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  let screenW = window.innerWidth;
  let screenH = window.innerHeight;
  let rotationX = (y - screenH / 2) / 15;
  let rotationY = (screenW / 2 - x) / 30;
  content.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  bg.style.transform = `rotateX(${rotationX / 6}deg) rotateY(${
    rotationY / 6
  }deg)`;
});
// details
async function getProductDetails(id) {
  const url = "app/api/productdetail.php";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      productId: id,
    }),
  });
  const data = await response.json();
  title.textContent = data.name;
  description.innerHTML = data.content;
  clicks(id);
}
// views
async function clicks(id) {
  const url = "app/api/productview.php";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      productId: id,
    }),
  });
  const data = await response.json();
  const clicks = document.querySelector("#click" + id);
  clicks.textContent = data.clicks;
}
// likes
async function loves(id) {
  const url = "app/api/productlike.php";
  // kiểm tra
  const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
  if (likedProducts.includes(id) == false) {
    likedProducts.push(id);
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        productId: id,
      }),
    });
    const data = await response.json();
    const loves = document.querySelector("#love" + id);
    loves.textContent = data.loves;
  }
}
// search
const input = document.querySelector("#search");
input.addEventListener("input", async function () {
  let key = input.value;
  if (key == null) {
    content.innerHTML = "";
    show();
  } else {
    const url = "app/api/productsearch.php";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        keyword: key,
      }),
    });
    const data = await response.json();
    content.innerHTML = "";
    data.forEach((e) => {
      content.innerHTML += ` <div class="item">
         <img class="image" onclick="getProductDetails(${e.id})" 
         data-bs-toggle="modal" data-bs-target="#exampleModal" src="public/images/uni.png" alt="">
         <div class="name">${e.name}  
         <div class="btn btn-like btn-danger" onclick="loves(${e.id})">
         <i class="bi bi-heart-fill" id="love${e.id}">${e.loves}</i>
          </div>
          <div class="btn btn-warning">
         <i class="bi bi-eye-fill" id="click${e.id}">${e.clicks}</i>
       </div>
         </div>
       </div>
     </div>`;
    });
    // random position
    const item = document.querySelectorAll(".item");
    item.forEach((e) => {
      let randomLeft = Math.random() * 100;
      let randomTop = Math.random() * 100;
      let z = Math.random() * 500;
      let bright = 1 - z / 500;
      //  e.style.left = randomLeft < 50 ? `calc(${randomLeft}% + 100px)` : `calc(${randomLeft}% - 100px)`;
      //  e.style.top = randomTop < 50 ? `${randomTop}% ` : `calc(${randomTop}% )`;
      e.style.left = randomLeft + "%";
      e.style.top = randomTop - 5 + "%";
      e.style.transform = `translateZ(${-z}px)`;
      e.style.filter = `brightness(${bright})`;
    });
  }
});
// load more
const btnLoadMore = document.querySelector(".btn-loadmore");
btnLoadMore.addEventListener("click", () => {
  page++;
  loadMore(page, perPage);
});
async function loadMore(page, perPage) {
  const url = "app/api/productloadmore.php";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      page: page,
      perPage: perPage,
    }),
  });
  const data = await response.json();
  if (data.length >= perPage) {
    btnLoadMore.style.display = "block";
    data.pop();
  } else {
    btnLoadMore.style.display = "none";
  }
  data.forEach((e) => {
    content.innerHTML += ` <div class="item">
        <img class="image" onclick="getProductDetails(${e.id})" 
        data-bs-toggle="modal" data-bs-target="#exampleModal" src="public/images/uni.png" alt="">
        <div class="name">${e.name}  
        <div class="btn btn-like btn-danger" onclick="loves(${e.id})">
        <i class="bi bi-heart-fill" id="love${e.id}">${e.loves}</i>
         </div>
         <div class="btn btn-warning">
        <i class="bi bi-eye-fill" id="click${e.id}">${e.clicks}</i>
      </div>
        </div>
      </div>
    </div>`;
  });
  // random position
  const item = document.querySelectorAll(".item");
  item.forEach((e) => {
    let randomLeft = Math.random() * 100;
    let randomTop = Math.random() * 100;
    let z = Math.random() * 500;
    let bright = 1 - z / 500;
    //  e.style.left = randomLeft < 50 ? `calc(${randomLeft}% + 100px)` : `calc(${randomLeft}% - 100px)`;
    //  e.style.top = randomTop < 50 ? `${randomTop}% ` : `calc(${randomTop}% )`;
    e.style.left = randomLeft + "%";
    e.style.top = randomTop - 5 + "%";
    e.style.transform = `translateZ(${-z}px)`;
    e.style.filter = `brightness(${bright})`;
  });
}

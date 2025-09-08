const categoryLoad = (categories) =>{
    const categoriesElement = document.getElementById("categories")
    for(const category of categories){
        const li = document.createElement("li");
        li.classList.add("category","rounded-md","p-2","cursor-pointer");
        li.innerText = `${category.category_name}`
        categoriesElement.append(li)
    }

    // Click to select 
    const AllCategories = document.querySelectorAll(".category");
    for(const [index,category] of AllCategories.entries()){
        
        category.addEventListener("click",()=>{
            plantDataByCategory(index);
            AllCategories.forEach(e=>{
                e.classList.remove("text-white","bg-[#15803D]")
            })
            category.classList.add("text-white","bg-[#15803D]")
        })
        
    }
}

const plantDataByCategory = (id) =>{
    spinner(true)
    if(id == 0){
        cardData();
        return;
    }
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res=>res.json())
    .then(data=>cardLoad(data.plants))
}

const categoryData = () =>{
    spinner(true)
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res=>res.json())
    .then(data=>categoryLoad(data.categories))
}

let count =0;
const countCart = document.getElementById("countCart")
countCart.innerText = count;

const addToCart = (name,price) =>{
    count++;
    countCart.innerText = count;
    const cartContainer = document.getElementById("cartContainer")
    const sideCartContainer = document.getElementById("sideCartContainer");
    addToCartElment(name,price,cartContainer);
    addToCartElment(name,price,sideCartContainer);
    totalCart(price);

}
const addToCartElment = (name,price,id) =>{
    const div = document.createElement("div");
    div.classList.add("flex","justify-between","items-center","bg-[#F0FDF4]","p-3","rounded-xl");
    div.innerHTML=`<div class="flex flex-col justify-start">
                            <h4 class="font-semibold text-[14px] text-black">${name}</h4>
                            <div class="text-gray-400 text-[12px]">৳<span>${price}</span> X <span>1</span></div>
                        </div>
                        <div class="text-red-600 hover:cursor-pointer">❌</div>`
    id.append(div);
    spinner(false)

    div.querySelector(".text-red-600").addEventListener("click", (e) => {
    e.stopPropagation();
    div.remove();
    count--;
    countCart.innerText = count;
    totalCart(-price);
    });
}
let total = 0;

const totalCart = (price = 0) =>{
    total += price;
    const totalCart = document.getElementById("totalCart");
    totalCart.innerHTML=`
                <hr>    
                <div class="flex justify-between px-2 font-semibold">
                    <span>Total:</span>
                    <span>৳${total}</span>
                </div>`
    
    document.getElementById("SidetotalCart").innerHTML = `<hr>    
                <div class="flex justify-between px-2 font-semibold">
                    <span>Total:</span>
                    <span>৳${total}</span>
                </div>`
}

const cardLoad = (plants) =>{
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML=""
    for(const plant of plants){
        const div = document.createElement("div");
        div.classList.add("card","bg-base-100","max-w-80","shadow-sm","p-4")
        div.innerHTML=`
                    <figure class="rounded-xl h-45">
                        <img
                        src=${plant.image}
                        alt="Shoes" />
                    </figure>
                    <div class="card-body p-2 space-y-1">
                        <h2 class="card-title hover:cursor-pointer hover:text-gray-500" onclick="modal(${plant.id})">${plant.name}
                        </h2>
                        <p class="text-[12px]">${plant.description}</p>
                        <div class="flex justify-between">
                            <span class="font-semibold text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-2xl">${plant.category}</span>
                            <span class="font-semibold">৳<span>${plant.price}</span></span>
                        </div>
                        <div onclick="addToCart('${plant.name}', ${plant.price})" class="bg-[#15803D] p-2 text-center rounded-3xl cursor-pointer text-white shadow-sm hover:bg-[#1ca84f]">Add to Cart</div>
                    </div>`

        cardContainer.append(div);
    }
    spinner(false)
    
}

const cardData = () =>{
    spinner(true)
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res=>res.json())
    .then(data=>cardLoad(data.plants))
}

const modal = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res=>res.json())
    .then(data=>modalLoad(data.plants))
}

const modalLoad = (data) =>{
    document.getElementById("modalSection").innerHTML = `
    <div class="modal-box">
            <h3 class="text-lg font-bold">${data.name}</h3>
            <div class="my-4 mx-auto  overflow-hidden h-60 rounded-lg">
                <img src=${data.image} alt="" class="object-cover h-full w-full">
            </div>
            <p class="py-1 text-[14px]"><span class="font-semibold ">Category:</span> ${data.category}</p>
            <p class="py-1 text-[14px]"><span class="font-semibold ">Price:</span> ৳${data.price}</p>
            <p class="py-1 text-[14px]"><span class="font-semibold ">Description:</span>${data.description}</p>
            <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
            </form>
            </div>
            </div>`
            console.log(data);
            modalSection.showModal()
}

const spinner = (status) =>{
    if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("cardContainer").classList.add("hidden");
  } else {
    document.getElementById("cardContainer").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
    
}

categoryData()
cardData()
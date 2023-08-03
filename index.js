import { menuArray } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
const cardInfo = document.getElementById("card-info")
let uuidArray = []

document.addEventListener('click', function(e){
    let uuid = uuidv4()
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add, uuid)
    }
    if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    if(e.target.tagName === 'BUTTON') {
    openModule()
  }
})

cardInfo.addEventListener('submit', function(e){
    e.preventDefault()
    const cardInfoData = new FormData(cardInfo)
    const name = cardInfoData.get('name')
    console.log(name)
    document.querySelector('.modal').style.display = 'none'
    document.querySelector('.order').style.display = 'none'
    document.querySelector('.complete').style.display = 'flex'
    let completeOrder = `
    <p>Thanks, ${name}! Your order is on its way!</p>`
    document.getElementById('complete').innerHTML = completeOrder
    

    
})


const totalPrice = document.getElementById('total-price')

let total = 0

function handleAddClick(addId, uuid){
    let orderHTML = ``
    if(!document.getElementById('order-detail').childElementCount) {
        document.querySelector('.order').style.display = 'flex'
    }
    const targetItemObj = menuArray.filter(function(item){
        let addIdNum = Number(addId)        
        return item.id === addIdNum
    })[0]
    total += targetItemObj.price
    uuidArray.push({
    uuid: uuid, 
    price: targetItemObj.price
    })
    orderHTML = `
    <div class="order-item" id="${uuid}">
    <p>${targetItemObj.name}
    <span class="remove" data-remove=${uuid}>remove</span></p>
    <p class="dollar">$${targetItemObj.price}</p>
    </div>`
    totalPrice.innerHTML = `$${total}`
    
    document.getElementById('order-detail').innerHTML += orderHTML
}

function handleRemoveClick(removeId){
    const removal = document.getElementById(removeId)
    removal.remove()
    const matches = uuidArray.filter(item => item.uuid === removeId);
    total -= matches[0].price
    totalPrice.innerHTML = total
    if(document.getElementById('order-detail').childElementCount === 0) {
        document.querySelector('.order').style.display = 'none'
    }
}

function getMenu() {
    let menuHTML = ``
    menuArray.forEach(function(item){
        menuHTML += `
<div class="flexbox">
<div class="item">
    <div class="emoji">${item.emoji}</div>
    <div class="item-container">
        <div class="name">${item.name}</div>
        <div class="ingredients">${item.ingredients}</div>
        <div class="price">$${item.price}</div>
        </div>
        </div>
    <i class="fa-solid fa-plus" data-add=${item.id}></i>
</div>`
        })
    
    
    
    return menuHTML
}

function render() {
    document.getElementById('menu').innerHTML = getMenu()
}



function openModule(){
    document.querySelector('.modal').style.display = 'flex'
}

render()
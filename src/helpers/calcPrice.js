export function calcSubPrice(product){
    return product.count * +product.item.price
    }
    
export function calcTotalPrice(products){
    let totalPrice = 0;
    console.log('calc', products);
    products.forEach((item)=>{
        totalPrice+= item.subPrice
    })
    return totalPrice
}

export function roundN(num){
    return  Math.round(num * 100) / 100
}
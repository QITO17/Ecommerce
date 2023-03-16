function product (products) {
    const db = [...products]

    function printProducts(){
        const productsDOM = document.querySelector('.products__container')
        let htmlProduct = '';

        for(let product of db){
            htmlProduct += `
            <article class="product">
            <div class="product__image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product__content">
                <button type="button" class="product__btn add-to-cart" data-id="${product.id}">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPlJREFUSEvNlNsVwUAQhr9UQAlUgA6ogA7wygM6oAJeeEUF6IAKUAEqQAWccZKcuCQ7SaxjXufy7b//zjpYDsfyfH4KuLlqLsAM6H1DXVCBB/DmVoB1WsinK+oCQ2AF1GwAssDZHZwHjmkgYSaLB/UUg3dASfrDAEVgmwJwAnJRAMnJKQoJIQOgbwI0gGlCgO+dadFkJzIxIRug7PWYACOgExPQdBf10WYCiFGHGICra64oVwGkaAlUlZA5IN75YVIghbLNCyXg7XvRALRPdg/I/jyFFqAU8F6mBYyBFjAB2i9jonLGV+TNCn7lr4eKyqkB1hVY9+B/AXdYBygZk/eVswAAAABJRU5ErkJggg=="/>
                </button>
                <span class="product__price">$${product.price}</span>
                <span class="product__stock">Disponible: ${product.quantity}</span>
                <h3 class="product__title">${product.name}</h3>
            </div>
        </article>`
        }
        
        productsDOM.innerHTML = htmlProduct;
    }

    printProducts()

    return {
        db,
        printProducts
    }
}
export default product

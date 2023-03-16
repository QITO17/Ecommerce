function carro(db, printProducts){
    let cart = []

    /**Elementos del dom */
    const productsDOM = document.querySelector('.products__container');
    const notifyDOM = document.querySelector('.notify');
    const cartDOM = document.querySelector('.cart__body');
    const countDOM = document.querySelector('.cart__count--item');
    const totalDOM = document.querySelector('.cart__total--item');
    const checkoutDOM = document.querySelector('.btn--buy');
    
     
        function printCart(){

            let htmlCarro = '';
            
            if(cart.length === 0){
               
                htmlCarro+= `
                <div class="cart__empty">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAR5JREFUSEvN1cExBUEUheHvRYAMiAARIAIywJYFIkAEbNgiAmRABIgAESAC6qqeV2PevOmuGqOczSz6zv379JnbMzKwRgP396eAz+TmHZc4+A13dQcVoOq7hru+kLYj2scJbrExBGAWb6nxAl76QKaFHBls9mj8iOV4fxpgCQ89AK+Y7wLEWuxiEdvpqyrhVc6PcZQDbOEigb7tZhTZPSOe4+xygxYzMZPOMxx1qdrQPVarwhzgFHu4QjToUszMSvNIc4AIKmyH5hCO2lTVfaRwx3U5QDS7wXq6OsJRmyLQwzanJYCY5utcwml94nopAdQ/2S7OE2J+fqgUUGhgsqwUcIYdnGO30aZrrfiHU7/Km5vqWisGDO5g8Az+L+ALYZk0GaU3ojwAAAAASUVORK5CYII="/>
                    <p>No Hay Productos</p>
                </div> `
                notifyDOM.classList.remove('show--notify'); 

            }else{
                for(const item of cart){
                    
                        const produc = db.find(p => p.id === item.id)
                         htmlCarro += `<article class="article">
                         <div class="article__image">
                             <img src="${produc.image}" alt="${produc.name}">
                         </div>
                         <div class="article__content">
                             <h3 class="article__title">${produc.name}</h3>
                             <span class="article__price">$${produc.price}</span>
                             <div class="article__quantity">
                                 <button type="button" class="article__quantity-btn article--minus" data-id="${item.id}">
                                     <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAENJREFUSEtjZKAxYKSx+QyjFhAM4dEgGg0igiFAUAGuVPSfoE7sCjDMGzALyPQAprbRjEYwKEeDaDSICIYAQQU0T0UAw9sCGchp4KEAAAAASUVORK5CYII="/>
                                 </button>
                                 <span class="article__quantity-text"data-id="${item.qty}">1</span>
                                 <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}">
                                     <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAFZJREFUSEtjZKAxYKSx+QyjFhAMYVKD6D/URKL1Ea0QavCoBQTjbOgEEcylBL2EpgAj0eBKRTS3AJfLh04cjPoAHgKDriwiNV+M1miEQ4zUSCZsIpoKAFy0DhnDOA3uAAAAAElFTkSuQmCC"/>                              
                                 </button>                   
                             </div>
                             <button type="button" class="article__btn remove-from-cart" data-id="${item.qty}">
                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ9JREFUSEvt1csRwjAMRdGTSigB6IQSSAeUQCdQAp0AHZBKYFjwCzFyMgmbREuP5l3p2ZYKA0cxsL4cwBq7RCEl9r+KjAALHIMulzilcuqAa0+WPXX/DuipgZdM6g66WvWlNw7Ao8u6bU3nnSyaAI1P/93vyaIRWNRmAGZ/tAtmbZRxxn1BfURq2K2wxTwTUmGDQy4gUzdOi3ZyrBBk3AB+wyoZJl1mqQAAAABJRU5ErkJggg=="/>
                             </button>
                         </div>
                     </article>`;
                     }
                    notifyDOM.classList.add('show--notify')
             }

             
            cartDOM.innerHTML = htmlCarro;
            notifyDOM.innerHTML = showItemsCount()
            totalDOM.innerHTML = showTotal()
            countDOM.innerHTML = showItemsCount()
           
        }

        function addToCart (id, qty = 1){
            const itemFinded = cart.find(i => i.id === id)

            if(itemFinded){
                itemFinded.qty += qty 
            }else{
                cart.push({id,qty})
            }

            printCart();
        }

        function removeFromCart (id, qty = 1){
            const itemFinded = cart.find(i => i.id === id)
            const resul = itemFinded.qty - qty
            if(resul >0){
                itemFinded.qty -= qty
            }else{
                cart = cart.filter(i => i.id !== id)
            }

            printCart()
        }


        function deleteFromCart (id) {
            cart = cart.filter(i => i.id !== id)
            printCart()
        }


        function showItemsCount(){
            let suma = 0;
            for (const item of cart){
                suma += item.qty;
            }
            return suma;
        }


        function showTotal (){
            let total = 0
            for(const item of cart){
                const productFinded = db.find(p => p.id === item.id)
                total += item.qty * productFinded.price;
            }
            return total;
        }

        function checkout() {
            for(const item of cart){
                const productFinded = db.find(p => p.id === item.id)
                productFinded.quantity -= item.qty;
            }

            cart = [];
            printCart();
            printProducts();
            alert('Muchas gracias por su compra vuelva pronto')
    }

    printCart()


    productsDOM.addEventListener('click', function(e){
         if(e.target.closest('.add-to-cart')){
             const id = +e.target.closest('.add-to-cart').dataset.id;    
            addToCart(id);
         }
      })
    
     cartDOM.addEventListener('click', function(e){
        if(e.target.closest('.article--minus')){
            const id = +e.target.closest('.article--minus').dataset.id;
            removeFromCart(id);
         }

         if(e.target.closest('.article--plus')){
            const id = +e.target.closest('.article--plus').dataset.id;    
           addToCart(id);
            
        }

        if(e.target.closest('.remove-from-cart')){
           const id = +e.target.closest('.remove-from-cart').dataset.id;    
           deleteFromCart(id);
            
       }
    })

        

       checkoutDOM.addEventListener('click', function(){
        checkout()
      })
    }
      
    
    


export default carro;


import loader from "./componentes/loader.js"
import showMenu from "./componentes/showMenu.js";
import showCart from "./componentes/showCart.js";
import product from "./componentes/products.js";
import getProducts from "./helpers/getProducts.js";
import carro from "./componentes/carrito.js";


/*Ocultar Louder */

loader();

/**Mostrar Menu */

showMenu();

// showCarro();
showCart();

/**Productos */
const {db, printProducts} = product(await getProducts())

/**Carrito */

carro(db, printProducts)
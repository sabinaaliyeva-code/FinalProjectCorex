const { getCart } = require("../controllers/cart.controller");

const endpoints={
      
    products : {
        getAll : "/products",
        getByID : "/products/:id",
        Post : "/products",
        Patch : "/products/:id",
        Delete : "/products/:id"
    }
}

module.exports = endpoints;
const coffees = [
    {
        image: "images/coffee1.jpg",
        name: "Capuchino",
        description: "Delicioso café preparado con espresso, leche caliente y espuma.",
        price: 55,
        size: "16 oz",
        ingredients: "Espresso, leche y espuma de leche"
    },
    {
        image: "images/coffee2.jpg",
        name: "Latte",
        description: "Café suave y cremoso preparado con espresso y leche.",
        price: 60,
        size: "16 oz",
        ingredients: "Espresso, leche y espuma"
    },
    {
        image: "images/coffee3.jpg",
        name: "Americano",
        description: "Un café clásico de sabor intenso y sencillo.",
        price: 45,
        size: "16 oz",
        ingredients: "Espresso y agua caliente"
    },
    {
        image: "images/coffee4.jpg",
        name: "Chai Latte",
        description: "Una combinación deliciosa de té chai y leche cremosa.",
        price: 65,
        size: "16 oz",
        ingredients: "Té chai, leche y especias"
    },
    {
        image: "images/coffee5.jpg",
        name: "Veneciano",
        description: "Una bebida cremosa con un sabor especial y único.",
        price: 70,
        size: "16 oz",
        ingredients: "Espresso, leche y crema"
    },
    {
        image: "images/coffee6.jpg",
        name: "Doble carga",
        description: "Para los amantes del café fuerte, preparado con doble espresso.",
        price: 65,
        size: "16 oz",
        ingredients: "Doble espresso y agua"
    },
    {
        image: "images/coffee7.jpg",
        name: "Espresso",
        description: "Café concentrado de sabor intenso y aroma delicioso.",
        price: 40,
        size: "4 oz",
        ingredients: "Café espresso"
    },
    {
        image: "images/coffee8.jpg",
        name: "Macciato",
        description: "Espresso acompañado con una pequeña cantidad de espuma de leche.",
        price: 55,
        size: "8 oz",
        ingredients: "Espresso y espuma de leche"
    },
    {
        image: "images/coffee9.jpg",
        name: "Romano",
        description: "Espresso acompañado con un toque fresco de limón.",
        price: 50,
        size: "8 oz",
        ingredients: "Espresso y limón"
    },
    {
        image: "images/coffee10.jpg",
        name: "Espresso Tonic",
        description: "Una combinación refrescante de espresso y agua tónica.",
        price: 70,
        size: "16 oz",
        ingredients: "Espresso, agua tónica y hielo"
    }
];


const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const coffee = coffees[id];


const detail = document.getElementById("coffee-detail");


detail.innerHTML = `

    <div class="card">

        <img src="${coffee.image}" alt="${coffee.name}">

        <h2>${coffee.name}</h2>

        <p>${coffee.description}</p>

        <p><strong>Precio:</strong> $${coffee.price}</p>

        <p><strong>Tamaño:</strong> ${coffee.size}</p>

        <p><strong>Ingredientes:</strong> ${coffee.ingredients}</p>

    </div>

`;
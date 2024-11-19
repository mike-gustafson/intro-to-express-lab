const app = require('express')();

const PORT = 3001;

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];


// GET /greetings/<name>
app.get('/greetings/:name', (req, res) => {
    res.send(`Hello, ${req.params.name}!`);
});

// GET /roll/<number-parameter>
app.get('/roll/:num', (req, res) => {
    const num = req.params.num;
    const roll = Math.floor(Math.random() * num) + 1;
    res.send(`You rolled a ${roll}`);
});

// GET /collectibles/<index>
app.get('/collectibles/:index', (req, res) => {
    const index = req.params.index;
    if (collectibles[index]) {
        res.send(`So you want the ${collectibles[index].name}? For $${collectibles[index].price}, it can be yours.`);
    } else {
        res.status(404).send('Collectible not found');
    }
});

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const type = req.query.type;
    const maxPrice = req.query.maxPrice;
    const minPrice = req.query.minPrice;
    let filteredShoes = shoes;
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }
    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
    res.send(`You'r shoes are ${filteredShoes.map(shoe => shoe.name).join(', ')}`);  
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

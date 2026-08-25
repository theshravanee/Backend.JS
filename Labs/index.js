//Node.js and OS module
// Question 1 — System Info
// Write a Node.js program using the os module that prints the following about your computer:
// 1. The platform (operating system)
// 2. The CPU architecture
// 3. Total RAM in GB (rounded to 2 decimal places)
// 4. Free RAM in GB (rounded to 2 decimal places)
// 5. System uptime in hours
// Hint: RAM comes in bytes — divide by 1024 ** 3 to get GB, and use .toFixed(2) for 2 decimals.

const os= require("os")

console.log(os.arch())
console.log(os.platform())
console.log((os.totalmem()/1024**3).toFixed(2))
console.log((os.freemem()/1024**3).toFixed(2))
console.log(os.uptime()/3600)

// Question 2 — Basic HTTP Server
// Using the built-in http module, create a web server that:
// 1. Listens on port 3000
// 2. Sends the response "Welcome to my server" for any request
// 3. Prints the visited URL and request method in the console for every request
// Run it and open localhost:3000 in your browser to test.

const http= require("http");

const server= http.createServer((req, res)=>{
    console.log("Welcome to my server");
    console.log("URL", req.url);
    console.log("Method", req.method);
    res.end("this ends here")

})
server.listen(3000,()=>{
    console.log("server running on port 3000");
})

// Question 3 — Routing with http
// Using the http module, create a server with the following routes:
// 1. / → send "Home Page"
// 2. /products → send "Our Products"
// 3. /login → send "Login Page"
// 4. Any other URL → set status code 404 and send "Page Not Found"

const server2= http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end("Home");
    }
    else if(req.url==='/products'){
        res.end("Our Products");
    }
    else if(req.url==='/login'){
        res.end("Login")
    }
    else{
        res.statusCode = 404;
        res.end("Page Not Found")
    }
})
server2.listen(3001,()=>{
    console.log("server2 running on port 3001");
})

// Question 4 — Express Server
// Rebuild the same website from Question 3, but this time using Express. Create these routes with app.get() :
// 1. / → "Home Page"
// 2. /products → "Our Products"
// 3. /login → "Login Page"
// 4. /contact → "Contact Page"
// Start the server on port 3000 .
// Remember: First run npm init -y and npm install express before writing the code.

const express=require("express");
const app=express();


//middleware
app.use((req,res,next)=>{
    console.log(req.method, req.url);
    next();
})

app.get("/",(req,res)=>{
    res.send("Home");
})
app.get("/products",(req,res)=>{
    res.send("Our Products");
})
app.get("/login", (req,res)=>{
    res.send("Login");
})
app.get("/contact",(req,res)=>{
    res.send("Contact Us");
})

app.listen(3002,()=>{
    console.log("Express server running on port 3002");
})

// Question 5 — Express with Middleware
// Take your Express server from Question 4 and add a middleware function that:
// 1. Runs for every request
// 2. Prints the request method and URL in the console (e.g. GET /products )
// 3. Calls next() so the request continues to the correct route
// Test it by visiting different routes and checking the console logs.

//done


//CRUD Assignments
let books = [
{ id: 1, title: "Atomic Habits", author: "James Clear", genre: "self-help", price: 499 },
{ id: 2, title: "Deep Work", author: "Cal Newport", genre: "self-help", price: 450 },
{ id: 3, title: "1984", author: "George Orwell", genre: "fiction", price: 350 },
{ id: 4, title: "Sapiens", author: "Yuval Noah Harari", genre: "history", price: 599 }
];

// Question 1 — Read All & Read One
// Set up an Express server (with express.json() ) and create two GET routes:
// 1. GET /books → send the whole books array.
// 2. GET /books/:id → send only the book with that id. If no book matches, send a 404 with a message like "book not
// found" .
// Hint: Use find() and remember to convert the id with Number(id) before comparing.

const app1=express()

app1.use(express.json())

app1.get("/books", (req,res)=>{
    res.send(books)
})

app1.get("/books/:id",(req,res)=>{
    res.send(books.find(book=>book.id===Number(req.params.id)))
})
// req.params.id → gets the value from :id
// Number(...) → converts it from string → number
// find(...) → searches for the matching book

app1.listen(3003, ()=>{
    console.log("Express server running on port 3003");
})

// Question 2 — Search by Genre (query)
// Create a route GET /search that reads a genre from the query and returns all books of that genre.
// 1. Example: /search?genre=self-help should return both self-help books.
// 2. Use req.query.genre and the filter() method.

app1.get("/search", (req, res)=>{
    const genre=req.query.genre

    res.send(books.filter(book=> book.genre===genre))
})

// find() → returns one matching book
// filter() → returns all matching books
// params → part of the URL path
// query → comes after ?
// :something in the route → req.params.something

// ?something=value in the URL → req.query.something


// Question 3 — Add a Book (POST)
// Create a route POST /books that adds a new book to the array:
// 1. Read the new book from req.body .
// 2. Push it into the books array.
// 3. Send back a message and the newly added book.
// Test with Thunder Client / Postman: method POST, body as JSON, e.g. { "id": 5, "title": "Ikigai", "author":
// "Hector Garcia", "genre": "self-help", "price": 399 }

app1.post("/books", (req, res) => {

    const book = req.body

    books.push(book)

    res.send({
        message: "Book added successfully",
        book: book
    })
})
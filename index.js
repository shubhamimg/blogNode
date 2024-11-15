const express = require("express");
const app = express();
const port = 9090;
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(methodOverride('_method'));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


let posts= [
    {
        id: uuidv4(),
        username: 'Shubham',
        content: "Small teams and individual designers need a space where they can watch the design process unfold, both for themselves and for the people they work with – no matter if it's a fellow designer, product manager, developer or client. Preline allows you to invite more people into the process, creating a central place for conversation around design. As those teams grow, transparency and collaboration becomes integrated in how they communicate and work together."
    },
    {
        id: uuidv4(),
        username: 'Aachuki',
        content: "We know the power of sharing is real, and we want to create an opportunity for everyone to try Preline and explore how transformative open communication can be. Now you can have a team of one or two designers and unlimited spectators (think PMs, management, marketing, etc.) share work and explore the design process earlier."
    },
    {
        id: uuidv4(),
        username: 'Akanksha',
        content: "As we've grown, we've seen how Preline has helped companies such as Spotify, Microsoft, Airbnb, Facebook, and Intercom bring their designers closer together to create amazing things. We've also learned that when the culture of sharing is brought in earlier, the better teams adapt and communicate with one another. "
    },
    {
        id: uuidv4(),
        username: 'Sumit',
        content: "At preline, our mission has always been focused on bringing openness and transparency to the design process. We've always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow."
    },
];


// index page blog

app.get("/posts", (req, res) =>{
    res.render("index.ejs", {posts})
});

app.get("/posts/new", (req, res) =>{
    res.render("new.ejs")
});


//  post blogs
app.post("/posts", (req, res) =>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect('/posts');
})


// See in details

app.get("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.status(404).render("error.ejs");
    }
});


// edit blog

app.patch("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    res.render("thankyou.ejs")
});

app.get("/posts/:id/edit", (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", ({ post }))
});

// delete

app.delete("/posts/:id", (req, res) =>{
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id)
    res.render("deletesuccess.ejs")
})




app.listen(port, () =>{
    console.log(`Port is Running on ${port}`);
})
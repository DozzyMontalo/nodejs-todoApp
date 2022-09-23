const express = require ('express');
const bodyParser = require ('body-parser');
// const date = require(__dirname + '/date.js');

const app = express();

const port = process.env.PORT || 3000

let items = ['Buy food', 'Cook food', 'Eat food'];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/', (req, res)=>{

//  let day = date()

let today = new Date();
    let options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    
    let day = today.toLocaleDateString('en-US', options);

res.render('list', {listTitle: day, newListItems: items});
  
})


app.post('/', (req, res) => {
  //post items
      const item = req.body.newItem;
      console.log(req.body.list)
      if (req.body.list === "Work") {
          workItems.push(item)
          res.redirect("/work")
      } else {
          items.push(item);
          res.redirect("/")
      }
    
  })


app.get('/work', (req, res) => {
   res.render('list', {listTitle: 'Work List', newListItems: workItems});
})

app.get('/about', (req,res) => {
  res.render('about')
})

app.listen(port, () => {
    console.log('server started on ' + port)
})
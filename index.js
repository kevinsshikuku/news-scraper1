const express = require('express')
const axios = require('axios');
const cheerio = require ('cheerio');
const cors = require('cors')
require('dotenv').config()

const url = 'https://tmuc.ac.ke'
const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors())



app.get('/', (req, res) => {

 axios(url)
 .then( (resonse )=> {
     const html = resonse.data
     
     const $ = cheerio.load(html);
     const data = []
  
  
     $(".post-block").each(function(i, post) {
       let img = $(post).find('img').attr('src')
       let link = $(post).find('a').attr('href')
  
       let title = $(post).text().trim();
       let ad = false
  
        data.push({img, link, title, ad});
       });
    
         res.json({ info: data})
        })
        .catch(er => {
          res.json({ error: er})
        })

      })
      
      
app.listen(PORT, () => {
  console.log(`server listening on PORT ${PORT}`)
})













 
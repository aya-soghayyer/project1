
import express from 'express';
import data from './data/Sample_data.js'

const app = express();
const port = 3000;
// app.use(express.text());
app.use(express.json())


    //get
    app.get('/', (req, res)=>{
        res.send(data);
    })

    //get
    app.get('/book/id', (req, res)=>{
    res.send(data);
    })

    //get
    app.get('/book', (req,res)=>{
        if (!req.query?.name){
            res.send("Error: please send book id in query params!")
            return ; 
        }
        else {
            const bookname = req.query.name; 
            for(let i = 0 ; i< data.length; i++){
                if(data[i].title === bookname  ){
                    res.send(data[i]);
                }
            }
            }
    });

    //get
    app.get('/book', (req,res)=>{
        if (!req.query?.publicationYear){
            res.send("Error: please send book id in query params!")
            return ; 
        }
        else {
            const bookpYear = parseInt(req.query.publicationYear.toString()); 
            for(let i = 0 ; i< data.length; i++){
                if(data[i].publicationYear === bookpYear  ){
                    res.send(data[i]);
                }
            }
            }
    });
    
    //post
    app.post('/book',(req,res)=>{
        const newBook = req.body;
        data.unshift(newBook)
        res.send("thanks , new book added !");
    }); 

    //put
    app.put('/book/:id', (req, res)=>{
        console.log(req.params);
        const bookId = parseInt(req.params.id);
        for (let i = 0 ; i<data.length; i++){
            if(data[i].id=== bookId){
                data[i]={...data[i], ...req.body};
                res.send('Success update book!');
                return; 
            }}
        res.send('Faild update students! ');
    })

    //delete
    app.delete('/book/:id', (req,res)=>{
        if (!req.params.id){
        res.send("Error: please send book id in query params!")
        return ; 
    }
    else {
        const bookId = parseInt(req.params.id.toString()); 
        let found = data.findIndex ((book)=>book.id === bookId  ) 
        if (found >= 0 ){
            data.splice(found,1);
            console.log('aya')
            res.send('success delete book ')
            return;
        } 
        else{
            console.log('aya2')
            res.send(`book with ${bookId} not Found`)
        }
        }
    })



    // app.get('/students?mark=mark&college=colName', (req, res)=>{
    // })

app.listen(port, ()=>{
    console.log('server is running on'+ port);
})

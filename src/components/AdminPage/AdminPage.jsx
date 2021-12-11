import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { productsContext } from '../../contexts/productsContext';
import AdminCard from '../AdminCard/AdminCard';

const AdminPage = () => {
    // const [product, setProduct] = useState({
    //     title:'',
    //     desc:'',
    //     author:'',
    //     price:'',
    //     url:'',
    //     genre:'',
    // });
    const [showInput, setShowInput] = useState(false);
    const { createProduct, products, getProducts } = useContext(productsContext);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [genre, setGenre] = useState('');
  
    useEffect(() => {
       getProducts();
    }, [])    

    function handleValues(){
        let product = {
            title,
            desc,
            author,
            price,
            url,
            genre
         }
        createProduct(product);

        console.log('newProduct', product);
         setTitle('');
         setDesc('');
         setAuthor('');
         setPrice('');
         setGenre('');
         setUrl('');

    }
    
  
    console.log('array',products);
    return (
        
        <Container>
        
            <Button variant="contained" onClick={() => setShowInput(!showInput)} >Add</Button>
            {showInput ? (
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '50ch', display:'flex', flexDirection:'column' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField onChange={(e) => setTitle(e.target.value)} id="input-add-1" label="Title" variant="outlined" value={title}/>
                    <TextField onChange={(e) => setDesc(e.target.value)} id="input-add-2" label="Description" variant="outlined" value={desc}/>
                    <TextField onChange={(e) => setAuthor(e.target.value)} id="input-add-3" label="Author" variant="outlined" value={author} />
                    <TextField onChange={(e) => setPrice(e.target.value)} id="input-add-4" label="Price" variant="outlined" value={price}/>
                    <TextField onChange={(e) => setUrl(e.target.value)} id="input-add-5" label="URL" variant="outlined" value={url} />
                    <TextField onChange={(e) => setGenre(e.target.value)} id="input-add-6" label="Genre" variant="outlined" value={genre} />
                    <Button onClick={handleValues} variant="contained" >Create </Button>
                </Box>
                
            ) : (null)
            }
            <div style={{display:'flex', flexWrap:'wrap'}}>
           {    
               products.map((item)=><AdminCard key={item.id} item={item}/>)
           }
            </div>
        </Container>
        
        
        
    );
};

export default AdminPage;
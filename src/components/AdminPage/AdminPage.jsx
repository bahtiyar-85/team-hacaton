import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Pagination, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useSearchParams } from 'react-router-dom';

import { productsContext } from '../../contexts/productsContext';
import AdminCard from '../AdminCard/AdminCard';

const AdminPage = () => {
   
    const [showInput, setShowInput] = useState(false);
    const { createProduct, products, getProducts, updateProducts, productsTotalCount } = useContext(productsContext);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [genre, setGenre] = useState('');
    const [id, setId] = useState('')
  
    // pagination 
    const [searchParams, setSearchParams] = useSearchParams();
    // const [search, setSearch] = useState(
    //   searchParams.get("q") ? searchParams.get("q") : ""
    // );
    // const [page, setPage] = useState(
    //   searchParams.get("_page") ? searchParams.get("_page") : +1
    // );
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
     
    useEffect(() => {
        setSearchParams({
          _page: page,
          _limit: limit,
        });
      }, []);

    useEffect(() => {
        getProducts();
      }, [searchParams]);

    useEffect(() => {
        setSearchParams({
          _page: page,
          _limit: limit,
        });
      }, [ page, limit]);
    // end pagination 
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      cleanInput();
    };

    useEffect(() => {
       getProducts();
    }, [])    

    function cleanInput(){
        setTitle('');
        setDesc('');
        setAuthor('');
        setPrice('');
        setGenre('');
        setUrl('');
    }
    function handleValues(){
          
        if(!title || !desc || !price || !genre|| !author || !url){
            alert('One of the field is empty!')
            return;
        }
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
        cleanInput();

    }
    
    function productToEdit(editProduct){
        setTitle(editProduct.title);
        setDesc(editProduct.desc);
        setAuthor(editProduct.author);
        setPrice(editProduct.price);
        setGenre(editProduct.genre);
        setUrl(editProduct.url);
        setId(editProduct.id)

        setShowInput(false);
        handleClickOpen();
    }

    function handleEditValues(){
        
        if(!title || !desc || !price || !genre|| !author || !url){
            alert('One of the field is empty!')
            return;
        }
        let product = {
            title,
            desc,
            author,
            price,
            url,
            genre
         }
        updateProducts(id, product);
        handleClose();
        cleanInput();

    }
    
    const handleChange = (event, value) => {
        console.log('value',value);
        console.log('page', page);
        setPage(value);
      };
    // console.log('array',products);
    return (
        
        <Container>
        
            <Button color='secondary' style={{marginTop: "80px", marginLeft: "15px", width: "10%"}} variant="contained" onClick={() => setShowInput(!showInput)} >Add</Button>
            {showInput ? (
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1.5, width: '50ch', display:'flex', flexDirection:'column' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField style={{backgroundColor: "#ffffff", borderRadius: "5px"}} color="secondary" onChange={(e) => setTitle(e.target.value)} id="input-add-1" label="Title" variant="outlined" value={title}/>
                    <TextField style={{backgroundColor: "#ffffff", borderRadius: "5px"}} color="secondary" onChange={(e) => setDesc(e.target.value)} id="input-add-2" label="Description" variant="outlined" value={desc}/>
                    <TextField style={{backgroundColor: "#ffffff", borderRadius: "5px"}} color="secondary" onChange={(e) => setAuthor(e.target.value)} id="input-add-3" label="Author" variant="outlined" value={author} />
                    <TextField style={{backgroundColor: "#ffffff", borderRadius: "5px"}} color="secondary" onChange={(e) => setPrice(e.target.value)} id="input-add-4"  type="number" label="Price" variant="outlined" value={price}/>
                    <TextField style={{backgroundColor: "#ffffff", borderRadius: "5px"}} color="secondary" onChange={(e) => setUrl(e.target.value)} id="input-add-5" label="URL" variant="outlined" value={url} />
                    <TextField style={{backgroundColor: "#ffffff", borderRadius: "5px"}} color="secondary" onChange={(e) => setGenre(e.target.value)} id="input-add-6" label="Genre" variant="outlined" value={genre} />
                    <Button style={{width: "35%", height: "45px"}} onClick={handleValues} variant="contained" color='secondary' >Create </Button>
                </Box>
                
            ) : (null)
            }
            <div style={{display:'flex', flexWrap:'wrap'}}>
           {    
               products.map((item)=><AdminCard key={item.id} item={item} productToEdit={productToEdit}/>)
           }
          
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change form</DialogTitle>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '50ch', display:'flex', flexDirection:'column' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField onChange={(e) => setTitle(e.target.value)} id="input-add-7" label="Title" variant="outlined" value={title}/>
                    <TextField onChange={(e) => setDesc(e.target.value)} id="input-add-8" label="Description" variant="outlined" value={desc}/>
                    <TextField onChange={(e) => setAuthor(e.target.value)} id="input-add-9" label="Author" variant="outlined" value={author} />
                    <TextField onChange={(e) => setPrice(e.target.value)} id="input-add-10"  type="number" label="Price" variant="outlined" value={price}/>
                    <TextField onChange={(e) => setUrl(e.target.value)} id="input-add-11" label="URL" variant="outlined" value={url} />
                    <TextField onChange={(e) => setGenre(e.target.value)} id="input-add-12" label="Genre" variant="outlined" value={genre} />
                </Box>
                <DialogActions>
                <Button onClick={handleEditValues}>Save changes</Button>
                <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Pagination 
                    count={Math.ceil(productsTotalCount/limit)} 
                    page={page}
                    onChange={handleChange}
                    color="primary" 
                />
            </div>
        </Container>
        
        
        
    );
};

export default AdminPage;
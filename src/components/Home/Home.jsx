import React, { useContext, useEffect, useState } from 'react';
import { productsContext } from '../../contexts/productsContext';
import { cartContext } from '../../contexts/cartContext';
import { Card, CardContent, CardMedia, Pagination, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import './Home.css'
import { useSearchParams } from 'react-router-dom';




const Home = () => {
    const {products, getProducts} = useContext(productsContext);
    const {addProductToCart} = useContext(cartContext);
    useEffect(()=>{
        getProducts()
    }, [])

    // pagination 
    const { productsTotalCount } = useContext(productsContext);

    const [searchParams, setSearchParams] = useSearchParams(); 
    const [search, setSearch] = useState(
        searchParams.get("q") ? searchParams.get("q") : ""
      );
    const [page, setPage] = useState(searchParams.get("_page") ? searchParams.get("_page") : 1);
    const [limit, setLimit] = useState(searchParams.get("_limit") ? searchParams.get("_limit") : 8);
     
    useEffect(() => {
        setSearchParams({
            q: search,
          _page: page,
          _limit: limit,
        });
      }, []);

    useEffect(() => {
        getProducts();
      }, [searchParams]);

    useEffect(() => {
        setSearchParams({
            q: search,
          _page: page,
          _limit: limit,
        });
      }, [search, page, limit]);
    // end pagination 

    const handleChange = (event, value) => {
        setPage(value);
      };

    return (
        <>
            <div className="container">
            <video className="background-video" muted autoPlay preload="auto" loop >
                <source type="video/mp4" src="https://giant.gfycat.com/ColorlessQuerulousDoe.mp4"/>
            </video>
            </div>
            <div className='parallax' style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                {products.map((item)=>(

                  <Card key={item.id} sx={{ maxWidth: 345, margin:'2vh', position:'relative' }}>
                        <CardMedia
                            component="img"
                            // height="500"
                                      
                            image={item.url}
                            alt="image"
                        />
                        <CardContent>
                            <Typography style={{marginTop: -15}} variant="h5" color="text.secondary">
                            {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Author{item.author}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Genre: {item.genre}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {item.desc}
                            </Typography>
                            <Typography style={{position: 'absolute', bottom: 0, left: 10}} variant="body2" color="text.dark">
                                <span style={{fontSize: '18px'}}>{"$ "+item.price}</span>
                            </Typography>  
                            <div style={{display:'flex' ,justifyContent:'flex-end', position:'absolute', right:'0', bottom:'0'}}>
                                <AddShoppingCartIcon onClick={()=>addProductToCart(item)} style={{cursor:'pointer'}}/>
                            </div>
                        </CardContent>
                    </Card>

                ))}
              
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Pagination 
                    style={{position: 'fixed', bottom: 0}}
                    count={Number(Math.ceil(+productsTotalCount/+limit))} 
                    page={+page}
                    onChange={handleChange}
                    color="primary" 
                />
            </div>
        </>
    );
};

export default Home;
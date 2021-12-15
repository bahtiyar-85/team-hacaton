import React, { useContext, useEffect, useState } from 'react';
import { productsContext } from '../../contexts/productsContext';
import { cartContext } from '../../contexts/cartContext';

import { InsertEmoticon } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Pagination, Slider, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useSearchParams } from 'react-router-dom';

import './Home.css'
import Box from '@mui/material/Box';

const Home = () => {
    const {products, getProducts} = useContext(productsContext);
    const {addProductToCart} = useContext(cartContext);
    useEffect(()=>{
        getProducts()
    }, [])

    // pagination 
    const { productsTotalCount } = useContext(productsContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [valueSlider, setValueSlider] = useState([0, 1000]);
 
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
          price_gte: valueSlider[0],
          price_lte: valueSlider[1],
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
          price_gte: valueSlider[0],
          price_lte: valueSlider[1],
        });

      }, [search, page, limit, valueSlider]);
    // end pagination 
    console.log('valueSlider', valueSlider);
    const handleChange = (event, value) => {
        setPage(value);
      };

    const handleChangeSlider = (event, newValue) => {
        setValueSlider(newValue);
        console.log('newValue', newValue);
    };

    function valuetext(value) {
        return `$ ${value}`;
      }



    return (
        <>
            <div className="container">
            <video className="background-video" muted autoPlay preload="auto" loop >
                <source type="video/mp4" src="https://giant.gfycat.com/ColorlessQuerulousDoe.mp4"/>
            </video>
            </div>
            <div className='parallax' style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
            <div style={{width:'80%', display:'flex', flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                <h2 style={{ color:'white'}}>Filter by price</h2>
                <Box sx={{ width: 500, margin:'0 auto' }}>
                    <Slider
                        value={valueSlider}
                        onChange={handleChangeSlider}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Box>
            </div>
            
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
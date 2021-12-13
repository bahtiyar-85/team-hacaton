import { InsertEmoticon } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import './Home.css'
import { productsContext } from '../../contexts/productsContext';

const Home = () => {
    const {products, getProducts} = useContext(productsContext);
    useEffect(()=>{
        getProducts()
    },[])
    return (
        <>
            <div className="container">
            <video className="background-video" muted autoPlay preload="auto" loop >
                {/* <source type="video/webm" src="https://thumbs.gfycat.com/MixedTartCalf-mobile.mp4"/> */}
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
                            <Typography variant="h5" color="text.secondary">
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
                            <Typography variant="body2" color="text.secondary">
                                {"$ "+item.price}
                            </Typography>  
                            <div style={{display:'flex' ,justifyContent:'flex-end', position:'absolute', right:'0', bottom:'0'}}>
                                <AddShoppingCartIcon />
                            </div>
                        </CardContent>
                    </Card>

                ))}
              
            </div>
        </>
    );
};

export default Home;
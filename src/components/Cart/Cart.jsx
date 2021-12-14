import { Button, Container, Fab, Grid, TextField } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useContext, useEffect } from 'react';
import { cartContext } from '../../contexts/cartContext';
import { roundN } from "../../helpers/calcPrice";

const Cart = () => {
    const {getCart, cart, deleteFromCart, changeProductCount} = useContext(cartContext)
    
    useEffect(() => {
        getCart();
      }, []);


    return (
        <div style={{color:'white', padding:'100px'}}>
           
           <Container>
             {cart.products?.map((item)=>(

                <Grid   key={item.item.id}
                        container 
                        spacing={2}
                        justifyContent="flex-start"
                        alignItems="center">
                        <Grid item xs={2}>
                        <img src={item.item.url} style={{width:'70px', height:'100px'}}></img>
                        </Grid>
                        <Grid item xs={3}>
                           <h2>{item.item.title}</h2> 
                        </Grid>
                        <Grid container item xs={2}
                             direction="row"  
                             justifyContent="center"
                             alignItems="center"        
                        >
                            <RemoveCircleIcon color="success" onClick={()=>changeProductCount(item.count-1, item.item.id)}/>
                            <span style={{fontSize:'25px', margin:'0 5px'}}>{item.count}</span>
                            <AddCircleIcon color="success" onClick={()=>changeProductCount(item.count+1, item.item.id)} />
                        </Grid>
                        <Grid item xs={1}>
                        <h2>{"$" + item.item.price}</h2>   
                        </Grid>
                        <Grid item xs={1}>
                        <h2>{"$" + roundN(item.subPrice)}</h2>
                        </Grid>
                        <Grid item xs={1}>
                        <DeleteForeverRoundedIcon onClick={()=>deleteFromCart(item.item.id)} style={{cursor:'pointer'}}/>
                        </Grid>
                </Grid>
             ))}  
                <Grid container item xs={9}
                    justifyContent="space-between"
                    alignItems="center"
                >
                     <h2>Total price</h2>
                     <h2>{"$ " + roundN(cart.totalPrice)}</h2>
                </Grid>
                <Grid container item xs={9}
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button variant="contained" color="success">Next</Button>
                </Grid>
                
           </Container>
        </div>
    );
};

export default Cart;
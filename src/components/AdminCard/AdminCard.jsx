import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import './AdminCard.css'
import { productsContext } from '../../contexts/productsContext';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    width: 100,
    height: 150
  });
const AdminCard = ({item, productToEdit}) => {

    const { deleteProduct} = useContext(productsContext);

    return (
        <Paper sx={{ p: 2, margin: 2, maxWidth: 500, flexGrow: 1, width:'45%' }}>
        <Grid container spacing={2}>
          <Grid item>
              <Img alt="complex" src={item.url} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="div">
                 {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 {item.desc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"Author(s): " + item.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"Genre: "+item.genre}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{display:'flex' ,justifyContent:'flex-end' }} variant="body2">
                <EditRoundedIcon onClick={()=>productToEdit(item)} sx={{ cursor: 'pointer'}} color="action" fontSize='large'/>
                <DeleteForeverRoundedIcon onClick={()=> deleteProduct(item.id)} sx={{ cursor: 'pointer'}} color="action" fontSize='large'/>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
               {item.price+' $'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
};

export default AdminCard;
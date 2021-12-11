import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import './AdminCard.css'

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    width: 100,
    height: 150
  });
const AdminCard = ({item}) => {

    return (
        <Paper sx={{ p: 2, margin: 2, maxWidth: 500, flexGrow: 1, width:'45%' }}>
        <Grid container spacing={2}>
          <Grid item>
              <Img alt="complex" src={item.url} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                 {item.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                 {item.desc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.author}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                  Remove
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
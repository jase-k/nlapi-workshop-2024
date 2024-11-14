import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import axios from 'axios';

const fetchShoppingListItems = async () => {
  const response = await axios.get('/api/shopping-list');
  return response.data;
};

const ShoppingList = () => {
  const { data: items, error, isLoading, refetch } = useQuery(['shoppingList'], fetchShoppingListItems);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading shopping list</Typography>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Shopping List
      </Typography>
      <Button variant="contained" color="primary" onClick={refetch}>
        Refresh List
      </Button>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ShoppingList; 
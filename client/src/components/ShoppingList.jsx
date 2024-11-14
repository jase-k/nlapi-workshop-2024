import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import useEndpointStore from '../store/endpointStore';

const fetchShoppingListItems = async () => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
  const response = await fetch('/api/shopping-list', { headers });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ShoppingList = () => {
  const { latestEndpoints } = useEndpointStore();
  const { data: items, error, isLoading, refetch } = useQuery({
    queryKey: ['shoppingList'],
    queryFn: fetchShoppingListItems
  });
  
  useEffect(() => {
    const endpointsToCheck = ['/api/shopping-list'];
    const shouldRefetch = latestEndpoints.some((endpoint) => endpointsToCheck.includes(endpoint));
    if (shouldRefetch) {
      refetch();
    }
  }, [latestEndpoints, refetch]);

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
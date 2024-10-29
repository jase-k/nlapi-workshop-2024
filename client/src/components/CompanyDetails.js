import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const CompanyDetails = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3303/api/companies")
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error("Error fetching companies:", error));
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h5" align="center" gutterBottom>
          Company Details
        </Typography>
        <List>
          {companies.map((company) => (
            <ListItem key={company.id}>
              <ListItemText
                primary={company.name}
                secondary={company.address}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default CompanyDetails;

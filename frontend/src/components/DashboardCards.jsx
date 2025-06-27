import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const metrics = [
  { label: 'Tenants', value: 3 },
  { label: 'Users', value: 24 },
  { label: 'Roles', value: 5 },
  { label: 'Organizations', value: 4 },
  { label: 'Privileges', value: 12 },
  { label: 'Legal Entities', value: 2 },
];

const DashboardCards = () => (
  <Grid container spacing={3}>
    {metrics.map((metric) => (
      <Grid item xs={12} sm={6} md={4} key={metric.label}>
        <Card>
          <CardContent>
            <Typography variant="h6">{metric.label}</Typography>
            <Typography variant="h4" color="primary">{metric.value}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default DashboardCards; 
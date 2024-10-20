import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Navigation items
const NAVIGATION = (navigate) => [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    onClick: () => navigate('/dashboard'), // Navigate to dashboard
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
    onClick: () => navigate('/orders'), // Navigate to orders
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
        onClick: () => navigate('/reports/sales'), // Navigate to sales report
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
        onClick: () => navigate('/reports/traffic'), // Navigate to traffic report
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
    onClick: () => navigate('/integrations'), // Navigate to integrations
  },
];

// Theme configuration
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Main Dashboard Layout component
export default function DashboardLayoutBasic() {
  const navigate = useNavigate(); // Real navigation from React Router

  return (
    <AppProvider
      navigation={NAVIGATION(navigate)} // Pass navigate function
      theme={demoTheme}
      branding={{
        title: 'Labelvie',
        logo: '',
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <Box sx={{ marginBottom: '16px' }}>
            <h1>{window.location.pathname.replace('/', '')}</h1> {/* Display path as title */}
          </Box>
          <Outlet /> {/* This will render the page content based on the route */}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

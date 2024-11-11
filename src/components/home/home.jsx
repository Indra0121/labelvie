import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
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
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { logout } from '../../state/index'; // Adjust the path to your slice

const NAVIGATION = (navigate, handleLogout) => [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    onClick: () => navigate('/dashboard'),
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
    onClick: () => navigate('/orders'),
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
        onClick: () => navigate('/reports/sales'),
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
        onClick: () => navigate('/reports/traffic'),
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
    onClick: () => navigate('/integrations'),
  },
  {
    kind: 'divider',
  },
  {
    icon: <Button variant="text" color="error" onClick={handleLogout}>Log Out</Button>,
    onClick: handleLogout,
  },
];

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

export default function DashboardLayoutBasic() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/auth'); // Redirect to auth page after logout
  };

  return (
    <AppProvider
      navigation={NAVIGATION(navigate, handleLogout)}
      theme={demoTheme}
      branding={{
        title: 'Labelvie',
        logo: '',
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <Box sx={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>{window.location.pathname.replace('/', '')}</h1>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Log Out
            </Button>
          </Box>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

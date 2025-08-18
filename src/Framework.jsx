import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Divider,
  CssBaseline,
  ButtonBase,
  ListItemButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const drawerWidth = 260;

const navSections = [
  {
    label: 'Getting Started',
    items: ['Introduction', 'Starting a new project', 'GlobalProvider config'],
  },
  {
    label: 'User Info',
    items: [
      'Authentication',
      'QORT Balance'
    ],
  },
  {
    label: 'Lists',
    items: [
      'Introduction to lists',
      'Displaying a list',
      'Adding to a list',
      'Updating a list',
      'Removing from a list'
    ],
  },
  {
    label: 'Publishes',
    items: ['Fetching data', 'Cache published data', 'Deleting data'],
  },
  {
    label: 'Identifiers',
    items: ['Building identifiers', 'Searching by identifier'],
  },
  {
    label: 'Utils',
    items: [
      'Data transformation'
    ],
  },
  // {
  //   label: 'Global Components',
  //   items: [],
  // },
];

export const Framework = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { pageId, frameworkName } = useParams();

  useEffect(()=> {
    setSelected(pageId)
  }, [pageId])
  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', color: 'text.primary' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: '60px',
            height: 'calc(100vh - 60px)',
            bgcolor: theme.palette.background.paper,
            p: 2,
          },
        }}
      >
        {/* <Typography variant="h6" gutterBottom>
          Changelog
        </Typography> */}

        {navSections.map((section) => (
          <Box key={section.label} mb={2}>
            <Typography
              variant="subtitle2"
              sx={{ textTransform: 'uppercase', fontWeight: 500, mt: 2, mb: 1 }}
            >
              {section.label}
            </Typography>
            <List dense disablePadding>
              {section.items.map((item) => (
                <ListItemButton
                
                  key={item}
                  
                  selected={selected === `${section.label.toLowerCase().replace(/\s/g, '-')}-${item.toLowerCase().replace(/\s/g, '-')}`}
                  onClick={() => {
                    // setSelected(`${section.label}-${item}`);
                    navigate(`/framework/default/${section.label.toLowerCase().replace(/\s/g, '-')}-${item.toLowerCase().replace(/\s/g, '-')}`);
                  }}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 1,
                    '&.Mui-selected': {
                      bgcolor: theme.palette.primary.dark,
                    
                      cursor: 'pointer'
                    },
                  }}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        ))}
      </Drawer>

      {/* Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

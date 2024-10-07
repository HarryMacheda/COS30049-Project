import {useState, createContext, useContext} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

//Theme objects
// Light theme
const LIGHT = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: "#364882"
      },
      secondary: {
        main: "#DC6104"
      },
      background: {
        paper: "#F3F1DC",
        default: "#12182B"
      }
    },
    typography: {
        h3: {
            color: "#364882"
        }     
    }
  });
// Dark theme
const DARK = createTheme({
    palette: {
      mode: 'dark',
    },
  });


export function ThemeController({children})
{
    const [theme, setTheme] = useState(LIGHT);
    console.log(theme);

    return (
        <ThemeProvider theme={theme}> 
            <Box  sx={{
                width: "100%",
                height: "100%",
                bgcolor: theme.palette.background.default
                }}>
                {children}
            </Box>       
        </ThemeProvider>
    )
}
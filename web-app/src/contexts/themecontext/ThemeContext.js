import {useState, createContext, useContext} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

//Theme objects
// Light theme
const LIGHT = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: "#364882",
      },
      secondary: {
        main: "#DC6104"
      },
      background: {
        paper: "#F3F1DC",
        paperDark: "#D6C8AF",
        paperDarker: "#C8B493",
        default: "#12182B"
      }
    },
    typography: {
        h3: {
            color: "#364882"
        }, 
        h4: {
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

/*  This controls the theme for the website
    Currently we only have one theme this is for future development
*/ 
export function ThemeController({children})
{
    const [theme, setTheme] = useState(LIGHT);

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
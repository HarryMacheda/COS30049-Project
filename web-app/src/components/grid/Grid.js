import { Card } from '@mui/material';
import React from 'react';

// Grid component for creating a flexible grid layout
export function Grid({ rows, columns, gap = '10px', style, children })
{
  // Styles for the grid container
  const gridStyles = {
    display: 'grid', 
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${columns}, minmax(0px, ${Math.floor(100/columns)}%))`, 
    gap: gap, 
    padding: gap, 
    boxSizing: "border-box" 
  };

  // Render the grid with merged custom and default styles
  return <div style={{...style, ...gridStyles}}>{children}</div>;
};

// GridItem component for placing individual items in specified grid areas
export function GridItem({ x, width, y, height, style, children }) 
{
    // Styles for individual grid items to define position and span
    let gridItemStyles = {
      gridRowStart: y, // Starting row position
      gridRowEnd: height + y, // Ending row position based on height
      gridColumnStart: x, // Starting column position
      gridColumnEnd: width + x, // Ending column position based on width
    };

    // Render a Card component within the grid item with custom and default styles
    return (
      <div style={{ ...style, ...gridItemStyles }}>
        <Card sx={{ width: '100%', height: '100%', maxWidth: "100%" }}>
            {children}
        </Card>
      </div>
    );
};




import { Card } from '@mui/material';
import React from 'react';

window.addEventListener('resize', () => {window.location.reload()});


export function Grid({ rows, columns, gap = '10px', children })
{
    if( document.body.clientHeight > document.body.clientWidth)
    {
        let temp = rows;
        rows = columns;
        columns = temp
    }

  const gridStyles = {
    display: 'grid',
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap,
    padding: gap,
    height: "100%",
    boxSizing: "border-box" //make sure it doesnt overflow with padding
  };

  return <div style={gridStyles}>{children}</div>;
};

export function GridItem({ x, width, y, height, children }) 
{
    let gridItemStyles = null;

    if( document.body.clientHeight > document.body.clientWidth)
    {
        gridItemStyles = {
            gridRowStart: x,
            gridRowEnd:  width + x,
            gridColumnStart: y,
            gridColumnEnd: height + y,
          };
    }
    else{
        gridItemStyles = {
            gridRowStart: y,
            gridRowEnd:  height + y,
            gridColumnStart: x,
            gridColumnEnd: width + x,
          };
    }

  return <div style={gridItemStyles}>
        <Card sx={{ width: '100%', height: '100%' }}>
            {children}
        </Card>
    </div>;
};
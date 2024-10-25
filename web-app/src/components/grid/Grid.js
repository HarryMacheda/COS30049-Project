


import { Card } from '@mui/material';
import React from 'react';



export function Grid({ rows, columns, gap = '10px', style, children })
{


  const gridStyles = {
    display: 'grid',
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${columns}, minmax(0px, ${Math.floor(100/columns)}%))`,
    gap: gap,
    padding: gap,
    boxSizing: "border-box" //make sure it doesnt overflow with padding
  };

  return <div style={{...style, ...gridStyles}}>{children}</div>;
};

export function GridItem({ x, width, y, height, style, children }) 
{
    let gridItemStyles = {
      gridRowStart: y,
      gridRowEnd:  height + y,
      gridColumnStart: x,
      gridColumnEnd: width + x,
    };

  return <div style={{ ...style,...gridItemStyles}}>
        <Card sx={{ width: '100%', height: '100%', maxWidth: "100%" }}>
            {children}
        </Card>
    </div>;
};
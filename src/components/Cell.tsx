import React from 'react';
import './Cell.css';

interface CellProps {
  shape: string;
  color: string;
  onClick: () => void;
  revealed: boolean;
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  // Render cell with shape and color, use CSS to style based on shape and color.
  const { shape, color, onClick, revealed  } = props;

  return (
    <div className={`cell ${revealed ? 'revealed' : ''}`} onClick={onClick}>
      {revealed ? (
        <div className={`shape ${shape}`} style={{ backgroundColor: color }}></div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Cell;

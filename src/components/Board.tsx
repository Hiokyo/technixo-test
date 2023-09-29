// Board.tsx
import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import './Board.css';

const shapes = ['circle', 'square', 'triangle', 'diamond', 'pentagon', 'hexagon', 'octagon', 'star'];
const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink', 'brown', 'yellow'];


const generateCells = () => {
  const allShapes: { shape: string; color: string; revealed: boolean }[] = [];
  const usedShapes: { shape: string; color: string }[] = [];

  while (allShapes.length < 16) {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shapeColorPair = { shape, color };

    // Check if the pair already exists in the usedShapes array
    const isPairUsed = usedShapes.some(
      (usedPair) => usedPair.shape === shapeColorPair.shape && usedPair.color === shapeColorPair.color
    );

    // If the pair is not already used, add it to the cells
    if (!isPairUsed) {
      usedShapes.push(shapeColorPair, shapeColorPair);
      allShapes.push({ ...shapeColorPair, revealed: false }, { ...shapeColorPair, revealed: false });
    }
  }

  return shuffleArray(allShapes);
};

const shuffleArray = (array: any[]) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Board: React.FC = () => {
  const [cells, setCells] = useState(shuffleArray(generateCells()));
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  const handleCellClick = (index: number) => {
    if (selectedCells.length < 2 && !selectedCells.includes(index)) {
      setSelectedCells([...selectedCells, index]);
      if (selectedCells.length === 1) {
        setAttempts(attempts + 1);
        setTimeout(() => {
          const [firstIndex] = selectedCells;
          if (cells[firstIndex].shape !== cells[index].shape || cells[firstIndex].color !== cells[index].color) {
            setSelectedCells([]);
          } else {
            setSelectedCells([]);
            setCells(cells.map((cell, i) => (i === firstIndex || i === index ? { ...cell, revealed: true } : cell)));
          }
        }, 1000);
      }
    }
  };
  

  useEffect(() => {
    if (!cells.some(cell => !cell.revealed)) {
      setGameCompleted(true);
    }
  }, [cells]);
  

  return (
    <div className="board">
      {cells.map((cell, index) => (
        <Cell
          key={index}
          shape={cell.shape}
          color={cell.color}
          onClick={() => handleCellClick(index)}
          revealed={selectedCells.includes(index) || cell.revealed}
        />
      ))}
      {gameCompleted && <div className="completion-message">Game completed in {attempts} attempts!</div>}
    </div>
  );
};

export default Board;

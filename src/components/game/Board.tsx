'use client';
import { useState } from 'react';
import Cell from './Cell';
import { AnimatePresence } from 'framer-motion';

type Configuration = number[][];

interface BoardState {
  configuration: Configuration;
  degree: number;
}

const initialState: BoardState = {
  configuration: [[0]],
  degree: 0,
};

export default function Board() {
  const [state, setState] = useState(initialState);

  return (
    <div className="min-h-lvh p-4">
      <div className="mb-16">
        <p className="font-bold ">Degree: {state.degree}</p>
      </div>
      <div className="flex flex-1 flex-row gap-1 overflow-scroll ">
        {state.configuration.map((col, colIndex) => {
          return (
            <div key={colIndex} className="flex flex-col-reverse gap-1">
              {col.map((cellValue, rowIndex) => {
                return (
                  <Cell
                    key={`${colIndex}:${rowIndex}`}
                    value={cellValue}
                    onClick={(event) => {
                      const newConfiguration = state.configuration.slice();

                      if (event.shiftKey) {
                        if (colIndex + rowIndex === state.degree) {
                          return;
                        }
                        newConfiguration[colIndex][rowIndex] += 1;
                        let newDegree = state.degree;
                        newConfiguration[colIndex][rowIndex + 1] -= 1;
                        newConfiguration[colIndex + 1][rowIndex] -= 1;

                        const isDiagEmpty = diagEmpty(newConfiguration);

                        if (isDiagEmpty) {
                          newDegree = state.degree - 1;
                          newConfiguration.pop();
                          newConfiguration.forEach((col) => {
                            col.pop();
                          });
                        }

                        setState({
                          configuration: newConfiguration,
                          degree: newDegree,
                        });
                      } else {
                        newConfiguration[colIndex][rowIndex] -= 1;
                        let newDegree = Math.max(
                          state.degree,
                          rowIndex + colIndex + 1
                        );

                        if (newDegree > state.degree) {
                          newConfiguration.push([]);
                          newConfiguration.forEach((col) => {
                            col.push(0);
                          });
                        }

                        newConfiguration[colIndex][rowIndex + 1] += 1;
                        newConfiguration[colIndex + 1][rowIndex] += 1;

                        const isDiagEmpty = diagEmpty(newConfiguration);

                        if (isDiagEmpty) {
                          newDegree = state.degree - 1;
                          newConfiguration.pop();
                          newConfiguration.forEach((col) => {
                            col.pop();
                          });
                        }

                        setState({
                          configuration: newConfiguration,
                          degree: newDegree,
                        });
                      }
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function diagEmpty(configuration: number[][]) {
  let isDiagEmpty = true;
  for (let i = 0; i < configuration.length; i++) {
    const j = configuration.length - i - 1;
    if (configuration[i][j] !== 0) {
      isDiagEmpty = false;
      break;
    }
  }
  return isDiagEmpty;
}

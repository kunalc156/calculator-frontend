import React, { useState, useEffect } from "react";
import request from "superagent";

import CalculatorKey from "./CalculatorKey";
import CalculatorDisplay from "./CalculatorDisplay";

const Calculator = () => {
  const [state, setState] = useState({
    displayValue: "0",
  });

  //component mount
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  //component unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    let { key } = event;

    if (key === "Enter") key = "=";

    if (/\d/.test(key)) {
      event.preventDefault();
      inputDigit(parseInt(key, 10));
    } else if (key in CalculatorOperations) {
      event.preventDefault();
      performOperation(key);
    } else if (key === "Backspace") {
      event.preventDefault();
      clearLastChar();
    } else if (key === "Clear") {
      event.preventDefault();

      if (state.displayValue !== "0") {
        clearDisplay();
      } else {
        clearAll();
      }
    }
  };

  const clearAll = () => {
    setState({
      displayValue: "0",
    });
  };

  const clearDisplay = () => {
    setState({
      displayValue: "0",
    });
  };

  const CalculatorOperations = {
    "/": (prevValue, nextValue) => prevValue / nextValue,
    "*": (prevValue, nextValue) => prevValue * nextValue,
    "+": (prevValue, nextValue) => prevValue + nextValue,
    "-": (prevValue, nextValue) => prevValue - nextValue,
    "=": (prevValue, nextValue) => nextValue,
  };

  const clearLastChar = () => {
    const { displayValue } = state;

    setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || "0",
    });
  };

  const inputDigit = (digit) => {
    const { displayValue } = state;
    setState({
      displayValue: displayValue === "0" ? String(digit) : displayValue + digit,
    });
  };

  const submitExpression = () => {
    const { displayValue } = state;

    request
      .post("https://127.0.0.1:8000/calculator/evaluate")
      .set("Content-Type", "application/json")
      .send({ expression: displayValue })
      .end(function (err, res) {
        if (err) {
          console.log(err);
        }
        if (res.statusCode === 200) {
          setState({
            displayValue: res.text,
          });
        }
      });
  };

  const performOperation = (nextOperator) => {
    let { displayValue } = state;
    displayValue = displayValue + nextOperator;
    setState({
      displayValue: displayValue,
    });
  };

  return (
    <div className="calculator">
      <CalculatorDisplay value={state} />
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <CalculatorKey
              className="key-clear"
              onPress={() =>
                state.displayValue !== "0" ? clearDisplay() : clearAll()
              }
            >
              {state.displayValue !== "0" ? "C" : "AC"}
            </CalculatorKey>
            <CalculatorKey
              className="key-submit"
              onPress={() => submitExpression()}
            >
              Submit
            </CalculatorKey>
          </div>
          <div className="digit-keys">
            <CalculatorKey className="key-0" onPress={() => inputDigit(0)}>
              0
            </CalculatorKey>
            <CalculatorKey className="key-1" onPress={() => inputDigit(1)}>
              1
            </CalculatorKey>
            <CalculatorKey className="key-2" onPress={() => inputDigit(2)}>
              2
            </CalculatorKey>
            <CalculatorKey className="key-3" onPress={() => inputDigit(3)}>
              3
            </CalculatorKey>
            <CalculatorKey className="key-4" onPress={() => inputDigit(4)}>
              4
            </CalculatorKey>
            <CalculatorKey className="key-5" onPress={() => inputDigit(5)}>
              5
            </CalculatorKey>
            <CalculatorKey className="key-6" onPress={() => inputDigit(6)}>
              6
            </CalculatorKey>
            <CalculatorKey className="key-7" onPress={() => inputDigit(7)}>
              7
            </CalculatorKey>
            <CalculatorKey className="key-8" onPress={() => inputDigit(8)}>
              8
            </CalculatorKey>
            <CalculatorKey className="key-9" onPress={() => inputDigit(9)}>
              9
            </CalculatorKey>
          </div>
        </div>
        <div className="operator-keys">
          <CalculatorKey
            className="key-divide"
            onPress={() => performOperation("/")}
          >
            ÷
          </CalculatorKey>
          <CalculatorKey
            className="key-multiply"
            onPress={() => performOperation("*")}
          >
            ×
          </CalculatorKey>
          <CalculatorKey
            className="key-subtract"
            onPress={() => performOperation("-")}
          >
            −
          </CalculatorKey>
          <CalculatorKey
            className="key-add"
            onPress={() => performOperation("+")}
          >
            +
          </CalculatorKey>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

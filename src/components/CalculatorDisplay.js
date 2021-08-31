import React from "react";

const CalculatorDisplay = ({ value, ...props }) => {
  let { displayValue } = value;
  displayValue = displayValue ? displayValue : 0;
  console.log(displayValue);
  return (
    <div {...props} className="calculator-display">
      {displayValue}
    </div>
  );
};

export default CalculatorDisplay;

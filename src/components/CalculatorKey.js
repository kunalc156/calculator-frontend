import React from 'react';
import PointTarget from 'react-point'

const CalculatorKey = ({ onPress, className, ...props }) => {
    
    return (
      <PointTarget onPoint={onPress}>
        <button className={`calculator-key ${className}`} {...props}/>
      </PointTarget>
    )
}

export default CalculatorKey;


import React from 'react';

import classes from './Input.css';

const input= (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType){
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                onChange={props.change}
                value={props.value}/>
            break;
        case('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                onChange={props.change}
                value={props.value}/>
            break;
        case('select'):
            inputElement = <select
                className={inputClasses.join(' ')} 
                onChange={props.change}
                value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option 
                            key={option.value}
                            value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.change}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
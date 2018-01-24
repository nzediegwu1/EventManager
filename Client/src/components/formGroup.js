import React from 'react';

const Input = (props) => {
    if (props.params.required) {
        return (<input type={props.params.inputType} name={props.params.inputName} placeholder={props.params.placeholder} required className={props.params.className} />);
    }
    return (<input type={props.params.inputType} name={props.params.inputName} placeholder={props.params.placeholder} className={props.params.className} />);
}
export const FormGroup = (props) => {
    const content = (
        <div className="form-group">
            <div className="input-group">
                <span className="input-group-addon">
                    <img src={props.image} alt={props.alt} />
                </span>
                <Input params={props.inputProps} />
            </div>
        </div>
    );
    return content;
}

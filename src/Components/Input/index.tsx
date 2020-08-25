import React, { InputHTMLAttributes } from 'react'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    onValueChange(value: any): void
}

const Input: React.FunctionComponent<InputProps> = ({ label, name, onValueChange, ...atributes }) => {

    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                id={name}
                onChange={e => onValueChange(e.target.value)}
                {...atributes}
            />
        </div>
    )
}

export default Input;
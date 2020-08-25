import React, { SelectHTMLAttributes } from 'react'

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: Array<{
        label: string,
        value: string;
    }>
    onValueChange(value: any): void
}

const Select: React.FunctionComponent<SelectProps> = ({ label, name, options, onValueChange, ...atributes }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="-1" id={name} onChange={e=> onValueChange(e.target.value)} {...atributes}>
                <option value="-1" disabled hidden>Selecione uma opção</option>
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    )
}

export default Select;
import React, { TextareaHTMLAttributes } from 'react'

import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label: string;
    name: string;
    onValueChange(value: any): void
}

const Textarea: React.FunctionComponent<TextareaProps> = ({ label, name, onValueChange, ...atributes}) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea 
            id={name} 
            onChange={(e) => onValueChange(e.target.value)}
            {...atributes} 
            />
        </div>
    )
}

export default Textarea;
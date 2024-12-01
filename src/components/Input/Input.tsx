import {FC, InputHTMLAttributes} from "react";
import cn from "classnames";
import css from './input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
}
const Input: FC<InputProps> = (props) => {
    return <>
        {props.label ? <div className={css.root}>
            <label className={css.label}>{props.label}</label>
            <input {...props} className={cn(css.input, props.className)}/>
        </div> : <input {...props} className={cn(css.input, props.className)}/>
        }
    </>
}

export default Input

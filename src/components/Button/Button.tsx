import {ButtonHTMLAttributes, FC} from "react";
import css from './button.module.scss'
import cn from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 'small' | 'big'
}

const Button: FC<ButtonProps> = ({size = 'small', ...props}) => {
    return <button {...props}
                   className={cn(props.className, css.root, size === 'small' ? css.small : css.big)}>{props.children}</button>
}

export default Button

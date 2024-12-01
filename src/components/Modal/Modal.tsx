import {FC, HTMLAttributes, useRef} from "react";
import css from './modal.module.scss'
import {players} from "../Board/Board";
import Button from "../Button/Button";
import cn from "classnames";
import {CSSTransition} from 'react-transition-group'
import './animation.scss'

type ModalProps = HTMLAttributes<HTMLDivElement> & {
    winner: players | undefined,
    isOpen: boolean,
    close: () => void,
}

const ModalWin: FC<ModalProps> = ({winner, isOpen, close, ...props}) => {
    const ref = useRef(null)
    return <CSSTransition in={isOpen} timeout={400} classNames={'anim'} nodeRef={ref} unmountOnExit>
        {winner !== undefined &&
            <div className={css.modal} ref={ref}>
                <div {...props} className={cn(props.className, css.root)}>
                    <h3 className={css.title}>{winner !== players.draw && 'Победитель '}
                        <span
                            className={winner === players.X ? css.cross : winner === players.O ? css.circle : css.draw}>{winner}</span>
                    </h3>
                    <Button onClick={() => close()}>Вернуться в главное меню</Button>
                </div>
            </div>
        }
    </CSSTransition>
}

export default ModalWin

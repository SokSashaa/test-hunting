import {FC, useCallback, useState} from "react";
import css from './board.module.scss'
import ModalWin from "../Modal/Modal";
import {useModalState} from "../../hooks/useModalState";
import {createPortal} from "react-dom";
import Button from "../Button/Button";
import Map from "../Map/Map";
import {usePostResultGameMutation} from "../../store/redux-api";

type BoardProps = {
    size: number,
    isStart: boolean,
    setIsStart: (value: boolean) => void
}

export enum players {
    X = 'X',
    O = 'O',
    draw = 'Ничья',
}

const Board: FC<BoardProps> = ({size, ...props}) => {

    const [squares, setSquares] = useState<players[][]>(
        Array(size)
            .fill(null)
            .map(item => Array(size)
                .fill(null)
            )
    );

    const [currentPlayer, setCurrentPlayer] = useState(players.X);

    const {isOpen, open, close} = useModalState(false);

    const [winner, setWinner] = useState<players | undefined>()

    const [result] = usePostResultGameMutation()

    const calculateWinner = (newSquares: players[][]) => {
        const lines = [];
        const size = newSquares.length;

        // Проверка строк и столбцов
        for (let i = 0; i < size; i++) {
            lines.push(newSquares[i]); // строки
            lines.push(newSquares.map(row => row[i])); // столбцы
        }

        // Проверка диагоналей
        lines.push(newSquares.map((row, i) => row[i])); // главная диагональ
        lines.push(newSquares.map((row, i) => row[size - 1 - i])); // побочная диагональ
        console.log(lines)
        for (let line of lines) {
            if (line[0] !== null && line.every(cell => cell === line[0])) {
                return line[0];
            }
        }
        if (lines.every(line => line.every(cell => cell != null))) return players.draw
        return null;
    };

    const onClickSquare = useCallback((row: number, col: number) => {
        if (squares[row][col] === null && winner === undefined) { // undefined и null,т.к players.X = 0, значит,js переведет это в false при выигрыше X будет срабатывать условие всё равно
            const newSquares = [...squares]
            newSquares[row][col] = currentPlayer
            const isWinner = calculateWinner(newSquares);
            if (isWinner !== null) {
                setWinner(isWinner);
                result({
                    date: new Date().toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }).replace(',', ''),
                    cross: isWinner === players.X,
                    circle: isWinner === players.O
                })
                open(); // Открываем модальное окно только при наличии победителя
            }
            setSquares([...newSquares])
            setCurrentPlayer(currentPlayer === players.X ? players.O : players.X)
        }
    }, [currentPlayer, squares, winner])

    const onClose = () => {
        close()
        props.setIsStart(false)
    }


    return <>
        {
            <div className={css.root}>
                <h3 className={css.title}>Ходит <span
                    className={currentPlayer === players.X ? css.cross : css.circle}>{currentPlayer}</span>
                </h3>
                <Map squares={squares} onClickSquare={onClickSquare}/>
                <Button onClick={() => props.setIsStart(false)} size={'big'} disabled={winner !== undefined}>Вернуться
                    на главную</Button>
            </div>
        }
        {createPortal(<ModalWin close={onClose} isOpen={isOpen} winner={winner}/>, document.body)}
    </>
}

export default Board

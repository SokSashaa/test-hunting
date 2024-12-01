import {FC} from "react";
import css from "./map.module.scss";
import {players} from "../Board/Board";
import cn from "classnames";

type MapProps = {
    squares: players[][],
    onClickSquare: (row: number, col: number) => void,
}
const Map: FC<MapProps> = (props) => {
    return <>
        {props.squares.map((row, rowIndex) => <div key={rowIndex} className={css.rows}>
                {row.map((value, colIndex) => <button
                    className={cn(css.button, value === players.X ? css.cross : css.circle)} key={colIndex}
                    onClick={() => props.onClickSquare(rowIndex, colIndex)}>
                    {value}
                </button>)}
            </div>
        )}
    </>
}
export default Map

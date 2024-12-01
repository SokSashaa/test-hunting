import {FC} from "react";
import {players} from "../../Board/Board";
import css from './history_item.module.scss'
import cn from "classnames";
import {resultGame_dto} from "../../../dto/result_games.dto";

type HistoryProps = {
    item: resultGame_dto
}
const HistoryItem: FC<HistoryProps> = ({item}) => {

    return <div className={css.root}>
        <p>{(item.circle || item.cross) && 'Выиграл '}<span
            className={cn(css.name_win, item.cross ? css.cross : item.circle ? css.circle : css.draw)}>
            {item.cross ? players.X : item.circle ? players.O : players.draw}
        </span>
        </p>
        <p>{item.date.toString()}</p>
    </div>
}
export default HistoryItem

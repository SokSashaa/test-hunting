import {FC} from "react";
import {players} from "../Board/Board";
import css from './history.module.scss'
import cn from "classnames";
import HistoryItem from "./HistoryItem/HistoryItem";
import {useGetResultsGamesQuery} from "../../store/redux-api";

const History: FC = () => {
    //Из-за того что данные на сервере не обновляются, добавлял в сам кэш, если бы сервер отдавал обновленные данные, то при ререндере список обновлялся бы, не используя кэщ
    const {data} = useGetResultsGamesQuery()

    const count_win = (player: players) => {
        return data && data.filter(item => player === players.X ? item.cross :
            player === players.O ? item.circle :
                !item.circle && !item.cross
        ).length
    }
    const classNamePlayer = (item: players) => {
        if (item === players.X) return css.cross
        else if (item === players.O) return css.circle
        else return css.draw
    }

    return <div className={css.root}>
        <h1 className={css.name_history}>История игр</h1>
        <div className={css.root_count_win}>
            {Object.values(players).map((item) =>
                <div className={css.item} key={item}>
                    <p className={cn(css.title, classNamePlayer(item))}>
                        {item}
                    </p>
                    <p className={css.count}>{count_win(item)}</p>
                </div>
            )}
        </div>
        {data && data.map((item, index) => <HistoryItem key={index} item={item}/>)}
    </div>
}
export default History

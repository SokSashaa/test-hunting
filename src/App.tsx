import React, {useState} from 'react';
import css from './app.module.scss'
import Input from "./components/Input/Input";
import Board from "./components/Board/Board";
import Button from "./components/Button/Button";
import History from "./components/History/History";


function App() {
    const [isStart, setIsStart] = useState(false)

    const [size, setSize] = useState(3)

    return (
        <div className={css.root}>
            {!isStart ? (
                    <>
                        <h1>Крестики нолики</h1>
                        <div className={css.settings}>
                            <Input name={'columns'} label={'Размер(3-8)'} type={'number'} max={8} min={3}
                                   defaultValue={size}
                                   onChange={(event) => {
                                       const value = Number(event.target.value);
                                       if (value <= 8 && value >= 3) setSize(value)
                                       else if (value < 3) setSize(3)
                                       else setSize(8)
                                   }}/>
                            <Button onClick={() => setIsStart(!isStart)} size={'small'}>Начать игру</Button>
                        </div>
                        <History/>
                    </>
                ) :
                (
                    <Board size={size} isStart={isStart} setIsStart={setIsStart}/>
                )
            }
        </div>
    );
}

export default App;

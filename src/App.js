import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Chart from './Chart';
import { lineToData } from './utils';
import './styles.css';

import raw from './chart-sample';
const lines = raw.split('\n');

export default () => {
    const [play, setPlay] = useState(false);
    const [showNone, setShowNone] = useState(false);
    const [height, setHeight] = useState(-1);
    const [step, setStep] = useState(5);
    const line = Math.floor(height / 10);
    const [meta, data] = lineToData(lines[line], showNone);

    const onChange = e => {
        const n = parseInt(e.target.value, 10);

        if (n >= 0 && n < lines.length - 1) {
            setHeight(n);
        }
    };

    const onClickPlay = () => {
        setPlay(!play);
        if (height === lines.length) {
            setHeight(2000);
        }
    };

    useEffect(() => {
        if (!play) return;
        const next = Math.min(line + step, lines.length - 1) * 10;

        if (next !== height) {
            const timeout = setTimeout(() => setHeight(next), 10);

            return () => clearTimeout(timeout);
        } else {
            setPlay(false);
        }
    }, [play, setHeight, height, setPlay, step, line]);

    return (
        <div className="App">
            <h1>Handshake</h1>
            <h2>{!!meta.date && moment.utc(+meta.date * 1000).format('LL')}&nbsp;</h2>
            <div>
                <Chart data={data} />
            </div>
            <p></p>
            Height: <input type="number" value={height} onChange={onChange} />
            <button onClick={onClickPlay} style={{ width: 55 }}>
                {play ? 'Pause' : 'Play'}
            </button>
            <br />
            Speed:{' '}
            <input
                type="range"
                min={1}
                max={20}
                value={step}
                onChange={e => setStep(+e.target.value)}
                style={{ width: 210 }}
            />
            <br />
            Show "None"?{' '}
            <input
                type="checkbox"
                defaultChecked={showNone}
                onClick={() => setShowNone(!showNone)}
            />
        </div>
    );
};

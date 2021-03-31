import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FixedSizeListProps, FixedSizeList } from 'react-window';
import { TileState, TileProps, Tile, TileStrip } from './Tile';

// import { Decade, DecadeStrip } from './Decade';
const { Day, DayStrip }       = require('./Day.tsx');
const { Decade, DecadeStrip } = require('./Decade.tsx');    // Uhh. :-\ See: https://github.com/Microsoft/TypeScript/issues/14558#issuecomment-385846741

/* CSS manipulation */

export function get_css_class(selector: string): CSSStyleRule {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet: CSSStyleSheet = document.styleSheets[i];

        for (var j = 0; j < sheet.cssRules.length; j++) {
            var rule = sheet.rules[j];

            if (rule instanceof CSSStyleRule) {
                if (rule.selectorText == selector) {
                    return rule;
                }
            }
        }
    }

    throw new Error('Style `' + selector + '` not found.');
}

/* Holidays */

export var HOLIDAYS = [
    {"name": "Vánoční prázdniny",    "start": [2018, 12, 22], "end": [2019,  1,  2]},
    {"name": "Pololetní prázdniny",  "start": [2019,  2,  1], "end": [2019,  2,  2]},
    {"name": "Jarní prázdniny",      "start": [2019,  2, 18], "end": [2019,  2, 24]},
    {"name": "Velikonoc. prázdniny", "start": [2019,  4, 18], "end": [2019,  4, 19]},
    {"name": "Summer holidays",      "start": [2019,  6, 28], "end": [2019,  9,  2]},
    {"name": "Den české státnosti",  "start": [2019,  9, 28], "end": [2019,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2019, 10, 28], "end": [2019, 10, 30]},
    {"name": "Den boje za dem.",     "start": [2019, 11, 17], "end": [2019, 11, 18]},
    {"name": "Vánoční prázdniny",    "start": [2019, 12, 23], "end": [2020,  1,  5]},

    {"name": "Pololetní prázdniny",  "start": [2019,  2,  1], "end": [2019,  2,  2]},
    {"name": "Jarní prázdniny",      "start": [2019,  2, 18], "end": [2019,  2, 24]},
    {"name": "Velikonoc. prázdniny", "start": [2021,  4,  1], "end": [2021,  4,  4]},
    {"name": "Summer holidays",      "start": [2019,  6, 28], "end": [2019,  9,  2]},
    {"name": "Den české státnosti",  "start": [2019,  9, 28], "end": [2019,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2019, 10, 28], "end": [2019, 10, 30]},
    {"name": "Den boje za dem.",     "start": [2019, 11, 17], "end": [2019, 11, 18]},
    {"name": "Vánoční prázdniny",    "start": [2019, 12, 23], "end": [2020,  1,  5]},
];

export function date_from_tuple (dtup: number[]) {
    return new Date(dtup[0], dtup[1] - 1, dtup[2]);
}

/* App */

function App() {
    return (
        <div className="App">
            <DayStrip/>
            <DecadeStrip/>
        </div>
    );
}

export default App;

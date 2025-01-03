import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FixedSizeListProps, FixedSizeList } from 'react-window';
import { TileState, TileProps, Tile, TileStrip } from './Tile';

// import { Decade, DecadeStrip } from './Decade';
const { Day, DayStrip }       = require('./Day.tsx');
const { Year, YearStrip }     = require('./Year.tsx');
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

export interface Holiday {
    name:  string,
    start: number[],
    end:   number[],
}

export var HOLIDAYS: Holiday[] = [
    // Fake!
    {"name": "Vánoční prázdniny",    "start": [2016, 12, 22], "end": [2017,  1,  2]},
    {"name": "Pololetní prázdniny",  "start": [2017,  2,  1], "end": [2017,  2,  2]},
    {"name": "Jarní prázdniny",      "start": [2017,  2, 18], "end": [2017,  2, 24]},
    {"name": "Velikonoc. prázdniny", "start": [2017,  4, 18], "end": [2017,  4, 19]},
    {"name": "Summer holidays",      "start": [2017,  6, 28], "end": [2017,  9,  2]},
    {"name": "Den české státnosti",  "start": [2017,  9, 28], "end": [2017,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2017, 10, 28], "end": [2017, 10, 30]},
    {"name": "Den boje za dem.",     "start": [2017, 11, 17], "end": [2017, 11, 18]},

    {"name": "Vánoční prázdniny",    "start": [2017, 12, 22], "end": [2018,  1,  2]},
    {"name": "Pololetní prázdniny",  "start": [2018,  2,  1], "end": [2018,  2,  2]},
    {"name": "Jarní prázdniny",      "start": [2018,  2, 18], "end": [2018,  2, 24]},
    {"name": "Velikonoc. prázdniny", "start": [2018,  4, 18], "end": [2018,  4, 19]},
    {"name": "Summer holidays",      "start": [2018,  6, 28], "end": [2018,  9,  2]},
    {"name": "Den české státnosti",  "start": [2018,  9, 28], "end": [2018,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2018, 10, 28], "end": [2018, 10, 30]},
    {"name": "Den boje za dem.",     "start": [2018, 11, 17], "end": [2018, 11, 18]},

    {"name": "Vánoční prázdniny",    "start": [2018, 12, 22], "end": [2019,  1,  2]},
    {"name": "Pololetní prázdniny",  "start": [2019,  2,  1], "end": [2019,  2,  2]},
    {"name": "Jarní prázdniny",      "start": [2019,  2, 18], "end": [2019,  2, 24]},
    {"name": "Velikonoc. prázdniny", "start": [2019,  4, 18], "end": [2019,  4, 19]},
    {"name": "Summer holidays",      "start": [2019,  6, 28], "end": [2019,  9,  2]},
    {"name": "Den české státnosti",  "start": [2019,  9, 28], "end": [2019,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2019, 10, 28], "end": [2019, 10, 30]},
    {"name": "Den boje za dem.",     "start": [2019, 11, 17], "end": [2019, 11, 18]},

    {"name": "Vánoční prázdniny",    "start": [2019, 12, 23], "end": [2020,  1,  5]},   // https://surpanblog.cz/rubriky/jen-se-vykecam/skolni-prazdniny-a-volno-pro-rok-6
    {"name": "Pololetní prázdniny",  "start": [2020,  1, 31], "end": [2020,  2,  1]},
    {"name": "Jarní prázdniny",      "start": [2020,  2, 24], "end": [2020,  3,  1]},
    {"name": "Velikonoc. prázdniny", "start": [2020,  4,  9], "end": [2020,  4, 13]},
    {"name": "Summer holidays",      "start": [2020,  7,  1], "end": [2020,  9,  1]},
    {"name": "Den české státnosti",  "start": [2020,  9, 28], "end": [2020,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2020, 10, 29], "end": [2020, 10, 31]},
    {"name": "Den boje za dem.",     "start": [2020, 11, 17], "end": [2020, 11, 18]},

    {"name": "Vánoční prázdniny",    "start": [2020, 12, 23], "end": [2021,  1,  3]},
    {"name": "Pololetní prázdniny",  "start": [2021,  1, 29], "end": [2021,  2,  1]},
    {"name": "Jarní prázdniny",      "start": [2021,  3,  1], "end": [2021,  3,  8]},
    {"name": "Velikonoc. prázdniny", "start": [2021,  4,  1], "end": [2021,  4,  4]},
    {"name": "Summer holidays",      "start": [2021,  7,  1], "end": [2021,  9,  1]},
    {"name": "Den české státnosti",  "start": [2021,  9, 28], "end": [2021,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2019, 10, 28], "end": [2019, 10, 30]},
    {"name": "Den boje za dem.",     "start": [2021, 11, 17], "end": [2021, 11, 18]},

    // Fake!
    {"name": "Vánoční prázdniny",    "start": [2021, 12, 23], "end": [2022,  1,  3]},
    {"name": "Pololetní prázdniny",  "start": [2022,  1, 29], "end": [2022,  2,  1]},
    {"name": "Jarní prázdniny",      "start": [2022,  3,  1], "end": [2022,  3,  8]},
    {"name": "Velikonoc. prázdniny", "start": [2022,  4,  1], "end": [2022,  4,  4]},
    {"name": "Summer holidays",      "start": [2022,  7,  1], "end": [2022,  9,  1]},
    {"name": "Den české státnosti",  "start": [2022,  9, 28], "end": [2022,  9, 29]},
    {"name": "Podzimní prázdniny",   "start": [2019, 10, 28], "end": [2019, 10, 30]},
    {"name": "Den boje za dem.",     "start": [2022, 11, 17], "end": [2022, 11, 18]},
];

export var BDAY: number[] = [2002, 10, 1];

export function date_from_tuple (dtup: number[]) {
    return new Date(dtup[0], dtup[1] - 1, dtup[2]);
}

/* App */

function App() {
    return (
        <div className="App">
            <h2>Days</h2>
            <DayStrip/>
            <h2>Years</h2>
            <YearStrip/>
            <h2>Decades</h2>
            <DecadeStrip/>
        </div>
    );
}

export default App;

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

export interface Annotation {
    name: string,
    date: number[], // variable length, based on labeled unit of time
}

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

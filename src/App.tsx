import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FixedSizeListProps, FixedSizeList } from 'react-window';

/* CSS manipulation */

function get_css_class(selector: string): CSSStyleRule {
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

var HOLIDAYS = [
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

function date_from_tuple (dtup: number[]) {
    return new Date(dtup[0], dtup[1] - 1, dtup[2]);
}

/* General */

interface TileState {
    labels: string[]
}

interface TileProps extends React.HTMLAttributes<unknown> {
    offset: number
    labels?: string[]
}

abstract class Tile<P extends TileProps = TileProps, S extends TileState = TileState> extends React.Component<P, S> {
    constructor (props: P) {
        super(props);

        this.state = {
            labels: props.labels ?? []
        } as S;     // https://stackoverflow.com/questions/51651678/react-with-typescript-type-is-not-assignable-to-type-readonlys
    }

    abstract get_progress(): number | null;

    get_indicator(): JSX.Element | null {
        var day_frac = this.get_progress();

        if (day_frac != null) {
            return (
                <div className="indicator" style={{width: (day_frac * 100) + '%'}}></div>
            );
        } else {
            return null;
        }
    }

    abstract render_tile(): React.ReactNode;

    render() {
        return (
            <div className="tile-container" style={this.props.style}>
                {this.state.labels.map(label => (<div className="day-label">{label}</div>))}
                {this.render_tile()}
            </div>
        );
    }
}

abstract class TileStrip<P, S> extends React.Component<P, S> {
}

/* Day */

interface DayState extends TileState {
    date: Date,
}

interface DayProps extends TileProps {
    offset: number,
}
//18717
class Day extends Tile<DayProps, DayState> {
	constructor(props: DayProps) {
		super(props);

        this.state = {
            date: new Date((1000*60*60*24)*props.offset),
            ...(this.state as TileState),
        };

        if (this.state.date.getDate() == 1) {
            this.state.labels.push(Day.month_names_full[this.state.date.getMonth()]);
        }
	}

    get_progress() {
        if (Day.since_epoch(this.state.date) == Day.since_epoch(new Date)) {
            var now = new Date();
            return (60 * now.getHours() + now.getMinutes()) / (60 * 24);
        } else {
            return null;
        }
    }

    render_tile() {
        var class_name = 'tile day-tile';
        if (this.is_weekend()) {
            class_name += ' day-weekend';
        }

        return (
            <div className={class_name}>
                {this.is_holiday() ? <div className="day-holiday"/> : null}
                <h2 className="day-no">{this.state.date.getDate()}</h2>
                <h3 className="day-name">{Day.names[this.state.date.getDay()]}</h3>
                {this.get_indicator()}
                {this.props.offset == Day.since_epoch(new Date()) ? this.get_indicator() : null}
            </div>
        );
    }

    /* Real World Stuff */

    static names: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    static month_names_full: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    is_holiday(): boolean {
        for (var i = 0; i < HOLIDAYS.length; i++) {
            var start = date_from_tuple(HOLIDAYS[i].start);
            var end   = date_from_tuple(HOLIDAYS[i].end);

            if (start.getTime() <= this.state.date.getTime() && this.state.date.getTime() < end.getTime())
            {
                return true;
            }
        }

        return false;
    }

    is_weekend(): boolean {
        var day_no = this.state.date.getDay();  // Day of the week
        return day_no == 0 || day_no == 6;
    }

    static since_epoch(date: Date): number      // Days since the epoch
    {
        var diff = date.getTime() - (new Date(0)).getTime();
        return Math.floor(diff / (24*60*60*1000));
    }
}

interface DayStripProps {
}

class DayStrip extends TileStrip<DayStripProps, {}>
{
    constructor(props: DayStripProps) {
        super(props);
    }

    render() {
        var tile_style = get_css_class(".tile").style;
        var day_style = get_css_class(".day-tile").style;

        // height={2*parseInt(day_style.borderWidth) + parseInt(day_style.height) + parseInt(day_style.marginTop) + parseInt(day_style.marginBottom)}
        return (
            <FixedSizeList
                ref={view => {if (view != null) {(view as FixedSizeList).scrollToItem(Day.since_epoch(new Date), "center"); }}}
                className="tile-strip"
                height={200}
                width={800}
                itemCount={45000}
                itemSize={parseInt(tile_style.borderWidth) + parseInt(day_style.width)}
                layout="horizontal"
            >
                {({index, style}) => { return (
                    <Day offset={index} style={{position: style.position, left: style.left}}/>
                );}}
            </FixedSizeList>
        );
    }
}

/* Decade */

interface DecadeProps extends TileProps {
    offset: number,
}

interface DecadeState extends TileState {
    first_year: number,
}

class Decade extends Tile<DecadeProps, DecadeState> {
	constructor(props: DecadeProps) {
		super(props);

        this.state = {
            first_year: DecadeStrip.first + props.offset*10,
            ...(this.state as TileState),
        };
	}

    get_progress() {
        if (Math.floor((new Date).getFullYear() / 10) == this.state.first_year / 10) {
            var now = new Date();
            return (now.getFullYear() - this.state.first_year) / 10;
        } else {
            return null;
        }
    }

    render_tile() {
        return (
            <div className="tile decade-tile">
                <h2 className="day-no">{this.state.first_year}</h2>
                {this.get_indicator()}
            </div>
        );
    }
}

class DecadeStrip extends TileStrip<{}, {}>
{
    static first = 1700;
    static last  = 2120;

    constructor(props: DayStripProps) {
        super(props);
    }

    render() {
        var tile_style = get_css_class(".tile").style;
        var decade_style = get_css_class(".decade-tile").style;

        // height={2*parseInt(day_style.borderWidth) + parseInt(day_style.height) + parseInt(day_style.marginTop) + parseInt(day_style.marginBottom)}
        return (
            <FixedSizeList
                ref={view => {if (view != null) {(view as FixedSizeList).scrollToItem(((new Date).getFullYear() - DecadeStrip.first) / 10, "center"); }}}
                className="tile-strip"
                height={200}
                width={800}
                itemCount={(DecadeStrip.last - DecadeStrip.first) / 10}
                itemSize={parseInt(tile_style.borderWidth) + parseInt(decade_style.width)}
                layout="horizontal"
            >
                {({index, style}) => { return (
                    <Decade offset={index} style={{position: style.position, left: style.left}}/>
                );}}
            </FixedSizeList>
        );
    }
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

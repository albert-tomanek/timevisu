import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FixedSizeListProps, FixedSizeList } from 'react-window';

/* CSS manipulation */

function get_css_class(name: string): CSSStyleRule | null {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet: CSSStyleSheet = document.styleSheets[i];

        for (var j = 0; j < sheet.cssRules.length; j++) {
            var rule = sheet.rules[j];

            if (rule instanceof CSSStyleRule) {
                if (rule.selectorText == name) {
                    return rule;
                }
            }
        }
    }

    return null;
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
];

function date_from_tuple (dtup: number[]) {
    var d = new Date();

    d.setFullYear(dtup[0]);
    d.setMonth(dtup[1] - 1);
    d.setDate(dtup[2]);

    return d;
}

/* Day */

interface DayState {
    date: Date
}

interface DayProps extends React.HTMLAttributes<unknown> {
    offset: number
}
//18717
class Day extends React.Component<DayProps, DayState> {
	constructor(props: DayProps) {
		super(props);

        var d = new Date(0);
        d.setDate(d.getDate() + props.offset);
        this.state = {
            date: d
        };
	}

    get_indicator(): JSX.Element {
      var now = new Date();//this.state.date;
      var day_fract = (60 * now.getHours() + now.getMinutes()) / (60 * 24);

      return (
        <div className="indicator" style={{width: (day_fract * 100) + '%'}}></div>
      );
    }

	render() {
        var day_no = this.state.date.getDay();  // Day of the week

        var class_name = 'day-tile';
        if  (day_no == 0 || day_no == 6)  { class_name += ' day-weekend'; }

        return (
          <div className={class_name} style={this.props.style}>
            {Day.is_holiday(this.state.date) ? <div className="holiday-marker"/> : null}
            <h2 className="day-no">{this.state.date.getDate()}</h2>
            <h3 className="day-name">{Day.names[day_no]}</h3>
            {this.props.offset == Day.since_epoch(new Date()) ? this.get_indicator() : null}
          </div>
        );
	}

    /* Real World Stuff */

    static names: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    static is_holiday(date: Date) {
        for (var i = 0; i < HOLIDAYS.length; i++) {
            var start = date_from_tuple(HOLIDAYS[i].start);
            var end   = date_from_tuple(HOLIDAYS[i].end);

            if (start.getTime() <= date.getTime() && date.getTime() < end.getTime())
            {
                return true;
            }
        }

        return false;
    }

    static since_epoch(date: Date): number      // Days since the epoch
    {
        var diff = date.getTime() - (new Date(0)).getTime();
        return Math.floor(diff / (24*60*60*1000));
    }
}

class DayView extends FixedSizeList
{
    constructor(props: FixedSizeListProps) {
        super(props);
    }

    componentDidMount() {
        var idx = Day.since_epoch(new Date);
        this.scrollToItem(idx, "center");
    }
}

function App() {
    var day_style = get_css_class(".day-tile")?.style;
    var day_view: React.RefObject<DayView> = React.createRef();

    return (
        <div className="App">
            <DayView
                ref={day_view}
                className="days-strip"
                height={day_style ? parseInt(day_style.height) : 20}
                width={600}
                itemCount={45000}
                itemSize={day_style ? parseInt(day_style.width) + parseInt(day_style.borderWidth) : 20}
                layout="horizontal"
            >
                {({index, style}) => { return (<Day offset={index} style={{position: style.position, top: style.top, left: style.left}}/>);}}
            </DayView>
        </div>
    );
}

export default App;

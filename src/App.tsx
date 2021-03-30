import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AutoSizer, Grid, InfiniteLoader, InfiniteLoaderProps } from 'react-virtualized';
// import { Virtual } from 'react-virtual-dynamic-list';   // This doesn't have types. Had to set noImplicitAny to false in tsconfig.json. https://medium.com/@chris_72272/migrating-to-typescript-write-a-declaration-file-for-a-third-party-npm-module-b1f75808ed2

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

interface DayProps {
    offset: number
}

class Day extends React.Component<DayProps, DayState> {
	constructor(props: DayProps) {
		super(props);

        var d = new Date();
        d.setDate(d.getDate() + props.offset);
        this.state = {
            date: d
        };
	}

    get_indicator(): JSX.Element {
      var now = this.state.date
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
          <div className={class_name}>
            {Day.is_holiday(this.state.date) ? <div className="holiday-marker"/> : null}
            <h2 className="day-no">{this.state.date.getDate()}</h2>
            <h3 className="day-name">{Day.names[day_no]}</h3>
            {this.props.offset == 0 ? this.get_indicator() : null}
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
}

// class DaysView extends InfiniteLoader
// {
//     constructor(props: InfiniteLoaderProps) {
//         props.isRowLoaded  = this.is_row_loaded;
//         props.loadMoreRows = this.load_more_rows;
//         props.rowCount = this.row_count;
//         super(props);
//     }
//
//     is_row_loaded (params: Index) => boolean {
//         return true;
//     }
// }

function App() {
    return (
        <div className="App">
            {/* <Virtual
                className="days-container"
                items={[0,1,2,3,4,5,6,7]}
                renderItem={idx => (<Day offset={idx} />)}
            /> */}
            <AutoSizer>
              {({ height, width }) => (
                <Grid
                  cellRenderer={({ columnIndex, key, rowIndex, style }) => <div key={key} style={style}>...</div>}
                  columnCount={numColumns}
                  columnWidth={100}
                  height={600}
                  rowCount={1}
                  rowHeight={600}
                  width={width}
                />
              )}
            </AutoSizer>
        </div>
    );
}
// react-window
export default App;

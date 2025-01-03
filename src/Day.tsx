import React from 'react';
import { FixedSizeListProps, FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { TileState, TileProps, Tile, TileStrip } from './Tile';
import { get_css_class, date_from_tuple, HOLIDAYS } from './App';

/* Day */

interface DayState extends TileState {
    date: Date,
}

interface DayProps extends TileProps {
    offset: number,
}
//18717
export class Day extends Tile<DayProps, DayState> {
	constructor(props: DayProps) {
		super(props);

        this.state = {
            date: new Date((1000*60*60*24)*props.offset),
            ...(this.state as TileState),
        };

        if (this.state.date.getDate() == 1) {
            var month = this.state.date.getMonth();
            if (month == 0) {
                this.state.labels.push(Day.month_names_full[month] + ' ' + this.state.date.getFullYear());
            } else {
                this.state.labels.push(Day.month_names_full[month]);
            }
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
        var diff = date.getTime() - (60*1000 * date.getTimezoneOffset()) - (new Date(0)).getTime();
        return Math.floor(diff / (24*60*60*1000));
    }
}

interface DayStripProps {
}

export class DayStrip extends TileStrip<DayStripProps, {}>
{
    constructor(props: DayStripProps) {
        super(props);
    }

    render() {
        var tile_style = get_css_class(".tile").style;
        var day_style = get_css_class(".day-tile").style;

        // height={2*parseInt(day_style.borderWidth) + parseInt(day_style.height) + parseInt(day_style.marginTop) + parseInt(day_style.marginBottom)}
        return (
            <div className="tile-strip-parent">
            <AutoSizer disableHeight={false}>
                {({height, width}) => (
                    <FixedSizeList
                        ref={view => {if (view != null) {(view as FixedSizeList).scrollToItem(Day.since_epoch(new Date), "center"); }}}
                        className="tile-strip"
                        height={height}
                        width={width}
                        itemCount={45000}
                        itemSize={parseInt(tile_style.borderWidth) + parseInt(day_style.width)}
                        layout="horizontal"
                    >
                        {({index, style}) => { return (
                            <Day offset={index} style={{position: style.position, left: style.left}}/>
                        );}}
                    </FixedSizeList>
                )}
            </AutoSizer>
            </div>
        );
    }
}

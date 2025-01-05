import React from 'react';
import { FixedSizeListProps, FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { TileState, TileProps, Tile, TileStrip } from './Tile';
import { create_holiday_div } from './Year';
import { get_css_class } from './App';
import { HOLIDAYS, PERIODS } from './data';

interface DecadeProps extends TileProps {
    offset: number,
}

interface DecadeState extends TileState {
    first_year: number,
}

export class Decade extends Tile<DecadeProps, DecadeState> {
    static len = 1000 * 60 * 60 * 24 * 365 * 10;

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
                {PERIODS.map(p => create_holiday_div({ name: p.name, start: p.from, end: p.to }, (new Date(this.state.first_year, 0, 1)).getTime(), Decade.len, 480, p.color))}
                {HOLIDAYS.map(h => create_holiday_div(h, (new Date(this.state.first_year, 0, 1)).getTime(), Decade.len, 480))}
                <h2 className="day-no">{this.state.first_year}</h2>
                {this.get_indicator()}
            </div>
        );
    }
}

export class DecadeStrip extends TileStrip<{}, {}>
{
    static first = 1700;
    static last  = 2120;

    constructor(props: {}) {
        super(props);
    }

    render() {
        var tile_style = get_css_class(".tile").style;
        var decade_style = get_css_class(".decade-tile").style;

        // height={2*parseInt(day_style.borderWidth) + parseInt(day_style.height) + parseInt(day_style.marginTop) + parseInt(day_style.marginBottom)}
        return (
            <div className="tile-strip-parent">
            <AutoSizer disableHeight={true}>
                {({height, width}) => (
                    <FixedSizeList
                        ref={view => {if (view != null) {(view as FixedSizeList).scrollToItem(((new Date).getFullYear() - DecadeStrip.first) / 10, "end"); }}}
                        className="tile-strip"
                        height="11em"
                        width={width}
                        itemCount={(DecadeStrip.last - DecadeStrip.first) / 10}
                        itemSize={parseInt(tile_style.borderWidth) + parseInt(decade_style.width)}
                        layout="horizontal"
                    >
                        {({index, style}) => { return (
                            <Decade offset={index} style={{position: style.position, left: style.left}}/>
                        );}}
                    </FixedSizeList>
                )}
            </AutoSizer>
            </div>
        );
    }
}

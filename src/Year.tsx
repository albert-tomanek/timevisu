import React from 'react';
import { FixedSizeListProps, FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { TileState, TileProps, Tile, TileStrip } from './Tile';
import { get_css_class, date_from_tuple, Holiday } from './App';
import { ANNOTATIONS, HOLIDAYS } from './data';

interface YearProps extends TileProps {
    offset: number,
}

interface YearState extends TileState {
    jan1: Date,
}

export class Year extends Tile<YearProps, YearState> {
    static len = (365*24*60*60*1000);

	constructor(props: YearProps) {
		super(props);

        this.state = {
            jan1: new Date(YearStrip.first + props.offset, 0, 1),
            ...(this.state as TileState),
        };

        this.state.labels.push(this.state.jan1.getFullYear().toString());
	}

    get_progress() {
        if ((new Date).getFullYear() == this.state.jan1.getFullYear()) {
            var now = new Date();
            return (now.getTime() - this.state.jan1.getTime()) / Year.len;
        } else {
            return null;
        }
    }

    render_tile() {
        /* Create holidays */
        var holiday_divs: (JSX.Element | null)[] = HOLIDAYS
            .map(h => create_holiday_div(h, this.state.jan1.getTime(), Year.len, 900));

        /* Create month markers */
        var month_markers: JSX.Element[] = [];
        for (var d = new Date(this.state.jan1), start_fract = 0, end_fract = 0, i = 0; i < 12 - 1; i++)   // 12 - 1: we don;t need the last month marker
        {
            start_fract = (d.getTime() - this.state.jan1.getTime()) / Year.len;
            d.setMonth(d.getMonth() + 1);
            end_fract   = (d.getTime() - this.state.jan1.getTime()) / Year.len;

            let annotations: string[] = ANNOTATIONS
                .filter(a => a.date.length == 2)
                .filter(a => (a.date[0] == d.getUTCFullYear() && a.date[1] == d.getMonth() + 1))
                .map(a => a.name);

            month_markers.push(
                <div className="month-div" style={{width: (end_fract - start_fract) * 900}} key={d.toUTCString()}>
                    {annotations.length ? (<div className="annotation">{annotations.join('\n')}</div>) : null}
                </div>
            );
        }

        return (
            <div className="tile year-tile">
                {/* <h2 className="day-no">{this.state.jan1.getFullYear()}</h2> */}
                {holiday_divs}
                {month_markers}
                {this.get_indicator()}
            </div>
        );
    }
}

export const create_holiday_div = (
    hday: Holiday,
    block_start: number,
    block_duration: number,
    block_width_px: number
): JSX.Element | null => {
    var start = date_from_tuple(hday['start']);
    var end   = date_from_tuple(hday['end']);

    if (end.getTime() < block_start || start.getTime() >= (block_start + block_duration)) {
        return null;
    }
    
    if (start.getTime() < block_start) {
        start = new Date(block_start);
    }
    if (end.getTime() >= (block_start + block_duration)) {
        end = new Date(block_start + block_duration);
    }

    return (
        <div
            className="holiday-block"
            style={{
                left: ((start.getTime() - block_start) / block_duration * block_width_px).toString() + 'px',
                width: (((end.getTime() - start.getTime()) / block_duration) * block_width_px).toString() + 'px'
            }}
        >
        </div>
    );
}

export class YearStrip extends TileStrip<{}, {}>
{
    static first = 1700;
    static last  = 2120;

    constructor(props: {}) {
        super(props);
    }

    render() {
        var tile_style = get_css_class(".tile").style;
        var year_style = get_css_class(".year-tile").style;

        // height={2*parseInt(day_style.borderWidth) + parseInt(day_style.height) + parseInt(day_style.marginTop) + parseInt(day_style.marginBottom)}
        return (
            <div className="tile-strip-parent">
            <AutoSizer disableHeight={true}>
                {({height, width}) => (
                    <FixedSizeList
                        ref={view => {if (view != null) {(view as FixedSizeList).scrollToItem(((new Date).getFullYear() - YearStrip.first), "center"); }}}
                        className="tile-strip"
                        height="11em"
                        width={width}
                        itemCount={YearStrip.last - YearStrip.first}
                        itemSize={parseInt(tile_style.borderWidth) + parseInt(year_style.width)}
                        layout="horizontal"
                    >
                        {({index, style}) => { return (
                            <Year offset={index} style={{position: style.position, left: style.left}}/>
                        );}}
                    </FixedSizeList>
                )}
            </AutoSizer>
            </div>
        );
    }
}

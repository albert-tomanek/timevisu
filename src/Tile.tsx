import React from 'react';

export interface TileState {
    labels: string[]
}

export interface TileProps extends React.HTMLAttributes<unknown> {
    offset: number
    labels?: string[]
}

export abstract class Tile<P extends TileProps = TileProps, S extends TileState = TileState> extends React.Component<P, S> {
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

export abstract class TileStrip<P, S> extends React.Component<P, S> {
}

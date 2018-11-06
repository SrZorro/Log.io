import { Component } from "inferno";
import { inject, observer } from "inferno-mobx";
import { computed } from "mobx";
import { style } from "typestyle";
import Client, { ILog } from "../Client";

import Screen from "./Screen";
import LogLine from "./LogLine";

const classMain = style({
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    padding: "5px",
    boxSizing: "border-box",
});

@inject("ElasticFox") @observer
export default class Screens extends Component<any, any> {
    @computed get logs() {
        return this.props.ElasticFox.logs;
    }
    @computed get checkedMappings() {
        return this.props.ElasticFox.checkedMappings;
    }
    public render() {
        const nodes = this.logs.reduce((filtered: JSX.Element[], log: ILog) => {
            if (this.checkedMappings.get(`${log.harvester}|${log.application}|${log.file}`)[0]) {
                filtered.push(<LogLine
                    harvester={log.harvester}
                    harvesterColor={(this.props.ElasticFox as Client).colorMapings.get(`${log.harvester}`)}
                    application={log.application}
                    applicationColor={(this.props.ElasticFox as Client).colorMapings.get(`${log.harvester}|${log.application}`)}
                    file={log.file}
                    fileColor={(this.props.ElasticFox as Client).colorMapings.get(`${log.harvester}|${log.application}|${log.file}`)}
                >{log.line}</LogLine>);
            }
            return filtered;
        }, []);
        return (
            <div class={classMain}>
                <Screen>
                    {nodes}
                </Screen>
            </div>
        );
    }
}
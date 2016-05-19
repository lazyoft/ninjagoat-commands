import ICommandDispatcher from "./ICommandDispatcher";
import CommandResponse from "../CommandResponse";
import IMetadataEnricher from "../enrichers/IMetadataEnricher";
import * as _ from "lodash";
import {injectable, inject, multiInject} from "inversify";
import {Dictionary} from "ninjagoat";

@injectable()
class CommandDispatcherEnricher implements ICommandDispatcher {

    constructor(@inject("CommandDispatcher") private commandDispatcher:ICommandDispatcher,
                @multiInject("IMetadataEnricher") private enrichers?:IMetadataEnricher[]) {

    }

    dispatch(command:Object):Rx.IPromise<CommandResponse> {
        let metadata:Dictionary<any> = _.reduce(this.enrichers, (result, enricher) => {
            result = enricher.enrich(command, result);
            return result;
        }, {});
        return this.commandDispatcher.dispatch(command, metadata);
    }
}

export default CommandDispatcherEnricher
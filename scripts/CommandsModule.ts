import {IModule} from "ninjagoat";
import {interfaces} from "inversify";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";
import ICommandDispatcher from "./dispatchers/ICommandDispatcher";
import CommandDispatcherEnricher from "./dispatchers/CommandDispatcherEnricher";
import CommandDispatcher from "./dispatchers/CommandDispatcher";
import PostCommandDispatcher from "./dispatchers/PostCommandDispatcher";
import IMetadataEnricher from "./enrichers/IMetadataEnricher";
import EmptyMetadataEnricher from "./enrichers/EmptyMetadataEnricher";

class CommandsModule implements IModule {

    modules = (container:interfaces.Container) => {
        container.bind<ICommandDispatcher>("ICommandDispatcher").to(CommandDispatcherEnricher).inSingletonScope();
        container.bind<CommandDispatcher>("CommandDispatcher").to(PostCommandDispatcher).inSingletonScope().whenInjectedInto(CommandDispatcherEnricher);
        container.bind<IMetadataEnricher>("IMetadataEnricher").to(EmptyMetadataEnricher).inSingletonScope(); //Needed by inversify to resolve correctly the dependency graph
    };

    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {

    }
}

export default CommandsModule;

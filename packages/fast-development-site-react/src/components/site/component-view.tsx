import * as React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { IDevSiteDesignSystem } from "../design-system";
import manageJss, { ComponentStyles, IJSSManagerProps, IManagedClasses } from "@microsoft/fast-jss-manager-react";
import { IComponentRoute } from "./index";

/**
 * Describes the possible views for a component
 */
export enum ComponentViewTypes {
    examples,
    detail
}

export interface IComponentViewManagedClasses {
    componentExampleView: string;
    componentDetailView: string;
}

export interface IComponentViewProps extends RouteComponentProps<{}> {
    viewType: ComponentViewTypes;
    routes: IComponentRoute[];
}

const style: ComponentStyles<IComponentViewManagedClasses, IDevSiteDesignSystem> = {
    componentExampleView: {
        overflow: "auto",
        flexGrow: "1",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
    },
    componentDetailView: {
        overflow: "auto",
        flexGrow: "1"
    }
};

class ComponentView extends React.Component<IComponentViewProps & IManagedClasses<IComponentViewManagedClasses>, {}> {
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <div className={this.getClassName()}>
                <Switch>
                    <Route path="/" exact={true} component={null} />
                    {this.props.routes.map(this.renderRoute)}
                    <Route
                        path={this.props.match.url}
                        exact={true}
                        component={this.renderView}
                    />
                    <Route
                        path={`${this.props.match.url}/${ComponentViewTypes[ComponentViewTypes.examples]}`}
                        exact={true}
                        component={this.renderView}
                    />
                </Switch>
            </div>
        );
    }

    private renderRoute = (route: IComponentRoute): JSX.Element[] => {
        return [
            (
                <Route
                    path={route.route}
                    exact={true}
                    component={this.renderRouteExampleView(route)}
                    key={route.route}
                />
            )
        ];
    }

    private renderRouteExampleView(route: IComponentRoute): () => React.ReactNode[] {
        return (): React.ReactNode[] => {
            // TODO: You are here
            return null;
            // return route.exampleView;
        };
    }

    private getClassName(): string {
        return this.props.viewType === ComponentViewTypes.examples
            ? this.props.managedClasses.componentExampleView
            : this.props.managedClasses.componentDetailView;
    }

    private renderView = (): React.ReactElement<HTMLElement> => {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default withRouter(manageJss(style)(ComponentView));

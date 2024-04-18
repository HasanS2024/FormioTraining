import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ReactComponent, Utils } from "@formio/react";
import settingsForm from "./CustomSettings";
import AvailableTimes from "../../AvailableTimes/AvailableTimes";
import { Provider } from "react-redux";
import store from "../../../Services/state";
import { StrictMode } from "react";
import CustomTableComponent from "../../CustomTable/CustomTableComponent";
// import CustomTableComponent  from "../../CustomTable/testTable";

const TableCustomComponent = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }
  setValue = (valueData) => {
    this.setState(
      (prevState) => ({ value: valueData }),
      () => this.props.onChange(valueData, "")
    );
  };

  render() {
    return (
      <StrictMode>
        <CustomTableComponent
          form={this.props.form}
          data={this.props.data}
          settings={this.props.component}
          FinalDatatUrl={this.props.FinalDatatUrl}
          DataApiMethod={this.props.DataApiMethod}
          FinalColumnsUrl={this.props.FinalColumnsUrl}
          formEventsHandler={this.props.formEventsHandler}
        />
      </StrictMode>
    );
  }
};

export default class CustomTableComp extends ReactComponent {
  static get builderInfo() {
    return {
      title: "customTableComp",
      icon: "table",
      // group: "advanced",
      documentation: "",
      weight: -20,
      schema: CustomTableComp.schema(),
    };
  }

  static schema() {
    return ReactComponent.schema({
      type: "customTableComp",
      label: "My cutom Table",
    });
  }

  static editForm = settingsForm;

  attachReact(element) {
    const form = this.getRoot();
    let FinalColumnsUrl;
    let FinalDatatUrl;
    let DataApiMethod;
    const customLogic = this.component.customLogic;
    if (customLogic) {
      try {
        var flattened = {};
        var components = {};
        (0, Utils.eachComponent)(
          form.components,
          function (component, path) {
            flattened[path] = component?.component;
            components[component?.component?.key] = component;
          },
          true
        );
        this.evaluate(this.component.customLogic, {
          form: form,
          flattened: flattened,
          components: components,
        });
      } catch (error) {
        console.error(`Error evaluating custom logic: ${error}`);
      }
    }
    FinalColumnsUrl = this.interpolate(this.component.ColumnsLink);
    FinalDatatUrl = this.interpolate(this.component.DataLink);
    DataApiMethod = this.interpolate(this.component.datamethod);

    return ReactDOM.render(
      <Provider store={store}>
        <TableCustomComponent
          settings={this.component}
          component={this.component}
          value={this.dataValue}
          data={this.root.data}
          formEventsHandler={form}
          form={this.component.key}
          FinalDatatUrl={FinalDatatUrl}
          DataApiMethod={DataApiMethod}
          onChange={this.updateValue}
          FinalColumnsUrl={FinalColumnsUrl}
        />
      </Provider>,
      element
    );
  }

  detachReact(element) {
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  }
}

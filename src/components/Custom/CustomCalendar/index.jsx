import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ReactComponent, Formio, Utils } from "@formio/react";
import settingsForm from "./CustomSettings";
import Calendar from "../../Calendar/Calendar";
import { Provider } from "react-redux";
import store from "../../../Services/state";
const CalendarCustomComp = class extends Component {
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
      <Calendar
        settings={this.props.component}
        calendarCellEvent={this.props.form}
        formEventsHandler={this.props.formEventsHandler}
      />
    );
  }
};

export default class CustomCalendar extends ReactComponent {
  static get builderInfo() {
    return {
      title: "Calendar",
      icon: "calendar",
      group: "advanced",
      documentation: "",
      weight: -20,
      schema: CustomCalendar.schema(),
    };
  }

  static schema() {
    return ReactComponent.schema({
      type: "calendarCustomComp",
      label: "My custom Calendar",
    });
  }

  static editForm = settingsForm;
  attachReact(element) {
    const customLogic = this.component.customLogic;
    const form = this.getRoot();
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
    let componentIndex = form.components.findIndex(
      (component) => component?.component?.key === "myCustomCalendar"
    );

    return ReactDOM.render(
      <Provider store={store}>
        <CalendarCustomComp
          component={this.component}
          value={this.dataValue}
          onChange={this.updateValue}
          form={form.components[componentIndex]}
          formEventsHandler={form.events}
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

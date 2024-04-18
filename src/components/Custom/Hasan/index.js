import { Formio } from "react-formio";
// Get the HTMLComponent from the components listing.
const Button = Formio.Components.components.htmlelement;
export default class HasanComponent extends Button {
  /**
   * Define the default schema to change the type and tag and label.
   */
  static schema(...extend) {
    return Button.schema(
      {
        label: "Hasan",
        type: "button",
      },
      ...extend
    );
  }

  static get builderInfo() {
    return {
      title: "ButtonHasan",
      group: "basic",
      icon: "code",
      weight: -1,
      documentation: "/userguide/#button-component",
      schema: HasanComponent.schema(),
    };
  }
}

HasanComponent.editForm = (...args) => {
  const editForm = Button.editForm(...args);
  const tagComponent = Formio.Utils.getComponent(editForm.components, "tag");
  tagComponent.type = "select";
  tagComponent.dataSrc = "values";
  tagComponent.data = {
    values: [
      { label: "Submit", value: "Submit" },
      { label: "Custom", value: "Custom" },
    ],
  };
  return editForm;
};
Formio.Components.addComponent("hasan", HasanComponent);

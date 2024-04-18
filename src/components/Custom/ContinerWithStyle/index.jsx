import { Components } from "@formio/react";
import settingsForm from "./CustomSettingsContiner.form";
const ContainerComponent = Components.components.container;

export default class ContinerSlider extends ContainerComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static get builderInfo() {
    return {
      title: "Continer with style",
      icon: "fa-solid fa-list",
      group: "basic",
      documentation: "",
      weight: -10,
      schema: ContinerSlider.schema(),
    };
  }
  static schema(...extend) {
    return ContainerComponent.schema({
      type: "continerWithStyle",
      label: "",
      key: "continerWithStyle",
      customClass: "continerWithStyle",
      components: [],
    });
  }
  static editForm = settingsForm;
  attach(element) {
    this.loadRefs(element);
    let continer = document.getElementById(this.component.id);
    let headElement = document.createElement("head");
    let styleElement = document.createElement("style");
    styleElement.innerHTML = `${this.component.cssStyle}`;
    headElement.appendChild(styleElement);
    continer.appendChild(headElement);
    return super.attach(element);
  }
}

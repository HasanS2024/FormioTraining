import baseEditForm from "formiojs/components/_classes/component/Component.form";

export default (...extend) => {
  return baseEditForm(
    [
      {
        key: "display",
        components: [
          {
            key: "placeholder",
            ignore: true,
          },

          {
            // Or add your own. The syntax is form.io component definitions.
            type: "textfield",
            input: true,
            label: "UrlLabelSearch",
            weight: 12,
            key: "customUrl", // This will be available as component.myCustomSetting
          },
          {
            weight: 28,
            validate: {
              required: true,
            },
            type: "url",
            input: true,
            label: "Data API Link",
            key: "dataApiLink",
            tooltip: "the api link for Data fetch",
          },
          {
            // Or add your own. The syntax is form.io component definitions.
            type: "textfield",
            input: true,
            label:
              "Enter the className of font awesome to show the icon to the left of the data display",
            weight: 12,
            key: "prefix", // This will be available as component.myCustomSetting
          },
          {
            // Or add your own. The syntax is form.io component definitions.
            type: "textfield",
            input: true,
            label:
              "Enter the className of font awesome to show the icon to the right of the data display",
            weight: 12,
            key: "suffix", // This will be available as component.myCustomSetting
          },
          {
            type: "textfield",
            input: true,
            label: "Enter the className of circle stepper",
            weight: 12,
            key: "circle", // This will be available as component.myCustomSetting
          },
          {
            type: "textfield",
            input: true,
            label: "Enter the className of circle selected stepper",
            weight: 12,
            key: "circleselect", // This will be available as component.myCustomSetting
          },
          {
            type: "textfield",
            input: true,
            label: "Enter the className of left line stepper",
            weight: 12,
            key: "leftline", // This will be available as component.myCustomSetting
          },
          {
            type: "textfield",
            input: true,
            label: "Enter the className of left line select stepper",
            weight: 12,
            key: "leftlineselect", // This will be available as component.myCustomSetting
          },
          {
            type: "textfield",
            input: true,
            label: "Enter the className of right line  stepper",
            weight: 12,
            key: "rightline", // This will be available as component.myCustomSetting
          },
          {
            type: "textfield",
            input: true,
            label: "Enter the className of right line select stepper",
            weight: 12,
            key: "rightlineselect", // This will be available as component.myCustomSetting
          },
          {
            key: "customStyleForStep",
            type: "textfield",
            label: "Custom class for each step",
            rows: 15,
            weight: 36,
            input: true,
            placeholder: "Enter your custom class here...",
          },
          {
            key: "cond",
            type: "textarea",
            label:
              "Custom JavaScript Logic For Condition Replaced....  example: state.id == 1 || state.id == 5 ",
            rows: 25,
            weight: 36,
            input: true,
            placeholder: "Enter your custom JavaScript logic here...",
            editor: "ace",
            as: "javascript",
          },
          {
            key: "order",
            type: "textarea",
            label:
              "Custom JavaScript Logic For Replaced Element... example:  state.username  = 'John'",
            rows: 25,
            weight: 36,
            input: true,
            placeholder: "Enter your custom JavaScript logic here...",
            editor: "ace",
            as: "javascript",
          },
          {
            key: "customLogic",
            type: "textarea",
            label:
              "Custom JavaScript Logic For Hidden Element... example: data.id==2;",
            rows: 25,
            weight: 36,
            input: true,
            placeholder: "Enter your custom JavaScript logic here...",
            tooltip:
              "Enter custom JavaScript logic to handle specific behavior.",
            editor: "ace",
            as: "javascript",
          },
          {
            key: "customLogic2",
            type: "textarea",
            label:
              "Custom JavaScript Logic For Active Element...example: item.id==3;",
            rows: 25,
            weight: 36,
            input: true,
            placeholder: "Enter your custom JavaScript logic here...",
            tooltip:
              "Enter custom JavaScript logic to handle specific behavior.",
            editor: "ace",
            as: "javascript",
          },

          {
            key: "customStyle",
            type: "textarea",
            label: "Custom Style for all stepper",
            rows: 15,
            weight: 36,
            input: true,
            placeholder: "Enter your custom style here...",
            // editor: "ace",
            // as: "javascript",
          },

          {
            weight: 40,
            type: "checkbox",
            input: true,
            label: "Translate Button",
            key: "translateButton",
            defaultValue: false,
          },
          {
            weight: 40,
            type: "checkbox",
            input: true,
            label: "RTL Button",
            key: "rtlButton",
            defaultValue: false,
          },
        ],
      },
      {
        key: "data",
        components: [],
      },
      {
        key: "validation",
        components: [],
      },
      {
        key: "api",
        components: [],
      },
      {
        key: "conditional",
        components: [],
      },
      {
        key: "logic",
        components: [],
      },
    ],
    ...extend
  );
};

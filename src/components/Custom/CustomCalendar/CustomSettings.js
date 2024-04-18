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
          { key: "description", ignore: true },
          { key: "hidden", ignore: true },
          { key: "hideLabel", ignore: true },
          { key: "tooltip", ignore: true },
          { key: "customClass", ignore: true },
          { key: "tabindex", ignore: true },
          { key: "disabled", ignore: true },
          { key: "tableView", ignore: true },
          { key: "modalEdit", ignore: true },
          { key: "autofocus", ignore: true },

          {
            weight: 28,
            validate: {
              required: true,
            },
            type: "textfield",
            input: true,
            label: "Data API Link",
            key: "dataApiLink",
            tooltip: "the api link for Data fetch",
          },

          {
            type: "datagrid",
            key: "headers",
            input: true,
            weight: 29,
            label: "Headers",
            addAnother: "Add Header",
            validate: {
              required: true,
            },
            tooltip: "Headers Properties and Values for your request",
            components: [
              {
                key: "header",
                label: "Header",
                input: true,
                type: "textfield",
              },
              {
                key: "value",
                label: "Value",
                input: true,
                type: "textfield",
              },
            ],
          },

          {
            weight: 30,
            type: "checkbox",
            label: "Allow Adding",
            tooltip: "Allow adding to calendar",
            key: "allowCalendarAdding",
            input: true,
            defaultValue: true,
          },
          {
            weight: 31,
            type: "checkbox",
            label: "Allow Updating",
            tooltip: "Allow updating to calendar",
            key: "allowCalendarUpdating",
            input: true,
            defaultValue: true,
          },
          {
            weight: 32,
            type: "checkbox",
            label: "Allow Deleting",
            tooltip: "Allow deleting to calendar",
            key: "allowCalendarDeleting",
            input: true,
            defaultValue: true,
          },

          // {
          //   weight: 33,
          //   type: "checkbox",
          //   label: "Allow Dragging",
          //   tooltip: "Allow dragging to calendar",
          //   key: "allowCalendarDragging",
          //   input: true,
          //   defaultValue: true,
          // },
          {
            type: "select",
            input: true,
            key: "viewTypes",
            label: "View Types",
            multiple: true,
            weight: 34,
            tooltip: "Chose View Types.",
            valueProperty: "value",
            validate: {
              required: true,
            },
            data: {
              values: [
                {
                  label: "Day",
                  value: "day",
                },
                {
                  label: "Week",
                  value: "week",
                },
                {
                  label: "Month",
                  value: "month",
                },
                {
                  label: "Time line Day",
                  value: "timelineDay",
                },
                {
                  label: "Time line Week",
                  value: "timelineWeek",
                },
                {
                  label: "Time line Month",
                  value: "timelineMonth",
                },
              ],
            },
          },
          {
            type: "select",
            input: true,
            key: "defaultViewType",
            label: "Default View Type",
            weight: 35,
            tooltip: "Default View Type",
            dataSrc: "custom",
            valueProperty: "value",
            data: {
              custom: function custom(context) {
                var values = [];
                context.data.viewTypes.map((viewType) => {
                  values.push({
                    label: viewType,
                    value: viewType,
                  });
                });
                return values;
              },
            },
            conditional: {
              json: {
                or: [
                  {
                    var: "data.viewTypes.length",
                  },
                ],
              },
            },
          },
          {
            key: "customLogic",
            type: "textarea",
            label: "Custom JavaScript Logic",
            rows: 25,
            editor: "ace",
            weight: 36,
            input: true,
            placeholder: "Enter your custom JavaScript logic here...",
            tooltip:
              "Enter custom JavaScript logic to handle specific behavior.",
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

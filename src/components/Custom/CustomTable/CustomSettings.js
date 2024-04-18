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
            weight: 22,
            validate: {
              required: false,
            },
            type: "textfield",
            input: true,
            label: "Columns Fecth API",
            key: "ColumnsLink",
            tooltip: "the api link for columns fetch",
          },

          {
            weight: 23,
            validate: {
              required: false,
            },
            type: "datagrid",
            input: true,
            label: "Tables",
            key: "nameOfTable",
            tooltip: "table name to fetch his column",
            components: [
              {
                key: "tableName",
                label: "Table Name",
                input: true,
                type: "textfield",
              },
            ],
          },
          {
            type: "datagrid",
            key: "columnsHeaders",
            input: true,
            weight: 24,
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
            weight: 25,
            validate: {
              required: false,
            },
            type: "textfield",
            input: true,
            label: "Columns Data Fecth API",
            key: "DataLink",
            tooltip: "the api link for columns Data fetch",
          },
          {
            type: "select",
            label: "method",
            key: "datamethod",
            input: true,
            tooltip: "select method for API",
            placeholder: "select method for API",
            weight: 26,
            dataSrc: "values",
            validate: {
              required: false,
            },
            data: {
              values: [
                {
                  value: "POST",
                  label: "POST",
                },
                {
                  value: "GET",
                  label: "GET",
                },
                {
                  value: "PUT",
                  label: "PUT",
                },
              ],
            },
            multiple: false,
            input: true,
          },
          {
            weight: 26.5,
            validate: {
              required: false,
            },
            type: "datagrid",
            input: true,
            label: "Additional API Body",
            key: "additionalAPIBody",
            tooltip: "Additional API Body",
            components: [
              {
                key: "bodyName",
                label: "Name",
                input: true,
                type: "textfield",
              },
              {
                key: "bodyValue",
                label: "Value",
                input: true,
                type: "textfield",
              },
            ],
          },
          {
            weight: 27,
            validate: {
              required: false,
            },
            type: "textfield",
            input: true,
            label: "Tables",
            key: "tableNameForFetch",
          },
          {
            type: "datagrid",
            key: "DataFetchHeaders",
            input: true,
            weight: 28,
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
            weight: 29,
            validate: {
              required: false,
            },
            type: "datagrid",
            input: true,
            label: "Columns",
            key: "nameOfColumns",
            tooltip: "Columns name to fetch theris Data",
            components: [
              {
                key: "columnName",
                label: "Column Name",
                input: true,
                type: "textfield",
              },
            ],
          },
          {
            weight: 30,
            validate: {
              required: false,
            },
            type: "datagrid",
            input: true,
            label: "Table Conditions",
            key: "tableConditions",
            tooltip: "Conditions name to filter table Data",
            components: [
              {
                key: "conditionName",
                label: "Condition Name",
                input: true,
                type: "textfield",
              },
              {
                key: "conditionValue",
                label: "Condition Value",
                input: true,
                type: "textfield",
              },
            ],
          },
          {
            key: "customCss",
            type: "textarea",
            label: "Custom Styles",
            rows: 25,
            editor: "ace",
            weight: 36,
            input: true,
            placeholder: "Enter your custom styles here...",
            tooltip: "Enter custom styles to handle specific behavior.",
          },
          {
            type: "datagrid",
            key: "willredraw",
            input: true,
            weight: 37,
            label: "components will be Redrawing",
            tooltip:
              "Redraw this components when this component changes. This is useful if interpolating parts of each of this component like the label.",
            addAnother: "Add another Component API Key",
            validate: {
              required: false,
            },
            components: [
              {
                key: "compkey",
                label: "key",
                input: true,
                type: "textfield",
              },
            ],
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
          {
            weight: 37,
            type: "checkbox",
            label: "Delete",
            tooltip:
              "If checked, this will cause the delete option to appear in the action area for the special line, the function is called (customDeletetableEvent).",
            key: "deleteFun",
            input: true,
          },
          {
            weight: 38,
            type: "checkbox",
            label: "Edit",
            tooltip:
              "If checked, this will cause the Edit option to appear in the action area for the special line, the function is called (customEdittableEvent).",
            key: "editFun",
            input: true,
          },
          {
            weight: 38,
            type: "checkbox",
            label: "View",
            tooltip:
              "If checked, this will cause the View option to appear in the action area for the special line, the function is called (customViews tableEvent).",
            key: "viewFun",
            input: true,
          },
          {
            weight: 38,
            type: "checkbox",
            label: "Call",
            tooltip:
              "If checked, this will cause the Call option to appear in the action area for the special line, the function is called (customCalltableEvent).",
            key: "callFun",
            input: true,
          },
          {
            weight: 38,
            type: "checkbox",
            label: "Details",
            tooltip:
              "If checked, this will cause the Details option to appear in the action area for the special line, the function is called (customtableEvent).",
            key: "detailsFun",
            input: true,
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

// https://mydomain.com/WorkingHoursSystem/api/getAvilableTimes3?id={data.bookingContainer.bookingContact.id}}¤etDay={{data.currentDay}}&calenderStartDate={{data.startDate}}&calenderEndDate={{data.endDate}}&slideduration={{data.slideduration}}

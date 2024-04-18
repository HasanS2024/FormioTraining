import baseEditForm from "formiojs/components/_classes/component/Component.form";

export default (...extend) => {
  return baseEditForm([
    {
      key: "display",
      components: [
        {
          type: "textarea",
          input: true,
          label: "CSS Style",
          weight: -12,
          key: "cssStyle",
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
    ...extend,
  ]);
};

import { Form, FormBuilder } from "@formio/react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import ReactJson from "react-json-view";
import { Components } from "react-formio";
import index from "./Custom";
import "../styles/Builder.css";

Components.setComponents(index);
const Builder = () => {
  const [jsonSchema, setSchema] = useState({
    components: [],
  });
  const onFormChange = (schema) => {
    setSchema({ ...schema, components: [...schema.components] });
  };
  return (
    <>
      <FormBuilder
        form={jsonSchema}
        onChange={onFormChange}
        options={{
          builder: {
            basic: {
              components: {
                toggleCustomComp: true,
                HeaderComponent: true,
                ContinerSlider: true,
                // StepperComponent:true,
              },
            },
            advanced: false,
          },
        }}
      />
      <Card title="Form JSON Schema" className="my-4">
        <Card.Body>
          <Card.Title className="text-center">As JSON Schema</Card.Title>
          <ReactJson src={jsonSchema} name={null} collapsed={true}></ReactJson>
        </Card.Body>
      </Card>
      <Card className="my-4">
        <Card.Body>
          <Card.Title className="text-center">As Rendered Form</Card.Title>
          <Form form={jsonSchema} />
        </Card.Body>
      </Card>
    </>
  );
};
export default Builder;

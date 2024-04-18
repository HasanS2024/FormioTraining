import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ReactComponent, Utils } from "@formio/react";
import settingsForm from "./CustomSettings";
import AvailableTimes from "../../AvailableTimes/AvailableTimes";
import { Provider } from "react-redux";
import store from "../../../Services/state";
import { StrictMode } from "react";
import Example from "../../CustomTable/ANYANY";
// import Example from "../../CustomTable/testTable";

const TableCustomComponent = (props) => {
  const [apiColumns, setApiColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const fetchTableData = async () => {
    console.log("finalDatafinalDatafinalData 1111");

    const headerObject = Object.fromEntries(
      (settings?.DataFetchHeaders || []).map((item) => [
        item.header,
        item.value,
      ])
    );

    const nameOfColumns = (settings?.nameOfColumns || [])
      .filter((item) => item.columnName)
      .map((item) => item.columnName);

    const conditionsArray = (settings?.tableConditions || [])
      .filter((item) => item.conditionName)
      .map((item) => ({ [item.conditionName]: item.conditionValue }));

    if (settings?.tableNameForFetch !== "") {
      try {
        const tableDataAPIResponse = await fetch(`${FinalDatatUrl}`, {
          method: "POST",
          headers: headerObject,
          body: JSON.stringify({
            tableName: settings?.tableNameForFetch,
            columns: nameOfColumns,
            conditions: conditionsArray,
            offset: 0,
          }),
        });

        if (tableDataAPIResponse.ok) {
          console.log("finalDatafinalDatafinalData 2222");

          const finalData = await tableDataAPIResponse.json();
          setTableData(finalData.columnsData);
          console.log("finalDatafinalDatafinalData", finalData);
        } else {
          console.error(
            "Error fetching another API:",
            tableDataAPIResponse.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    }
  };

  const fetchColumns = useCallback(async () => {
    const nameOfTables = (settings?.nameOfTable || [])
      .filter((item) => item.tableName)
      .map((item) => item.tableName);

    try {
      const headerObject = Object.fromEntries(
        (settings?.columnsHeaders || []).map((item) => [
          item.header,
          item.value,
        ])
      );

      if (nameOfTables.length === 0) {
        return;
      }

      const response = await fetch(`${FinalColumnsUrl}`, {
        method: "POST",
        headers: headerObject,
        body: JSON.stringify({
          tables: nameOfTables,
          allColumns: true,
        }),
      });

      const data = await response.json();

      setApiColumns(data);

      if (FinalDatatUrl) {
        await fetchTableData();
      }
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  }, [settings, FinalColumnsUrl, fetchTableData]);

  useEffect(() => {
    if (FinalColumnsUrl !== undefined) {
      // fetchColumns();
    }
  }, [FinalColumnsUrl]);

  const formatHeader = (columnName) => {
    return columnName.replace(/_/g, " ");
  };

  const convertObjectOfKeysToCamelCase = (obj) => {
    const camelCaseObj = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelCaseKey = key.replace(/_([a-z])/g, function (match, group1) {
          return group1.toUpperCase();
        });
        camelCaseObj[camelCaseKey] = obj[key];
      }
    }

    return camelCaseObj;
  };

  const convertArrayOfObjectToCamelCase = useMemo(() => {
    return (arrayOfColumns) => {
      const camelCaseArray = arrayOfColumns.map((obj) =>
        convertObjectOfKeysToCamelCase(obj)
      );

      return camelCaseArray;
    };
  }, []);

  const convertKeysToCamelCase = (key) => {
    const camelCaseKey = key.replace(/_([a-z])/g, function (match, group1) {
      return group1.toUpperCase();
    });

    return camelCaseKey;
  };

  const initialState = {
    density: "compact",
    expanded: true,
    pagination: { pageIndex: 0, pageSize: 20 },
    sorting: [{ id: "id", desc: false }],
  };

  const columns = useMemo(() => {
    return apiColumns.map((apiColumn) => {
      let convertableObject =
        apiColumn && convertKeysToCamelCase(apiColumn.columnName);
      if (convertableObject) {
        return {
          header: formatHeader(apiColumn.columnName),
          accessorKey: convertableObject,
        };
      }
    });
  }, [apiColumns]);

  if (columns.length <= 0) return null;

  //   useEffect(() => {
  //     let participantsArray = participants;
  //     props.onChange({ participantsArray }, "");
  //   }, [participants, props.onChange]);

  //   const getInitState = () => {
  //     setTextFieldsValues(textFieldsInit);
  //     setError(formErrorinit);
  //   };

  //   useEffect(() => {
  //     (async () => {
  //       setTimeout(() => {
  //         if (Array.isFullArray(props?.data?.participants))
  //           return setParticipants(props?.data?.participants);
  //         return setParticipants([]);
  //       }, 500);
  //     })();
  //   }, []);

  return (
    <StrictMode>
      <Example
        form={props.form}
        data={props.data}
        settings={props.component}
        columns={columns}
        tableData={tableData}
        FinalDatatUrl={props.FinalDatatUrl}
        FinalColumnsUrl={props.FinalColumnsUrl}
        formEventsHandler={props.formEventsHandler}
      />
    </StrictMode>
  );
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

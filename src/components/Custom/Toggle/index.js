import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ReactComponent } from "react-formio";
import settingsForm from "./Toggle.settingsForm";
import "./stepper.css";
import i18next from "i18next";
import { useEffect, useState, useCallback } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import styled from "styled-jss";
import "./stepper.css";
import { margin } from "@mui/system";

const ToggleCustomComp = ({
  apiUrl,
  displayKey,
  dynamicCondition,
  translateButton,
  customStyle,
  prefix,
  suffix,
  rtl,
  customLogic2,
  // circle,
  // circleselect,leftline,leftlineselect,rightline,rightlineselect
}) => {
  // console.log("circlecircle",circle)
  const [states, setStates] = useState([]);
  // const [selectedIds, setSelectedIds] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  console.log("selectedIdsselectedIds", selectedIds);
  const RTL = rtl;
  const onWheelHandler = useCallback(
    (apiObj, ev) => onWheel(apiObj, ev, RTL),
    [RTL]
  );

  useEffect(() => {
    if (apiUrl) {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setStates(data);
          console.log("data is fetched successfully");
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [apiUrl]);

  const dragState = React.useRef(new DragDealer());

  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragState.current.dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const onMouseDown = React.useCallback(
    () => dragState.current.dragStart,
    [dragState]
  );
  const onMouseUp = React.useCallback(
    () => dragState.current.dragStop,
    [dragState]
  );

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleItemClick = (itemId) => {
    if (dragState.current.dragging) {
      return false;
    }
    const itemSelected = isItemSelected(itemId);

    setSelected((currentSelected) =>
      itemSelected
        ? currentSelected.filter((el) => el !== itemId)
        : currentSelected.concat(itemId)
    );
  };

  const meetsDynamicCondition = (state) => {
    if (typeof dynamicCondition === "function") {
      try {
        return !dynamicCondition(state);
      } catch (error) {
        console.error("Error executing dynamic condition:", error);
        return true;
      }
    } else {
      return true;
    }
  };

  // const handleParagraphClick = (itemId) => {
  //   console.log("handleParagraphClick");
  //   console.log("itemId", itemId);
  //   console.log("cond", {cond});
  //   if(typeof cond  === "function" && states.length > 0){

  //     if (true) {
  //       setSelectedIds([...selectedIds, 8]);
  //       return true;
  //       // console.log("cond is true");
  //     } else {
  //       return false;
  //       // console.log("cond is false");
  //     }

  //   }};
  //   // if (cond) {
  //   //   setSelectedIds([...selectedIds, itemId]);
  //   //   return true;
  //   //   // console.log("cond is true");
  //   // } else {
  //   //   return false;
  //   //   // console.log("cond is false");
  //   // }
  // };

  useEffect(() => {
    if (states.length > 0) {
      // const x="item.id === 1 || item.id === 2 || item.id === 3";
      const x = customLogic2;
      console.log("x", x);
      console.log("states", states.find((item) => item.id === 5).id);
      console.log(
        "states.filter(item => item.id === 10 || item.id === 9 || item.id === 8).map(item => item.id)",
        states
          .filter((item) => item.id === 10 || item.id === 9 || item.id === 8)
          .map((item) => item.id)
      );
      console.log("states2", states.find((item) => eval(x)).id);

      if (true) {
        // setSelectedIds([...selectedIds, states.find(item => eval(x)).id]);
        // setSelectedIds([...selectedIds, states.filter(item => item.id === 1 || item.id === 2 || item.id === 3).map(item => item.id)]);
        const arr = states.filter((item) => eval(x)).map((item) => item.id);
        console.log("arr", arr);

        arr.forEach((item2) => {
          console.log("item", item2);
          setSelectedIds((prevSelectedIds) => [...prevSelectedIds, item2]);
        });
        console.log("selectedIds2", selectedIds);
        return true;
      } else {
        return false;
      }
    }
  }, [states]);

  const resources = {
    en: {
      translation: require("../../../Locales/translation.json").en,
    },
    ar: {
      translation: require("../../../Locales/translation.json").ar,
    },
  };

  i18next.init({
    lng: translateButton ? "en" : "ar",
    resources: resources,
  });

  function Card({
    title,
    itemId,
    customStyle,
    long,
    // circle,circleselect,leftline,leftlineselect,rightline,rightlineselect
  }) {
    const circleClass = selectedIds.includes(itemId) ? "selected" : "circle";
    const lineLeftClass = selectedIds.includes(itemId)
      ? "lineLeftselect"
      : "lineLeft";
    const lineRightClass = selectedIds.includes(itemId)
      ? "lineRightselect"
      : "lineRight";
    // console.log("circleselect",circleselect);
    return (
      <CardBody
        data-cy={itemId}
        data-testid="card"
        role="button"
        tabIndex={0}
        className={customStyle}
        long={long}
        // cond={cond}
      >
        <ul className="apiexample">
          {itemId === 1 && (
            <li className="parent">
              {/* {selectedIds}
             {selectedIds.includes(itemId)?"{circleselect} ":"{circle}"} */}
              {/* <p className={selectedIds.includes(itemId) ? {circleselect} : {circle}}> 1111111111111111111</p> */}
              {/* {console.log("selectedIds.includes(itemId)",selectedIds)} */}
              {/* {console.log("circleselect 111",circleselect)} */}
              {/* {console.log("selectedIds.includes(itemId) 222 ",selectedIds.includes(itemId))} */}
              {/* {console.log("circle 333 ",circle)} */}
              <p className={circleClass}></p>
              <p className={lineRightClass}></p>
              <p className="name"> {title} </p>
            </li>
          )}

          {itemId !== 1 && itemId !== long && (
            <li className="parent">
              <p className={lineLeftClass}></p>
              <p className={circleClass}> </p>
              <p className={lineRightClass}></p>

              <p className="name"> {title} </p>
            </li>
          )}
          {itemId === long && (
            <li className="parent">
              <p className={lineLeftClass}></p>
              <p className={circleClass}> </p>

              <p className="name"> {title} </p>
            </li>
          )}
        </ul>
      </CardBody>
    );
  }

  const CardBody = styled("div")({
    display: "inline-block",
    margin: "0 5px",
    width: "100%",
    userSelect: "none",
    border: "none",
    backgroundColor: "transparent",
  });

  return (
    <NoScrollbar onMouseLeave={dragState.current.dragStop}>
      <ScrollMenu
        LeftArrow={
          RTL ? (
            <RightArrow RTL={RTL} text1={prefix} text2={suffix} />
          ) : (
            <LeftArrow RTL={RTL} text1={prefix} text2={suffix} />
          )
        }
        RightArrow={
          RTL ? (
            <LeftArrow RTL={RTL} text1={prefix} text2={suffix} />
          ) : (
            <RightArrow RTL={RTL} text1={prefix} text2={suffix} />
          )
        }
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={handleDrag}
        onWheel={onWheelHandler}
        RTL={RTL}
        noPolyfill={true}
      >
        {states.map(
          (state) =>
            //
            meetsDynamicCondition(state) && (
              <Card
                // circle={circle}
                // circleselect={circleselect}
                // leftline={leftline}
                // leftlineselect={leftlineselect}
                // rightline={rightline}
                // rightlineselect={rightlineselect}
                customStyle={customStyle}
                title={i18next.t(state[displayKey])}
                itemId={state.id}
                key={state.id}
                onClick={() => handleItemClick(state.id)}
                selected={isItemSelected(state.id)}
                long={states.length}
              />
            )
        )}
      </ScrollMenu>
    </NoScrollbar>
  );
};
const isFirefox =
  navigator &&
  navigator.userAgent &&
  navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

class DragDealer {
  constructor() {
    this.clicked = false;
    this.dragging = false;
    this.position = 0;
  }

  dragStart = (ev) => {
    this.position = ev.clientX;
    this.clicked = true;
  };

  dragStop = () => {
    window.requestAnimationFrame(() => {
      this.dragging = false;
      this.clicked = false;
    });
  };

  dragMove = (ev, cb) => {
    const newDiff = this.position - ev.clientX;

    const movedEnough = Math.abs(newDiff) > 5;

    if (this.clicked && movedEnough) {
      this.dragging = true;
    }

    if (this.dragging && movedEnough) {
      this.position = ev.clientX;
      cb(newDiff);
    }
  };
}

const NoScrollbar = styled("div")({
  "& .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar": {
    display: "none",
  },
  "& .react-horizontal-scrolling-menu--scroll-container": {
    scrollbarWidth: "none",
    "-ms-overflow-style": "none",
  },
});

function LeftArrow({ RTL, text1, text2 }) {
  const visibility = React.useContext(VisibilityContext);
  const isFirstItemVisible = visibility.useIsVisible("first", true);

  return (
    <Arrow
      disabled={isFirstItemVisible}
      onClick={() =>
        visibility.scrollPrev("smooth", RTL && isFirefox ? "start" : "end")
      }
      testId={RTL ? "right-arrow" : "left-arrow"}
    >
      {RTL ? text2 : text1}
    </Arrow>
  );
}

function RightArrow({ RTL, text1, text2 }) {
  const visibility = React.useContext(VisibilityContext);
  const isLastItemVisible = visibility.useIsVisible("last", true);
  // const isLastItemVisible = visibility.useIsVisible("first", true);

  return (
    <Arrow
      disabled={isLastItemVisible}
      onClick={() =>
        visibility.scrollNext("smooth", RTL && isFirefox ? "end" : "start")
      }
      testId={RTL ? "left-arrow" : "right-arrow"}
    >
      {RTL ? text1 : text2}
    </Arrow>
  );
}

function Arrow({ children, disabled, onClick, className, testId }) {
  return (
    <ArrowButton
      disabled={disabled}
      onClick={onClick}
      className={"arrow" + (className ? `-${className}` : "")}
      data-testid={testId}
    >
      {children}
    </ArrowButton>
  );
}

const ArrowButton = styled("div")({
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  opacity: (props) => (props.disabled ? "0" : "1"),
  userSelect: "none",
  border: "none",
  backgroundColor: "transparent",
});

function onWheel(apiObj, ev, RTL) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollPrev("smooth", RTL && isFirefox ? "start" : "end");
  } else {
    apiObj.scrollNext("smooth", RTL && isFirefox ? "end" : "start");
  }
}

export default class Toggle extends ReactComponent {
  static get builderInfo() {
    return {
      title: "Toggle",
      icon: "square",
      group: "Data",
      documentation: "",
      weight: -10,
      schema: Toggle.schema(),
    };
  }

  static schema() {
    return ReactComponent.schema({
      type: "toggleCustomComp",
      label: "Default Label",
    });
  }

  static editForm = settingsForm;

  attachReact(element) {
    const customLogic = this.component.customLogic;
    const customLogic2 = this.component.customLogic2;

    const data = this.component;
    const apiUrl = this.component.dataApiLink;
    const displayKey = this.component.customUrl;
    const dynamicCondition = (data) => {
      return eval(customLogic);
    };
    // const condition = (data) => {
    //   return eval(customLogic2);
    // };
    const condition = (data) => {
      return data.id === 9;
    };
    const translateButton = this.component.translateButton;
    const rtl = this.component.rtlButton;

    // const customStyle3 = { backgroundColor: "transparent", color: "#666" };

    let x = document.getElementById(this.component.id);
    let headElement = document.createElement("head");
    let styleElement = document.createElement("style");
    styleElement.innerHTML = `${this.component.customStyle}`;
    headElement.appendChild(styleElement);
    x.appendChild(headElement);

    return ReactDOM.render(
      <ToggleCustomComp
        apiUrl={apiUrl}
        displayKey={displayKey}
        dynamicCondition={dynamicCondition}
        translateButton={translateButton}
        comp={this}
        prefix={<i class={this.component.prefix}></i>}
        suffix={<i class={this.component.suffix}></i>}
        // customStyle={this.component.customStyleForStep}
        customStyle={this.component.customStyleForStep}
        rtl={rtl}
        // cond={condition}
        customLogic2={customLogic2}
        // circle="circle"
        // circleselect={this.component.circleselect}
        // leftline={this.component.leftline}
        // leftlineselect={this.component.leftlineselect}
        // rightline={this.component.rightline}
        // rightlineselect={this.component.rightlineselect}
      />,
      element
    );
  }

  detachReact(element) {
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  }
}

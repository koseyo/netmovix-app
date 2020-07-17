import React, { useState } from "react";
import "./Tabs.scss";
import Tab from "./Tab";
import PropTypes from "prop-types";

const Tabs = (props) => {
  const { children } = props;
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tabs-list">
        {children.map((child) => {
          const { label } = child.props;
          return <Tab activeTab={activeTab} key={label} label={label} onClick={onClickTab} />;
        })}
      </ol>
      <div className="tabs-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Tabs;

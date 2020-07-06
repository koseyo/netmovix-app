import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Tab = (props) => {
  const { activeTab, label, onClick } = props;
  const [className, setClassName] = useState("tabs-list-item");

  useEffect(() => {
    if (activeTab === label) {
      setClassName((prev) => (prev += " tabs-list-active"));
    } else {
      setClassName("tabs-list-item");
    }
  }, [activeTab, label]);

  const onTabClick = () => {
    onClick(label);
  };

  return (
    <div>
      <li className={className} onClick={onTabClick}>
        {label}
      </li>
    </div>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;

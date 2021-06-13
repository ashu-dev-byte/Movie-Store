import React, { useState } from "react";
import cx from "classnames";
import { FaChevronDown } from "react-icons/fa";
import "./Select.scss";

const options = [
  {
    lable: "One",
    value: "One",
  },
  {
    value: "Two",
    lable: "Two",
  },
  {
    lable: "Three",
    value: "Three",
  },
  {
    lable: "Four",
    value: "Four",
  },
  {
    lable: "Five",
    value: "Five",
  },
  {
    lable: "Six",
    value: "Six",
  },
  {
    lable: "Seven",
    value: "Seven",
  },
  {
    lable: "Eight",
    value: "Eight",
  },
  {
    lable: "Nine",
    value: "Nine",
  },
  {
    lable: "Ten",
    value: "Ten",
  },
  {
    lable: "Eleven",
    value: "Eleven",
  },
  {
    lable: "Twelve",
    value: "Twelve",
  },
  {
    lable: "Thirteen",
    value: "Thirteen",
  },
  {
    lable: "Fourteen",
    value: "Fourteen",
  },
  {
    lable: "Fifteen",
    value: "Fifteen",
  },
];

interface Props {}

const ReactSelect: React.FC<Props> = (props) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Select option");

  return (
    <div className="container">
      <div className="selectBox">
        <div
          className="selected"
          onClick={() => setIsSelectOpen(!isSelectOpen)}
        >
          <label>
            {selectedValue}
            <FaChevronDown
              size={18}
              className={cx("icon", { ["iconActive"]: isSelectOpen })}
            />
          </label>
        </div>

        <div className={cx("optionsList", { ["optionsActive"]: isSelectOpen })}>
          {options.map((option) => (
            <div
              className="option"
              onClick={() => {
                setSelectedValue(option.value);
                setIsSelectOpen(false);
              }}
            >
              <label>
                <input
                  type="radio"
                  className="radioBtn"
                  value={option.value}
                  name="radioGroup"
                />
              </label>
              {option.lable}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReactSelect;

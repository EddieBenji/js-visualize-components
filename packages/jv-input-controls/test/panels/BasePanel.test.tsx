/*
 * Copyright © 2024. Cloud Software Group, Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BasePanel from "../../src/panels/BasePanel";

describe("BasePanel", () => {
  const mockChange = jest.fn();

  const renderComponent = (controls: any, config?: any) => {
    render(
      <BasePanel
        controls={controls}
        config={config}
        events={{ change: mockChange }}
      />,
    );
  };

  test("renders BooleanInputControl", () => {
    const controls = {
      data: [{ id: "1", type: "bool", label: "Boolean Control" }],
    };
    renderComponent(controls);
    expect(screen.getByLabelText("Boolean Control")).toBeInTheDocument();
  });

  test("renders SingleValueTextInputControl", () => {
    const controls = {
      data: [
        {
          id: "2",
          type: "singleValueText",
          label: "Text Control",
          dataType: "string",
        },
      ],
    };
    renderComponent(controls);
    expect(screen.getByLabelText("Text Control")).toBeInTheDocument();
  });

  test("renders SingleValueNumberInputControl", () => {
    const controls = {
      data: [
        {
          id: "3",
          type: "singleValueNumber",
          label: "Number Control",
          dataType: "number",
        },
      ],
    };
    renderComponent(controls);
    expect(screen.getByLabelText("Number Control")).toBeInTheDocument();
  });

  test("renders DatePickerInputControl", () => {
    const controls = {
      data: [
        {
          id: "4",
          type: "singleValueDate",
          label: "Date Control",
          dataType: "date",
        },
      ],
    };
    const config = { singleValueDate: { type: "material" } };
    renderComponent(controls, config);
    expect(screen.getByLabelText("Date Control")).toBeInTheDocument();
  });

  test("renders DatePickerTextFieldInputControl", () => {
    const controls = {
      data: [
        {
          id: "5",
          type: "singleValueDate",
          label: "Date Control",
          dataType: "date",
        },
      ],
    };
    renderComponent(controls);
    expect(screen.getByLabelText("Date Control")).toBeInTheDocument();
  });

  test("renders DateTimePickerInputControl", () => {
    const controls = {
      data: [
        {
          id: "6",
          type: "singleValueDatetime",
          label: "Datetime Control",
          dataType: "datetime",
        },
      ],
    };
    const config = { singleValueDatetime: { type: "material" } };
    renderComponent(controls, config);
    expect(screen.getByLabelText("Datetime Control")).toBeInTheDocument();
  });

  test("renders DateTimePickerTextFieldInputControl", () => {
    const controls = {
      data: [
        {
          id: "7",
          type: "singleValueDatetime",
          label: "Datetime Control",
          dataType: "datetime",
        },
      ],
    };
    renderComponent(controls);
    expect(screen.getByLabelText("Datetime Control")).toBeInTheDocument();
  });

  test("renders SingleSelectInputControl", () => {
    const controls = {
      data: [
        {
          id: "testId",
          label: "Select Control",
          mandatory: false,
          readOnly: false,
          visible: true,
          type: "singleSelect",
          state: {
            id: "testId",
            options: [{ selected: false, label: "1", value: "one" }],
          },
        },
      ],
    };
    renderComponent(controls);
    const divElement = screen.getByLabelText("Select Control");
    expect(divElement).toBeInTheDocument();
  });

  test("renders MultiSelectInputControl", () => {
    const controls = {
      data: [
        {
          id: "ProductFamily",
          description: "Product Family Multi-Select",
          type: "multiSelect",
          uri: "repo:/public/Samples/Resources/Input_Controls/ProductFamily",
          label: "ProductFamily",
          mandatory: true,
          readOnly: false,
          visible: true,
          masterDependencies: [],
          slaveDependencies: [],
          validationRules: [
            {
              mandatoryValidationRule: {
                errorMessage: "This field is mandatory so you must enter data.",
              },
            },
          ],
          state: {
            uri: "/public/Samples/Resources/Input_Controls/ProductFamily",
            id: "ProductFamily",
            options: [
              {
                selected: true,
                label: "Drink",
                value: "Drink",
              },
              {
                selected: true,
                label: "Food",
                value: "Food",
              },
              {
                selected: true,
                label: "Non-Consumable",
                value: "Non-Consumable",
              },
            ],
          },
        },
      ],
    };
    renderComponent(controls);
    const inputElement = screen.getByLabelText("ProductFamily");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveTextContent("Drink, Food, Non-Consumable");
  });

  test("renders TimePickerInputControl", () => {
    const controls = {
      data: [
        {
          id: "9",
          type: "singleValueTime",
          label: "Time Control",
          dataType: "time",
        },
      ],
    };
    const config = { singleValueTime: { type: "material" } };
    renderComponent(controls, config);
    expect(screen.getByLabelText("Time Control")).toBeInTheDocument();
  });

  test("renders TimePickerTextFieldInputControl", () => {
    const controls = {
      data: [
        {
          id: "10",
          type: "singleValueTime",
          label: "Time Control",
          dataType: "time",
        },
      ],
    };
    renderComponent(controls);
    expect(screen.getByLabelText("Time Control")).toBeInTheDocument();
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import AddTodoItemSection from "./add";
import { TodoModel } from "../../../types";
import "@testing-library/jest-dom/extend-expect";

describe("Add Todo Section", () => {
  test("render component for add", async () => {
    const addItem = (item: TodoModel) => {};
    const updateItem = (item: TodoModel) => {};

    render(<AddTodoItemSection addTodo={addItem} updateTodo={updateItem} />);

    const button1 = screen.getByText("Add Item");
    expect(button1).toBeInTheDocument();

    const button2 = screen.getByText("Update Item");
    expect(button2).toBeInTheDocument();
  });

  test("render component with selected items", async () => {
    const addItem = (item: TodoModel) => {};
    const updateItem = (item: TodoModel) => {};
    const selectedItem = {
      completed: false,
      isSelected: false,
      title: "test value",
      id: "a04bf9f5-68a0-43ec-9c02-17ee7bb2b436",
      UserId: 1,
    } as TodoModel;

    render(
      <AddTodoItemSection
        addTodo={addItem}
        updateTodo={updateItem}
        selectedTodoItem={selectedItem}
      />
    );

    await waitFor(() => {
        expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    });
  });
});

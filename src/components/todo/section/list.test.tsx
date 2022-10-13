import { render, screen } from "@testing-library/react";
import { TodoModel } from "../../../types";
import TodoListSection from "./list";
import '@testing-library/jest-dom/extend-expect';

describe("TodoList Section", () => {
  test("render component with items", async () => {
    const listTodos = [
      {
        completed: false,
        isSelected: false,
        title: "sample title 1",
        id: "a04bf9f5-68a0-43ec-9c02-17ee7bb2b435",
        UserId: 1,
      } as TodoModel,
      {
        completed: false,
        isSelected: false,
        title: "sample title 2",
        id: "a04bf9f5-68a0-43ec-9c02-17ee7bb2b436",
        UserId: 1,
      } as TodoModel,
    ] as TodoModel[];

    const deleteItem = (id?: string) => {};
    const setSelectedId = (id?: string) => {};

    render(
      <TodoListSection
        list={listTodos}
        deleteTodo={deleteItem}
        setSelectedId={setSelectedId}
      />
    );

    const item1 = screen.getByText('sample title 1');
    expect(item1).toBeInTheDocument();

      const item2 = screen.getByText('sample title 2');
      expect(item2).toBeInTheDocument();

  });

  test("render component with no items", async () => {
    const listTodos = [] as TodoModel[];

    const deleteItem = (id?: string) => {};
    const setSelectedId = (id?: string) => {};

    render(
      <TodoListSection
        list={listTodos}
        deleteTodo={deleteItem}
        setSelectedId={setSelectedId}
      />
    );

    const list = screen.getByTestId('todoItemsList');

    expect(list).toBeInTheDocument();

  });
});

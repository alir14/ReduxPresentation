import { recordSaga } from "../../common/unittest-helper";
import { MockState } from "../../stubs/mockState";
import * as apis from "../../api/index";
import * as helpers from "../../common/helper";
import * as sagas from "./saga";
import * as actions from "./actions";
import * as slice from "./reducer";
import { TodoModel } from "../../types";

const fakeId =  'ac6e77e7-0ce1-458f-a0b1-228bcd5ed572';

describe("test loading todods data", () => {
  const mockAPIGetCalls = jest.spyOn(apis, "fetchTodoItems");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("loading all data successfully", async () => {
    const apiResponse = await import("../../stubs/todolist.json");

    mockAPIGetCalls.mockImplementation(() => Promise.resolve(apiResponse));

    const loadingDispatchedAction = await recordSaga(
      sagas.loadTodos,
      {
        type: actions.LOADING_TODOS,
      },
      MockState
    );

    expect(loadingDispatchedAction[0]).toStrictEqual(slice.loadingTodoItems());

    expect(loadingDispatchedAction[1]).toStrictEqual(
      slice.loadedTodoItems(MockState.TodoState.items)
    );
  });

  test("failed loading all data", async () => {
    mockAPIGetCalls.mockImplementation(() => Promise.reject("503"));

    const loadingDispatchedAction = await recordSaga(
      sagas.loadTodos,
      {
        type: actions.LOADING_TODOS,
      },
      MockState
    );

    expect(loadingDispatchedAction[0]).toStrictEqual(slice.loadingTodoItems());

    expect(loadingDispatchedAction[1]).toStrictEqual(
      slice.failedTodoItemAction()
    );
  });
});

describe("test adding todod item", () => {
  
  const mockAPIAddCalls = jest.spyOn(apis, "callAddTodoItem");
  const mockGetRandomUserId = jest.spyOn(helpers, "getRandomUserId");
  const mockGetId = jest.spyOn(helpers, "getID");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("adding data successfully", async () => {
    
    let newItem = {
      completed: false,
      isSelected: false,
      title: "test",
    } as TodoModel;

    mockGetRandomUserId.mockImplementation(() => 1);
    mockAPIAddCalls.mockImplementation(() => Promise.resolve(true));
    mockGetId.mockImplementation(() => fakeId);

    const addingDispatchedAction = await recordSaga(
      sagas.addTodo,
      {
        type: actions.ADD_TODOS,
        payload: newItem,
      },
      MockState
    );

    newItem = { ...newItem, id: fakeId, UserId: 1 };

    expect(addingDispatchedAction[0]).toStrictEqual(slice.addTodoItem(newItem));
  });

  test("failed adding data", async () => {
    
    let newItem = {
      completed: false,
      isSelected: false,
      title: "test",
    } as TodoModel;

    mockGetRandomUserId.mockImplementation(() => 1);
    mockAPIAddCalls.mockImplementation(() => Promise.reject("error"));

    const addingDispatchedAction = await recordSaga(
      sagas.addTodo,
      {
        type: actions.ADD_TODOS,
        payload: newItem,
      },
      MockState
    );

    newItem = { ...newItem, id: fakeId, UserId: 1 };

    expect(addingDispatchedAction[0]).toStrictEqual(
      slice.failedTodoItemAction()
    );
  });
});


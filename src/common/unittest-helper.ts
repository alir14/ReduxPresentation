// import { runSaga, stdChannel } from "@redux-saga/core"
import { runSaga, stdChannel } from 'redux-saga';
import { RootState } from '../store/rootReducer';
import { AnyAction } from 'redux';

// testing saga functions without any helper leads to mannually stepping through the saga functions and assert effects as needed (Bad approach)
// A better way is to run the whole saga function and record expected side effect that changes the behviour and validate if it is expected
// for more detail please refer to the following urls
// https://dev.to/phil/the-best-way-to-test-redux-sagas-4hib
// https://blog.scottlogic.com/2018/01/16/evaluating-redux-saga-test-libraries.html

export const recordSaga = async (saga: any, initialAction: AnyAction, currentState?:RootState) => {
    const dispachedActions: AnyAction[] = []

    await runSaga (
        {
            channel: stdChannel(),
            dispatch: (action) => dispachedActions.push(action),
            getState: () => currentState
        },
        saga,
        initialAction
    ).toPromise();

    return dispachedActions;
}
import { all, fork } from 'redux-saga/effects';
import { rootSaga as TodoRootSaga } from './todo/saga';

export default function* rootSaga() {
    yield all([
        fork(TodoRootSaga),
    ]);
}

import { DummyStateAction, DummyStateActionTypes } from './dummy-state.actions';

export const DUMMYSTATE_FEATURE_KEY = 'dummyState';

export interface DummyStateState {
  list: string[];
  isLong: boolean;
}

export interface DummyStatePartialState {
  readonly [DUMMYSTATE_FEATURE_KEY]: DummyStateState;
}

export const initialState: DummyStateState = {
  list: [],
  isLong: false,
};

export function reducer(
  state: DummyStateState = initialState,
  action: DummyStateAction
): DummyStateState {
  switch (action.type) {
    case DummyStateActionTypes.SetListIsLong: {
      state = {
        ...state,
        isLong: action.payload,
      };
      break;
    }
  }
  return state;
}

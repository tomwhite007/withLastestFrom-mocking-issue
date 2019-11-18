import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DUMMYSTATE_FEATURE_KEY, DummyStateState } from './dummy-state.reducer';

// Lookup the 'DummyState' feature state managed by NgRx
const getDummyStateState = createFeatureSelector<DummyStateState>(
  DUMMYSTATE_FEATURE_KEY
);

const getList = createSelector(
  getDummyStateState,
  (state: DummyStateState) => state.list
);
const getIsLong = createSelector(
  getDummyStateState,
  (state: DummyStateState) => state.isLong
);

export const dummyStateQuery = {
  getList,
  getIsLong,
};

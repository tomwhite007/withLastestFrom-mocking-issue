import { Action } from '@ngrx/store';

export enum DummyStateActionTypes {
  CheckList = '[DummyState] Check List',
  SetListIsLong = '[DummyState] Set List Is Long',
}

export class CheckList implements Action {
  readonly type = DummyStateActionTypes.CheckList;
}

export class SetListIsLong implements Action {
  readonly type = DummyStateActionTypes.SetListIsLong;
  constructor(public payload: boolean) {}
}

export type DummyStateAction = CheckList | SetListIsLong;

export const fromDummyStateActions = {
  CheckList,
  SetListIsLong,
};

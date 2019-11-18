import { Action } from '@ngrx/store';

export enum DummyStateActionTypes {
  LoadList = '[DummyState] DummyState Load List',
  ListIsLong = '[DummyState] DummyState List Is Long',
}

export class LoadList implements Action {
  readonly type = DummyStateActionTypes.LoadList;
  constructor(public payload: string[]) {}
}

export class ListIsLong implements Action {
  readonly type = DummyStateActionTypes.ListIsLong;
  constructor(public payload: boolean) {}
}

export type DummyStateAction = LoadList | ListIsLong;

export const fromDummyStateActions = {
  LoadList,
  ListIsLong,
};

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  DummyStateActionTypes,
  fromDummyStateActions,
  DummyStateAction,
} from './dummy-state.actions';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { DummyStateState } from './dummy-state.reducer';
import { dummyStateQuery } from './dummy-state.selectors';
import { withNextFrom } from '../operators/withNextFrom';

@Injectable()
export class DummyStateEffects {
  @Effect() checkListLengthWithLatest$: Observable<Action> = this.actions$.pipe(
    ofType<DummyStateAction>(DummyStateActionTypes.CheckList),
    withLatestFrom(this.store.select(dummyStateQuery.getList)),
    map(
      ([action, list]) =>
        new fromDummyStateActions.SetListIsLong(list.length > 1)
    )
  );

  @Effect() checkListLengthWithNext$: Observable<Action> = this.actions$.pipe(
    ofType<DummyStateAction>(DummyStateActionTypes.CheckList),
    withNextFrom(() => this.store.select(dummyStateQuery.getList)),
    map(
      ([action, list]) =>
        new fromDummyStateActions.SetListIsLong(list.length > 1)
    )
  );

  @Effect() checkListLengthWithSwitchMap$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<DummyStateAction>(DummyStateActionTypes.CheckList),
    switchMap(() => this.store.select(dummyStateQuery.getList)),
    map(list => new fromDummyStateActions.SetListIsLong(list.length > 1))
  );

  constructor(
    private actions$: Actions,
    private store: Store<DummyStateState>
  ) {}
}

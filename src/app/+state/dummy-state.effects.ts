import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  DummyStateActionTypes,
  fromDummyStateActions,
  DummyStateAction,
} from './dummy-state.actions';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { DummyStateState } from './dummy-state.reducer';
import { dummyStateQuery } from './dummy-state.selectors';

@Injectable()
export class DummyStateEffects {
  @Effect() checkListLengthWithLatest$: Observable<Action> = this.actions$.pipe(
    ofType<DummyStateAction>(DummyStateActionTypes.CheckList),
    withLatestFrom(this.store.select(dummyStateQuery.getList)),
    map(([action, list]) => {
      console.log(list);
      return new fromDummyStateActions.SetListIsLong(list.length > 1);
    })
  );

  @Effect() checkListLengthWithSwitchMap$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<DummyStateAction>(DummyStateActionTypes.CheckList),
    switchMap(() =>
      this.store
        .select(dummyStateQuery.getList)
        .pipe(
          map(list => new fromDummyStateActions.SetListIsLong(list.length > 1))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<DummyStateState>
  ) {}
}

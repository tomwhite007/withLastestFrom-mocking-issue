import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DummyStateEffects } from './dummy-state.effects';
import { TestScheduler } from 'rxjs/testing';
import { fromDummyStateActions } from './dummy-state.actions';

describe('DummyStateEffects', () => {
  let actions$: Observable<Action>;
  let effects: DummyStateEffects;
  let storeSpy: any;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['select']);
    /* NOTE: This is the only point during initialisation where
    we can mock values that successfully appear in withLatestFrom.
    e.g.:
    storeSpy.select.and.returnValue(of(['test1', 'test2']));
    But this is not good practice for testing multiple mock values.
    */

    TestBed.configureTestingModule({
      providers: [
        DummyStateEffects,
        provideMockActions(() => actions$),
        { provide: Store, useValue: storeSpy },
      ],
    });
    effects = TestBed.get(DummyStateEffects);
  });

  xit('should trigger SetListIsLong - using withLatestFrom', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      storeSpy.select.and.returnValue(cold('a', { a: ['test1', 'test2'] }));

      actions$ = hot('-a-|', {
        a: new fromDummyStateActions.CheckList(),
      });

      expectObservable(effects.checkListLengthWithLatest$).toBe('-a', {
        a: new fromDummyStateActions.SetListIsLong(true),
      });
    });
  });

  it('should trigger SetListIsLong - using withNextFrom', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      storeSpy.select.and.returnValue(cold('(a|)', { a: ['test1', 'test2'] }));

      actions$ = hot('-a-|', {
        a: new fromDummyStateActions.CheckList(),
      });

      expectObservable(effects.checkListLengthWithNext$).toBe('-a-|', {
        a: new fromDummyStateActions.SetListIsLong(true),
      });
    });
  });

  it('should trigger SetListIsLong - using switchMap', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      storeSpy.select.and.returnValue(cold('a', { a: ['test1', 'test2'] }));

      actions$ = hot('-a-|', {
        a: new fromDummyStateActions.CheckList(),
      });

      expectObservable(effects.checkListLengthWithSwitchMap$).toBe('-a', {
        a: new fromDummyStateActions.SetListIsLong(true),
      });
    });
  });
});

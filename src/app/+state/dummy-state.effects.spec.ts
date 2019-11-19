import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
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

    TestBed.configureTestingModule({
      providers: [
        DummyStateEffects,
        provideMockActions(() => actions$),
        { provide: Store, useValue: storeSpy },
      ],
    });
    effects = TestBed.get(DummyStateEffects);
  });

  it('should trigger loaded action', () => {
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

  it('should trigger loaded action', () => {
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

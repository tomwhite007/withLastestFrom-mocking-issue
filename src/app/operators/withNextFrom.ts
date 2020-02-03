import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export const withNextFrom = <N>(getNextStream: () => Observable<N>) => <O>(
  source$: Observable<O>
) =>
  new Observable<[O, N]>(observer => {
    return source$.subscribe({
      next(o) {
        getNextStream()
          .pipe(take(1))
          .subscribe({
            next(n) {
              observer.next([o, n]);
            },
            error(err) {
              observer.error(err);
            },
          });
      },
      error(err) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      },
    });
  });

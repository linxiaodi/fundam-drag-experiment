import { Observable } from 'rxjs'
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';


// const observable = new Observable((subscriber) => {
//   subscriber.next(1)
//   subscriber.next(2)
//   setTimeout(() => {
//     subscriber.next(100)
//     subscriber.complete()
//   }, 1000)
// })

// observable.subscribe({
//   next(x) { console.log('got value ' + x); },
//   error(err) { console.error('something wrong occurred: ' + err); },
//   complete() { console.log('done'); }
// });


// const keyup$ = fromEvent(document, 'keyup');

// keyup$.subscribe((event) => {
//   console.log('event', event)
// })

// keyup$
//   .pipe(pluck('code'))
//   // 'Space', 'Enter'
//   .subscribe(console.log);
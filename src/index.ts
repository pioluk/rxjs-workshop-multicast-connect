import { interval, Subject, ConnectableObservable } from "rxjs";
import { map, take, multicast } from "rxjs/operators";
import "./styles.css";
import { log } from "./utils";

const source = interval(100).pipe(
  take(3),
  map(x => x + 1),
  multicast(new Subject())
) as ConnectableObservable<number>;

source.connect();

log("A subscribe");
source.subscribe(x => log("A", x));

setTimeout(() => {
  log("B subscribe");
  source.subscribe(x => log("B", x));
}, 100);

setTimeout(() => {
  log("C subscribe");
  source.subscribe(x => log("C", x));
}, 400);

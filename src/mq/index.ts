import { v1 as generateId } from "uuid";

export namespace EventEmitter {
  let subscribers: Record<
    string,
    Record<string, (...args: any[]) => void>
  > = {};

  export const publish = (event: string, args: any[]) => {
    Object.keys(subscribers[event]).forEach((sub) => {
      console.log(`Firing event ${event} for subscriber ${sub}`);
      subscribers[event][sub](...args);
    });
  };

  export const subscribe = (
    event: string,
    callback: (...args: any[]) => void
  ) => {
    const uniqueId = generateId();
    if (!subscribers[event]) {
      subscribers[event] = {};
    }
    subscribers[event][uniqueId] = (...args) => {
      callback(...args);
    };
  };
}

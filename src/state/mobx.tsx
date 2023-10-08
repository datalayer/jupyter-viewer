import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";

export class MobxTimer {
  secondsPassed = 0;
  constructor() {
    makeAutoObservable(this);
  }
  reset() {
    this.secondsPassed = 0
  }
  increaseTimer() {
    this.secondsPassed += 1;
  }
}

export const mobxTimer = new MobxTimer();

setInterval(() => {
  mobxTimer.increaseTimer();
}, 1000);

export type IMobxTimerViewProps = {
  mobxTimer: MobxTimer,
}

export const MobxTimerView = observer(({ mobxTimer }: IMobxTimerViewProps) => (
  <button onClick={() => mobxTimer.reset()}>
    Jupyter Viewer Mobx: {mobxTimer.secondsPassed}
  </button>
))

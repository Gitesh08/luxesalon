"use client";

import { useStore } from "@/store";
import {
  getActiveQueue,
  getWaitingAndStandbyQueue,
  getCompletedTokens,
  getCurrentlyServedToken,
} from "@/lib/queue";
import { estimateWait } from "@/lib/time";

export function useQueue() {
  const queue = useStore((state) => state.queue);
  const trackedTokenId = useStore((state) => state.trackedTokenId);
  const setTrackedTokenId = useStore((state) => state.setTrackedTokenId);
  const callToken = useStore((state) => state.callToken);
  const checkIn = useStore((state) => state.checkIn);
  const checkOut = useStore((state) => state.checkOut);
  const markNoShow = useStore((state) => state.markNoShow);
  const standby = useStore((state) => state.standby);
  const addWalkIn = useStore((state) => state.addWalkIn);

  const activeQueue = getActiveQueue(queue.tokens);
  const waitingQueue = getWaitingAndStandbyQueue(queue.tokens);
  const completedTokens = getCompletedTokens(queue.tokens);
  const currentlyServed = getCurrentlyServedToken(queue.tokens);

  // Position and wait calculation for tracked token
  const trackedIndex = trackedTokenId
    ? activeQueue.findIndex((t) => t.id === trackedTokenId)
    : -1;

  const estimatedWaitMin =
    trackedIndex >= 0
      ? estimateWait(trackedIndex, activeQueue)
      : estimateWait(waitingQueue.length, activeQueue);

  return {
    queue,
    activeQueue,
    waitingQueue,
    completedTokens,
    currentlyServed,
    totalWaiting: waitingQueue.length,
    estimatedWaitMin,
    trackedTokenId,
    trackedIndex,
    setTrackedTokenId,
    callToken,
    checkIn,
    checkOut,
    markNoShow,
    standby,
    addWalkIn,
  };
}

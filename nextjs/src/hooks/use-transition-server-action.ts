"use client";

import { useCallback, useTransition } from "react";

type AnyAsyncFunction = (...args: any[]) => Promise<any>;

export function useTransitionServerAction<
  TServerAction extends AnyAsyncFunction,
>(serverAction: TServerAction) {
  const [isPending, startTransition] = useTransition();

  const run = useCallback(
    (...args: Parameters<TServerAction>) => {
      return new Promise<Awaited<ReturnType<TServerAction>>>(
        (resolve, reject) => {
          startTransition(() => {
            serverAction(...args)
              .then(resolve)
              .catch(reject);
          });
        },
      );
    },
    [serverAction, startTransition],
  );

  return {
    isPending,
    run,
  };
}

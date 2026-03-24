"use client";

import { useCallback } from "react";
import { useTransitionServerAction } from "@/hooks/use-transition-server-action";
import { sendYandexGoalAction } from "@/data/actions/send-yandex-goal.action";

export function useYandexGoal() {
  const { isPending, run } = useTransitionServerAction(sendYandexGoalAction);

  const trackGoal = useCallback(
    async (goalCode: string) => {
      if (!goalCode) {
        return {
          data: null,
          statusCode: 400,
          errorMessage: "goalCode обязателен",
        };
      }

      return run(goalCode);
    },
    [run],
  );

  return {
    isPending,
    trackGoal,
  };
}

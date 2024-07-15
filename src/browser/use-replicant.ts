import { useReplicant, UseReplicantOptions } from "@nodecg/react-hooks";
import { Jsonify } from "type-fest";

import { ReplicantMap } from "../nodecg/replicants";

/**
 * useReplicantを型安全に使うためのラッパー関数
 */
export const useRep = <TRepName extends keyof ReplicantMap>(
  replicantName: TRepName,
  options: UseReplicantOptions<Jsonify<ReplicantMap[TRepName]>> = {},
): readonly [
  Jsonify<ReplicantMap[TRepName]> | undefined,
  (newValue: Jsonify<ReplicantMap[TRepName]>) => void,
] => useReplicant<ReplicantMap[TRepName]>(replicantName, options);

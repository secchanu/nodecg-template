import { type UseReplicantOptions, useReplicant } from "@nodecg/react-hooks";
import type { Jsonify } from "type-fest";

import type { ReplicantMap } from "../nodecg/replicants";

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

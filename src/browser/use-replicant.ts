import { useReplicant, UseReplicantOptions } from "@nodecg/react-hooks";
import { Jsonify } from "type-fest";

import { ReplicantMap } from "../nodecg/replicants";

export const useRep = <TRepName extends keyof ReplicantMap>(
  replicantName: string,
  options: UseReplicantOptions<Jsonify<ReplicantMap[TRepName]>> = {},
) => useReplicant<ReplicantMap[TRepName]>(replicantName, options);

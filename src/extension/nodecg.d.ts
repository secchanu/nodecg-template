import packageJson from "../../package.json";

import type { Configschema } from "../nodecg/generated/configschema";
import type { MessageMap } from "../nodecg/messages";
import type { ReplicantMap } from "../nodecg/replicants";
import type { CreateNodecgInstance } from "ts-nodecg/server";

export type NodeCG = CreateNodecgInstance<
  packageJson.name,
  Configschema,
  ReplicantMap,
  MessageMap
>;

import packageJson from "../../package.json";

import type { Configschema } from "../nodecg/generated/configschema";
import type { MessageMap } from "../nodecg/messages";
import type { ReplicantMap } from "../nodecg/replicants";
import type {
  CreateNodecgInstance,
  CreateNodecgConstructor,
} from "ts-nodecg/browser";

declare global {
  const nodecg: CreateNodecgInstance<
    packageJson.name,
    Configschema,
    ReplicantMap,
    MessageMap
  >;
  const NodeCG: CreateNodecgConstructor<
    packageJson.name,
    Configschema,
    ReplicantMap,
    MessageMap
  >;
}

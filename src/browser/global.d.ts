import type packageJson from "../../package.json";

import type {
	CreateNodecgConstructor,
	CreateNodecgInstance,
} from "ts-nodecg/browser";
import type { Configschema } from "../nodecg/generated/configschema";
import type { MessageMap } from "../nodecg/messages";
import type { ReplicantMap } from "../nodecg/replicants";

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

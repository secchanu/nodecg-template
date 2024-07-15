import type { NodeCG } from "./nodecg";

export default (nodecg: NodeCG) => {
  const sampleRep = nodecg.Replicant("sample");
  setInterval(() => {
    sampleRep.value = {
      ...sampleRep.value,
      num: (sampleRep.value?.num ?? 0) + 1,
    };
  }, 1000);
};

// import styles from "./css/style.module.css";

import { useRep } from "../../use-replicant";

export default function Component() {
  const [value] = useRep("sample", { defaultValue: { str: "", num: 0 } });

  return (
    <div>
      {value?.str} {value?.num}
    </div>
  );
}

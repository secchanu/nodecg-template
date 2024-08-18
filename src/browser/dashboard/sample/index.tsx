// import styles from "./css/style.module.css";

import { useRep } from "../../use-replicant";

export default function Component() {
	const [, setValue] = useRep("sample");

	return (
		<input
			type="text"
			onChange={(e) => {
				setValue({
					str: e.target.value,
					num: 0,
				});
			}}
		/>
	);
}

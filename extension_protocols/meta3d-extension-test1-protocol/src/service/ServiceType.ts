import { infoContribute } from "../contribute/InfoContributeType";
import { state } from "../state/StateType";

export type service = {
	log: (state: state) => void,
	registerInfo: (state: state, infoContribute: infoContribute) => state
};

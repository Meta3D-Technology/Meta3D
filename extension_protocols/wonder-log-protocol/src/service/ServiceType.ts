import { infoContribute } from "../contribute_points/InfoContributeType";
import { state } from "../state/StateType";

export type service = {
	log: (state: state) => void,
	registerInfo: (state: state, infoContribute: infoContribute) => state
};

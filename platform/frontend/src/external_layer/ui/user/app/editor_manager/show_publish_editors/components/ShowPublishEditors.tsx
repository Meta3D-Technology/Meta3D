import * as React from "react";
import { useSelector } from "react-redux";
import { Store } from "../../../../store_type/StoreType";
import { AppStore } from "../../../store_type/AppStoreType";
import { List, message } from 'antd';
import { findAllPublishEditors } from "../../../../../../../application_layer/editor/EditorManagerService";
import { useEffectExecOnlyOnce } from "../../../../utils/CustomHookUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

let ShowPublishEditors = () => {
	// let navigate = useNavigate()

	let _selector = ({ app }: Store) => app

	let { username }: AppStore = useSelector(_selector);

	const [isLoaded, setIsLoaded] = useState(false);
	const [allPublishEditors, setAllPublishEditors] = useState([]);

	useEffectExecOnlyOnce(() => {
		findAllPublishEditors(username).observe(allPublishEditors => {
			setAllPublishEditors(allPublishEditors)
			setIsLoaded(true)
		}).catch((e) => {
			setIsLoaded(false);
			message.error(e.mesage)
		});
	})

	let _buildURL = (username: string, editorName: string) => {
		// return "/EnterEditor/" + encodeURI(JSON.stringify({ username: username, editorName: editorName }))
		// return "/EnterEditor?" + encodeURI(JSON.stringify({ username: username, editorName: editorName }))

		return "/EnterEditor?username=" + username + "&editorName=" + editorName
	}

	let _openLink = (url) => {
		window.open(url, '_blank')?.focus();
	}

	let _render = () => {
		if (!isLoaded) {
			return <p>loading...</p>
		}

		return <List
			itemLayout="horizontal"
			dataSource={allPublishEditors}
			renderItem={item => (
				<List.Item>
					<List.Item.Meta
						title={<span onClick={
							() => {
								_openLink(_buildURL(item.username, item.editorName))
							}
						}>{item.editorName}</span>}
					/>
				</List.Item>
			)}
		/>
	}

	return <section>
		{_render()}
	</section>
}

export default ShowPublishEditors
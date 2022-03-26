import React, { useRef } from "react";

import { Button, Card, Col, Row, Space } from "antd";
import GGEditor, { Mind } from "gg-editor";
import EditorMinimap from "./components/EditorMinimap";
import { MindContextMenu } from "./components/EditorContextMenu";
import { MindDetailPanel } from "./components/EditorDetailPanel";
import { MindToolbar } from "./components/EditorToolbar";
import _ from "lodash";

import styles from "./index.module.less";
import { withPropsAPI } from "gg-editor";
GGEditor.setTrackable(false);

import data from "./worldCup2018.json";
// import originData from "./seppData.json";
// const data = { roots: [originData.root] };

export default function MyMindWrap() {
	return (
		<div>
			<GGEditor className={styles.editor}>
				<MyMind />
			</GGEditor>
		</div>
	);
}

let tmpData = null;

const MyMind = withPropsAPI(({ propsAPI }) => {
	// 实现复制
	const onCopy = () => {
		const selectedNode = propsAPI.getSelected()[0];
		if (!selectedNode) {
			return;
		}
		const model = selectedNode.getModel();

		const node = {
			label: model.label,
			children: [],
		};

		findChildren(node, model);
		tmpData = node;
		console.log("-----", node);
	};

	const findChildren = (node, model) => {
		if (!model.children || !model.children.length) {
			return;
		}
		if (!node.children) {
			node.children = [];
		}
		for (const item of model.children) {
			const newItem = { label: item.label, children: [] };
			node.children.push(newItem);
			findChildren(newItem, item);
		}
	};

	// 实现粘贴
	const onPaste = () => {
		const selectedNode = propsAPI.getSelected()[0];
		if (!selectedNode) {
			return;
		}
		const pid = selectedNode.id;
		// propsAPI.add("node", {
		// 	label: "克罗地亚",
		// 	children: [
		// 		{
		// 			label: "克罗地亚",
		// 		},
		// 		{
		// 			label: "丹麦",
		// 		},
		// 	],
		// 	parent: pid,
		// });
		if (!tmpData) {
			return;
		}
		tmpData.parent = pid;
		// 拷贝，否则无法重复粘贴
		propsAPI.add("node", _.cloneDeep(tmpData));
	};

	const onKeyDown = (e) => {
		if (!e.metaKey && !e.ctrlKey) {
			return true;
		}
		if (e.key == "c") {
			onCopy();
		} else if (e.key == "v") {
			onPaste();
		}
		return true;
	};

	return (
		<>
			<Row className={styles.editorHd}>
				<Col span={24}>
					<MindToolbar />
				</Col>
			</Row>
			<Row className={styles.editorBd} onKeyDown={onKeyDown}>
				<Col span={20} className={styles.editorContent}>
					<Mind data={data} className={styles.mind} onAfterChange={(d) => console.log(d)} />
				</Col>
				<Col span={4} className={styles.editorSidebar}>
					<MindDetailPanel />
					<EditorMinimap />
				</Col>
			</Row>
			<MindContextMenu />

			<SaveButton onCopy={onCopy} onPaste={onPaste} />
		</>
	);
});

const SaveButton = withPropsAPI(({ propsAPI, onCopy, onPaste }) => {
	window.propsAPI = propsAPI;
	const onSave = () => {
		const data = propsAPI.save();
		console.log("data: ", data);
	};

	return (
		<Card style={{ background: "#f5f5f5", height: "100px" }} onKeyDown={(e) => console.log(e)}>
			<Space>
				<Button onClick={onSave}>保存</Button>
				<Button onClick={onCopy}>Copy</Button>
				<Button onClick={onPaste}>Paste</Button>
			</Space>
		</Card>
	);
});

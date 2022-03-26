import React, { useState } from "react";
import { List, Tree } from "antd";
import { useEffect } from "react/cjs/react.production.min";

const treeData = [
	{ key: "0-0", title: "业务0" },
	{
		key: "0-1",
		title: "业务1",
		children: [
			{ key: "0-1-0", title: "子业务零" },
			{ key: "0-1-1", title: "子业务一", children: [{ key: "0-1-1-0", title: "子子业务一一" }] },
		],
	},
	{ key: "0-2", title: "0-3", children: [{ key: "0-2-0", title: "子业务零" }] },
];

// 扁平数据
const list = [];
const keyFullTitleMap = {};

const lookup = (children, lastTitle = "") => {
	for (const item of children) {
		const title = (!lastTitle ? "" : lastTitle + "-->") + item.title;
		if (!item.children?.length) {
			list.push(title);
			keyFullTitleMap[item.key] = title;
			continue;
		} else {
			lookup(item.children, title);
		}
	}
};

lookup(treeData);
console.log(list, keyFullTitleMap);

export default function TreeSideList() {
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [selectedTitleList, setSelectedTitleList] = useState([]);

	const onSelect = (keys, info) => {
		console.log("selected", keys, info);
		setSelectedKeys(keys);
		updateList(keys);
	};

	const onCheck = (keys, info) => {
		console.log("onCheck", keys, info);
		setSelectedKeys(keys);
		updateList(keys);
	};

	const updateList = (selectedKeys) => {
		const newList = [];
		for (const key of selectedKeys) {
			if (keyFullTitleMap[key]) {
				newList.push(keyFullTitleMap[key]);
			}
		}

		setSelectedTitleList(newList);
	};

	return (
		<div style={{ display: "flex", justifyContent: "space-between" }}>
			<Tree checkable defaultExpandAll onCheck={onCheck} onSelect={onSelect} treeData={treeData} />
			<div style={{ width: "40%" }}>
				<List size="small" bordered dataSource={selectedTitleList} renderItem={(item) => <List.Item>{item}</List.Item>} />
			</div>
		</div>
	);
}

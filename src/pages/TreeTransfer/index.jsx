import React, { useState } from "react";
import { Transfer, Tree } from "antd";

import data from "Src/data/worldCup2018.json";
const replacedDataStr = JSON.stringify(data).replace(/id/g, "key").replace(/label/g, "title");
const root = JSON.parse(replacedDataStr);
console.log("root: ", root);

const treeData = root?.roots || [
	{ key: "0-0", title: "0-0" },
	{
		key: "0-1",
		title: "0-1",
		children: [
			{ key: "0-1-0", title: "0-1-0" },
			{ key: "0-1-1", title: "0-1-1" },
		],
	},
	{ key: "0-2", title: "0-3" },
];



// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => selectedKeys.indexOf(eventKey) !== -1;

const generateTree = (treeNodes = [], checkedKeys = []) =>
	treeNodes.map(({ children, ...props }) => ({
		...props,
		disabled: checkedKeys.includes(props.key),
		children: generateTree(children, checkedKeys),
	}));

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
	const transferDataSource = [];
	function flatten(list = []) {
		list.forEach((item) => {
			transferDataSource.push(item);
			flatten(item.children);
		});
	}
	flatten(dataSource);

	return (
		<Transfer
			{...restProps}
			targetKeys={targetKeys}
			dataSource={transferDataSource}
			className="tree-transfer"
			render={(item) => item.title}
			showSelectAll={false}
		>
			{({ direction, onItemSelect, onItemSelectAll, selectedKeys }) => {
				if (direction === "left") {
					const checkedKeys = [...selectedKeys, ...targetKeys];
					console.log("checkedKeys: ", selectedKeys);
					return (
						<Tree
							blockNode
							checkable
							checkStrictly={true}
							defaultExpandAll
							checkedKeys={checkedKeys}
							treeData={generateTree(dataSource, targetKeys)}
							onCheck={(_, { node: { key } }) => {
								onItemSelect(key, !isChecked(checkedKeys, key));
							}}
							onSelect={(_, { node: { key } }) => {
								onItemSelect(key, !isChecked(checkedKeys, key));
							}}
						/>
					);
				}
			}}
		</Transfer>
	);
};

const App = () => {
	const [targetKeys, setTargetKeys] = useState([]);
	const onChange = (keys) => {
		console.log("keys: ", keys);
		setTargetKeys(keys);
	};
	return <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={onChange} />;
};

export default App;

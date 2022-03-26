import React from "react";
import MyMind from "./editor/mind";
import TreeTransfer from "./TreeTransfer";
import TreeSideList from "./TreeSideList";

import "antd/dist/antd.less";

function App() {
	return (
		<div>
			<MyMind />
			<hr />
			<TreeSideList />
			<hr />
			<TreeTransfer />
		</div>
	);
}

export default App;

import React from "react";
import MyMind from "./editor/mind";
import TreeTransfer from "./TreeTransfer";

import "antd/dist/antd.less";

function App() {
	return (
		<div>
			<MyMind />
			<hr />
			<TreeTransfer />
		</div>
	);
}

export default App;

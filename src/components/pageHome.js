import PageView from "./pageView";

import data from "../_setup.json";

export default function PageHome() {
	if (data.url.slug_home) {
		return (
			<div>
				<PageView page={data.url.slug_home} />
			</div>
		);
	} else {
		return <div className="content 404">404 - Not found!</div>;
	}
}

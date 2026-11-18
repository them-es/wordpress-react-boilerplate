import PageView from "./pageView";
import data from "../_setup.json";

export default function PageHome() {
    const homeSlug = data?.url?.slug_home;

    if (!homeSlug) {
        return <div className="content page-404">404 - Not found!</div>;
    }

    return <PageView page={homeSlug} />;
}
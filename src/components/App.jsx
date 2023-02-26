import Home from "components/Home";
import Navigator from "components/Navigator";
import { APP_CLASS } from "constants/classes";

const App = () => {
	return (
		<div className={APP_CLASS}>
			<Navigator />
			<Home />
		</div>
	);
};

export default App;

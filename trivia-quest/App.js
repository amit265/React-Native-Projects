import { registerRootComponent } from "expo";
import MainApp from "./src/App"; // Your actual App component
import "./global.css";
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();
registerRootComponent(MainApp);

export default MainApp;

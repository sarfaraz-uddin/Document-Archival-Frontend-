import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";
import userReducer from "./qaManagment/UserManagement/reducer";
import projectReducer from "./qaManagment/project/reducer";
import moduleReducer from "./qaManagment/module/reducer";
import testcaseReducer from "./qaManagment/Test/reducer";
import testresultReducer from "./qaManagment/TestResult/reducer";



// API Key
import APIKeyReducer from "./apiKey/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Account: AccountReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    APIKey: APIKeyReducer,
    User: userReducer,
    Project: projectReducer,
    Module: moduleReducer,
    TestCase: testcaseReducer,
    TestResult: testresultReducer,
});

export default rootReducer;
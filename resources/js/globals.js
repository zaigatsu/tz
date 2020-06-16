import AppBtn from "./components/AppBtn";
import AppCol from "./components/AppCol";
import AppSpacer from "./components/AppSpacer";
import AppForm from "./components/AppForm";
import AppContent from "./components/AppContent";
import AppRow from "./components/AppRow";
import AppTextField from "./components/AppTextField";
import AppPageTitle from "./components/AppPageTitle";

export default {
    install(Vue) {
        Vue.component("app-btn", AppBtn);
        Vue.component("app-col", AppCol);
        Vue.component("app-content", AppContent);
        Vue.component("app-form", AppForm);
        Vue.component("app-row", AppRow);
        Vue.component("app-spacer", AppSpacer);
        Vue.component("app-text-field", AppTextField);
        Vue.component("app-page-title", AppPageTitle);
    }
};

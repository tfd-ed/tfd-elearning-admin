import convertKhmerNumber from "@/plugins/utils/convert-khmer-number";
import api from "@/plugins/utils/api";

/**
 * Inject functions & objects into nuxt context, they can be later accessed with this.$...
 * for example, this.$convertKhmerNumber or this.$api
 * @param app
 * @param inject
 */
// eslint-disable-next-line no-unused-vars
export default ({ app }, inject) => {
  inject("convertKhmerNumber", convertKhmerNumber);
  inject("api", api());
};

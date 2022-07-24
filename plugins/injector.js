import convertKhmerNumber from "@/plugins/utils/convert-khmer-number";
import api from "@/plugins/utils/api";
export default ({ app }, inject) => {
  inject("convertKhmerNumber", convertKhmerNumber);
  inject("api", api());
};

import convertKhmerNumber from "@/plugins/utils/convert-khmer-number";
export default ({ app }, inject) => {
  inject("convertKhmerNumber", convertKhmerNumber);
};

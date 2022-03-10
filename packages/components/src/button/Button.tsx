import { defineComponent } from "vue";
import { SizeProp } from "../config-provider";
import PropTypes, { tuple } from "../_util/vue-types";

const buttonVariants = tuple("base", "outline", "dashed", "text");
const buttonThemes = tuple(
  "default",
  "primary",
  "danger",
  "warning",
  "success"
);

const buttonShapes = tuple("square", "round", "circle");
const ButtonHTMLTypes = tuple("submit", "button", "reset");

const buttonProps = {
  variant: PropTypes.oneOf(buttonVariants).def("base"),
  theme: PropTypes.oneOf(buttonThemes).def("default"),
  shape: PropTypes.oneOf(buttonShapes),
  size: SizeProp,
  disabled: PropTypes.bool.def(false),
  htmlType: PropTypes.oneOf(ButtonHTMLTypes).def("button"),
  loading: PropTypes.bool.def(false),
  block: PropTypes.bool.def(false),
};

export default defineComponent({
  name: "EButton",
  props: buttonProps,
  setup() {},
  render() {
    return <div class="button"></div>;
  },
});

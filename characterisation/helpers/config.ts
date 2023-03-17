import defaults from "../../utils/defaults";

export default {
  pncHost: process.env.PNC_HOST || defaults.pncHost,
  pncPort: process.env.PNC_PORT || defaults.pncPort
};

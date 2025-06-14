import { type RouteConfig, route, index } from "@react-router/dev/routes";


export default [
  index("routes/home.tsx"),
  route("/breathe", "routes/breathe.tsx"),
  route("/explore", "routes/explore.tsx"),
] satisfies RouteConfig;



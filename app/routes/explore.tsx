import type { Route } from "./+types/explore";
import { APP_NAME, APP_DESCRIPTION, APP_VERSION } from "../../constants";
import ExploreTechniques from "~/explore-techniques/explore-techniques";


export function meta({}: Route.MetaArgs) {
  return [
    { title: APP_NAME },
    { name: APP_DESCRIPTION, content: APP_VERSION },
  ];
}

export default function Explore() {
  return <ExploreTechniques />;
}

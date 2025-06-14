import type { Route } from "./+types/breathe";
import { APP_NAME, APP_DESCRIPTION, APP_VERSION } from "../../constants";
import Exercises from "~/exercises/exercises";


export function meta({}: Route.MetaArgs) {
  return [
    { title: APP_NAME },
    { name: APP_DESCRIPTION, content: APP_VERSION },
  ];
}

export default function Breathe() {
  return <Exercises />;
}

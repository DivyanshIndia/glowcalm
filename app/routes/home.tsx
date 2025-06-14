import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { APP_NAME, APP_DESCRIPTION, APP_VERSION } from "../../constants";


export function meta({}: Route.MetaArgs) {
  return [
    { title: APP_NAME },
    { name: APP_DESCRIPTION, content: APP_VERSION },
  ];
}

export default function Home() {
  return <Welcome />;
}

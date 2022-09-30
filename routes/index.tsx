import Counter from "../islands/Counter.tsx";
import db from "../utility/database.ts";

import { Handlers, PageProps } from "$fresh/server.ts";

interface Alert {
  "@xmlns": string;
  id: string;
  identifier: string;
  info: {
    area: { areaDesc: string; geocode: Record<string, unknown> };
    category: string;
    certainty: string;
    contact: string;
    description: string;
    event: string;
    eventCode: { value: string; valueName: string };
    headline: string;
    instruction: string;
    language: string;
    parameter: [Record<string, unknown>[]];
    severity: string;
    urgency: string;
    web: string;
  };
  msgType: string;
  references: string;
  scope: string;
  sender: string;
  sent: string;
  status: string;
}

export const handler: Handlers<Alert[]> = {
  async GET(_req, ctx) {
    console.log(await db.select("alerts"));

    const alerts = await db.select("alerts");
    if (!alerts || alerts.length == 0) {
      return new Response("Project not found", { status: 404 });
    }
    return ctx.render(alerts);
  },
};

export default function ProjectPage(props: PageProps<Alert[]>) {
  console.log(props);

  return (
    <div>
      <ul>
        {props.data.map((alert) => {
          return <li>{alert.identifier}</li>;
        })}
      </ul>
    </div>
  );
}

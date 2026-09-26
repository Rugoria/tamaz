import { consultationSchema } from "@/lib/consultationSchema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // TODO: send the request to its real destination (booking system, CRM or a
  // notification email to the studio coordinator). Until then it is only logged.
  console.log("[consultation] new request", parsed.data);

  return Response.json({ ok: true });
}

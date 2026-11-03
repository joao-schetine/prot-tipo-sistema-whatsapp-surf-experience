import { notFound } from "next/navigation";
import { PESSOAS, pessoa } from "@/lib/dados";
import Ficha from "@/components/Ficha";

export function generateStaticParams() {
  return PESSOAS.map((p) => ({ id: p.id }));
}

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = pessoa(id);
  if (!p) notFound();
  return <Ficha inicial={p} />;
}

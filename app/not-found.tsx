import Link from "next/link";
export default function NotFound() {
  return <div className="py-20 text-center"><h1 className="font-display text-2xl font-bold">Não achei essa pessoa</h1><Link href="/" className="mt-3 inline-block text-sea">Voltar pro quadro</Link></div>;
}

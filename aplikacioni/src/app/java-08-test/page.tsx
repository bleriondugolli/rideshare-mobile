import Link from "next/link";
import Java08Test from "../../components/Java08Test";

export default function Java08TestPage() {
  return (
    <main>
      <Link href="/">← Kthehu te lista</Link>
      <h1>Prova Java 08</h1>
      <p>
        Konfirmimi i vendtakimit është vetëm provë dhe nuk ruhet në databazë.
      </p>
      <Java08Test />
    </main>
  );
}

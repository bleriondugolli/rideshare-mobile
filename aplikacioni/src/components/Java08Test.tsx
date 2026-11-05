import { Vendtakimi } from "./Vendtakimi";

export default function Java08Test() {
  const udhetimLokal = { vendtakimi: "Biblioteka" };

  return (
    <section>
      <h2>Vendtakimi</h2>
      <Vendtakimi vendtakimi={udhetimLokal.vendtakimi} editable />
    </section>
  );
}

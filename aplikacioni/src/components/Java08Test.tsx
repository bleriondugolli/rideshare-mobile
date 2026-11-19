import { Vendtakimi } from "./Vendtakimi";

export default function Java08Test() {
  const udhetimLokal = {
    shoferi: "Driton",
    nisja: "prishtinë",
    destinacioni: "kolegji aab",
    ora: "08:00",
    vendtakimi: "Biblioteka",
  };

  return (
    <section>
      <h2>Udhëtimi i {udhetimLokal.shoferi}</h2>
      <p>
        {udhetimLokal.nisja} – {udhetimLokal.destinacioni}, ora{" "}
        {udhetimLokal.ora}
      </p>
      <Vendtakimi vendtakimi={udhetimLokal.vendtakimi} editable />
    </section>
  );
}

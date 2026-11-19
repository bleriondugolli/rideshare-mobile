-- Ekzekuto pas schema-java05.sql në databazën tënde të laboratorit.
-- Ky shembull nuk krijon kërkesë rezervimi dhe nuk ndryshon numrin e vendeve pas tij.
UPDATE udhetimet
SET nisja = 'Ferizaj', destinacioni = 'AAB', ora = '08:15',
    vendtakimi = 'Te stacioni kryesor', vende = 2
WHERE id = '2';

INSERT INTO profilet (github_id, emri, roli)
VALUES ('DEMO-SHOFER-2', 'Driton', 'shofer')
ON CONFLICT (github_id) DO UPDATE SET emri = EXCLUDED.emri, roli = EXCLUDED.roli;

UPDATE udhetimet SET shofer_id = 'DEMO-SHOFER-2' WHERE id = '2';

CREATE TABLE IF NOT EXISTS udhetimet_e_ruajtura (
  github_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (github_id, udhetim_id)
);

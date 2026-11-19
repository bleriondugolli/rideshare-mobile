-- Ekzekuto pas schema-java09.sql në databazën e laboratorit.
CREATE TABLE IF NOT EXISTS kerkesat_vendet (
  id BIGSERIAL PRIMARY KEY,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  udhetar_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'ne pritje'
    CHECK (status IN ('ne pritje', 'e pranuar')),
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT now(),
  perditesuar_me TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (udhetim_id, udhetar_id)
);

CREATE INDEX IF NOT EXISTS kerkesat_vendet_udhetim_idx
  ON kerkesat_vendet (udhetim_id, krijuar_me);

-- Nëse udhëtimi demo 2 ende ka shofer_id='DEMO-SHOFER-2', lidhe me ID-në
-- numerike të llogarisë GitHub të shoferit tënd para provës:
-- UPDATE udhetimet SET shofer_id = '<GITHUB_ID_I_SHOFERIT>' WHERE id = '2';
-- Për provën offline të veçantë, lidhe edhe udhëtimin 1 me të njëjtin shofer.
-- UPDATE udhetimet SET shofer_id = '<GITHUB_ID_I_SHOFERIT>' WHERE id = '1';

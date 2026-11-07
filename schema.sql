CREATE TABLE IF NOT EXISTS gifts (
  id TEXT PRIMARY KEY,
  creator_name TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS gifts_created_at_idx ON gifts(created_at DESC);
CREATE INDEX IF NOT EXISTS gifts_creator_idx ON gifts(creator_name);
CREATE INDEX IF NOT EXISTS gifts_recipient_idx ON gifts(recipient_name);

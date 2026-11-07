CREATE TABLE IF NOT EXISTS gifts (
  id TEXT PRIMARY KEY NOT NULL,
  creator TEXT NOT NULL CHECK(length(creator) BETWEEN 1 AND 60),
  recipient TEXT NOT NULL CHECK(length(recipient) BETWEEN 1 AND 60),
  message TEXT NOT NULL CHECK(length(message) BETWEEN 1 AND 600),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_gifts_created_at ON gifts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gifts_creator ON gifts(creator COLLATE NOCASE);
CREATE INDEX IF NOT EXISTS idx_gifts_recipient ON gifts(recipient COLLATE NOCASE);
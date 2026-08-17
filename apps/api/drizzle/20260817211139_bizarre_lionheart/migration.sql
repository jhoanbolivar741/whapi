CREATE TABLE `sent_messages` (
	`id` text PRIMARY KEY,
	`number` text NOT NULL,
	`message` text NOT NULL,
	`status` text NOT NULL,
	`error` text,
	`sent_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);

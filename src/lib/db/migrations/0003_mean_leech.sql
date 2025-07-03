CREATE TABLE `stats` (
	`id` integer PRIMARY KEY DEFAULT 1 NOT NULL,
	`whims_created` integer DEFAULT 0 NOT NULL,
	`secrets_vanished` integer DEFAULT 0 NOT NULL,
	`last_updated` integer DEFAULT current_timestamp,
	CONSTRAINT "single_row_check" CHECK("stats"."id" = 1)
);
--> statement-breakpoint
INSERT INTO `stats` (`whims_created`, `secrets_vanished`) VALUES (0, 0);
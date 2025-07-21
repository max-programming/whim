ALTER TABLE `attempts` ADD `successful_attempts` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `whims` ADD `max_attempts` integer DEFAULT 1 NOT NULL;
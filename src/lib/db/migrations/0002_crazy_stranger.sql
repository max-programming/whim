CREATE TABLE `attempts` (
	`whim_id` text PRIMARY KEY NOT NULL,
	`failed_attempts` integer DEFAULT 0 NOT NULL,
	`last_attempt_at` integer DEFAULT current_timestamp NOT NULL,
	FOREIGN KEY (`whim_id`) REFERENCES `whims`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `whims` DROP COLUMN `is_deleted`;--> statement-breakpoint
ALTER TABLE `whims` DROP COLUMN `failed_attempts`;
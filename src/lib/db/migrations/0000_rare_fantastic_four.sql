CREATE TABLE `whims` (
	`id` text PRIMARY KEY NOT NULL,
	`encrypted_message` blob NOT NULL,
	`salt` blob NOT NULL,
	`created_at` integer DEFAULT current_timestamp,
	`is_deleted` integer DEFAULT false,
	`failed_attempts` integer DEFAULT 0
);

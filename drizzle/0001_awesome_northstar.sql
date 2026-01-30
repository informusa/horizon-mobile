CREATE TABLE `leaderboard` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`playerName` varchar(50) NOT NULL,
	`score` int NOT NULL,
	`level` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leaderboard_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `leaderboard` ADD CONSTRAINT `leaderboard_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
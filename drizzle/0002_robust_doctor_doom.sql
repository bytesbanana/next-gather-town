CREATE TABLE "rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_join_rooms" (
	"user_id" varchar(128) NOT NULL,
	"room_id" integer
);
--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "users_join_rooms" ALTER COLUMN "room_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users_join_rooms" ADD CONSTRAINT "users_join_rooms_user_id_room_id_pk" PRIMARY KEY("user_id","room_id");
"use client";

import { useActionState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { charcterAssets } from "@/data/game";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";
import { Label } from "@/components/ui/label";

import { joinRoom } from "@/app/actions/room";
import type { User } from "next-auth";

const initialState = {
  errors: {
    fields: {
      username: [],
      character: [],
    },
    message: "",
  },
};

const JoinRoomForm = ({ roomId, user }: { roomId: number; user: User }) => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [colors, animals],
    separator: "_",
  });

  const joinRoomWithRoomId = joinRoom.bind(null, roomId);
  const [state, formAction] = useActionState(joinRoomWithRoomId, initialState);

  return (
    <form
      className="flex w-fit min-w-[200px] -translate-y-1/2 flex-col gap-4 p-4"
      action={formAction}
    >
      <h1 className="text-2xl font-bold">Character settings</h1>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Username</Label>
        <Input
          type="text"
          name="username"
          defaultValue={user.name || randomName}
          className="p-2"
        />
        {state?.errors?.fields?.username &&
          state.errors.fields?.username.map((error) => (
            <p key={error}>{error}</p>
          ))}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Character </Label>
        <Select name="character">
          <SelectTrigger className="rounded-md border px-2">
            <SelectValue placeholder="Select character" />
          </SelectTrigger>
          <SelectContent className="fixed">
            {charcterAssets.map(({ key }) => (
              <SelectItem key={key} value={key}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Join</Button>
    </form>
  );
};

export default JoinRoomForm;

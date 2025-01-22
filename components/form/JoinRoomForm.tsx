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

import { update } from "@/app/actions/user";

const initialState = {
  errors: {
    fields: {
      username: [],
      character: [],
    },
    message: "",
  },
};

const ErrorLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-red-500">{children}</p>
);

interface JoinRoomFormProps {
  roomId: number;
  user: {
    username: string;
    character: string | null;
  };
}

const JoinRoomForm = ({ roomId, user }: JoinRoomFormProps) => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [colors, animals],
    separator: "_",
  });

  const joinRoomWithRoomId = update.bind(null, roomId);
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
          defaultValue={user.username || randomName}
          className="p-2"
        />
        {state?.errors?.fields?.username &&
          state.errors.fields?.username.map((error) => (
            <ErrorLabel key={error}>{error}</ErrorLabel>
          ))}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Character </Label>
        <Select name="character" defaultValue={user.character || ""}>
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

        {state?.errors?.fields?.character &&
          state.errors.fields?.character.map((error) => (
            <ErrorLabel key={error}>{error}</ErrorLabel>
          ))}
      </div>
      <Button type="submit">Join</Button>
    </form>
  );
};

export default JoinRoomForm;

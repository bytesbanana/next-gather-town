"use client";
import { UserAPIResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const PhaserGame = dynamic(() => import("@/components/phaser/PhaserGame"), {
  ssr: false,
});

const Page = () => {
  const { data: user, isLoading } = useQuery<UserAPIResponse>({
    queryKey: ["current_user"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user && (
        <PhaserGame
          {...{
            userId: user.id,
            username: user.username,
            character: user.character,
          }}
        />
      )}
    </div>
  );
};

export default Page;

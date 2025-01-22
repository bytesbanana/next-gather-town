"use client";
import dynamic from "next/dynamic";

const PhaserGame = dynamic(() => import("@/components/phaser/PhaserGame"), {
  ssr: false,
});

const Page = () => {
  // TODO: Get User data then render game
  return (
    <div>
      <PhaserGame />
    </div>
  );
};

export default Page;

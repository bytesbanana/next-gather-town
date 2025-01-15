import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  imageUrl: string;
  name: string;
}

export default async function UserAvatar({ imageUrl}: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt="User Avatar" />
    </Avatar>
  );
}

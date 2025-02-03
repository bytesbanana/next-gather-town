import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EventBus, EVENTS } from "../phaser/EventBus";

type ChatboxFormProps = ComponentProps<"form">;

export const ChatboxForm = ({ className }: ChatboxFormProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const handleOnGameEnter = () => {
      if (!isFocused) {
        setIsFocused(true);
      }

      if (inputRef.current && !isFocused) {
        setMessage("");
        inputRef.current.focus();
      }
    };

    EventBus.on(EVENTS.onChatFocus, handleOnGameEnter);

    return () => {
      EventBus.off(EVENTS.onChatFocus, handleOnGameEnter);
    };
  }, [isFocused]);

  return (
    <form
      className={cn("grid w-full max-w-sm gap-1", className)}
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        setMessage("");
        inputRef.current?.blur();
        setIsFocused(false);
      }}
    >
      <Textarea
        ref={inputRef}
        className="resize-none bg-slate-600/60 text-lg text-white"
        value={message}
        rows={5}
        onFocus={() => setIsFocused(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            buttonRef.current?.animate(
              [
                {
                  transform: "scale(.95)",
                },
                {
                  transform: "scale(1)",
                },
              ],
              {
                duration: 150,
                iterations: 1,
                easing: "cubic-bezier(0.4, 0, 0.2, 1)",
              },
            );
            formRef.current?.requestSubmit();
          }
        }}
        onChange={(e) => {
          if (e.target.value === "\n" || e.target.value === "") return;
          setMessage(e.target.value);
        }}
      />
      <Button
        type="submit"
        ref={buttonRef}
        className="transition active:scale-95"
      >
        Send message
      </Button>
    </form>
  );
};

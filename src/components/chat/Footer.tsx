import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { z } from "zod";
import { useRouter } from "next/router";
import useEmit from "~/hooks/useEmit";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  text: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

const Footer = () => {
  const router = useRouter();
  const pairId = router.query.pairId as string;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: "",
    },
  });

  const messageEmit = useEmit("message", {
    onSuccess: () => {
      reset();
      return;
    },
  });

  // React hooks
  const [enterToPostMessage, setEnterToPostMessage] = useState(true);

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    console.log("Submitting");
    messageEmit.mutate({ message: data.text, receiverId: pairId });
  };

  const isTyping = useEmit("isTyping");

  const onKeyDownCustom: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Shift") setEnterToPostMessage(false);

    if (event.key === "Enter" && enterToPostMessage)
      void handleSubmit(onSubmit)(event);

    isTyping.mutate({ typing: true });
  };

  const onKeyUpCustom: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Shift") setEnterToPostMessage(true);
  };

  const onBlurCustom: React.FocusEventHandler<HTMLInputElement> = () => {
    setEnterToPostMessage(true);
    isTyping.mutate({ typing: false });
  };

  return (
    <Flex w="100%" mt="5">
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <Controller
          name={"text"}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Type Something..."
              border="none"
              borderRadius="none"
              _focus={{
                border: "1px solid black",
              }}
              autoFocus
              onKeyDown={onKeyDownCustom}
              onKeyUp={onKeyUpCustom}
              onBlur={onBlurCustom}
            />
          )}
        />
        <Button
          bg="black"
          color="white"
          borderRadius="none"
          _hover={{
            bg: "white",
            color: "black",
            border: "1px solid black",
          }}
          type={"submit"}
        >
          Send
        </Button>
      </form>
    </Flex>
  );
};

export default Footer;

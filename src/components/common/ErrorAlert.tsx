import { errorState } from "../../state";
import {
  AlertRoot,
  AlertTitle,
  AlertDescription,
  AlertContent,
  VStack,
  Text,
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const ErrorAlert = () => {
  const errorMessages = useRecoilValue(errorState);
  const setErrorMessages = useSetRecoilState(errorState);

  const handleClose = () => {
    setErrorMessages([]); // 에러 메시지 초기화
  };

  if (errorMessages.length === 0) return null;

  return (
    <VStack
      position="absolute"
      top={20}
      left="50%"
      transform="translateX(-50%)"
    >
      {errorMessages.map((message, index) => (
        <AlertRoot
          key={index}
          status="error"
          variant="solid"
          flexDirection="row"
          alignItems="center"
          width="40vw"
          borderRadius="md"
          boxShadow="md"
        >
          <AlertContent>
            <AlertTitle mr={2}>⚠️ 오류 발생</AlertTitle>
            <AlertDescription>
              <Text mt={2}>{message}</Text>
              <Text>{"같은 현상이 반복되면 고객센터로 문의 바랍니다."}</Text>
              <Text mt={2}>{"* 고객센터"}</Text>
              <Text>{"- email: helpdesk@wisebirds.ai"}</Text>
            </AlertDescription>
          </AlertContent>
          <CloseButton
            pos="relative"
            top="-2"
            insetEnd="-2"
            color="white"
            onClick={handleClose}
          >
            확인
          </CloseButton>
        </AlertRoot>
      ))}
    </VStack>
  );
};

export default ErrorAlert;

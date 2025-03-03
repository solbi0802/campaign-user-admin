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
import { errorState } from "../../state";

const ErrorAlert = () => {
  const errorMessages = useRecoilValue(errorState); // 에러 메시지 배열을 가져옴
  const setError = useSetRecoilState(errorState); // 에러 상태 업데이트 함수

  // 에러 메시지 닫기
  const handleClose = (message: string) => {
    setError((prevErrors) => prevErrors.filter((err) => err !== message));
  };

  return (
    <VStack
      position="absolute"
      top={20}
      left="50%"
      transform="translateX(-50%)"
    >
      {errorMessages.length > 0 &&
        errorMessages.map((message, index) => (
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
                <Text mt={2}>
                  {
                    "에러가 발생했습니다. 같은 현상이 반복되면 고객센터로 문의 바랍니다. "
                  }
                </Text>
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
              onClick={() => handleClose(message)}
            >
              확인
            </CloseButton>
          </AlertRoot>
        ))}
    </VStack>
  );
};

export default ErrorAlert;

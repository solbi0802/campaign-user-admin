import { useEffect, useState } from "react";
import { Button, Field, HStack, Stack, Input } from "@chakra-ui/react";
import { fetchData } from "../../api";
import Dialog from "../../components/common/Modal";
import { useFormHook } from "../../hooks/useFormHook";

const UserUpdateModal = ({
  isOpen,
  onClose,
  onUserUpdated,
  userInfo,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
  userInfo: { id: number; email: string; name: string };
}) => {
  const { state, handleChange, validateForm, resetForm } = useFormHook();
  const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태 추가

  // 모달이 열릴 때 초기값 설정
  useEffect(() => {
    if (isOpen && userInfo) {
      resetForm();
      handleChange("userName", userInfo.name);
    }
  }, [isOpen, userInfo?.name]);

  const handleSubmit = async () => {
    if (isSubmitting) return; // 중복 요청 방지

    setIsSubmitting(true);
    try {
      const isValid = await validateForm("update");
      if (!isValid) return; // 유효성 검사 실패 시 종료

      const requestBody: Record<string, unknown> = {
        name: state.userName,
      };
      const res: { result: boolean; id: number } = await fetchData(
        `/api/users/33`,
        {
          method: "PATCH",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res?.result) {
        onUserUpdated(); // 사용자 목록 갱신
        resetForm(); // 입력 필드 초기화
        onClose();
      }
    } catch (error) {
      onClose();
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      title={"사용자 저장"}
      triggerChild={<></>}
      isOpen={isOpen} // 모달 상태 전달
      onClose={onClose} // 모달 닫기 핸들러 전달
      body={
        <Stack gap="4">
          <Field.Root required>
            <HStack>
              <Field.Label>아이디</Field.Label>
              <Field.RequiredIndicator />
            </HStack>
            <Input value={userInfo.email} readOnly={true} />
          </Field.Root>
          <Field.Root required invalid={!!state.userNameError}>
            <HStack>
              <Field.Label>이름</Field.Label>
              <Field.RequiredIndicator />
            </HStack>
            <Input
              value={state.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
            />
            {state.userNameError && (
              <Field.ErrorText>{state.userNameError}</Field.ErrorText>
            )}
          </Field.Root>
        </Stack>
      }
      footer={
        <>
          <Button
            backgroundColor={"gray.400"}
            variant={"outline"}
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            colorPalette="blue"
            onClick={handleSubmit}
            disabled={isSubmitting}
            loading={isSubmitting}
            loadingText="저장 중..."
          >
            저장
          </Button>
        </>
      }
    />
  );
};

export default UserUpdateModal;

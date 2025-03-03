import { useState } from "react";
import { Button, Field, HStack, Stack, Input } from "@chakra-ui/react";
import { fetchData } from "../../api";
import Dialog from "../../components/common/Modal";
import { useFormHook } from "../../hooks/useFormHook";
import { PasswordInput } from "../../components/ui/password-input";
const UserCreateModal = ({
  isOpen,
  onClose,
  onUserCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}) => {
  const { state, handleChange, validateForm, resetForm } = useFormHook();
  const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태 추가

  const handleSubmit = async () => {
    if (isSubmitting) return; // 중복 요청 방지

    setIsSubmitting(true);
    try {
      const isValid = await validateForm("create");
      if (!isValid) return; // 유효성 검사 실패 시 종료
      const requestBody = JSON.stringify({
        name: state.userName,
        email: state.email,
        password: state.password,
        repeat_password: state.confirmPassword,
      });
      const res: { result: boolean; id: number } = await fetchData(
        "/api/users",
        {
          method: "POST",
          body: requestBody,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res?.result) {
        onUserCreated(); // 사용자 목록 갱신
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
      title="사용자 생성"
      triggerChild={<Button colorPalette="blue">생성</Button>}
      isOpen={isOpen}
      onClose={onClose}
      body={
        <Stack gap="4">
          <Field.Root required invalid={!!state.emailError}>
            <HStack>
              <Field.Label>아이디</Field.Label>
              <Field.RequiredIndicator />
            </HStack>
            <Input
              value={state.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {state.emailError && (
              <Field.ErrorText>{state.emailError}</Field.ErrorText>
            )}
          </Field.Root>
          <Field.Root required invalid={!!state.passwordError}>
            <HStack>
              <Field.Label>비밀번호</Field.Label>
              <Field.RequiredIndicator />
            </HStack>
            <PasswordInput
              placeholder="영문, 숫자, 특수문자 조합 8~15자"
              value={state.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {state.passwordError && (
              <Field.ErrorText>{state.passwordError}</Field.ErrorText>
            )}
          </Field.Root>
          <Field.Root required invalid={!!state.confirmPasswordError}>
            <HStack>
              <Field.Label>비밀번호 확인</Field.Label>
              <Field.RequiredIndicator />
            </HStack>
            <PasswordInput
              value={state.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
            {state.confirmPasswordError && (
              <Field.ErrorText>{state.confirmPasswordError}</Field.ErrorText>
            )}
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
          <Button variant={"outline"} onClick={onClose}>
            취소
          </Button>
          <Button
            colorPalette="blue"
            onClick={handleSubmit}
            disabled={isSubmitting}
            loading={isSubmitting}
            loadingText="생성 중..."
          >
            생성
          </Button>
        </>
      }
    />
  );
};
export default UserCreateModal;

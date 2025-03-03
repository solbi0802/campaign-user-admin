import { useEffect, useState } from "react";
import { Button, Field, HStack, Stack, Input } from "@chakra-ui/react";
import { fetchData } from "../../api";
import Dialog from "../../components/common/Modal";
import { useFormHook } from "../../hooks/useFormHook";
import { PasswordInput } from "../../components/ui/password-input";
import User from "../../types";

const UserModal = ({
  isOpen,
  onClose,
  onUserUpdatedOrCreated,
  user,
  mode = "create", // 디폴트값은 생성모드
}: {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdatedOrCreated: () => void;
  user?: any; // 수정 시 사용할 사용자 정보
  mode?: "create" | "update"; // 모드 (생성/수정)
}) => {
  const { state, handleChange, validateForm, resetForm } = useFormHook(
    mode === "update"
  );
  const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태 추가

  // 수정 모드일 때는 user 정보로 상태 초기화
  useEffect(() => {
    if (mode === "update" && user) {
      handleChange("userName", user.name);
      handleChange("email", user.email);
    } else {
      resetForm(); // 생성 모드일 경우 초기화
    }
  }, [mode, user, handleChange, resetForm]);

  const handleSubmit = async () => {
    if (isSubmitting) return; // 중복 요청 방지

    setIsSubmitting(true);
    try {
      const isValid = await validateForm();
      if (!isValid) return; // 유효성 검사 실패 시 종료

      const requestBody: Record<string, unknown> = {
        name: state.userName,
        email: state.email,
      };
      // 생성 모드에서는 비밀번호와 비밀번호 확인 포함
      if (mode === "create") {
        requestBody.password = state.password;
        requestBody.repeat_password = state.confirmPassword;
      }

      let res: { result: boolean; id: number };
      if (mode === "create") {
        res = await fetchData("/api/users", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        res = await fetchData(`/api/users/${user?.id}`, {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" },
        });
      }

      if (res?.result) {
        onUserUpdatedOrCreated(); // 사용자 목록 갱신
        resetForm(); // 입력 필드 초기화
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <Dialog
      title={`사용자 ${mode === "create" ? "생성" : "저장"}`}
      triggerChild={<Button colorPalette="blue">생성</Button>}
      isOpen={isOpen} // 모달 상태 전달
      onClose={onClose} // 모달 닫기 핸들러 전달
      body={
        <Stack gap="4">
          <Field.Root required invalid={!!state.emailError}>
            <HStack>
              <Field.Label>아이디</Field.Label>
              <Field.RequiredIndicator />
            </HStack>
            <Input
              value={state.email}
              readOnly={mode === "update"}
              onChange={() => {
                console.log("dd");
              }}
            />
            {state.emailError ||
              (mode === "create" && (
                <Field.ErrorText>{state.emailError}</Field.ErrorText>
              ))}
          </Field.Root>
          {mode === "create" && (
            <>
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
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                />
                {state.confirmPasswordError && (
                  <Field.ErrorText>
                    {state.confirmPasswordError}
                  </Field.ErrorText>
                )}
              </Field.Root>
            </>
          )}
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
          <Button colorPalette="gray" onClick={onClose}>
            취소
          </Button>
          <Button
            colorPalette="blue"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? mode === "create"
                ? "생성 중..."
                : "저장 중..."
              : mode === "create"
              ? "생성"
              : "저장"}
          </Button>
        </>
      }
    />
  );
};

export default UserModal;

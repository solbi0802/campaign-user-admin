import CommonTable from "../../components/common/CommonTable";
import { Button, Field, HStack, Stack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import User from "../../types";
import { fetchData } from "../../api";
import {
  formatDate,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUserName,
} from "../../utils";
import { Link } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import { Title } from "../../styles/CommonStyle";
import { PasswordInput } from "../../components/ui/password-input";
import Dialog from "../../components/common/Modal";
import { DialogActionTrigger } from "../../components/ui/dialog";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const getUserList = async (page: number) => {
    try {
      const res: User = await fetchData(`/api/users?page=${page}`);
      setUsers(res.content);
      setTotalCount(res.size);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserList(page);
  }, [page]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(password, value));
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
    setUserNameError(validateUserName(value));
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const errorMessage = await validateEmail(value);
    setEmailError(errorMessage);
  };

  const columns = [
    { key: "email", header: "아이디" },
    { key: "name", header: "이름" },
    {
      key: "last_login_at",
      header: "마지막 로그인 일시",
      renderCell: (item: any) => formatDate(item.last_login_at),
    },
    {
      key: "수정",
      header: "수정",
      renderCell: (item: any) => <Link href={`user/${item.id}`}>수정</Link>,
    },
  ];

  const pageSize = 25;
  return (
    <>
      <Title> 사용자 관리</Title>
      <HStack marginTop="4" marginLeft="4">
        <Dialog
          title={"사용자 생성"}
          triggerChild={<Button colorPalette="blue">생성</Button>}
          body={
            <Stack gap="4" css={{ "--field-label-width": "96px" }}>
              <Field.Root required invalid={!!emailError}>
                <HStack>
                  <Field.Label>아이디</Field.Label>
                  <Field.RequiredIndicator />
                </HStack>
                <Input value={email} onChange={handleEmailChange} />
                {emailError && <Field.ErrorText>{emailError}</Field.ErrorText>}
              </Field.Root>
              <Field.Root required invalid={!!passwordError}>
                <HStack>
                  <Field.Label>비밀번호</Field.Label>
                  <Field.RequiredIndicator />
                </HStack>

                <PasswordInput
                  placeholder="영문,숫자,특수문자 조합 8~15자"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <Field.ErrorText>{passwordError}</Field.ErrorText>
                )}
              </Field.Root>
              <Field.Root required invalid={!!confirmPasswordError}>
                <HStack>
                  <Field.Label>비밀번호 확인</Field.Label>
                  <Field.RequiredIndicator />
                </HStack>
                <PasswordInput
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {confirmPasswordError && (
                  <Field.ErrorText>{confirmPasswordError}</Field.ErrorText>
                )}
              </Field.Root>
              <Field.Root required invalid={!!userNameError}>
                <HStack>
                  <Field.Label>이름</Field.Label>
                  <Field.RequiredIndicator />
                </HStack>
                <Input value={userName} onChange={handleUserNameChange} />
                {userNameError && (
                  <Field.ErrorText>{userNameError}</Field.ErrorText>
                )}
              </Field.Root>
            </Stack>
          }
          footer={
            <>
              <DialogActionTrigger asChild>
                <Button colorPalette="gray">취소</Button>
              </DialogActionTrigger>
              <Button colorPalette="blue">생성</Button>
            </>
          }
        />
      </HStack>
      <Stack width={"100vw"} gap="5" marginTop="8">
        <CommonTable columns={columns} data={users} />
        {users && (
          <PaginationRoot
            count={totalCount}
            pageSize={pageSize}
            page={page}
            defaultPage={1}
            onPageChange={(e) => setPage(e.page)}
          >
            <HStack wrap="wrap" justifyContent={"center"}>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        )}
      </Stack>
    </>
  );
};
export default UserList;

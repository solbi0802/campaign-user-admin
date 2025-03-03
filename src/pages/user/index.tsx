import CommonTable from "../../components/common/CommonTable";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import User from "../../types";
import { fetchData } from "../../api";
import { formatDate } from "../../utils";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import { Title } from "../../styles/CommonStyle";
import UserCreateModal from "./UserCreateModal";
import UserUpdateModal from "./UserUpdateModal";

interface UserInfo {
  id: number;
  email: string;
  name: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false); // 생성 모달 열기 상태
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); // 수정 모달 열기 상태
  const [selectedUser, setSelecteduser] = useState<UserInfo>();

  const getUserList = async (page: number) => {
    try {
      const res: User = await fetchData(`/api/users?page=${page}`);
      setUsers(res.content);
      setTotalCount(res.size);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditClick = (userInfo: UserInfo) => {
    setSelecteduser(userInfo);
    setUpdateModalOpen(true); // 수정 모달 열기
  };

  useEffect(() => {
    getUserList(page);
  }, [page]);

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
      renderCell: (item: any) => (
        <Button
          colorPalette="blue"
          onClick={() =>
            handleEditClick({ id: item.id, email: item.email, name: item.name })
          }
        >
          수정
        </Button>
      ),
    },
  ];

  const pageSize = 25;
  return (
    <>
      <Title> 사용자 관리</Title>
      <HStack marginTop="4" marginLeft="4">
        <Button colorPalette="blue" onClick={() => setCreateModalOpen(true)}>
          생성
        </Button>
      </HStack>
      <Stack width={"100vw"} gap="5" marginTop="8">
        {users ? (
          <>
            <CommonTable columns={columns} data={users} />
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
          </>
        ) : (
          <h3>데이터가 없습니다.</h3>
        )}
      </Stack>
      {isCreateModalOpen && (
        <UserCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onUserCreated={() => getUserList(page)}
        />
      )}

      {selectedUser && (
        <>
          <UserUpdateModal
            isOpen={isUpdateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            onUserUpdated={() => getUserList(page)}
            userInfo={selectedUser}
          />
        </>
      )}
    </>
  );
};
export default UserList;

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
import UserModal from "./UserModal";
import UserCreateModal from "./UserCreateModal";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false); // 생성 모달 열기 상태

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
          onClick={() => console.log("TODO:수정 모달")}
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
      <UserCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onUserCreated={() => getUserList(page)}
      />
    </>
  );
};
export default UserList;

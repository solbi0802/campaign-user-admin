import CommonTable from "../../components/CommonTable";
import { HStack, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import User from "../../types";
import { fetchData } from "../../api";
import { formatDate } from "../../utils";
import { Link } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

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
      renderCell: (item: any) => <Link href={`user/${item.id}`}>수정</Link>,
    },
  ];

  const pageSize = 25;
  return (
    <>
      <UserTitle> 사용자 리스트</UserTitle>
      <Stack width={"100vw"} gap="5">
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

const UserTitle = styled.h3`
  color: black;
  font-size: 18px;
  margin-top: 12px;
  padding: 12px;
  border-bottom: 1px solid black;
  font-weight: bold;
`;

export default UserList;

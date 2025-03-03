import {
  Box,
  Flex,
  HStack,
  Link,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { createListCollection } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchData } from "../api";
import User from "../types/index";
import styled from "@emotion/styled";
import { errorState, roleState } from "../state";
import { useRecoilState, useSetRecoilState } from "recoil";

const Navbar = () => {
  const [user, setUser] = useState<User>();
  const [role, setRole] = useRecoilState(roleState);
  const setErrorMessages = useSetRecoilState(errorState);

  const getMyInfo = async () => {
    try {
      const res = await fetchData("/api/auth/me");
      setUser(res as User);
    } catch (error) {
      console.error(error);
      setErrorMessages(["내정보를 불러올 수 없습니다."]);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  const handleRoleChange = (value: string[]) => {
    setRole(value);
  };

  const isAdmin = role.includes("admin");

  return (
    <Flex
      as="nav"
      bg="blue.500"
      p={4}
      align="center"
      justifyContent="space-between"
      gap="8"
      width="100vw"
      height="62px"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
    >
      <HStack>
        <Box>
          <Link href="/" color="whiteAlpha.800">
            <img
              width={40}
              height={40}
              src={"/logo.jpg"}
              alt="와이즈버즈 로고"
            />
          </Link>
        </Box>
        <Box>
          <Link href="/campaign" color="whiteAlpha.800">
            캠페인
          </Link>
        </Box>
        {isAdmin && (
          <Box>
            <Link href="/user" color="whiteAlpha.800">
              사용자
            </Link>
          </Box>
        )}
      </HStack>
      <HStack>
        <Box>
          <PopoverRoot positioning={{ placement: "bottom-end" }}>
            <PopoverTrigger backgroundColor={"blue.500"} border={"none"}>
              <p>{user?.email}</p>
            </PopoverTrigger>
            <PopoverContent
              zIndex="1001"
              backgroundColor={"white"}
              color={"black"}
              border={"none"}
            >
              <PopoverBody>
                <div>
                  <p>{user?.name}</p>
                  <p>{user?.email}</p>
                  <p>{user?.company?.name}</p>
                </div>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </Box>
        <Box>
          <SelectRoot
            collection={frameworks}
            size="sm"
            width="320px"
            value={role}
            onValueChange={(e) => handleRoleChange(e.value)}
          >
            <CustomSelectTrigger>
              <SelectValueText placeholder={role[0]} />
            </CustomSelectTrigger>
            <SelectContent
              bgColor="white"
              color="black"
              border="1px solid gray"
            >
              {frameworks.items.map((roleItem) => (
                <SelectItem
                  item={roleItem}
                  key={roleItem.value}
                  bgColor="white"
                  color="black"
                  _hover={{ bg: "gray.200" }}
                >
                  {roleItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
      </HStack>
    </Flex>
  );
};

export default Navbar;

const frameworks = createListCollection({
  items: [
    { label: "어드민", value: "admin" },
    { label: "매니저", value: "manager" },
    { label: "뷰어", value: "viewer" },
  ],
});

const CustomSelectTrigger = styled(SelectTrigger)`
  background-color: white;
  color: black;
  border: none;
  border: 1px solid gray;
  border-radius: 16px;

  & button {
    background-color: white;
    color: black;
    &:focus {
      outline: none;
      border: none;
    }
  }
`;

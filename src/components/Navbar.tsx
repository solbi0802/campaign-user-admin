import { Box, Flex, HStack, Link } from "@chakra-ui/react";
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

const Navbar = () => {
  const [user, setUser] = useState<User>();
  const getMyInfo = async () => {
    try {
      const res = await fetchData("/api/auth/me");
      setUser(res as User);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

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
        <Box>
          <Link href="/user" color="whiteAlpha.800">
            사용자
          </Link>
        </Box>
      </HStack>
      <HStack>
        <Box>
          <p>{user?.email}</p>
        </Box>
        <Box>
          <SelectRoot
            collection={frameworks}
            size="sm"
            width="320px"
            bgColor={"blue.500"}
          >
            <SelectTrigger>
              <SelectValueText placeholder="어드민" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((movie) => (
                <SelectItem item={movie} key={movie.value}>
                  {movie.label}
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

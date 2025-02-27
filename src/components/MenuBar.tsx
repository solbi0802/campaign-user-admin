import { Box, Flex, HStack, Link } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import { createListCollection } from "@chakra-ui/react";

const MenuBar = () => {
  return (
    <Flex
      as="nav"
      bg="blue.500"
      p={4}
      align="center"
      justifyContent="space-between"
      gap="4"
      width="100%"
      height={"98px"}
    >
      <HStack>
        <Box>
          <Link href="/" color="whiteAlpha.800">
            Wisebirds
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
        <Box>사용자 이메일</Box>
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

export default MenuBar;

const frameworks = createListCollection({
  items: [
    { label: "어드민", value: "admin" },
    { label: "매니저", value: "manager" },
    { label: "뷰어어", value: "viewer" },
  ],
});

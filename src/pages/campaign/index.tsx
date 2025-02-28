import { fetchData } from "../../api";
import { HStack, Stack, Table, Switch } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import { formatNumberWithCommas, formatPercentage } from "../../utils";
import Campaign from "../../types";

const conversionTextMap: Record<string, string> = {
  WEBSITE_CONVERSIONS: "웹사이트 전환",
  WEBSITE_TRAFFIC: "웹사이트 트래픽",
  SALES: "판매",
  APP_INSTALLATION: "앱설치",
  LEAD: "리드",
  BRAND: "브랜드 인지도 및 도달 범위",
  VIDEO_VIEWS: "동영상 조회",
};

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>();
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const getCampaignList = async () => {
    try {
      const res: Campaign = await fetchData("/api/campaigns");
      setCampaigns(res.content);
      setTotalCount(res.size);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCampaignList();
  }, [page]);

  const pageSize = 25;
  const paginatedCampaigns: Campaign[] | undefined = campaigns?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <>
      <CampaignTitle> 캠페인 관리</CampaignTitle>
      <Stack width="full" gap="5">
        <Table.ScrollArea borderWidth="1px" height="100vh" width="100vw">
          <Table.Root size="lg" stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader textAlign="center">상태</Table.ColumnHeader>
                <Table.ColumnHeader>캠페인명</Table.ColumnHeader>
                <Table.ColumnHeader>캠페인 목적</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">노출수</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">클릭수</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">CTR</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">
                  동영상조회수
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">VTR</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {paginatedCampaigns?.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell textAlign="center">
                    <Switch.Root colorPalette="blue">
                      <Switch.HiddenInput />
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                      <Switch.Label />
                    </Switch.Root>
                    {item.enabled}
                  </Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>
                    {conversionTextMap[item.campaign_objective]}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    {formatNumberWithCommas(item.impressions)}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    {formatNumberWithCommas(item.clicks)}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    {formatPercentage(item.ctr)}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    {formatNumberWithCommas(item.video_views)}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    {formatPercentage(item.vtr)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
        {campaigns && (
          <PaginationRoot
            count={totalCount}
            pageSize={pageSize}
            page={page}
            defaultPage={1}
            onPageChange={(e) => setPage(e.page)}
          >
            <HStack wrap="wrap">
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

export default CampaignList;

const CampaignTitle = styled.h3`
  color: black;
  font-size: 18px;
  margin-top: 12px;
  padding: 12px;
`;

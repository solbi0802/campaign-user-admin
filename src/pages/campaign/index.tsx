import { fetchData } from "../../api";
import { HStack, Stack, Switch } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import { formatNumberWithCommas, formatPercentage } from "../../utils";
import Campaign from "../../types";
import { roleState } from "../../state";
import { useRecoilValue } from "recoil";
import CommonTable from "../../components/common/CommonTable";
import { Title } from "../../styles/CommonStyle";

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
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const role = useRecoilValue(roleState);

  const getCampaignList = async (page: number) => {
    try {
      const res: Campaign = await fetchData(`/api/campaigns?page=${page}`);
      setCampaigns(res.content);
      setTotalCount(res.size);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCampaignList(page);
  }, [page]);

  const handleToggleSwitch = async (campaignId: number, checked: boolean) => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: checked }),
      });
      const data = await response.json();

      if (data.result) {
        setCampaigns((prev) =>
          prev?.map((campaign) =>
            campaign.id === campaignId
              ? { ...campaign, enabled: checked }
              : campaign
          )
        );
      } else {
        console.error("캠페인 업데이트 실패");
      }
    } catch (error) {
      console.error("캠페인 수정 API 호출 중 오류 발생:", error);
    }
  };

  const pageSize = 25;

  const columns = [
    {
      key: "enabled",
      header: "상태",
      textAlign: "center",
      renderCell: (item: any) => (
        <Switch.Root
          colorPalette="blue"
          disabled={role.includes("viewer")}
          checked={item.enabled}
          onCheckedChange={({ checked }) =>
            handleToggleSwitch(item.id, checked)
          }
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label />
        </Switch.Root>
      ),
    },
    { key: "name", header: "캠페인명" },
    {
      key: "campaign_objective",
      header: "캠페인 목적",
      renderCell: (item: any) => conversionTextMap[item.campaign_objective],
    },
    {
      key: "impressions",
      header: "노출수",
      textAlign: "end",
      renderCell: (item: any) => formatNumberWithCommas(item.impressions),
    },
    {
      key: "clicks",
      header: "클릭수",
      textAlign: "end",
      renderCell: (item: any) => formatNumberWithCommas(item.clicks),
    },
    {
      key: "ctr",
      header: "CTR",
      textAlign: "end",
      renderCell: (item: any) => formatPercentage(item.ctr),
    },
    {
      key: "video_views",
      header: "동영상조회수",
      textAlign: "end",
      renderCell: (item: any) => formatNumberWithCommas(item.video_views),
    },
    {
      key: "vtr",
      header: "VTR",
      textAlign: "end",
      renderCell: (item: any) => formatPercentage(item.vtr),
    },
  ];

  return (
    <>
      <Title> 캠페인 관리</Title>
      <Stack width={"100vw"} gap="5">
        <CommonTable columns={columns} data={campaigns} />
        {campaigns && (
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

export default CampaignList;

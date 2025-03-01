export default interface Company {
  id: number;
  name: string;
}

export default interface User {
  id: number;
  email: string;
  name: string;
  company?: Company;
}

export default interface UserResponse {
  content: [];
  id: number;
  email: string;
  name: string;
  last_login_at: string;
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  sort: [];
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

export default interface CampaignResponse {
  content: [];
  id: number;
  name: string;
  enabled: boolean;
  campaign_objective: string;
  impressions: number;
  clicks: number;
  ctr: number;
  video_views: number;
  vtr: number;
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  sort: [];
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

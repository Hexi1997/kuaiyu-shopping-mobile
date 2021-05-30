export type TabsType = "Home" | "Category" | "Car" | "My";

//category页面
type CategoryItem = {
  id: number;
  title: string;
  price: number;
  cover: string;
  category_id: number;
  sales: number;
  updated_at: Date;
  comments_count: number;
  collects_count: number;
  cover_url: string;
};

type CategoryItemType = {
  id: number;
  pid: number;
  name: string;
  level: number;
  status: number;
  children?: CategoryItemType[];
};

export type Result = {
  list: CategoryItem[];
  current: number;
  next: string;
  category: CategoryItemType[];
};

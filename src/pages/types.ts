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

//商品详情界面
type User = {
  id: number;
  name: string;
  avatar?: any;
  avatar_url: string;
};

type Comment = {
  id: number;
  user_id: number;
  order_id: number;
  goods_id: number;
  rate: number;
  star: number;
  content: string;
  reply?: any;
  pics?: any;
  created_at?: any;
  updated_at?: any;
  user: User;
};

type Goods = {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  sales: number;
  cover: string;
  pics: string[];
  is_on: number;
  is_recommend: number;
  details: string;
  created_at: Date;
  updated_at: Date;
  cover_url: string;
  pics_url: string[];
  collects_count: number;
  is_collect: number;
  comments: Comment[];
};

type LikeGood = {
  id: number;
  title: string;
  price: number;
  cover: string;
  sales: number;
  cover_url: string;
  collects_count: number;
};

export type GoodInfo = {
  goods: Goods;
  like_goods: LikeGood[];
};

import useEnvStore from "~/stores/env_variables";

export const CATEGORY_NAME: { [key: string]: number | string } = {
  sports: 5,
  entertainment: 10,
  gadgets: 30,
  swirlster: 80,
  health: 77,
  food: 4,
  auto: 39,
  news: "",
  khabar: "",
  world: 50,
  profit: 2,
};
// link: `${basepath}/category/entertainment`
export const CATEGORY_LIST_SideNav = () => {
  const basepath = useEnvStore((state) => state.basePath);
  return [
    {
      title: "Entertainment",
      link: `/category/entertainment`,
    },
    {
      title: "Food",
      link: `/category/food`,
    },
    {
      title: "Auto",
      link: `/category/auto`,
    },
    {
      title: "Health",
      link: `/category/health`,
    },
    {
      title: "Sports",
      link: `/category/sports`,
    },
    {
      title: "Swirlster",
      link: `/category/swirlster`,
    },
    {
      title: "Gadgets",
      link: `/category/gadgets`,
    },
    {
      title: "World",
      link: `/category/world`,
    },
    {
      title: "Profit",
      link: `/category/profit`,
    },
  ];
};

export const CATEGORY_LIST = () => {
  const basepath = useEnvStore((state) => state.basePath);

  return [
    {
      title: "All",
      link: `/`,
    },
    {
      title: "Entertainment",
      link: `/category/entertainment`,
    },
    {
      title: "Food",
      link: `/category/food`,
    },
    {
      title: "Auto",
      link: `/category/auto`,
    },
    {
      title: "Health",
      link: `/category/health`,
    },
    {
      title: "Sports",
      link: `/category/sports`,
    },
    {
      title: "Swirlster",
      link: `/category/swirlster`,
    },
    {
      title: "Gadgets",
      link: `/category/gadgets`,
    },
    {
      title: "World",
      link: `/category/world`,
    },
    {
      title: "Profit",
      link: `/category/profit`,
    },
  ];
};

export const CATEGORY_LIST_RESP = () => {
  const basepath = useEnvStore((state) => state.basePath);

  return [
    {
      title: "Entertainment",
      link: `/category/entertainment`,
    },
    {
      title: "Food",
      link: `/category/food`,
    },
    {
      title: "Auto",
      link: `/category/auto`,
    },
    {
      title: "Health",
      link: `/category/health`,
    },
    {
      title: "Sports",
      link: `/category/sports`,
    },
    {
      title: "Swirlster",
      link: `/category/swirlster`,
    },
    {
      title: "Gadgets",
      link: `/category/gadgets`,
    },
    {
      title: "World",
      link: `/category/world`,
    },
    {
      title: "Profit",
      link: `/category/profit`,
    },
  ];
};

export const Category_List_Left_Main = () => {
  const basepath = useEnvStore((state) => state.basePath);

  return [
    {
      title: "Entertainment",
      link: `/category/entertainment`,
    },
    {
      title: "Food",
      link: `/category/food`,
    },
    {
      title: "Auto",
      link: `/category/auto`,
    },
    {
      title: "Profit",
      link: `/category/profit`,
    },
    {
      title: "World",
      link: `/category/world`,
    },


  ];
};
export const Category_List_Right_Main = () => {
  const basepath = useEnvStore((state) => state.basePath);

  return [
    {
      title: "Health",
      link: `/category/health`,
    },
    {
      title: "Sports",
      link: `/category/sports`,
    },
    {
      title: "Swirlster",
      link: `/category/swirlster`,
    },
    {
      title: "Gadgets",
      link: `/category/gadgets`,
    },
  ];
};

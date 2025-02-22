import { v4 } from "uuid";

type IdType = "numeric" | "alphabetic" | "mixed";

function generateId(type: IdType, length: number = 5): string {
  let id = v4().replace(/-/g, "");

  if (type === "numeric") {
    id = id.replace(/[^0-9]/g, "");
  } else if (type === "alphabetic") {
    id = id.replace(/[^a-zA-Z]/g, "");
  }

  return id.slice(0, length);
}

type PostIdGeneratorProps = {
  count: number;
  type: IdType;
};

function generatePostIds(props: PostIdGeneratorProps): string[] {
  const postIds: string[] = [];
  for (let i = 0; i < props.count; i++) {
    postIds.push(generateId(props.type));
  }
  return postIds;
}

export function generateAllPostIds(): string[] {
  return [
    ...generatePostIds({ count: 10, type: "numeric" }),
    ...generatePostIds({ count: 5, type: "alphabetic" }),
    ...generatePostIds({ count: 5, type: "mixed" }),
  ];
}

console.log(generateAllPostIds());
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogs } from "../store/slice/blogSlice";
import { Slate, Editable, withReact } from "slate-react";
import Image from "./Elements/Image/Image";
import Video from "./Elements/Video/Video";
import Links from "./Elements/Link/Link";
import { sizeMap, fontFamilyMap } from "./utils/SlateUtilityFunctions";
import { withHistory } from "slate-history";

import withLinks from "./plugins/withLinks";
import withTables from "./plugins/withTable";
import withEmbeds from "./plugins/withEmbeds";
import BlogNavBar from "./BlogNavBar";
import { createEditor } from "slate";
const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "headingOne":
      return <h1 {...attributes}>{children}</h1>;
    case "headingTwo":
      return <h2 {...attributes}>{children}</h2>;
    case "headingThree":
      return <h3 {...attributes}>{children}</h3>;
    case "blockquote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "alignLeft":
      return (
        <div
          style={{ textAlign: "left", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    case "alignCenter":
      return (
        <div
          style={{ textAlign: "center", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    case "alignRight":
      return (
        <div
          style={{ textAlign: "right", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "orderedList":
      return (
        <ol type="1" {...attributes}>
          {children}
        </ol>
      );
    case "unorderedList":
      return <ul {...attributes}>{children}</ul>;
    case "link":
      return <Links {...props} />;

    case "table":
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case "table-row":
      return <tr {...attributes}>{children}</tr>;
    case "table-cell":
      return <td {...attributes}>{children}</td>;
    case "image":
      return <Image {...props} />;
    case "video":
      return <Video {...props} />;
    default:
      return element.type === "headingThree";
  }
};
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.strikethrough) {
    children = (
      <span style={{ textDecoration: "line-through" }}>{children}</span>
    );
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }
  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }
  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>;
  }
  if (leaf.bgColor) {
    children = (
      <span style={{ backgroundColor: leaf.bgColor }}>{children}</span>
    );
  }
  if (leaf.fontSize) {
    const size = sizeMap[leaf.fontSize];
    children = <span style={{ fontSize: size }}>{children}</span>;
  }
  if (leaf.fontFamily) {
    const family = fontFamilyMap[leaf.fontFamily];
    children = <span style={{ fontFamily: family }}>{children}</span>;
  }
  return <span {...attributes}>{children}</span>;
};
const Blog = () => {
  const dispatch = useDispatch();
  const { getblog } = useSelector((state) => state.blog);
  const gblog = getblog?.result?.blog?.map((b) => b.post);
  const gbb = gblog && gblog[2]?.map((bl) => bl);

  const [value, setValue] = useState(
    useMemo(
      () => [
        {
          type: "paragraph",
          children: [{ text: "A line of text in a paragraph." }],
        },
      ],
      []
    )
  );
  const gbc = gblog && gblog[0]?.map((bl) => bl);
  useEffect(() => {
    setTimeout(() => {
      dispatch(getBlogs());
    }, 1000);
  }, []);
  useEffect(() => {
    // setValue(gbc);
    console.log(value);
  }, [getblog]);

  const editor = useMemo(
    () =>
      withHistory(withEmbeds(withTables(withLinks(withReact(createEditor()))))),
    []
  );

  const renderElement = useCallback(
    (props) => <Element {...props} />,

    []
  );
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  console.log(value);
  const dd = getblog?.result?.blog?.map(ppp => ppp.createdAt)
  // dd.substring(0,10)

  const dp = dd?.toString()
  console.log(dp)

  console.log(dp?.substring(0,10))
 

  return (
    <div className="md:grid md:grid-cols-4 md:gap-12 px-16">
      <div className="m-0 p-0 col-span-3">
        {value == undefined ? (
          <p className="font-bold text-8xl">bjjh</p>
        ) : (
          <>
            {getblog?.result?.blog?.map((pst) => (
              <div className='mt-10'>
                <img src={pst.images.images} className='w-full object-contain h-fit' />
                <div className="flex">
                  <p className= 'text-sm'>{(pst?.createdAt).toString().substring(0,10)}</p>
                </div>
                <Link to={`${pst.slug}`}>
                <p className="font-bold text-lg mt-2">{pst.name}</p>
              </Link>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="mt-6 ">
        <BlogNavBar />
      </div>
    </div>
  );
};

export default Blog;

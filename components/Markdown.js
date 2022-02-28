import React from "react";
import ReactMarkdown from "react-markdown";

function Markdown({ content }) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}

export default Markdown;

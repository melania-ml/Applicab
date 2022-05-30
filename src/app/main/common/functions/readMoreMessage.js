import { useState } from "react";
import parse from "html-react-parser";
import { MAX_LENGTH_MESSAGE } from "app/config";

export const ReadMoreMessage = ({ str }) => {
  const [readMore, setReadMore] = useState(false);
  const linkName = readMore ? <b>read less</b> : <b>read more</b>;

  return str.length > MAX_LENGTH_MESSAGE ? (
    <>
      {!readMore ? parse(str.slice(0, MAX_LENGTH_MESSAGE)) : parse(str)}
      <h6
        className="read-more-link"
        onClick={() => {
          setReadMore(!readMore);
        }}
      >
        {linkName}
      </h6>
    </>
  ) : (
    parse(str)
  );
};

import { useState } from "react";
import parse from "html-react-parser";

export const ReadMoreMessage = ({ str }) => {
  const [readMore, setReadMore] = useState(false);
  const linkName = readMore ? <b>read less</b> : <b>read more</b>;

  return str.length > 1000 ? (
    <p>
      {parse(str.slice(0, 1000))}
      {readMore && parse(str)}
      <h6
        className="read-more-link"
        onClick={() => {
          setReadMore(!readMore);
        }}
      >
        {linkName}
      </h6>
    </p>
  ) : (
    parse(str)
  );
};

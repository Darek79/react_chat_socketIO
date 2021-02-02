import React, {
  useState,
  useEffect,
  Fragment,
} from "react";
import {isEmail} from "validator";
export default ({
  clName = "input",
  type = "text",
  name,
  valref,
  fnClear,
  fnGet,
  fnKey,
  valProp,
  modus,
}) => {
  // const [input, setInput] = useState("");

  // useEffect(() => {
  //   setInput(() => "");
  // }, [fnClear]);

  // const onInput = (e) => {
  //   setInput(() => e.target.value);
  // };

  return (
    <Fragment>
      {modus ? (
        <input
          ref={valref}
          onKeyPress={fnKey}
          onChange={fnGet}
          className={clName}
          type={type}
          name={name}
          value={valProp}></input>
      ) : (
        <textarea
          ref={valref}
          onKeyPress={fnKey}
          onChange={fnGet}
          className={clName}
          type={type}
          name={name}
          rows={1}
          value={valProp}></textarea>
      )}
    </Fragment>
  );
};

// const exportedRef = ;

import React, {
  useState,
  useEffect,
  Fragment,
  memo,
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
  id,
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
        <div
          key={id}
          ref={valref}
          onKeyPress={fnKey}
          className={clName}
          contentEditable={true}></div>
      )}
    </Fragment>
  );
};

// const exportedRef = ;

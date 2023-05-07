import React, { useRef, useState } from "react";

interface Props {
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  tabIndex?: string;
}

const phrase: string =
  "I,ve written a few thousand words on why traditional semantic class names are the reason CSS is hard to maintain, but the truth is you're never going to believe me until you actually try it. If you can suppress the urge to retch long enough to give it a chance, I really think you'll wonder how you ever worked with CSS any other way.";

export const TextBody = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [typo, setTypo] = React.useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const allowedKeys = /[a-zA-Z0-9.!?]/;

  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("event ",event.key)
    if (rightCount >= phrase.length) {
      return;
    }
    if (event.key === "Shift") {
      return;
    }
    if (rightCount === 0 && !startTime) {
      setStartTime(new Date());
    }
    setEndTime(new Date());
console.log("phrase and key",phrase[rightCount]===event.key,phrase[rightCount],event.key)
    if (phrase[rightCount] === event.key) {
      setRightCount(rightCount + 1);
      setWrongCount(0);
    } else if (event.code === "Backspace") {
      if (wrongCount) {
        if (wrongCount === 0) {
          setTypo(false);
          return;
        }
        setWrongCount(wrongCount - 1);
      } else if (rightCount) {
        setRightCount(rightCount - 1);
      }
    } else {
      if (
        allowedKeys.test(event.key) ||
        [" ", ".", ",", ":", ";"].includes(event.key)
      ) {
        setTypo(true);
        if (!rightCount) return;
        setWrongCount(wrongCount + 1);
      }
    }
  };

  const getRate = () => {
    if (!endTime || !startTime) {
      return null;
    }
    let date1 = startTime;
    let date2 = endTime;
    let diffInSeconds = Math.floor((date2.getTime() - date1.getTime()) / 1000);
    return rightCount / diffInSeconds;
  };

  return (
    <>
    
      <div
        onKeyDown={handleKeyDown}
        className="container mx-auto  p-8  h-auto border-2 border-rose-400 rounded-xl  "
      >
        <input ref={inputRef} autoFocus className="opacity-0 w-0 h-0" />
        <div>
          <div className="text-4xl font-light  inline ">
            <span className=" text-red-500 ">
              {phrase.substring(0, rightCount)}
            </span>
            <span
              className={`text-slate-500  ${
                wrongCount ? " bg-red-200" : "bg-red-200 "
              }`}
            >
              {phrase.substring(rightCount, rightCount + wrongCount)}
            </span>
            <span className={`text-slate-500 underline `}>
              {phrase[rightCount + wrongCount]}
            </span>
            <span className="text-slate-500 ">
              {phrase.substring(rightCount + wrongCount + 1)}
            </span>
          </div>
        </div>
      </div>
      {!!rightCount && (
        <div className="text-4xl text-red-600 my-24 text-center">
          Speed : {getRate()?.toFixed(0) || "-"} CPS ~{" "}
          {Math.ceil(((getRate() || 0) / 5.5) * 60)} WPM
        </div>
      )}
    </>
  );
};

import React, { useRef, useState } from "react";

interface Props {
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  tabIndex?: string;
}

const phrase: string =
  "Maycomb was an old town, but it was a tired old town when I first knew it. In rainy weather the streets turned to red slop; grass grew on the sidewalks, the courthouse sagged in the square. Somehow, it was hotter then: a black dog suffered on a summer's day; bony mules hitched to Hoover carts flicked flies in the sweltering shade of the live oaks on the square. Men's stiff collars wilted by nine in the morning";
export const TextBody = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [phrase, setPhrase] = React.useState<string>(phraseString);

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
    console.log("event", event.key);
    if (rightCount === 0 && !startTime) {
      setStartTime(new Date());
    }
    setEndTime(new Date());

    if (phrase[rightCount] === event.key) {
      setRightCount(rightCount + 1);
      setWrongCount(0)
    } else if (event.code === "Backspace") {
      if (wrongCount) {
       
        if (wrongCount ===0) {
          setTypo(false);
          return
        }
        setWrongCount(wrongCount - 1);
      } else if (rightCount) {
        setRightCount(rightCount - 1);
      }
    } else {
      if (
        allowedKeys.test(event.key) ||
        [" ", ".", ",", ":", ";"].includes(event.key)
      )
       {
        setTypo(true);
        if(!rightCount) return
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
  console.log("input pharse", phrase);

  return (
    <>
      {!!rightCount && (
        <div className="text-4xl text-red-600 text-center">
          {" "}
          Speed : {getRate()?.toFixed(0) || "-"} CPS ~{" "}
          {Math.ceil(((getRate() || 0) / 5.5) * 60)} WPM
        </div>
      )}{" "}
      {/* <span>{inputPhrase}</span>
      <span>{phrase}</span> */}
      <div
        onKeyDown={handleKeyDown}
        className="container mx-auto mt-8 p-8  h-auto border-2 border-rose-400 rounded-4xl "
      >
        <input ref={inputRef} autoFocus className="opacity-0 w-0" />
        <div>
          <span className="text-4xl inline">
            <span className=" text-red-500">
              {phrase.substring(0, rightCount)}
            </span>
            <span
              className={`text-slate-500 underline ${
                wrongCount? " bg-red-200" : "bg-red-200 "
              }`}
            >
              {phrase.substring(rightCount, rightCount + wrongCount)}
            </span>
            <span className="text-slate-500 ">
              {phrase.substring(rightCount + wrongCount)}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

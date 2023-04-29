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
  const [inputPhrase, setInputPhrase] = React.useState<string>("");
  const [phraseIndex, setPhraseIndex] = React.useState<number>(0);
  const [typo, setTypo] = React.useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("event", event.key);
    if (phraseIndex === 0 && !startTime) {
      setStartTime(new Date());
    }
    if (phrase[phraseIndex] === event.key) {
      setPhraseIndex(phraseIndex + 1);
      if (phraseIndex + 1 === phrase.length - 1) {
        setEndTime(new Date());
      }
      setTypo(false);
      setInputPhrase((phrase: string) => {
        phrase = phrase + event.key;
        return phrase;
      });
    } else {
      setTypo(true);
    }
  };

  const getRate = () => {
    if (!endTime || !startTime) {
      return null;
    }
    let date1 = startTime;
    let date2 = endTime;
    let diffInSeconds = Math.floor((date2.getTime() - date1.getTime()) / 1000);
    return phraseIndex / diffInSeconds;
  };
  console.log("input pharse", inputPhrase);

  return (
    <>
      {phraseIndex === phrase.length && (
        <div className="text-4xl text-red-600 text-center">
          {" "}
          Speed : {getRate()?.toFixed(0) || "-"} CPM ~{" "}
          {Math.ceil(((getRate() || 0) / 5.5) * 60)} WPM
        </div>
      )}{" "}
      <div
        onKeyDown={handleKeyDown}
        className="container mx-auto mt-8 p-8  h-auto border-2 border-rose-400 rounded-4xl "
      >
        <input ref={inputRef} autoFocus className="opacity-0 w-0" />
        <div>
          <span className="text-4xl inline">
            <span className=" text-red-500">{inputPhrase}</span>
            <span
              className={`text-slate-500 underline ${
                typo ? "line-through bg-red-200" : ""
              }`}
            >
              {phrase[phraseIndex]}
            </span>
            <span className="text-slate-500 ">
              {phrase.substring(phraseIndex + 1, phrase.length)}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

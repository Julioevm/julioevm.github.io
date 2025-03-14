import React from "react";
import { wallpapers, user } from "~/configs";
import type { MacActions } from "~/types";

export default function Login(props: MacActions) {
  const [password, setPassword] = useState("");
  const [sign, setSign] = useState("Click to enter");
  const dark = useStore((state) => state.dark);

  const keyPress = (e: React.KeyboardEvent) => {
    const keyCode = e.key;
    if (keyCode === "Enter") loginHandle();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const loginHandle = () => {
    if (user.password === "" || user.password === password) {
      // not set password or password correct
      props.setLogin(true);
    } else if (password !== "") {
      // password not null and incorrect
      setSign("Incorrect password");
    }
  };

  return (
    <div
      className="login size-full text-center"
      style={{
        background: `url(${
          dark ? wallpapers.night : wallpapers.day
        }) center/cover no-repeat`
      }}
      onClick={() => loginHandle()}
    >
      <div className="relative top-1/2 inline-block w-auto -mt-40">
        {/* Avatar */}
        <img className="mx-auto my-0 size-24 rounded-full" src={user.avatar} alt="img" />
        <div className="mt-2 text-xl text-white font-semibold">{user.name}</div>

        {/* Password Input */}
        <div className="grid grid-cols-5 mx-auto mt-4 h-8 w-44 rounded-md bg-gray-300/50 backdrop-blur-2xl">
          <input
            className="col-span-4 col-start-1 bg-transparent px-2 text-sm text-white no-outline"
            type="password"
            placeholder="Enter Password"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={keyPress}
            value={password}
            onChange={handleInputChange}
          />
          <div className="col-span-1 col-start-5 flex-center">
            <span className="i-bi:question-square-fill ml-1 text-white" />
          </div>
        </div>

        <div mt-2 cursor-pointer text="sm gray-200">
          {sign}
        </div>
      </div>

      {/* buttons */}
      <div className="fixed inset-x-0 bottom-16 mx-auto w-max flex flex-row text-sm space-x-4">
        <div
          className="w-24 hstack flex-col cursor-pointer text-white"
          onClick={(e) => props.sleepMac(e)}
        >
          <div className="size-10 flex-center rounded-full bg-gray-700">
            <span className="i-gg:sleep text-[40px]" />
          </div>
          <span>Sleep</span>
        </div>
        <div
          className="w-24 hstack flex-col cursor-pointer text-white"
          onClick={(e) => props.restartMac(e)}
        >
          <div className="size-10 flex-center rounded-full bg-gray-700">
            <span className="i-ri:restart-line text-4xl" />
          </div>
          <span>Restart</span>
        </div>
        <div
          className="w-24 hstack flex-col cursor-pointer text-white"
          onClick={(e) => props.shutMac(e)}
        >
          <div className="size-10 flex-center rounded-full bg-gray-700">
            <span className="i-ri:shut-down-line text-4xl" />
          </div>
          <span>Shut Down</span>
        </div>
      </div>
    </div>
  );
}

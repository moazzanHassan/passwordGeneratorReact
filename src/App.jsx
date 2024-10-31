import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";



    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:',.<>?/`~\"\\-=";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numAllowed, charAllowed, setpassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <h1 className="text-white text-5xl text-center mt-3">
        Password Generator
      </h1>
      <div className="p-5  mt-9 flex justify-center ">
        <div className="w-[40%] bg-green-300 p-4 rounded-2xl">
          <input
            className="p-2 w-[80%] rounded-md outline-none"
            value={password}
            placeholder="password"
            readOnly
            type="text"
            name=""
            id=""
            ref={passwordRef}
          />
          <button className="px-8 py-2 bg-blue-600 rounded-3xl ml-3 text-yellow-100"
          onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
          <div className="mt-5">
            <input
              min={8}
              max={100}
              value={length}
              onChange={(e) => setlength(e.target.value)}
              className="cursor-pointer"
              type="range"
            />
            <label className="ml-2">Length: {length}</label>
            <input className="ml-[50px] cursor-pointer" 
            type="checkbox"
            defaultChecked = {numAllowed}
            onChange={()=>{
              setnumAllowed((prev)=> !prev);
            }}
            
            />
            <label>Number</label>
            <input className="ml-[50px] cursor-pointer"
             type="checkbox"
             defaultChecked = {charAllowed}
            onChange={()=>{
              setCharAllowed((prev)=> !prev);
            }}
             />
            <label>Special Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

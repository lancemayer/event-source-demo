import { useEffect, useState } from "react";

type Person = {
  firstName: string;
  lastName: string;
  age: string;
}

export default function AddPerson() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState(0);
  const [personEvents, setPersonEvents] = useState<any[]>([]);
  const [selector, setSelector] = useState(0);
  const [selectedState, setSelectedState] = useState<Person>({ firstName: "", lastName: "", age: "" });
  const [prevState, setPrevState] = useState<{}>({});

  useEffect(() => {
    sessionStorage.removeItem("0");
  }, []);

  useEffect(() => {
    const arr = [];

    for (let i = 0; i < id; i++) {
      const item = sessionStorage.getItem(i.toString());
      if (item) {
        arr.push(JSON.parse(item));
      }
    }

    setPersonEvents(arr);
    setSelector(Math.max(0, id - 1));
  }, [id]);

  useEffect(() => {
    let currentState: Person = { firstName: "", lastName: "", age: "" };
    for (let i = 0; i <= selector; i++) {
      const item = sessionStorage.getItem(i.toString());
      if (item) {
        currentState = { ...currentState, ...JSON.parse(item) };
      }
    }
    setSelectedState(currentState);
  }, [selector]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Add Person</h1>
      {/* <form> */}
      <div>
        <label>
          First Name:
          <input type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={(e) => setPrevState({ "firstName": e.currentTarget.value })}
            onBlur={(e) => {
              const newState = { "firstName": e.target.value };
              if (JSON.stringify(prevState) !== JSON.stringify(newState)) {
                sessionStorage.setItem(id.toString(), JSON.stringify({ "firstName": e.target.value }))
                setId(prev => prev + 1);
              }
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onFocus={(e) => setPrevState({ "lastName": e.currentTarget.value })}
            onBlur={(e) => {
              if (JSON.stringify(prevState) !== JSON.stringify({ "lastName": e.target.value })) {
                sessionStorage.setItem(id.toString(), JSON.stringify({ "lastName": e.target.value }))
                setId(prev => prev + 1);
              }
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input type="text"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onFocus={(e) => setPrevState({ "age": e.currentTarget.value })}
            onBlur={(e) => {
              if (JSON.stringify(prevState) !== JSON.stringify({ "age": e.target.value })) {
                sessionStorage.setItem(id.toString(), JSON.stringify({ "age": e.target.value }))
                setId(prev => prev + 1);
              }
            }}
          />
        </label>
      </div>
      <button>Submit</button>
      {/* </form> */}

      <p>{`First Name: ${selectedState.firstName}`}</p>
      <p>{`Last Name: ${selectedState.lastName}`}</p>
      <p>{`Age: ${selectedState.age}`}</p>
      <div>
        <input type="range" value={selector} onChange={(e) => setSelector(parseInt(e.target.value))} min={0} max={personEvents.length - 1} step={1} />
      </div>
      <p>{selector}</p>
      <ul>
        {personEvents.map((item, index) => {
          return (
            <li style={index <= selector ? { "color": "black" } : { "color": "red" }} key={index}>
              <p>{`Item [${index}]: ${JSON.stringify(item)}`}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
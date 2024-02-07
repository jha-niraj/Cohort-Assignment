import { useState, useMemo, useEffect } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);
    const [ans, setAns] = useState(0);

    // Your solution starts here
    const expensiveValue = useMemo(() => {
        let ans = 1;
        for(let i = 1; i <= parseInt(input); i++) {
            ans *= i;
        }
        return ans;
    }, [input]); 
    // Your solution ends here

    // const updateAns = useCallback(() => {
    //         console.log("Hi there!");
    //         setAns(expensiveValue);
    // }, [input]);

    function updateAns() {
        console.log("Hello World");
        setAns(expensiveValue);
    }

    useEffect(() => {
        updateAns();
    }, [input]);

    return (
        <div>
            <input 
                type="number" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <button onClick={updateAns}>Click Me</button>
            <p>Calculated Value: {ans}</p>
        </div>
    );
}
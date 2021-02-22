import { useState, useMemo } from "react";
const { debounce } = require("../helpers/timing-helpers")

const useDebouncedState = (initialState, delayAmount) => {
    const [state, setState] = useState(initialState);
    const { debounced: setStateDebounced, immediate: setStateImmediate } = useMemo(() =>
        debounce(setState, delayAmount),
        [setState, delayAmount]
    )
    return [state, setStateDebounced, setStateImmediate];
}

export default useDebouncedState;
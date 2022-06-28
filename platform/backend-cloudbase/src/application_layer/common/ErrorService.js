export let error = (message, e, duration = 10) => {
    console.error(e);
    message.error(e.message, duration);
};
export let showCatchedErrorMessage = (message, func, duration = 10) => {
    try {
        func();
    }
    catch (e) {
        error(message, e, duration);
    }
};

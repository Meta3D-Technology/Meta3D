export let showCatchedErrorMessage = (message, func, duration = 10) => {
    try {
        func();
    }
    catch (e) {
        console.error(e.message);
        message.error(e.message, duration);
    }
};

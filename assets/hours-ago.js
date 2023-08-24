const hoursAgo = (pastTimestamp) => {
    const currentTimestamp = new Date().getTime();
    const diff = currentTimestamp - pastTimestamp;
    const hoursPast = Math.floor(diff / 1000 / 60 / 60);
    return hoursPast;
}

export { hoursAgo }
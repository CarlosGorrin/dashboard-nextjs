export const getLongitudePattern = async () => {
    return /^-?([1-8]?\d{1,2}(\.\d+)?|90(\.0+)?)$/;
};

export const getLatitudePattern = async () => {
    return /^-?((1[0-7]\d{1}|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/;
};
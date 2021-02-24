export const NumberWithCommas = (text) => {
    return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
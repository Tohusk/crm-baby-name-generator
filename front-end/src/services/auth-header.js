export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    //TODO something something back end stuff as well in tutorial

    if (user && user.accessToken) {
        return { Authorization: "Bearer " + user.accessToken };
    } else {
        return {};
    }
}

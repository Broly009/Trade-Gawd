import axios from "axios";
const Key = "cjeddv9r01qgod9ale0gcjeddv9r01qgod9ale10";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params:{
        token:Key
    }
})
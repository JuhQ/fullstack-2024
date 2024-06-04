import store from "./store"

const Tulos = () => {
    return <h1>Tulos: {store.getState()}</h1>
}

export default Tulos
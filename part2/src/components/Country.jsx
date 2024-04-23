import { useEffect, useState } from "react"

const fetchCountries = async () => {
    try {
        const response = await fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
        const result = await response.json()

        return result
    } catch (error) {
        console.log("error", error)
    }
}

const pluralize = (value, length) => length === 1 ? value : `${value}s`

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather'

const CountryInfo = ({ country, handleClose }) => {
    console.log("country", country)

    const apiKey = import.meta.env.VITE_SOME_KEY
    console.log("import.meta.env.VITE_SOME_KEY", import.meta.env.VITE_SOME_KEY)
    console.log("import.meta.env", import.meta.env)
    useEffect(() => {
        const weatherFunction = async () => {
            if (country) {
                const options = {
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }
                const url = `${weatherApiUrl}?q=${country.name.common}&appid=${apiKey}`
                const response = await fetch(url, options)

                const result = await response.json()

                console.log("weather", result)
            }
        }

        weatherFunction()
    }, [apiKey, country])


    const currencies = Object.entries(country.currencies || {})

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
    // https://caniuse.com/dialog
    return (
        <dialog open>
            <h1>
                {[country.name.common, country.fifa].filter(Boolean).join(" - ")}
                {handleClose && <button type="button" onClick={handleClose}>Close</button>}
            </h1>

            <div className="row">
                <div>
                    {pluralize("Alternative spelling", country.altSpellings.length)}:

                    <ul>
                        {country.altSpellings.map((spelling) =>
                            <li key={spelling}>{spelling}</li>
                        )}
                    </ul>
                </div>

                {/*
            elvis operator - tai siis optional chaining
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
            sitä käyttämällä voidaan turvallisesti käyttää objektin arvoja, jotka saattavat olla undefined arvon takana
            esim tässä tapauksessa currencies avainta ei välttämättä löydy country objektista
            */}
                {country.currencies?.length > 0 && <>
                    <div>
                        {currencies.length === 1 ? "Currency" : "Currencies"}:
                        <ul>
                            {currencies.map(([key, value]) =>
                                <li key={key}>{value.symbol} {value.name}</li>
                            )}
                        </ul>
                    </div>
                </>
                }
            </div>
            <div className="row">
                {"svg" in country.flags && <img src={country.flags.svg} alt={country.flags.alt} />}

                {"svg" in country.coatOfArms && <img src={country.coatOfArms.svg} alt="Coat of arms" />}
            </div>
        </dialog>
    )
}

const Country = () => {
    // useState funktiolle kannattaa antaa oletusarvoksi
    // samaa tyyppiä oleva arvo, kuin mitä rajapinnan tulos tulee olemaan
    // tässä tapauksessa rajapinta palauttaa taulukon
    // -> oletusarvo siis tyhjä taulukko
    // näin voidaan turvallisesti käyttää taulukon metodeita
    // countries.find()
    // countries.filter()
    // countries.map()
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [hasSearched, setHasSearched] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        const callback = async () => {
            const maat = await fetchCountries();

            // taulukko aakkosjärjestykseen maan nimen mukaan
            // ehtolausekkeessa a > b vertailu, jonka perusteella palautetaan 1 tai -1
            // voihan javascript...
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            // varmistetaan että kaikki nimet on samassa muodossa, jotta vertailu on reilumpi
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase
            // [...maat] sen takia koska .sort() metodi muokkaa alkuperäistä taulukkoa
            //  -> alkuperäisen muokkaaminen reactissa voi aiheuttaa ongelmia. luodaan siis uusi muuttuja johon levitetty (spread) kaikki arvot
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            const sortedCountries = [...maat].sort((a, b) =>
                a.name.common.toLocaleLowerCase() > b.name.common.toLocaleLowerCase() ? 1 : -1
            )

            setCountries(sortedCountries)
            setFilteredCountries(sortedCountries)
        }

        callback()
    }, [])



    const handleChange = (event) => {
        // hakusana omaan nimettyyn muuttujaan
        // pari hyötyä:
        // muuttujan nimi dokumentoi mitä halutaan tehdä, miksi muuttuja on olemassa
        // säästetään CPU:ta hieman, objektin avainten hakeminen aiheuttaa aina pienen syklin prosessorilla
        //   -> säästö on erittäin pieni, optimointi lähes turha
        //      kuitenkin hyvä tietää, ehkä
        //      arvo menee muuttujaan muistiin, ei tarvitse siis hakea uudelleen (esim loopin sisällä)
        const searchQuery = event.target.value.toLocaleLowerCase().trim()

        const matches = countries.filter((country) =>
            country.name.common.toLocaleLowerCase().includes(searchQuery) ||
            country.altSpellings.find((spelling) =>
                spelling.toLocaleLowerCase().includes(searchQuery)
            )
        )

        setFilteredCountries(matches)
        setHasSearched(Boolean(searchQuery.length))
        setSelectedCountry(null)
    }

    console.log("filteredCountries", filteredCountries)


    return (
        <>
            <form>
                <label forName="search">Find a country:</label>{' '}
                <input type="search" id="search" onChange={handleChange} />
            </form>

            {hasSearched && filteredCountries.length > 100 &&
                <div>Liikaa hakutuloksia, rajaa hakuasi</div>
            }

            {filteredCountries.length <= 100 && filteredCountries.map((country) =>
                <div key={country.name.common}>
                    {country.name.common} - {country.name.official}
                    <button
                        type="button"
                        onClick={() =>
                            setSelectedCountry(country)
                        }
                    >
                        Select
                    </button>
                </div>
            )}

            {selectedCountry &&
                <CountryInfo country={selectedCountry} handleClose={() => setSelectedCountry(null)} />
            }

            {!selectedCountry && filteredCountries.length === 1 && <div>
                <CountryInfo country={filteredCountries[0]} />
            </div>}
        </>
    )
}

export default Country
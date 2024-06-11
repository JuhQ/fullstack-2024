import { useDispatch } from "react-redux"
import { filterSelected } from "../reducers/filterReducer"

const FilterButtons = () => {
    const dispatch = useDispatch()

    return (<div>
        <label>
            all
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterSelected('ALL'))}
            />
        </label>
        <label>
            important
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterSelected('IMPORTANT'))}
            />
        </label>
        <label>
            nonimportant
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterSelected('NONIMPORTANT'))}
            />
        </label>
    </div>)
}

export default FilterButtons
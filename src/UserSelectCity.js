// API data will be called based on the user's desired city name from the form below and information will be returned on weather results container.
import { useState } from 'react';

const UserSelectCity = (props) => {
    const { cityResults } = props;

    const [textInput, setTextInput] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        cityResults(textInput);
        setTextInput('');
    }

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            {/* Text field where user will type in the city for their desired weather forecast */}
            <label htmlFor="searchField" className="searchField sr-only">Enter your city in the search field</label>
            <input type="text"
            className="searchField" 
            placeholder="Enter your city"
            onChange={ (event) => setTextInput(event.target.value) }
            value={textInput}
            />

            {/* Once appropriate city name is typed in then user will click button to receive their forecast */}
            <button className="submit" >Get Forecast</button>
        </form>
    )
}

export default UserSelectCity;
import React from "react";
import Form from "react-validation/build/form";
import "../styles/AutoCompleteText.css";
import "../styles/AddItem.css";

export default class AutoCompleteText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            text: "",
        };
    }

    //filtering for matching items when typed into input
    onTextChanged = (e) => {

        const { items } = this.props;
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, "i");
            suggestions = items.sort().filter((v) => regex.test(v));
        }
        this.setState(() => ({ suggestions, text: value }));
    };

    //rendering the filtered list instead of the full list
    renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => (
                    <li key={item} onClick={() => this.suggestionSelected(item)}>
                        {item}
                    </li>
                ))}
            </ul>
        );
    }

    //take selected item from suggestion list as an argument
    suggestionSelected(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }));
    }

    //sending selected data back to parent component and emptying input box
    onTrigger = (e) => {
        console.log(this.state.text);
        this.props.parentCallback(this.state.text);
        this.setState({ text: "" });
    };

    render() {
        const { text } = this.state;

        return (
            <div>
                <div className="AutoCompleteText">
                    <input
                        value={text}
                        onChange={this.onTextChanged}
                        type="text"
                        name="myname"
                        autoComplete="off"
                        placeholder="Enter name..."
                    />
                    {this.renderSuggestions()}
                </div>
                <br />
                <button className="addTransaction-add-button" onClick={this.onTrigger}>
                    Select
                </button>
            </div>
        );
    }
}

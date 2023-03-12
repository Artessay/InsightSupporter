import React  from "react";
import { Input } from "antd";

export default class Story extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
    }

    render() {
        return(
            <Input
                width={53}
                type="text"
                placeholder="Joel Embiid most shots were taken from mid range and happened in first quarter."
            ></Input>
        )
    }
}

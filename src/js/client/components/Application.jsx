import React from 'react';

class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                {React.cloneElement(this.props.children)}
            </div>
        );
    }
}

export default Application;
